import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Component } from "react";
import { Card, Grid } from "semantic-ui-react";
import Select from 'react-select';
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Input, Label } from 'reactstrap';
import Axios from "../../AxiosConfig/config";
import "./Home.css";
import moment from 'moment';

export default class CreateNewUser extends Component {
    state = {
        id: this.props.match.params.id,
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        mobileNumber: "",
        address: "",
        gender: "",
        genderoption: [{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }],
    }
    componentDidMount() {
        if (this.state.id != "new") {
            Axios.get(`/user/getById/${this.state.id}`).then((res) => {
                if (res.status === 200) {
                    this.setState({
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        dob: moment(res.data.dob).format("YYYY-MM-DD"),
                        email: res.data.email,
                        mobileNumber: res.data.mobileNumber,
                        address: res.data.address,
                        gender: res.data.gender ? { value: res.data.gender, label: res.data.gender } : null
                    })
                }
            })
        }
    }
    onSubmit = (e) => {
        let payload = {
            firstName: e.firstName,
            lastName: e.lastName,
            gender: e.gender.value,
            email: e.email,
            dob: e.dob,
            address: e.address,
            mobileNumber: e.mobileNumber
        }
        if (this.state.id == "new") {
            Axios.post('user/save', payload).then((res) => {
                if (res.status == 201) {
                    toast.success("User created successfully");
                    setTimeout(() => {
                        this.props.history.push('/user');
                    }, 1500);
                }
            }).catch((err) => {
                toast.error("Unable to create user");
            })
        }
        else {
            Axios.put(`user/update/${this.state.id}`, payload).then((res) => {
                if (res.status == 200) {
                    toast.success("User updated successfully");
                    setTimeout(() => {
                        this.props.history.push('/user');
                    }, 1500);
                }
            }).catch((err) => {
                toast.error("Unable to update user");
            })
        }

    }
    schema = () => {
        const phoneRegExp = /^[6-9]\d{9}$/
        return Yup.object().shape({
            firstName: Yup.string().required("First name required"),
            lastName: Yup.string().required("Last name required"),
            dob: Yup.string().required("Date of birth required"),
            email: Yup.string().nullable().required('User email is required').email('User email is invalid'),
            mobileNumber: Yup.string().matches(phoneRegExp, "Please enter valid mobile number").required("Mobile number is required"),
            address: Yup.string().required("Address required"),
            gender: Yup.object().required("Gender required"),
        })
    }
    render() {
        return (
            <>
                <Grid >
                    <ToastContainer />
                    <Grid.Row >
                        <Grid.Column  >
                            <Formik
                                enableReinitialize={true}
                                initialValues={this.state}
                                validationSchema={this.schema}
                                onSubmit={this.onSubmit}>
                                {({ values, setFieldValue }) => (
                                    <>
                                        <span className="createuser_Style_B" size="large" >
                                            {" "} {this.state.id === "new" ? "CREATE NEW USER" : "UPDATE USER"}
                                        </span>
                                        <Card style={{ width: "100%" }}>
                                            <Form><br />
                                                <div>
                                                    <Grid columns='equal' stackable >
                                                        <Grid.Row className="createuser_Style_C">
                                                            <Grid.Column>
                                                                <Label>First Name</Label>
                                                                <Input type="text" name="firstName" tag={Field} className="inputStyle" placeholder="Enter first name"></Input>
                                                                <ErrorMessage name="firstName" component="div" className="errorStyle"></ErrorMessage>
                                                            </Grid.Column>
                                                            <Grid.Column>
                                                                <Label>Last Name</Label>
                                                                <Input type="text" name="lastName" tag={Field} className="inputStyle" placeholder="Enter last name"></Input>
                                                                <ErrorMessage name="lastName" component="div" className="errorStyle"></ErrorMessage>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>

                                                    <Grid columns='equal' stackable >
                                                        <Grid.Row className="createuser_Style_C">
                                                            <Grid.Column>
                                                                <Label>DOB</Label>
                                                                <Input type="date" name="dob" tag={Field} className="inputStyle" placeholder="Enter date of birth"></Input>
                                                                <ErrorMessage name="dob" component="div" className="errorStyle"></ErrorMessage>
                                                            </Grid.Column>
                                                            <Grid.Column>
                                                                <Label>Gender</Label>
                                                                <Select name="gender" value={values.gender} className="inputStyle" tag={Field} onChange={(e) => { setFieldValue("gender", e) }}
                                                                    options={this.state.genderoption} placeholder="Select gender"></Select>
                                                                <ErrorMessage name="gender" component="div" className="errorStyle"></ErrorMessage>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                    <Grid columns='equal' stackable >
                                                        <Grid.Row className="createuser_Style_C">
                                                            <Grid.Column>
                                                                <Label>Email</Label>
                                                                <Input type="text" name="email" tag={Field} className="inputStyle" placeholder="Enter email id"></Input>
                                                                <ErrorMessage name="email" component="div" className="errorStyle"></ErrorMessage>
                                                            </Grid.Column>
                                                            <Grid.Column>
                                                                <Label>Mobile</Label>
                                                                <Input type="number" name="mobileNumber" tag={Field} className="inputStyle" placeholder="Enter mobile number"></Input>
                                                                <ErrorMessage name="mobileNumber" component="div" className="errorStyle"></ErrorMessage>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                    <Grid columns='equal' stackable >
                                                        <Grid.Row className="createuser_Style_C">
                                                            <Grid.Column>
                                                                <Label>Full Address</Label><br />
                                                                <Field component="textarea" name="address" rows="2" className="inputStyle" placeholder="Enter address"></Field>
                                                                <ErrorMessage name="address" component="div" className="errorStyle"></ErrorMessage>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </div><br />
                                                <center>
                                                    <Button type='reset' color='danger' className="bunstyle" onClick={() => { this.props.history.push('/user') }}>Cancel</Button>
                                                    <Button type="submit" color='primary' className="bunstyle1">Submit</Button>
                                                </center>
                                            </Form><br />
                                        </Card>
                                    </>
                                )}
                            </Formik>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>
        );
    }
}