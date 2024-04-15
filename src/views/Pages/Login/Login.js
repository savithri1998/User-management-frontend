import { Formik, Form, ErrorMessage, Field } from 'formik';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { Button, Input,Label } from 'reactstrap';
import { Card, CardBody, CardGroup, Col, Container, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Axios from '../../../AxiosConfig/config';
import "./style.css";
import Swal from 'sweetalert2';



class Login extends Component {
  state = {
    Username: "",
    password: ""
  }
  onSubmit = (e) => {
    let payload = {
      email: e.Username,
      password: e.password
    }
    // Axios.post('/user/authenticate', payload).then((res) => {
    //   if(res.data.status==200){
    //     let token=res.data.token.split(" ");
    //     token=token[1];
    //     setCookie('token', token, 1);
    //     // localStorage.setItem("token",token);
    //     // localStorage.setItem('userId', res.data.user.userRoleId);
    //     setCookie('userId',res.data.user.userRoleId , 1);
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'success',
    //       title: 'Login Successful',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //     this.props.history.push('/dashboard');
    //   }else{
    //     if(res.data.status==400){
    //       Swal.fire({
    //         icon: 'warning',
    //         text: "Authentication failed. Please check your Email/password.!",
    //       })
    //     }
    //   }
    // }).catch = ((err) => {
    //   console.log("err",err);
    // })
    this.props.history.push('/dashboard');
  }
  schema = () => {
    return Yup.object().shape({
      Username: Yup.string().required("Enter email id").email('Invalid email id'),
      password: Yup.string().required("Enter password")
    })
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Formik
                      enableReinitialize={true}
                      initialValues={this.state}
                      validationSchema={this.schema}
                      onSubmit={this.onSubmit}>
                      <Form>
                        <h1>Login</h1>
                        <Label>Email</Label>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" tag={Field} name="Username" placeholder="Username" autoComplete="username" />
                        </InputGroup>
                        <ErrorMessage name="Username" component="div" className='errorMessageStyle'></ErrorMessage>
                        <Label>Password</Label>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" tag={Field} name="password" placeholder="Password" autoComplete="current-password" />
                        </InputGroup>
                        <ErrorMessage name="password" component="div" className='errorMessageStyle'></ErrorMessage>
                        <Row>
                          <Col xs="6">
                            <Button type="submit" color="primary" className="px-4">Login</Button>
                          </Col>
                          <Col xs="6" className="text-right">
                            <Button color="link" className="px-0">Forgot password?</Button></Col>
                        </Row>
                      </Form>
                    </Formik>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Dont have an account please register now click on button.</p>
                      <Link to="/register">
                        <Button style={{background:"white"}} className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
