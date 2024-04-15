import React from "react";
import { Component } from "react";
import { Input, Row, Col, Card, CardBody, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import Axios from "../../AxiosConfig/config";
import { Icon } from "semantic-ui-react";
import moment from 'moment';
import "./Home.css";

export default class SearchUser extends Component {

    state = {
        isOpen: false,
        fetchedItems: [],
        searchInput: "",
        userDetails: null
    }
    searchData = (e) => {
        if (e) {
            Axios.get(`user/search/${e}`).then((res) => {
                this.setState({
                    searchInput: e,
                    fetchedItems: res.data,
                })
            }).catch((err) => {
                console.log("err", err);
            })
        }
        else {
            this.setState({ searchInput: e });
        }
    }

    viewData = (data) => {
        if (data) {
            this.setState((prevState) => ({
                ...prevState,
                userDetails: data
            }))
        }
    }
    handleCancel = () => {
        this.setState({ searchInput: "", userDetails: null });
    }
    render() {
        return (
            <>
                <Row>
                    <Col md={5}>
                        <Dropdown className='dropdown-colmun' toggle={() => this.setState({ isOpen: !this.state.isOpen })} isOpen={this.state.isOpen}>
                            <DropdownToggle className='searchDropdown'>
                                <Input className='searchInFilter' onChange={(e) => this.searchData(e.target.value)} value={this.state.searchInput} name="searchInput" placeholder="Search with user name, userid" />
                                <Icon name="close" className="searchAdmissionCloseIcon" onClick={this.handleCancel}></Icon>
                            </DropdownToggle>
                            {this.state.fetchedItems && this.state.fetchedItems.length > 0 &&
                                <DropdownMenu>
                                    {this.state.fetchedItems ? this.state.fetchedItems.map((item) => (
                                        <div key={item.userId} className='div-dropdown-item'>
                                            <DropdownItem onClick={() => { this.viewData(item) }} className='dropdownItemfilter' key={item.userId}>
                                                <p style={{ marginBottom: 0 }}>
                                                    <span className='dropdownItem-left'>UerID:</span>{item.userId ? <span className='dropdownItem-right'>{item.userId},</span> : null}
                                                </p>
                                                <p style={{ marginBottom: 0 }}>
                                                    <span className='dropdownItem-left'>User Name:</span>{item.firstName ? <span className='dropdownItem-right'>{item.firstName},</span> : null}
                                                </p>
                                                <p style={{ marginBottom: 0 }}>
                                                    <span className='dropdownItem-left'>User Last Name:</span>{item.lastName ? <span className='dropdownItem-right'>{item.lastName},</span> : null}
                                                </p>
                                            </DropdownItem>
                                        </div>
                                    )) : null}
                                </DropdownMenu>
                            }
                        </Dropdown>
                    </Col>
                </Row><br /><br />
                <Row>
                    {this.state.userDetails && <Card>
                        <CardHeader>User Details</CardHeader>
                        <CardBody>UserId :  {this.state.userDetails ? this.state.userDetails.userId : ""}<br />
                            First Name :  {this.state.userDetails ? this.state.userDetails.firstName : ""}<br />
                            Last Name :  {this.state.userDetails ? this.state.userDetails.lastName : ""}<br />
                            Dob :  {this.state.userDetails ? moment(this.state.userDetails.dob).format("YYYY-MM-DD") : ""}<br />
                            Gender :  {this.state.userDetails ? this.state.userDetails.gender : ""}<br />
                            Mobile Number : {this.state.userDetails ? this.state.userDetails.mobileNumber : ""}<br />
                            Address : {this.state.userDetails ? this.state.userDetails.address : ""}</CardBody>
                    </Card>}
                </Row>
            </>
        );
    }
}