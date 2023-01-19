import { useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { options } from "../constants/options";

function Topbar({ props }) {
  useEffect(() => {
    console.log("Showing", props.selected.text);
  }, [props.selected]);
  // selection handler
  const handleSelection = useCallback(
    (e) => {
      props.setSelected({
        text: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text,
        value: e.target.value,
      });
    },
    [props]
  );

  // build select component
  return (
    <Container>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand className="mx-4" target="_blank" href="https://www.dynatrace.com">
          <img src='../../../../white_dt_logo.png' alt='dynatrace logo' height='32px'></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "98%" }}>
            <Navbar.Text className="mx-4">Select a Task</Navbar.Text>
            <div>
              <Form.Select onChange={handleSelection}>
                {options.map((option) => (
                  <option key= {option.value} value={option.value}>{option.text}</option>
                ))}
              </Form.Select>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default Topbar;
