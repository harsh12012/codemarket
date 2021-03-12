import React, { Component } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import {MdSend} from 'react-icons/md';

class SendMessage extends Component {
  state = {
    body: "",
  };

  handleChange(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  async submit(e) {
    e.preventDefault();

    await this.props.onCreate(this.state.body);

    // this.message.value = "";
    this.setState({
      body: "",
    });
  }

  render() {
    return (
      <div className="send-message">
      <form onSubmit={(e) => this.submit(e)}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Message"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            name="body"
            onChange={(e) => this.handleChange("body", e)}
            value={this.state.body}
          />
          <InputGroup.Append>
            <Button
              disabled={this.state.body === "" ? true : false}
              style={{ pointerEvents: this.props.disabled ? "none" : "auto" }}
              type="submit"
              variant="primary"
            >
              <MdSend size={26}/>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </form>
      </div>
    );
  }
}

export default SendMessage;
