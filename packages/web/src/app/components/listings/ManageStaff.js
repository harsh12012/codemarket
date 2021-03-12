import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Button, Table, Modal, Form, Spinner, Row, Col, Alert } from 'react-bootstrap';
import { Trash, Edit2, Search } from 'react-feather';
import * as EmailValidator from 'email-validator';
import { client } from '../../graphql/index';
import { useCRUDManageStaff } from '@parkyourself-frontend/shared/hooks/staff';
import moment from 'moment'

const list_Cognito_Users_By_Email = gql`
  query ListCognitoUsersByEmail($email: String!) {
    listCognitoUsersByEmail(email: $email) {
      Username
      Attributes {
        Name
        Value
      }
    }
  }
`;



const send_Email = gql`
  mutation SendEmail($userId: String!, $emails: [String], $subject: String!, $message: String!) {
    sendEmail(message: $message, subject: $subject, userId: $userId, emails: $emails) {
      _id
    }
  }
`;

const ManageStaff = (props) => {

  const groupName = props.id;

  const {
    getListUsersInGroup,
    getAllUsersRoles,
    handleAddStaffToGroup,
    handleDeleteStaffFromGroup,
    handleUpdateStaffInListing,
    handleSendInviteInMail

  } = useCRUDManageStaff()

  const { data, error, loading } = getListUsersInGroup(groupName);
  const {data:roleData} = getAllUsersRoles()  

  const [sendEmail] = useMutation(send_Email);
  const [users, setUsers] = useState([]);
  const [userRoles,setUserRoles] = useState([])
  const [selectedUser, setSelectedUser] = useState({
    username: '',
    name: '',
    email: '',
    role: ''
  });
  const [disabled, setDisabled] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchUser, setSearchUser] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResult, setSearchResult] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (data) {
      setUsers(data.getStaff);
    }
  }, [data]);

  useEffect(() =>{

    if(roleData && roleData.getOneFormOption){
        setUserRoles(roleData.getOneFormOption.options)
    }

  },[roleData])

  const handleDelete = async (id) => {

      setDisabled(true);
      if (window.confirm('Are you sure you want to remove this staff member')) {
        const {data ,error } = await handleDeleteStaffFromGroup(id,groupName)
       if(data){
        // setUsers(users.filter((r) => r._id !== id));

        console.log(data)
       }else{
        console.log(error)
        setDisabled(false);
       }

     
      };
    }

  const handleInvite = async () => {
    
    const {data,error} = await handleSendInviteInMail(searchEmail)
    if(data){
      setDisabled(false);
      setShowModal(false);
      alert(`Invitation send to ${searchEmail}`);
    }else{
      setDisabled(false);
      alert('Something went wrong!');
    }

  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
  
    const { data,error } = await handleUpdateStaffInListing(
      selectedUser.username,
      listingId,
      searchedUser.role
      )
    
      if(data){
        setShowModal(false);
      }else{
        alert('Something went wrong!');
      }
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true);
      const {data,error} = await handleAddStaffToGroup(
        groupName,
        selectedUser.username,
        selectedUser.role
      )
      
      
      if(data){
        console.log("d",data)

      }else{
        console.log("e",error)
      }
      
      setShowModal(false);
      return setDisabled(false);
    } catch (error) {
      setDisabled(false);
      alert('Something went wrong');
    }
  };

  const handleEdit = (user) => {
    setEdit(true);
    setSearchUser(false);
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEdit(false);
    setSearchUser(true);
    setSearched(false);
    setSearchResult(false);
    setSearchEmail('');
    setShowModal(true);
  };

  const handleChange = (e) => {
    setSelectedUser({ ...selectedUser, role: e.target.value });
  };

  const searchUserByEmail = () => {
    setSearched(false);
    setSearchResult(false);
    const staffEmails = users.map((u) => u.user.email )
    if (!EmailValidator.validate(searchEmail)) {
      return alert('Please Enter valid email');
    } else if (staffEmails.filter((e) => e === searchEmail).length > 0) {
      return alert('User with this email is already added');
    } else {
      setDisabled(true);

      client
        .query({
          query: list_Cognito_Users_By_Email,
          variables: { email: searchEmail }
        })
        .then(({ data }) => {
          setDisabled(false);

          if (data.listCognitoUsersByEmail.length) {
            let u = data.listCognitoUsersByEmail[0];
            let name =
              u.Attributes.filter((a) => a.Name === 'name').length > 0
                ? u.Attributes.filter((a) => a.Name === 'name')[0].Value
                : 'null';
            let email =
              u.Attributes.filter((a) => a.Name === 'email').length > 0
                ? u.Attributes.filter((a) => a.Name === 'email')[0].Value
                : 'null';
            setSelectedUser({
              ...selectedUser,
              name,
              email,
              username: u.Username
            });
            setSearchResult(true);
          } else {
            setSearched(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setDisabled(false);
        });
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          {searchUser ? (
            <div>
              <Row className="mt-1">
                <Col sm={10}>
                  <Form.Control
                    onChange={(e) => setSearchEmail(e.target.value)}
                    value={searchEmail}
                    type="email"
                    name="email"
                    placeholder="Search By User Email"
                    required
                  />
                </Col>
                <Col sm={2}>
                  <Search
                    size={30}
                    className="text-danger cursor-pointer"
                    style={{ pointerEvents: disabled ? 'none' : 'auto' }}
                    onClick={() => searchUserByEmail()}
                  />
                </Col>
              </Row>
              <div className="mt-3">
                {disabled ? (
                  <div className="text-center">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </div>
                ) : searchResult ? (
                  <div className="cursor-pointer" onClick={() => setSearchUser(false)}>
                    <Alert variant="primary">
                      <span>
                        <b>{selectedUser.name}</b>
                      </span>
                      <br />
                      <span>{selectedUser.email}</span>
                    </Alert>
                  </div>
                ) : searched ? (
                  <Button
                    onClick={handleInvite}
                    type="button"
                    style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
                    {disabled && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    Invite {searchEmail}
                  </Button>
                ) : null}
              </div>
              <Button
                size="sm"
                variant="danger"
                type="button"
                className="mt-3"
                style={{ pointerEvents: disabled ? 'none' : 'auto' }}
                onClick={() => setShowModal(false)}>
                Close
              </Button>
            </div>
          ) : (
            <Form onSubmit={edit ? handleSubmitEdit : handleSubmit}>
              <h3>Update Staff Role</h3>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" value={selectedUser.name} disabled />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={selectedUser.email}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Control
                  value={selectedUser.role}
                  onChange={handleChange}
                  as="select"
                  required>
                  <option value="">Select Role</option>
                  {
                      userRoles.map(role =>{
                        return <option key={role.value}  value={role.value}>{role.label}</option>
                      })
                  }

                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
                {disabled ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : edit ? (
                  'Update Staff'
                ) : (
                  'Add Staff'
                )}
              </Button>
              {'  '}
              <Button
                variant="danger"
                type="button"
                style={{ pointerEvents: disabled ? 'none' : 'auto' }}
                onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
      <div className="dg__account">
        <div className="mb-2 heading-bar">
          <h1 className="heading">Manage Staff</h1>

          <Button onClick={handleAdd}>Add Staff</Button>
        </div>
        <Table bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date</th>
              <th className="text-center">Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {

              return (
                <tr key={u["_id"]}>
                  <td>1</td>
                  <td>{u.user.name}</td>
                  <td>{u.user.email}</td>
                  <td>{u.role}</td>
                  <td>{moment(u.user.createdAt).format('DD/MM/YYYY')}</td>
                  <td className="text-center">
                    <Edit2
                      style={{
                        cursor: 'pointer',
                        pointerEvents: disabled ? 'none' : 'auto'
                      }}
                      onClick={() => handleEdit({role:u.role,username:u["_id"],email:u.user.email,name:u.user.name})}
                      className="mr-2"
                    />
                    <Trash
                      style={{
                        cursor: 'pointer',
                        pointerEvents: disabled ? 'none' : 'auto'
                      }}
                      onClick={() => handleDelete(u["_id"])}
                      className="mr-2"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default ManageStaff;
