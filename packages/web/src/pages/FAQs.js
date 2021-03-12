import { gql, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Card, Button } from 'react-bootstrap';
import { IoIosArrowForward } from 'react-icons/io';
import { connect } from 'react-redux';
import Link from 'next/link';
import { toast } from 'react-toastify';
import AddFaqModal from '../app/components/AddFaqModal';
import { client } from '../app/graphql';

const CREATE_FAQ = gql`
  mutation CreateFaq($roles: [String!]!, $topic: String!, $question: String!, $answer: String!) {
    createFaq(roles: $roles, topic: $topic, question: $question, answer: $answer) {
      _id
      roles
      topic
      question
      answer
      createdAt
    }
  }
`;

const GET_FAQS_BY_ROLE = gql`
  query GetFaqsByRole($role: String!) {
    getFaqsByRole(role: $role) {
      _id
      roles
      topic
      question
      answer
      createdAt
    }
  }
`;

const FAQs = ({ authRole, groups, admin = false }) => {
  const [createFaq] = useMutation(CREATE_FAQ);

  const [driverTopics, setDriverTopics] = useState([]);
  const [spaceOwnerTopics, setSpaceOwnerTopics] = useState([]);
  const [adminTopics, setAdminTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const [role, setRole] = useState('Driver');

  const [faqModal, setFaqModal] = useState(false);

  const addFaqHandler = async (data) => {
    try {
      console.log('add fAQ hndler ', data);
      const response = await createFaq({ variables: data });
      console.log(response.data.createFaq);
      if (data.roles.includes('Driver')) {
        let dTops = driverTopics.filter((item) => item[0].topic === data.topic);
        console.log('dTops', dTops);
        if (dTops.length == 0) {
          setDriverTopics([...driverTopics, [response.data.createFaq]]);
        }
        //    getFaqsData("Driver");
      }
      if (data.roles.includes('Space Owner')) {
        let sTops = spaceOwnerTopics.filter((item) => item[0].topic === data.topic);
        console.log('sTops', sTops);
        if (sTops.length == 0) {
          setSpaceOwnerTopics([...spaceOwnerTopics, [response.data.createFaq]]);
        }
        // getFaqsData("Space Owner");
      }
      if (data.roles.includes('Admin')) {
        let aTops = adminTopics.filter((item) => item[0].topic === data.topic);
        console.log('aTops', aTops);
        if (aTops.length == 0) {
          setAdminTopics([...adminTopics, [response.data.createFaq]]);
        }
        // getFaqsData("Admin");
      }

      alert('FAQ Added Successfully');
    } catch (error) {
      alert('Something went wrong');
    }
  };

  const getFaqsData = (faqRole) => {
    if (
      (faqRole == 'Driver' && driverTopics.length > 0) ||
      (faqRole == 'Space Owner' && spaceOwnerTopics.length > 0) ||
      (faqRole == 'Admin' && adminTopics.length > 0)
    ) {
      return;
    }
    setLoading(true);
    client
      .query({ query: GET_FAQS_BY_ROLE, variables: { role: faqRole } })
      .then(({ data }) => {
        if (data.getFaqsByRole) {
          console.log(data.getFaqsByRole);
          let result = data.getFaqsByRole.reduce(function (r, a) {
            r[a.topic] = r[a.topic] || [];
            r[a.topic].push(a);
            return r;
          }, Object.create(null));

          console.log(result);
          let array = Object.values(result);
          console.log(array);
          if (faqRole === 'Driver') {
            setDriverTopics(array);
          } else if (faqRole === 'Space Owner') {
            setSpaceOwnerTopics(array);
          } else {
            setAdminTopics(array);
          }
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getFaqsData('Driver');
  }, []);

  useEffect(() => {
    console.log('getting data for : ', role);
    getFaqsData(role);
  }, [role]);

  return (
    <div className="dg__account">
      <div className="heading-bar">
        <h1 className="heading">Frequently Asked Questions</h1>
        {admin && (
          <div>
            <Button
              variant="primary"
              onClick={() => {
                setFaqModal(true);
              }}>
              Add FAQ
            </Button>
            <AddFaqModal
              show={faqModal}
              handleClose={() => {
                setFaqModal(false);
              }}
              handleSave={addFaqHandler}
            />
          </div>
        )}
      </div>
      <Tabs
        activeKey={role}
        onSelect={(value) => {
          setRole(value);
        }}>
        <Tab eventKey="Driver" title="Driver">
          <br />
          <div className="faq-tab-content">
            <h4>Sub Topics</h4>
            <br />
            {loading ? (
              <div className="loading">Loading...</div>
            ) : driverTopics.length > 0 ? (
              <div>
                {driverTopics.map((item) => (
                  <Link href={`faq/${item[0].topic}`}>
                    <Card>
                      <Card.Body>
                        {item[0].topic}
                        <IoIosArrowForward />
                      </Card.Body>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="loading">No Sub Topics Found for Driver Role</div>
            )}
          </div>
        </Tab>
        <Tab eventKey="Space Owner" title="Space Owner">
          <br />
          <div className="faq-tab-content">
            <h4>Sub Topics</h4>
            <br />
            {loading ? (
              <div className="loading">Loading...</div>
            ) : spaceOwnerTopics.length > 0 ? (
              <div>
                {spaceOwnerTopics.map((item) => (
                  <Link href={`faq/${item[0].topic}`}>
                    <Card>
                      <Card.Body>
                        {item[0].topic}
                        <IoIosArrowForward />
                      </Card.Body>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="loading">No Sub Topics Found for Space Owner Role</div>
            )}
          </div>
        </Tab>
        {groups && groups.includes('superadmin') && (
          <Tab eventKey="Admin" title="Admin">
            <br />
            <div className="faq-tab-content">
              <h4>Sub Topics</h4>
              <br />
              {loading ? (
                <div className="loading">Loading...</div>
              ) : adminTopics.length > 0 ? (
                <div>
                  {adminTopics.map((item) => (
                    <Link href={`faq/${item[0].topic}`}>
                      <Card>
                        <Card.Body>
                          {item[0].topic}
                          <IoIosArrowForward />
                        </Card.Body>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="loading">No Sub Topics Found for Admin Role</div>
              )}
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    authRole: auth.authenticated ? auth.data.attributes.role : null,
    groups: auth.authenticated
      ? auth.data.signInUserSession.accessToken.payload['cognito:groups']
      : []
  };
};

export default connect(mapStateToProps)(FAQs);
