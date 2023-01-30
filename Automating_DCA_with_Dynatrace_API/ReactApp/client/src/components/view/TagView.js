import Table from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { serverURL } from '../../utils/serverURL';

export default function TagView({ props }) {
  //local State
  const [tagData, setTagData] = useState([]);
  const [isUpdated, setisUpdated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  //API CALLS
  //   const dispatchDisable = (eId) => {
  //     fetch("http://localhost:3000/disableMonitor", {
  //       headers: {
  //         tenant: props.tenant,
  //         token: props.token,
  //         entityId: eId,
  //       },
  //     }).then((res) => {
  //       setisUpdated(true);
  //       console.log(res.entityId + " has been " + res.result);
  //     });
  //   };
  //   const dispatchDelete = (eId) => {
  //     fetch("http://localhost:3000/deleteMonitor", {
  //       headers: {
  //         tenant: props.tenant,
  //         token: props.token,
  //         entityId: eId,
  //       },
  //     }).then((res) => {
  //       setisUpdated(true);
  //       console.log(res.entityId + " has been " + res.result);
  //     });
  //   };

  //   function handleAction(e) {
  //     e.preventDefault();
  //     console.log(e.target.target);
  //     if (e.target.dataset.action === "delete") {
  //       dispatchDelete(e.target.target);
  //     } else if (e.target.dataset.action === "disable") {
  //       dispatchDisable(e.target.target);
  //     }
  //   }

  // get spoiled monitor list

  useEffect(() => {
    fetch(`${serverURL}/getPollutedTags`, {
      headers: {
        tenant: props.tenant,
        token: props.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setisUpdated(false);
        console.log(data);
        setTagData(data);
        setIsLoaded(true);
      });
  }, [props.tenant, props.token, isUpdated]);

  return (
    <div>
      <Container>
        {isLoaded ? (
          <Table>
            <thead>
              <tr>
                <th>
                  <h3>Tag Config</h3>
                </th>
                <th>
                  <h3>Actions</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              {tagData.map((tag) => (
                <tr>
                  <td>
                    <h5>{tag.value.name}</h5>
                    <p>{tag.objectId}</p>
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <InfinitySpin width="200" color="#6F2DA8" />
        )}
      </Container>
    </div>
  );
}
