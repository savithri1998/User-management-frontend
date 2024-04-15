import React, { Component } from "react";
import { Card, Grid } from 'semantic-ui-react';
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "../../AxiosConfig/config";
import { Row, Button } from 'reactstrap';
import { AppSwitch } from "@coreui/react";
import "rc-pagination/assets/index.css";
import moment from 'moment';
import "./Home.css";

export default class DeletedUsers extends Component {
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
    Axios.get("user/getAll/false").then((res) => {
      if (res.status === 200) {
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
  studentAdmissionStatusUpdate = (data) => {
    data.status = !data.status;
    Axios.delete(`enabledisable/singleuser/${data && data.userId}/true`).then(response => {
      if (response.status === 200) {
        toast.info(`User status updated successfully`);
        this.getAllUsers();
      }
    }).catch((e) => {
      toast.error("Unable to get admissions");
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
    Axios.put('enabledisable/multiuser/true', payload).then((res) => {
      if (res.status == 200) {
        toast.success("Users deleted successfully")
        this.getAllUsers();
      }
    }).catch((err) => {
      console.log("err", err);
    })
  }
  actions = (row, cell) => {
    return (
      <AppSwitch className={'mx-1'} variant={'pill'} name="status" color="primary" value={cell.status ? 'true' : 'false'} checked={cell.status ? true : false}
        onChange={(e) => { this.studentAdmissionStatusUpdate(cell) }}
      />
    )
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
          <span className="createuser_Style_B" size="large" > {" "} Deleted Users</span>
          <BootstrapTable data={this.state.users} selectRow={this.selectRow} hover striped>
            <TableHeaderColumn dataField='userId' width='260px' isKey={true}>User ID</TableHeaderColumn>
            <TableHeaderColumn dataField='firstName' width='180px' >First Name</TableHeaderColumn>
            <TableHeaderColumn dataField='lastName' width='180px'>Last Name</TableHeaderColumn>
            <TableHeaderColumn dataField='dob' width='180px' dataFormat={this.dateOfBirth}>Dob</TableHeaderColumn>
            <TableHeaderColumn dataField='gender' width='180px'>Gender</TableHeaderColumn>
            <TableHeaderColumn dataField='email' width='180px'>Email</TableHeaderColumn>
            <TableHeaderColumn dataField="mobileNumber" width='180px'>Mobile</TableHeaderColumn>
            <TableHeaderColumn width="100px" dataFormat={this.actions}>Enable / Disable</TableHeaderColumn>
          </BootstrapTable> </Card>
      </Grid>
    )
  }
}