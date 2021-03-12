import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { showLoading, hideLoading } from 'react-redux-loading';
import { setAuthUser } from '../../redux/actions/auth';
import { Form, Button, Spinner } from 'react-bootstrap';
import { initializeUser } from '../../redux/actions/user';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: false,
      verify: false,
      code: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.verify) {
      this.verifyAccount();
    } else {
      const { email, password } = this.state;
      this.props.dispatch(showLoading());
      this.setState({ ...this.state, disabled: true });
      Auth.signIn(email, password)
        .then((user) => {
          // console.log(user);
          this.props.dispatch(hideLoading());
          const data = {
            attributes: user.attributes,
            signInUserSession: user.signInUserSession,
            // admin: false,
            admin: user.signInUserSession.accessToken.payload['cognito:groups']
              ? user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('superadmin') >
                -1
              : false
          };
          this.props.dispatch(setAuthUser(data));
          this.props.dispatch(initializeUser());
          this.setState({ ...this.state, disabled: false });
        })
        .catch((err) => {
          this.props.dispatch(hideLoading());
          this.setState({ ...this.state, disabled: false });
          if (err.code === 'UserNotConfirmedException') {
            this.sendVerificationCode(email);
          } else {
            alert(err.message);
          }
        });
    }
  };

  sendVerificationCode = (email) => {
    Auth.resendSignUp(email)
      .then(() => {
        this.setState({
          ...this.state,
          disabled: false,
          verify: true
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          disabled: false
        });
      });
  };

  verifyAccount = () => {
    const { email, code } = this.state;
    Auth.confirmSignUp(email, code)
      .then((res) => {
        this.setState({
          code: '',
          email: '',
          password: '',
          verify: false,
          disabled: false
        });
      })
      .catch(() => {
        this.setState({ ...this.state, disabled: false });
        alert('Something went wrong please try again');
      });
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { email, password, disabled, verify, code } = this.state;
    if (verify) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="single__account">
            <Form.Group controlId="formBasicCode">
              <Form.Label>Verify your email!</Form.Label>
              <small>Verification code has been sent to {email}</small>
              <Form.Control
                onChange={this.handleChange}
                value={code}
                type="text"
                name="code"
                id="code"
                placeholder="Enter Verification Code"
                required
              />
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </Form.Group>
            <Button
              style={{ pointerEvents: disabled ? 'none' : 'auto' }}
              type="submit"
              className="account__btn">
              {disabled ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Verify'
              )}
            </Button>
          </div>
        </form>
      );
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="single__account">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                value={email}
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                value={password}
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
            </Form.Group>
            <p
              onClick={() => this.props.changeLogin(false)}
              className="forget__pass"
              style={{ cursor: 'pointer' }}>
              Lost your password?
            </p>
            <div>
              <Button
                style={{ pointerEvents: disabled ? 'none' : 'auto' }}
                type="submit"
                className="account__btn">
                {disabled ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  'Login'
                )}
              </Button>
              <br />
              <p className="text-center">OR</p>
              <Button
                style={{ pointerEvents: disabled ? 'none' : 'auto' }}
                type="button"
                variant="danger"
                className="account__btn mt-3"
                onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
                block>
                Sign in with Google
              </Button>
              <br />
              <Button
                style={{ pointerEvents: disabled ? 'none' : 'auto' }}
                type="button"
                block
                className="account__btn"
                onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}>
                Sign in with Facebook
              </Button>
            </div>
          </div>
        </form>
      );
    }
  }
}

export default connect()(Signin);
