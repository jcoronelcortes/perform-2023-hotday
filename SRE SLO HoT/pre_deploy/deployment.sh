
#!/usr/bin/env bash

################################################################################
### Script deploying environment for the SRE SLO training
###
################################################################################
###########################################################################################################
####  Required Environment variable :
#### ENVIRONMENT_URL=<with your environment URL (with'https'). Example: https://{your-environment-id}.live.dynatrace.com> or {your-domain}/e/{your-environment-id}
#### DTU_ID=<Dynatrace USER ID> Example: dtulab123456789
#### API_TOKEN : api token with the following right : Access problem and event feed, metrics and topology, ExternalSyntheticIntegration
#########################################################################################################

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
  *)
    echo "Warning: skipping unsupported option: $1"
    shift
    ;;
  esac
done

if [ -z "$ENVIRONMENT_URL" ]; then
  echo "Error: environment-url not set!"
  exit 1
fi

if [ -z "$DTU_ID" ]; then
  echo "Error: DTU id not set!"
  exit 1
fi

if [ -z "$API_TOKEN" ]; then
  echo "Error: api-token not set!"
  exit 1
fi

DT_HOST=$(echo $ENVIRONMENT_URL | grep -oP 'https://\K\S+')

HOME_SCRIPT_DIRECTORY=/home/dtu_training/pre_deploy
echo "Script folder is $HOME_SCRIPT_DIRECTORY"

echo $DT_HOST
echo $DTU_ID
echo $API_TOKEN