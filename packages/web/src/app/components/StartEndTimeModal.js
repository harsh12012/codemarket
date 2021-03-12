import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { convertTo12hrformat } from "../../helpers/utilities";
import StartEndDateTimePicker from "./StartEndDateTimePicker";
import StartEndTimePicker from "./StartEndTimePicker";
import moment from "moment";

const StartEndTimeModal = ({
  show,
  handleClose,
  handleSave,
  start,
  end,
  onChange,
  scheduleType,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
  customTimeRange,
}) => {
  // console.log("start time in modal :", start);
  // console.log("end time in modal :", end);

  const [validated, setValidated] = useState(false);

  const [startDT, setStartDT] = useState(start);
  const [endDT, setEndDT] = useState(end);

  const onSaveHandler = () => {
    if (startDT && endDT) {
      console.log("start : ", startDT);
      console.log("end : ", endDT);
      handleSave(startDT, endDT);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change your Timings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form validated={validated}>
          <StartEndDateTimePicker
            start={startDT}
            end={endDT}
            onChange={(start, end) => {
              setStartDT(start);
              setEndDT(end);
            }}
          />
          <Form.Control.Feedback type="invalid">
            These fields are required
          </Form.Control.Feedback>
        </Form>
        <div className="detail-item">
          {scheduleType == "24hours" && (
            <p className="lead">This facility is open 24/7.</p>
          )}
          {scheduleType == "fixed" && (
            <div className="schedule-table">
              <p className="lead">This facility is open on :</p>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {monday.isActive && (
                    <tr>
                      <td>Monday</td>
                      <td>{moment(monday.startTime).format("lll")}</td>
                      <td>{moment(monday.endTime).format("lll")}</td>
                    </tr>
                  )}
                  {tuesday.isActive && (
                    <tr>
                      <td>Tuesday</td>
                      <td>{moment(tuesday.startTime).format("lll")}</td>
                      <td>{moment(tuesday.endTime).format("lll")}</td>
                    </tr>
                  )}
                  {wednesday.isActive && (
                    <tr>
                      <td>Wednesday</td>
                      <td>{moment(wednesday.startTime).format("lll")}</td>
                      <td>{moment(wednesday.endTime).format("lll")}</td>
                    </tr>
                  )}
                  {thursday.isActive && (
                    <tr>
                      <td>Thursday</td>
                      <td>{moment(thursday.startTime).format("lll")}</td>
                      <td>{moment(thursday.endTime).format("lll")}</td>
                    </tr>
                  )}
                  {friday.isActive && (
                    <tr>
                      <td>Friday</td>
                      <td>{moment(friday.startTime).format("lll")}</td>
                      <td>{moment(friday.endTime).format("lll")}</td>
                    </tr>
                  )}
                  {saturday.isActive && (
                    <tr>
                      <td>Saturday</td>
                      <td>{moment(saturday.startTime).format("lll")}</td>
                      <td>{moment(saturday.endTime).format("lll")}</td>
                    </tr>
                  )}
                  {sunday.isActive && (
                    <tr>
                      <td>Sunday</td>
                      <td>{moment(sunday.startTime).format("lll")}</td>
                      <td>{moment(sunday.endTime).format("lll")}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
          {scheduleType == "custom" && (
            <>
              <p className="lead">
                This facility is open from{" "}
                {/* {moment(Date.parse(customTimeRange[0])).format("llll")} to{" "}
              {moment(Date.parse(customTimeRange[1])).format("llll")}.{" "} */}
              </p>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                  </tr>
                </thead>
                <tbody>
                  {customTimeRange.map((item) => (
                    <tr>
                      <td>{moment(item[0]).format("lll")}</td>
                      <td>{moment(item[1]).format("lll")}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSaveHandler}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StartEndTimeModal;
