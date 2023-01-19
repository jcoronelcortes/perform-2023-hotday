import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { serverURL } from '../../utils/serverURL';


export default function SyntheticView({ props }) {
  //local State
  const [synthData, setSynthData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeframe, setTimeframe] = useState(45);
  const [active, setActive] = useState("isActive");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);

  const tableData = synthData.map((synth) => {
    return {
      syntheticName: synth.entity.entityName,
      syntheticDelete: "Delete",
      syntheticDisable: "Disable",
      syntheticId: synth.entity.entityId,
      isEnabled: synth.entity.enabled,
      syntheticSummary: synth.entity,
    };
  });
  console.log('tableData:', tableData)

  const columns = [
    {
      dataField: "syntheticSummary",
      text: "Synthetic Test",
      sort: true,
      formatter: (e, row, rowEvents) => {
        return (
          <div>
            <h4>{row.syntheticSummary.entityName}</h4>
            <h6>
              {row.syntheticSummary.entityId} {row.syntheticSummary.type}
            </h6>
          </div>
        );
      },
    },
    {
      dataField: "syntheticDelete",
      text: "Delete",
      sort: true,
      formatter: (e, row, rowEvents) => {
        return (
          <Button
            onClick={() => handleAction(e, row, rowEvents)}
            style={{
              backgroundColor: "#A651FA",
              color: "white",
              border: "#A651FA",
            }}
            data-action="delete"
          >
            Delete
          </Button>
        );
      },
    },
    {
      dataField: "syntheticDisable",
      text: "Disable",
      sort: true,
      formatter: (e, row, rowEvents) => {
        return (
          <Button
            onClick={() => handleAction(e, row, rowEvents)}
            disabled={!row.isEnabled}
            style={{
              backgroundColor: "#1FB524",
              color: "white",
              border: "#1FB524",
            }}
            data-action="disable"
          >
            {!row.isEnabled ? "DISABLED" : "Disable"}
          </Button>
        );
      },
    },
  ];
  const pagination = paginationFactory({
    sizePerPage: 10,
  });
  //API CALLS
  const dispatchDisable = async (eId, option) => {
    const response = await fetch(`${serverURL}/disableMonitor`, {
      headers: {
        tenant: props.tenant,
        token: props.token,
        entityId: eId,
      },
    });
    const data = await response.json();
    console.log(data.entityId + " has been " + data.result);
    if (option === "single") setUpdate(!update);
  };

  const dispatchDelete = async (eId, option) => {
    const response = await fetch(`${serverURL}/deleteMonitor`, {
      headers: {
        tenant: props.tenant,
        token: props.token,
        entityId: eId,
      },
    });
    const data = await response.json();
    console.log(data.entityId + " has been " + data.result);
    if (option === "single") setUpdate(!update);
  };

  function handleAction(e, row, rowEvents) {
    if (e === "Disable") {
      dispatchDisable(row.syntheticId, "single");
    } else if (e === "Delete") {
      dispatchDelete(row.syntheticId, "single");
    }
  }

  // get spoiled monitor list
  useEffect(() => {
    fetch(`${serverURL}/getSpoiledMonitors`, {
      headers: {
        tenant: props.tenant,
        token: props.token,
        active: active,
        timeframe: timeframe,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSynthData(data);
        setIsLoaded(true);
      });
  }, [props.tenant, props.token, update]);

  const refreshList = () => {
    setIsLoaded(false);
    setUpdate(!update);
  };
  function handleDeleteModal() {
    setShowDeleteModal(true);
  }
  function handleDeleteClose() {
    setShowDeleteModal(false);
  }
  function handleDisableModal() {
    setShowDisableModal(true);
  }
  function handleDisableClose() {
    setShowDisableModal(false);
  }
  const handleDeleteAll = (entities) => {
    setShowDeleteModal(false);
    Promise.all(
      entities.map((entity) => dispatchDelete(entity.syntheticId))
    ).then(() => setUpdate(!update));
    console.log("deleting all");
  };
  const handleDisableAll = (entities) => {
    setShowDisableModal(false);
    Promise.all(
      entities.map((entity) => dispatchDisable(entity.syntheticId))
    ).then(() => setUpdate(!update));
    console.log("disabling all");
  };

  return (
    <div>
      <Modal show={showDeleteModal} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting All Configs!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This action will delete all of the configs in the current list!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleDeleteAll(tableData)}>
            I really want to delete All
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDisableModal} onHide={handleDisableClose}>
        <Modal.Header closeButton>
          <Modal.Title>Disabling All Configs!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This action will disable all of the configs in the current list!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDisableClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleDisableAll(tableData)}>
            I really want to disable all
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Text id="activeText" muted>
                Desired Activity Filter
              </Form.Text>
              <Form.Select
                aria-describedby="activeText"
                aria-label="active"
                defaultValue={active}
                onChange={(e) => {
                  setActive(e.target.value)
                  setIsLoaded(false);
                  setUpdate(!update)
                }}
              >
                <option value="isActive">Currently Active</option>
                <option value="wasActive">Was Active During Timeframe</option>
                <option value="noFilter">No Filter </option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Text id="timeframeText" muted>
                Desired lookback in days
              </Form.Text>
              <Form.Control
                type="number"
                id="timeFrame"
                aria-describedby="timeframeText"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              />
            </Col>
            <Col>
              <Button
                onClick={(e) => refreshList()}
                style={{
                  backgroundColor: "#A651FA",
                  color: "white",
                  border: "#A651FA",
                }}
              >
                Refresh
              </Button>
            </Col>
            <Col>
              <Button
                onClick={handleDisableModal}
                style={{
                  backgroundColor: "#A651FA",
                  color: "white",
                  border: "#A651FA",
                }}
              >
                Disable All
              </Button>
            </Col>
            <Col>
              <Button
                onClick={handleDeleteModal}
                style={{
                  backgroundColor: "#A651FA",
                  color: "white",
                  border: "#A651FA",
                }}
              >
                Delete All
              </Button>
            </Col>
          </Row>
        </Form>
        {(isLoaded && tableData.length >= 1) 
          ? (
          <div>
            <BootstrapTable
              keyField="syntheticName"
              data={tableData}
              columns={columns}
              pagination={pagination}
            />
          </div>
          ) 
          : (isLoaded && tableData.length === 0)
          ? (
            <div>
            <h3 className= 'mt-5'>No data found for this time and activity filter</h3>
            <h3>Try another filter</h3>
            </div>
          )
          :
          (
            <InfinitySpin width="200" color="#6F2DA8" />
        )}
      </Container>
    </div>
  );
}
