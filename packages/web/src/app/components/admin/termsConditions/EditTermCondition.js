import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup, Button, Form, Card, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useMutation, gql } from '@apollo/client';
import { showLoading, hideLoading } from 'react-redux-loading';
import { client } from '@parkyourself-frontend/shared/graphql';
import Loading from '../../other/Loading';
import { useAppTermCondition } from '@parkyourself-frontend/shared/hooks/adminSettings';
import Editor from '../../../components/CkEditor';
const UPDATE_ONE = gql`
  mutation UpdateOne($terms: String!, $updatedBy: String!) {
    updateOneTermCondition(terms: $terms, updatedBy: $updatedBy) {
      terms
    }
  }
`;

const EditTermCondition = (props) => {
  const { loading, error: error2, data: data2 } = useAppTermCondition();
  const [disabled, setDisabled] = useState(false);
  const [touched, setTouched] = useState(false);
  const [flag, setFlag] = useState(true);
  const [updateOne] = useMutation(UPDATE_ONE);
  const [oneData, setOneData] = useState('');

  useEffect(() => {
    if (!error2 && data2) {
      setOneData(data2.getOneTermCondition.terms);
    }
  }, [data2]);

  const handleSubmit = async (details) => {
    setDisabled(true);
    props.dispatch(showLoading());
    try {
      let { terms } = await updateOne({
        variables: {
          terms: oneData === '' ? '' : oneData,
          updatedBy: props.userId
        }
      });

      props.dispatch(hideLoading());
      setDisabled(false);
      setFlag(!flag);
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
      <h1 className="heading">Terms & Conditions</h1>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-content-center">
                <div className="form-group">
                  <Editor disabled={flag} data={oneData} setData={handleChange} />
                  {flag ? (
                    <Button
                      className="mt-3 px-4"
                      type="button"
                      variant="primary"
                      onClick={() => setFlag(!flag)}>
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

export default connect(mapStateToProps)(EditTermCondition);
