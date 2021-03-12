import React from "react";
import { Button, ProgressBar } from "react-bootstrap";

const AddListingHeader = ({ progress, saveAndExitHandler, activeIndex }) => {
  return (
    <div className="add-listing-header">
      <div className="progress-bar-row">
        <ProgressBar now={progress} />
      </div>
      <div className="btn-row">
        <h4>{activeIndex}/18</h4>

        <Button variant="dark" onClick={saveAndExitHandler}>
          Save & Exit
        </Button>
      </div>
    </div>
  );
};

export default AddListingHeader;
