import React, { useState } from 'react';
import { Button, ProgressBar, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useAddOneListing } from '@parkyourself-frontend/shared/hooks/listings';
import { deleteTempListing } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import {
  addListingLocal,
  updateListingLocal
} from '@parkyourself-frontend/shared/redux/actions/user';
// import { useRouter } from 'next/router';

const AddListingHeader = ({ onBackButtonPress, onNextButtonPress, activeIndex }) => {
  // const router = useRouter();
  const { handleSubmit } = useAddOneListing();
  const [disabled, setDisabled] = useState(false);

  const onSubmitHandler = async () => {
    try {
      setDisabled(true);
      await handleSubmit();
      toast.success('Listing Saved Successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined
      });
      setDisabled(false);
      // router.push('/listings/my');
    } catch (error) {
      console.log('onSubmitHandler error', error);
      setDisabled(false);
      alert('Something Went wrong!', error.message);
    }
  };

  return (
    <div className="add-listing-header">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <div className="progress-bar-row">
        <ProgressBar now={activeIndex * 7.14} />
      </div>
      <div className="btn-row">
        <h4>{activeIndex}/14</h4>
        <div>
          <Button
            className="mr-2"
            variant="primary"
            onClick={onBackButtonPress}
            style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
            Back
          </Button>
          {activeIndex < 14 && (
            <Button
              className="mr-2"
              variant="success"
              onClick={onNextButtonPress}
              style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
              Next
            </Button>
          )}
          <Button
            variant="dark"
            onClick={onSubmitHandler}
            style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
            {disabled ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              'Save'
              // 'Save & Exit'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ tempListing, auth }) => ({
  tempListing,
  userData: auth.authenticated ? auth.data.attributes : null
});
export default connect(mapStateToProps, {
  deleteTempListing,
  addListingLocal,
  updateListingLocal
})(AddListingHeader);
