import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { Component } from 'react';
import * as Yup from "yup";
import { Button, Card, CardBody, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Axios from '../../../AxiosConfig/config';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";
import Swal from 'sweetalert2';

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    newpassword: ""
  }
  schema = () => {
    return Yup.object().shape({
      name: Yup.string().required("Enter user name").trim(),
      email: Yup.string().required("Enter email id").email().trim(),
      password: Yup.string().min(6).required("Enter password").trim(),
      newpassword: Yup.string().min(6).required("Enter confirm password").oneOf([Yup.ref('password'),null]),
      phoneNumber: Yup.number().min(10).required("Enter phone number")
    })
  }
  onSubmit = (e) => {
    console.log(e);
    let payload={
      name:e.name,
      email:e.email,
      password: e.password,
      newpassword:e.newpassword,
      phoneNumber:e.newpassword
    }
    console.log(payload);
    Axios.post('user/createUser',payload).then((res)=>{
      console.log("res",res);
      if(res.data.status==201){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registration completed',
          showConfirmButton: true,
          timer: 1500
        })
        this.props.history.push("/loagin");
      } 
    }).catch((err)=>{
      console.log(err);
      toast.error("Unable to register try again");
    })
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
          <ToastContainer />
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Formik
                    initialValues={this.state}
                    enableReinitialize={true}
                    validationSchema={this.schema}
                    onSubmit={this.onSubmit}
                  >
                    <Form>
                      <h1>Register</h1>
                      <p className="text-muted">Create your account</p>
                      <label>Name</label>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" name="name" tag={Field} />
                      </InputGroup>
                      <ErrorMessage name='name' component="div" className='errorMessageStyle'/>
                      <label>Email</label>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Email" name='email' autoComplete="Email" tag={Field} />
                      </InputGroup>
                      <ErrorMessage name='email' component="div" className='errorMessageStyle'/>
                      <label>Password</label>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="password" tag={Field} autoComplete="new-password" name='password' />
                      </InputGroup>
                      <ErrorMessage name='password' component="div" className='errorMessageStyle'/>
                     <label>Confirm password</label>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Repeat password" autoComplete="new-password" tag={Field} name="newpassword" />
                      </InputGroup>
                      <ErrorMessage name='newpassword' component="div" className='errorMessageStyle'/>
                      <label>Phone number</label>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-phone"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="number" placeholder="Phone number" name="phoneNumber" tag={Field} />
                      </InputGroup>
                      <ErrorMessage name='phoneNumber' component="div" className='errorMessageStyle'/>
                      <center><Button type="submit" color="success">Create Account</Button></center>
                    </Form>
                  </Formik>
                </CardBody>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
