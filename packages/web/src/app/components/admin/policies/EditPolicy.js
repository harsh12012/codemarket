import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup, Button, Form, Card, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useMutation, gql } from '@apollo/client';
import { useAppPolicy } from '@parkyourself-frontend/shared/hooks/adminSettings';
import { showLoading, hideLoading } from 'react-redux-loading';
import { client } from '@parkyourself-frontend/shared/graphql';
import Editor from '../../../components/CkEditor';

import Loading from '../../other/Loading';

const UPDATE_ONE = gql`
  mutation UpdateOne($details: String!, $updatedBy: String!) {
    updateOnePolicy(details: $details, updatedBy: $updatedBy) {
      details
    }
  }
`;

const EditPolicy = (props) => {
  const { loading, error: error2, data: data2 } = useAppPolicy();
  const [disabled, setDisabled] = useState(false);
  const [touched, setTouched] = useState(false);
  const [policy, setPolicy] = useState({
    flag: true
  });
  const [updateOne] = useMutation(UPDATE_ONE);
  const [oneData, setOneData] = useState('');

  useEffect(() => {
    if (!error2 && data2) {
      setOneData(data2.getOnePolicy.details);
    }
  }, [data2]);

  const handleSubmit = async (details) => {
    setDisabled(true);
    props.dispatch(showLoading());
    try {
      let { details } = await updateOne({
        variables: {
          details: oneData === '' ? '' : oneData,
          updatedBy: props.userId
        }
      });

      props.dispatch(hideLoading());
      setDisabled(false);
      setPolicy({ ...policy, flag: true });
      setOneData(details.updateOnePolicy.details);
    } catch (error) {
      setDisabled(false);
      props.dispatch(hideLoading());
    }
  };

  const handleSave = (e) => {
    if (oneData !== '' && touched) {
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    if (!touched) setTouched(true);
    if (e) {
      setOneData(e);
    }
  };

  return (
    <div className="admin-fee">
      <h1 className="heading">Privacy Policy</h1>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-content-center">
                <div className="form-group">
                  <Editor disabled={policy.flag} data={oneData} setData={handleChange} />
                  {policy.flag ? (
                    <Button
                      className="mt-3 px-4"
                      type="button"
                      variant="primary"
                      onClick={() => setPolicy({ ...policy.flag, flag: false })}>
                      Edit
                    </Button>
                  ) : (
                    <Button
                      className="mt-3 px-4"
                      type="button"
                      variant="primary"
                      onClick={handleSave}>
                      Save
                    </Button>
                  )}
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

export default connect(mapStateToProps)(EditPolicy);
