import { gql, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Card, Button, Accordion } from 'react-bootstrap';
import { client } from '../app/graphql';
import { FaPlusCircle } from 'react-icons/fa';
import { MdEdit, MdDelete } from 'react-icons/md';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import AddFaqModal from '../app/components/AddFaqModal';
import { IoIosArrowDown } from 'react-icons/io';

const GET_FAQS_BY_TOPIC = gql`
  query GetFaqsByTopic($topic: String!) {
    getFaqsByTopic(topic: $topic) {
      _id
      roles
      topic
      question
      answer
      createdAt
    }
  }
`;

const UPDATE_FAQ = gql`
  mutation UpdateFaq(
    $id: ID!
    $roles: [String]
    $topic: String
    $question: String
    $answer: String
  ) {
    updateFaq(id: $id, roles: $roles, topic: $topic, question: $question, answer: $answer) {
      _id
      roles
      topic
      question
      answer
      createdAt
    }
  }
`;

const DELETE_FAQ = gql`
  mutation DeleteFaq($id: ID!) {
    deleteFaq(id: $id)
  }
`;

const SubTopicFaqs = ({ topic, authRole,auth }) => {
  const [updateFaq] = useMutation(UPDATE_FAQ);
  const [deleteFaq] = useMutation(DELETE_FAQ);

  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState([]);
  const [faqModal, setFaqModal] = useState(false);

  const [editFaq, setEditFaq] = useState(null);

  const editButtonHandler = (faq) => {
    setEditFaq(faq);
    setFaqModal(true);
  };

  const updateFaqHandler = async (data) => {
    try {
      console.log(data);
      const response = await updateFaq({ variables: data });
      console.log(response.data.updateFaq);
      setFaqs(faqs.map((item) => (item._id === data.id ? { ...data, _id: item._id } : item)));
      toast.success('FAQ Updated Successfully');
    } catch (error) {
      toast.warn('Something went wrong');
      console.log(error);
    }
  };

  const deleteFaqHandler = async (id) => {
    try {
      const response = await deleteFaq({ variables: { id: id } });
      setFaqs(faqs.filter((item) => item._id !== id));
      toast.success('FAQ Deleted Successfully');
    } catch (error) {
      toast.warn('Something went wrong');
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    client
      .query({ query: GET_FAQS_BY_TOPIC, variables: { topic: topic } })
      .then(({ data }) => {
        if (data.getFaqsByTopic) {
          setFaqs(data.getFaqsByTopic);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  console.log(auth)

  return (
    <div className="dg__account">
      <h1 className="heading">Frequently Asked Questions</h1>
      <p className="lead">Topic : {topic}</p>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : faqs.length > 0 ? (
        <Accordion>
          {' '}
          {faqs.map((item) => (
            <Card className="faq-item" key={`${item["_id"]}`}>
              <Card.Header>
                {item.question}
                <div className="faq-ctrl-btns">
                  {authRole === 'admin' && (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => {
                          editButtonHandler(item);
                        }}
                        style={{marginRight:10}}
                        >
                        <MdEdit />
                      </Button>
                      {editFaq && (
                        <AddFaqModal
                          show={faqModal}
                          edit={true}
                          prevData={editFaq}
                          handleClose={() => {
                            setFaqModal(false);
                          }}
                          handleSave={() => {}}
                          handleUpdate={updateFaqHandler}
                        />
                      )}
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteFaqHandler(item._id);
                        }}>
                        <MdDelete />
                      </Button>
                    </>
                  )}
                  <Accordion.Toggle as={Button} variant="link" eventKey={item._id}>
                    {/* <FaPlusCircle/> */}
                    <IoIosArrowDown />
                  </Accordion.Toggle>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey={item._id}>
                <Card.Body>{item.answer}</Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      ) : (
        <div className="loading">No FAQs Found!</div>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    authRole: auth.data.admin ? 'admin' : null,
    auth:auth
  };
};

export default connect(mapStateToProps)(SubTopicFaqs);
