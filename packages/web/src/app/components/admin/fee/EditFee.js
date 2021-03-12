import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useMutation, gql } from '@apollo/client';
import { showLoading, hideLoading } from 'react-redux-loading';
import { useAppFee } from '@parkyourself-frontend/shared/hooks/adminSettings';
import Loading from '../../other/Loading';

const UPDATE_ONE = gql`
  mutation UpdateOne($fee: Int!, $updatedBy: String!) {
    updateOneFee(fee: $fee, updatedBy: $updatedBy) {
      fee
    }
  }
`;

const EditFee = (props) => {
  const { loading, error: error2, data: data2 } = useAppFee();
  const [disabled, setDisabled] = useState(false);
  const [touched, setTouched] = useState(false);
  const [payload, setPayload] = useState({ edit: false, fee: 15 });
  const [updateOne] = useMutation(UPDATE_ONE);
  const [oneData, setOneData] = useState(0);

  useEffect(() => {
    if (!error2 && data2) {
      setOneData(data2.getOneFee.fee);
    }
  }, [data2]);

  const handleSubmit = async (fee) => {
    setDisabled(true);
    props.dispatch(showLoading());
    try {
      let { data } = await updateOne({
        variables: {
          fee: oneData === '' ? 0 : oneData,
          updatedBy: props.userId
        }
      });
      // setOneData(data.updateOneFee.fee);
      props.dispatch(hideLoading());
      setDisabled(false);
      setPayload({ ...payload, edit: false });
    } catch (error) {
      console.log(error);
      setDisabled(false);
      props.dispatch(hideLoading());
      // alert('Something went wrong please try again');
    }
  };

  const onChangeFee = (e) => {
    const { value } = e.target;
    if (!touched) setTouched(true);
    if (value <= 100) {
      setOneData(value);
    }
  };

  useEffect(() => {
    if (oneData !== 0 && touched) {
      handleSubmit();
    }
  }, [oneData]);

  return (
    <div className="admin-fee">
      <h1 className="heading">Application Fee</h1>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-content-center">
                <div>
                  Fee
                  <input
                    onChange={onChangeFee}
                    placeholder="Fee"
                    type="text"
                    value={oneData}
                    className="fee-input border-0 right-align"
                  />
                  <b>%</b>
                </div>
                {disabled && (
                  <div>
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    userId: auth.authenticated ? auth.data.attributes.sub : null
  };
};

export default connect(mapStateToProps)(EditFee);
