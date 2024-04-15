import React, { Component } from "react";
import { Card, Grid } from 'semantic-ui-react';
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "../../AxiosConfig/config";
import Swal from "sweetalert2";
import { Row, Button } from 'reactstrap';
import "rc-pagination/assets/index.css";
import moment from 'moment';
import "./Home.css";

export default class User extends Component {
  state = {
    users: [],
    selectedRows: []
  }
  componentDidMount() {
    this.getAllUsers();
  }
  dateOfBirth = (cell, row) => {
    const formattedDate = moment(cell).format('YYYY-MM-DD');
    return formattedDate;
  }
  getAllUsers = () => {
    Axios.get("user/getAll/true").then((res) => {
      if (res.status == 200) {
        this.setState({
          users: res.data
        })
      }
      else {
        this.setState({
          users: []
        })
      }

    }).catch((err) => {
      console.log("err", err);
    })
  }

  actions = (row, cell) => {
    return <span>
      <i className="fa fa-pencil edit_styles" onClick={() => { this.props.history.push(`user/createuser/${cell.userId}`) }}></i>
      <i className="fa fa-trash trash_style" size="large" onClick={() => { this.deleteUser(cell.userId, cell) }}>{" "}</i>
    </span>
  }
  deleteUser = (id, row) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want delete?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`enabledisable/singleuser/${id}/false`)
          .then((response) => {
            if (response.status === 200) {
              toast.success("User deleted successfully..!");
              setTimeout(() => {
                this.getAllUsers();
              }, 1000)
            }
          }).catch((error) => {
            toast.error("Unable to delete Users");
          })
      }
    })
  }

  selectRow = {
    mode: "checkbox",
    onSelect: (row, isSelect, e) => {
      let data = this.state.selectedRows;
      if (isSelect) {
        data.push(row);
      } else {
        data.forEach((key, index) => {
          if (key && key === row.userId) data.splice(index, 1)
        });
      }
      this.setState({ selectedRows: data });
    },
    onSelectAll: (isSelect, rows, e) => {
      let data = [];
      if (isSelect) {
        if (data.length === 0) data = [...rows];
        else data.push(...rows.userId);
      } else {
        let selectedData = [];
        data.forEach((key) => {
          let flag = 0;
          rows.forEach((row) => {
            if (row.userId === key.userId) {
              flag++;
            }
          }); if (flag === 0) {
            selectedData.push(key.userId);
          }
        });
        data = selectedData;
      }
      this.setState({ selectedRows: data });
    }
  };
  deleteAllUsers = () => {
    let userIds = [];
    this.state.selectedRows.map((data, index) => {
      if (data && data.userId) {
        userIds.push(data.userId);
      }

    })
    let payload = {};
    payload.ids = userIds;
    Axios.put('enabledisable/multiuser/false', payload).then((res) => {
      if (res.status == 200) {
        toast.success("Users deleted successfully")
        this.getAllUsers();
      }
    }).catch((err) => {
      console.log("err", err);
    })
  }

  render() {
    return (
      <Grid>
        <ToastContainer />
        <div>
          {this.state.selectedRows.length > 0 ?
            <Button color="success" className="deleteAllUserStyles" onClick={() => this.deleteAllUsers()}>Delete All Users</Button>
            : null}</div>
        <Card style={{ width: "90%", padding: "15px" }}>
          <span className="createuser_Style_B" size="large" > {" "} Users</span>
          <BootstrapTable data={this.state.users} selectRow={this.selectRow} hover striped>
            <TableHeaderColumn dataField='userId' width='260px' isKey={true}>User ID</TableHeaderColumn>
            <TableHeaderColumn dataField='firstName' width='180px' >First Name</TableHeaderColumn>
            <TableHeaderColumn dataField='lastName' width='180px'>Last Name</TableHeaderColumn>
            <TableHeaderColumn dataField='dob' width='180px' dataFormat={this.dateOfBirth}>Dob</TableHeaderColumn>
            <TableHeaderColumn dataField='gender' width='180px'>Gender</TableHeaderColumn>
            <TableHeaderColumn dataField='email' width='180px'>Email</TableHeaderColumn>
            <TableHeaderColumn dataField="mobileNumber" width='180px'>Mobile Number</TableHeaderColumn>
            <TableHeaderColumn width="100px" dataFormat={this.actions}>Actions</TableHeaderColumn>
          </BootstrapTable> </Card>

      </Grid>
    )
  }
}