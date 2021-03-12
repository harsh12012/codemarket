import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup, Button, Form, Card, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useMutation, gql } from '@apollo/client';
import { useAppPolicy } from '@parkyourself-frontend/shared/hooks/adminSettings';
import { showLoading, hideLoading } from 'react-redux-loading';
import { client } from '@parkyourself-frontend/shared/graphql';
import Loading from '../../src/app/components/other/Loading';
import UserLayout from '../../src/app/components/other/UserLayout';
import ReactHtmlParser from 'html-react-parser';

const EditPolicy = (props) => {
  const { loading, error: error2, data: data2 } = useAppPolicy();

  const [oneData, setOneData] = useState('');

  useEffect(() => {
    if (!error2 && data2) {
      setOneData(data2.getOnePolicy.details);
    }
  }, [data2]);

  return (
    <UserLayout authRequired={true}>
      <div className="dg__account">
        <div className="heading-bar">
          <h1 className="heading">Privacy Policy</h1>
        </div>
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

export default connect(mapStateToProps)(EditPolicy);
