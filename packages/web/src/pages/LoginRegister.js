import React from 'react';
import { connect } from 'react-redux';
import { Tab, Nav } from 'react-bootstrap';
import Signup from '../app/components/auth/Signup';
import Login from '../app/components/auth/Login';

const LoginRegister = (props) => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <Tab.Container defaultActiveKey="login">
          <Nav variant="pills" className="acount__nav justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey="login" className="text-light">
                Sign In
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="register" className="text-light">
                Sign Up
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="login">
              <Login />
            </Tab.Pane>
            <Tab.Pane eventKey="register">
              <Signup />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, user }) => {
  return {
    auth,
    user
  };
};

export default connect(mapStateToProps)(LoginRegister);
