import React, { Component } from 'react';
import {UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';
import { Icon } from "semantic-ui-react";
import {  AppSidebarToggler } from '@coreui/react';
import 'semantic-ui-css/semantic.min.css';


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  render() {
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <UncontrolledDropdown nav direction="down">
              <DropdownToggle nav>
                <Icon name="sign-out" size="large" className="me-2" />
              </DropdownToggle>
              <DropdownMenu >
                <DropdownItem onClick={e => {
                  this.props.onLogout(e);
                }}> Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </UncontrolledDropdown>
        </Nav>

      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
