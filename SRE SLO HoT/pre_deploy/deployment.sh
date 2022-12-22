
#!/usr/bin/env bash

################################################################################
### Script deploying environment for the SRE SLO training
###
################################################################################
###########################################################################################################
####  Required Environment variable :
#### ENVIRONMENT_URL <with your environment URL (with'https')>. Example: https://{your-environment-id}.live.dynatrace.com> or {your-domain}/e/{your-environment-id}
#### DTU_ID <Dynatrace USER ID> Example: dtulab123456789
#### API_TOKEN <Dynatrace API Token> With the Following Permissions: Access problem and event feed, metrics and topology, ExternalSyntheticIntegration, Read configuration, Write Configuration
#### EMAIL <EMAIL>
#########################################################################################################

YLW='\033[1;33m'
NC='\033[0m'
YEAR="2023"

while [ $# -gt 0 ]; do
  case "$1" in
  --environment-url)
    ENVIRONMENT_URL="$2"
   shift 2
    ;;
  --dtu-id)
    DTU_ID="$2"
   shift 2
    ;;
  --api-token)
    API_TOKEN="$2"
   shift 2
    ;;
  --email)
    EMAIL="$2"
   shift 2
    ;;
  *)
    echo "Warning: skipping unsupported option: $1"
    shift
    ;;
  esac
done

if [ -z "$ENVIRONMENT_URL" ]; then
  echo "Error: environment-url not set!"
  echo "Accepted Params: \n
        ENVIRONMENT_URL <with your environment URL (with'https')>. Example: https://{your-environment-id}.live.dynatrace.com> or {your-domain}/e/{your-environment-id} \n
        DTU_ID <Dynatrace USER ID> Example: dtulab123456789 \n
        API_TOKEN <Dynatrace API Token> With the Following Permissions: Access problem and event feed, metrics and topology, ExternalSyntheticIntegration, Read configuration, Write Configuration \n
        EMAIL <EMAIL>\n
        "
  exit 1
fi

if [ -z "$DTU_ID" ]; then
  echo "Error: DTU id not set!"
  echo "Accepted Params: \n
      ENVIRONMENT_URL <with your environment URL (with'https')>. Example: https://{your-environment-id}.live.dynatrace.com> or {your-domain}/e/{your-environment-id} \n
      DTU_ID <Dynatrace USER ID> Example: dtulab123456789 \n
      API_TOKEN <Dynatrace API Token> With the Following Permissions: Access problem and event feed, metrics and topology, ExternalSyntheticIntegration, Read configuration, Write Configuration \n
      EMAIL <EMAIL>\n
      "
  exit 1
fi

if [ -z "$API_TOKEN" ]; then
  echo "Error: api-token not set!"
  echo "Accepted Params: \n
        ENVIRONMENT_URL <with your environment URL (with'https')>. Example: https://{your-environment-id}.live.dynatrace.com> or {your-domain}/e/{your-environment-id} \n
        DTU_ID <Dynatrace USER ID> Example: dtulab123456789 \n
        API_TOKEN <Dynatrace API Token> With the Following Permissions: Access problem and event feed, metrics and topology, ExternalSyntheticIntegration, Read configuration, Write Configuration \n
        EMAIL <EMAIL>\n
        "
  exit 1
fi

if [ -z "$EMAIL" ]; then
  echo "Error: email not set!"
  echo "Accepted Params: \n
        ENVIRONMENT_URL <with your environment URL (with'https')>. Example: https://{your-environment-id}.live.dynatrace.com> or {your-domain}/e/{your-environment-id} \n
        DTU_ID <Dynatrace USER ID> Example: dtulab123456789 \n
        API_TOKEN <Dynatrace API Token> With the Following Permissions: Access problem and event feed, metrics and topology, ExternalSyntheticIntegration, Read configuration, Write Configuration \n
        EMAIL <EMAIL>\n
        "
  exit 1
fi

DT_HOST=$(echo $ENVIRONMENT_URL | sed 's/\/$//')

HOME_SCRIPT_DIRECTORY=/home/dtu_training/sre_hot_predeploy
echo "Script folder is $HOME_SCRIPT_DIRECTORY"

echo "##################"
echo -e "DT HOST - $DT_HOST"
echo -e "DTU ID - $DTU_ID"
echo -e "API Token - $API_TOKEN"
echo "##################"

## Deploy Application
echo -e "${YLW}Deploying Application${NC}"
APP=$(cat $HOME_SCRIPT_DIRECTORY/dynatrace/application.json)
RESPONSE=$(curl -X POST "$DT_HOST/api/config/v1/applications/web" -H "accept: application/json; charset=utf-8" -H "Authorization: Api-Token $API_TOKEN" -H "Content-Type: application/json; charset=utf-8" -d "$APP")
echo -e "${YLW}$RESPONSE${NC}"

sleep 1s
APP_ID=$(echo $RESPONSE | jq -r .id)
APP_DETECTIONRULE=$(cat $HOME_SCRIPT_DIRECTORY/dynatrace/application_detectionrule.json | sed "s,DTUID,$DTU_ID," | sed "s/APPID/$APP_ID/")
RESPONSE=$(curl -X POST "$DT_HOST/api/config/v1/applicationDetectionRules" -H "accept: application/json; charset=utf-8" -H "Authorization: Api-Token $API_TOKEN" -H "Content-Type: application/json; charset=utf-8" -d "$APP_DETECTIONRULE")
echo -e "${YLW}$RESPONSE${NC}"

## Deploy Synthetic Monitors
echo -e "${YLW}Deploying Synthetic Monitors${NC}"

echo -e "Synthetic  - Prod Easytravel Homepage"
SYNTH_EASYTRAVEL=$(cat $HOME_SCRIPT_DIRECTORY/dynatrace/synthetic_easytravel.json | sed "s,DTUID,$DTU_ID,")
RESPONSE=$(curl -X POST "$DT_HOST/api/v1/synthetic/monitors" -H "accept: application/json; charset=utf-8" -H "Authorization: Api-Token $API_TOKEN" -H "Content-Type: application/json; charset=utf-8" -d "$SYNTH_EASYTRAVEL")
echo -e "${YLW}$RESPONSE${NC}"

echo -e "Synthetic  - Prod Easytravel BookTrip"
SYNTH_EASYTRAVEL_ADVANCE=$(cat $HOME_SCRIPT_DIRECTORY/dynatrace/synthetic_easytravel_advance.json | sed "s,DTUID,$DTU_ID,")
RESPONSE=$(curl -X POST "$DT_HOST/api/v1/synthetic/monitors" -H "accept: application/json; charset=utf-8" -H "Authorization: Api-Token $API_TOKEN" -H "Content-Type: application/json; charset=utf-8" -d "$SYNTH_EASYTRAVEL_ADVANCE")
echo -e "${YLW}$RESPONSE${NC}"

echo -e "Synthetic - HTTPSTAT"
SYNTH_HTTPSTAT=$(cat $HOME_SCRIPT_DIRECTORY/dynatrace/synthetic_httpstat.json)
RESPONSE=$(curl -X POST "$DT_HOST/api/v1/synthetic/monitors" -H "accept: application/json; charset=utf-8" -H "Authorization: Api-Token $API_TOKEN" -H "Content-Type: application/json; charset=utf-8" -d "$SYNTH_HTTPSTAT")
echo -e "${YLW}$RESPONSE${NC}"


## Deploy Perform SRE - SLO HoT Dashboard
echo -e "${YLW}Deploying Perform SRE - SLO HoT Dashboard${NC}"
DASHBOARD=$(cat $HOME_SCRIPT_DIRECTORY/dynatrace/dashboard.json | sed "s,YEAR,$YEAR," | sed "s,EMAIL,$EMAIL,")
RESPONSE=$(curl -X POST "$DT_HOST/api/config/v1/dashboards" -H "accept: application/json; charset=utf-8" -H "Authorization: Api-Token $API_TOKEN" -H "Content-Type: application/json; charset=utf-8" -d "$DASHBOARD")
echo -e "${YLW}$RESPONSE${NC}"

## Deploy Tag/Management Zone
echo -e "${YLW}Deploying Autotag${NC}"
TAG=$(cat $HOME_SCRIPT_DIRECTORY/dynatrace/tag.json)
RESPONSE=$(curl -X POST "$DT_HOST/api/config/v1/autoTags" -H "accept: application/json; charset=utf-8" -H "Authorization: Api-Token $API_TOKEN" -H "Content-Type: application/json; charset=utf-8" -d "$TAG")
echo -e "${YLW}$RESPONSE${NC}"

echo -e "${YLW}Deploying Management Zone${NC}"
MZ=$(cat $HOME_SCRIPT_DIRECTORY/dynatrace/managementzone.json)
RESPONSE=$(curl -X POST "$DT_HOST/api/config/v1/managementZones" -H "accept: application/json; charset=utf-8" -H "Authorization: Api-Token $API_TOKEN" -H "Content-Type: application/json; charset=utf-8" -d "$MZ")
echo -e "${YLW}$RESPONSE${NC}"