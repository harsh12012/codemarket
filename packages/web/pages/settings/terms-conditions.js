import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup, Button, Form, Card, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useMutation, gql } from '@apollo/client';
import { showLoading, hideLoading } from 'react-redux-loading';
import { client } from '@parkyourself-frontend/shared/graphql';
import { useAppTermCondition } from '@parkyourself-frontend/shared/hooks/adminSettings';
import Loading from '../../src/app/components/other/Loading';
import UserLayout from '../../src/app/components/other/UserLayout';
import ReactHtmlParser from 'html-react-parser';

const EditTermCondition = (props) => {
  const { loading, error: error2, data: data2 } = useAppTermCondition();
  const [oneData, setOneData] = useState('');

  useEffect(() => {
    if (!error2 && data2) {
      setOneData(data2.getOneTermCondition.terms);
    }
  }, [data2]);
  return (
    <UserLayout authRequired={true}>
      <div className="admin-fee">
        <h1 className="heading">Terms & Conditions</h1>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-content-center">
                  <div className="ck-content">{ReactHtmlParser(oneData)}</div>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    userId: auth.authenticated ? auth.data.attributes.sub : null
  };
};

export default connect(mapStateToProps)(EditTermCondition);
