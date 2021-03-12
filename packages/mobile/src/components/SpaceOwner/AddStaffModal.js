import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import colors from '@parkyourself-frontend/shared/config/colors';
import { Picker } from '@react-native-community/picker';
import { useCRUDManageStaff } from '@parkyourself-frontend/shared/hooks/staff';
import * as EmailValidator from 'email-validator';

import LoadingSpinner from '../common/LoadingSpinner';
import MaterialButtonPrimary from '../../components/MaterialButtonPrimary';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ScreenTittle from '../common/ScreenTittle';



export default function AddStaffModal({
  visible = false,
  onHide,
  payload,
  users,
  listingId,
  handleEditedSuccess,
  userRoles
}) {
  const [searchText, setSearchText] = useState('');
  const [searched, setSearched] = useState(false);

  const [noResultsFound, setNoResultsFound] = useState(false);
  const [resultsFound, setResultsFound] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [inviteSend, setInviteSend] = useState(false);
  const {
    listCognitoUsersByEmail,
    handleAddStaffToGroup,
    handleUpdateStaffInListing,
    handleSendInviteInMail,
    getAllUsersRoles
  } = useCRUDManageStaff();
  const [loadEmailAndSearch, { called, loading, data }] = listCognitoUsersByEmail(searchText);

  const [searchedUser, setSearchedUser] = useState({
    username: '',
    name: '',
    email: '',
    role: 'default'
  });

  const [errVal, setErrVal] = useState({
    role: false
  });

  const handleSearchEmail = () => {
    setSearched(true);
    const staffEmails = users.map((staff) => {
      return staff.user.email;
    });


    if (!EmailValidator.validate(searchText)) {
      setSearched(false);
      return alert('Please Enter a valid Email');
    } else if (staffEmails.filter((e) => e === searchText).length > 0) {
      setSearched(false);
      return alert('User with this email is already added');
    } else {
      console.log('load');
      loadEmailAndSearch();
    }
  };

  useEffect(() => {
    if (data && data.listCognitoUsersByEmail && searchedUser.email === '') {

      if ((data.listCognitoUsersByEmail.length === 0) & searched) {
        setNoResultsFound(true);
        setSearched(false);
      } else if (
        data.listCognitoUsersByEmail[0] !== undefined &&
        data.listCognitoUsersByEmail.length !== 0
      ) {
        let u = data.listCognitoUsersByEmail[0];
        let name =
          u.Attributes.filter((a) => a.Name === 'name').length > 0
            ? u.Attributes.filter((a) => a.Name === 'name')[0].Value
            : 'null';
        let email =
          u.Attributes.filter((a) => a.Name === 'email').length > 0
            ? u.Attributes.filter((a) => a.Name === 'email')[0].Value
            : 'null';
        setSearchedUser({
          ...searchedUser,
          name,
          email,
          username: u.Username
        });
        setResultsFound(true);
        setSearched(false);
      } else {
      }
    }
  }, [data]);

  const handleResetAllValues = () => {
    setShowAddForm(false);
    setSearchText('');
    setSearched(false);
    setNoResultsFound(false);
    setResultsFound(false);
    setInviteSend(false);
    setSearchedUser({
      username: '',
      name: '',
      email: '',
      role: 'default'
    });
  };


  const onSaveHandler = async () => {
    if (searchedUser.role !== 'default') {
      const { data, error } = await handleAddStaffToGroup(
        listingId,
        searchedUser.username,
        searchedUser.role
      );

      if (data) {
        console.log('success', data);
        onHide();
        handleResetAllValues();
      } else {
        console.log('error', error);
      }
    } else {
      setErrVal({
        role: true
      });
    }
  };

  const onUpdateHandler = async () => {
    if (searchedUser.role !== 'default') {
      const { data, error } = await handleUpdateStaffInListing(
        payload.data['_id'],
        listingId,
        searchedUser.role
      );

      if (data) {
        console.log('success', data);
        handleEditedSuccess(payload.data['_id'], searchedUser.role);
        onHide();
        handleResetAllValues();
      } else {
        console.log('error', error);
      }
    } else {
      setErrVal({
        role: true
      });
    }
  };

  const inviteEmailHander = async () => {
    try {
      const { data, error } = await handleSendInviteInMail(searchText);
      if (data) {
        console.log(data);
        setInviteSend(true);
      } else {
        console.log(error);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (payload.data) {
      setSearchedUser({
        ...searchedUser,
        username: payload['_id'],
        role: payload.data.role,
        email: payload.data.user.email,
        name: payload.data.user.name
      });
      setShowAddForm(true);
    }
  }, [payload.data]);


  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <ScreenTittle title={`${payload.edit ? 'Update' : 'Add'} Staff`} />
            <TouchableOpacity
              onPress={() => {
                handleResetAllValues();
                onHide();
              }}
              style={styles.closeButton}>
              <AntDesignIcon name="close" size={28} color={colors.secondary} />
            </TouchableOpacity>
          </View>
          {!payload.data && (
            <View style={styles.searchHeader}>
              <TextInput
                value={searchText}
                placeholderTextColor="grey"
                style={styles.searchInput}
                placeholder="Search by user email"
                onChangeText={(txt) => setSearchText(txt)}
              />
              <MaterialButtonPrimary
                caption={<FeatherIcon name="search" style={{ fontSize: 20 }} />}
                style={styles.searchBtn}
                onPress={handleSearchEmail}
              />
            </View>
          )}
          <View style={styles.searchResults}>
            {searched ? (
              <View style={{ marginTop: 30 }}>
                <LoadingSpinner />
              </View>
            ) : (
              (noResultsFound && !resultsFound && !showAddForm && (
                <View style={{ marginTop: 5 }}>
                  <MaterialButtonPrimary
                    caption={`Send invite to  ${searchText}`}
                    style={styles.inviteBtn}
                    onPress={inviteEmailHander}
                  />
                  {inviteSend && (
                    <View style={{ marginTop: 15 }}>
                      <Text>Invitation has been sent successfully</Text>
                    </View>
                  )}
                </View>
              )) ||
              (resultsFound && !showAddForm && !noResultsFound && (
                <TouchableOpacity style={styles.searchedUser} onPress={() => setShowAddForm(true)}>
                  <View>
                    <Text style={styles.name}>{searchedUser.name}</Text>
                    <Text style={styles.email}>{searchedUser.email}</Text>
                  </View>
                </TouchableOpacity>
              )) ||
              (showAddForm && (
                <View>
                  <View style={styles.inputView}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput value={searchedUser.name} style={styles.disabled} editable={false} />
                  </View>

                  <View style={styles.inputView}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      value={searchedUser.email}
                      style={styles.disabled}
                      editable={false}
                    />
                  </View>

                  <View style={styles.inputView}>
                    <Text style={styles.label}>Role</Text>
                    <View style={errVal.role ? styles.requiredInput : styles.selectInput}>
                      <Picker
                        selectedValue={searchedUser.role}
                        onValueChange={(itemValue) => {
                          setErrVal({
                            role: false
                          });
                          setSearchedUser({
                            ...searchedUser,
                            role: itemValue
                          });
                        }}>
                        <Picker.Item label="Select Role" value="default" />
                        {userRoles.map((role) => {
                          return (
                            <Picker.Item label={role.label} value={role.value} key={role.label} />
                          );
                        })}
                      </Picker>
                    </View>
                  </View>

                  {payload.data ? (
                    <View style={styles.actionView}>
                      <MaterialButtonPrimary
                        style={styles.cancelBtn}
                        caption="Cancel"
                        onPress={() => {
                          handleResetAllValues();
                          onHide();
                        }}
                      />
                      <MaterialButtonPrimary
                        caption="Update"
                        style={styles.materialButtonPrimary}
                        onPress={onUpdateHandler}
                      />
                    </View>
                  ) : (
                    <View style={styles.actionView}>
                      <MaterialButtonPrimary
                        style={styles.cancelBtn}
                        caption="Cancel"
                        onPress={() => {
                          handleResetAllValues();
                          onHide();
                        }}
                      />
                      <MaterialButtonPrimary
                        caption="Add"
                        style={styles.materialButtonPrimary}
                        onPress={onSaveHandler}
                      />
                    </View>
                  )}
                </View>
              ))
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchInput: {
    borderColor: '#cecece',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 17,
    flexGrow: 1,
    marginRight: 10,
    paddingLeft: 10
  },
  selectInput: {
    borderColor: '#cecece',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 17,
    paddingLeft: 5
  },
  requiredInput: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 17,
    paddingLeft: 5
  },
  searchHeader: {
    marginTop: 15,
    flexDirection: 'row'
  },
  searchBtn: {
    backgroundColor: '#dc3545',
    width: 50,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10
    },
    elevation: 20,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    paddingVertical: 12,
    borderRadius: 5
  },
  searchResults: {
    flex: 1,
    marginTop: 20
  },
  noResultText: {
    fontSize: 20,
    color: colors.secondary
  },
  searchedUser: {
    backgroundColor: '#cce5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  name: {
    fontSize: 20,
    color: colors.secondary,
    fontWeight: 'bold'
  },
  email: {
    fontSize: 18,
    color: colors.secondary
  },
  label: {
    fontSize: 18,
    color: colors.secondary,
    marginBottom: 10
  },
  disabled: {
    borderColor: '#cecece',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    fontSize: 17,
    paddingLeft: 10,
    color: 'black'
  },
  inputView: {
    marginBottom: 15
  },
  actionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  materialButtonPrimary: {
    width: 100,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10
    },
    elevation: 20,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 10,
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 30
  },
  inviteBtn: {
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10
    },
    elevation: 20,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 10,
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 30
  },
  cancelBtn: {
    color: 'black',
    width: 100,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10
    },
    elevation: 20,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 10,
    backgroundColor: '#6c757D',
    paddingVertical: 12,
    borderRadius: 30,
    marginRight: 10
  }
});

{
  /* <View style={styles.header}>
              
              <ScreenTittle title={`${payload ? 'Update' : 'Add'} Staff`} />
            </View> */
}
