import React from "react";
import TimePicker from "react-time-picker/dist/TimePicker";

const StartEndTimePicker = ({
  start,
  end,
  validated,
  onStartChange,
  onEndChange,
  className = "",
}) => {
  console.log("start : ", start);
  console.log("end : ", end);
  return (
    <>
      <div className={`timepicker-row ${className}`}>
        <div className="timepicker">
          <p className="description">Start Time</p>
          <TimePicker value={start} onChange={onStartChange} />
        </div>
        <div className="timepicker">
          <p className="description">End Time</p>

          <TimePicker value={end} onChange={onEndChange} />
        </div>
      </div>
      {validated && !start && !end && (
        <p className="invalid-feedback-text">
          Please select a start & end Time
        </p>
      )}
    </>
  );
};

export default StartEndTimePicker;
