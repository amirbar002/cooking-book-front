import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveData } from "../../../api/actions";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../app/globals.css";
import Search from "../../../pages/events/search";
import { set, useForm } from "react-hook-form";
import axios from "axios";

export const Navbarweb = ({ data }) => {
  const [arraydata, setarraydata] = useState([]);
  const [SearchTerm, setSearchTerm] = useState([]);
  const [ture, setture] = useState(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmitt = async (data) => {
    // event.preventDefault();
    setSearchTerm(data);
    const response = await axios.get(
      `https://cooking-book-77339b050a7a.herokuapp.com/recipes/search/${data.search}`
    );

    if (response.data.length > 0) {
      dispatch(saveData(response.data));
      router.push("https://master--velvety-belekoy-9b0e69.netlify.app/events/search");
    } else {
      alert("No results found.");
    }
  };

  data = arraydata;

  return (
    <div>
      <div className="dig-navbar-jsx" >
        {arraydata.length > 0 && <Search data={arraydata} />}
        <Navbar bg="primary" data-bs-theme="primary">
          <Container className="Containernavbar" >
            <Form
              onSubmit={handleSubmit(onSubmitt)}
              className="Searchinput"
              inline="true"
            >
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                    {...register("search", { required: true })}
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </Form>
            <Nav className="me-auto ">
            <Nav.Link href="https://master--velvety-belekoy-9b0e69.netlify.app/abuot">הסבר</Nav.Link>
              <Nav.Link href="/">עמוד הבית</Nav.Link>
              <Nav.Link href="https://master--velvety-belekoy-9b0e69.netlify.app/addRecipes">
                הוסיף מתכון
              </Nav.Link>
            </Nav>
            <Navbar.Brand>ספר המתכונים האיילתי</Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
