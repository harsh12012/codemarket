import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import AsyncStorage from '@react-native-community/async-storage';
import { toggleUserType, toggleAdminMode } from '@parkyourself-frontend/shared/redux/actions/user';
import { useRemoveUserEndpoint } from '@parkyourself-frontend/shared/hooks/users';
import { unsetAuthUser } from '@parkyourself-frontend/shared/redux/actions/auth';
import { client } from '@parkyourself-frontend/shared/graphql';
import colors from '@parkyourself-frontend/shared/config/colors';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import ToggleButton from './ToggleButton';
import LoadingSpinner from '../common/LoadingSpinner';

function ProfileButtons({
  toggleUserType,
  isSpaceOwner,
  unsetAuthUser,
  toggleAdminMode,
  adminMode,
  admin,
  username
}) {
  const removeUserEndpoint = useRemoveUserEndpoint();
  const [disabled, setDisabled] = useState(false);

  const handleLogout = () => {
    setDisabled(true);
    Auth.signOut()
      .then(async () => {
        const endpoint = await AsyncStorage.getItem('endpoint');
        if (endpoint) {
          await removeUserEndpoint({ username, endpoint });
        }
        client.resetStore();
        unsetAuthUser();
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
        setDisabled(false);
      });
  };

  return (
    <View style={{ marginVertical: 15 }}>
      {/* {admin && (
        <ToggleButton
          value={adminMode}
          onChange={toggleAdminMode}
          label={adminMode ? 'Switch to User' : 'Switch to Admin'}
        />
        
      )} */}

      {/* {!adminMode && (
        <ToggleButton
          value={isSpaceOwner}
          onChange={toggleUserType}
          label={isSpaceOwner ? 'Switch to Driver' : 'Switch to Space Owner'}
        />
      )} */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout()}>
        {disabled ? (
          <LoadingSpinner color={colors.white} />
        ) : (
          <>
            <IoniconsIcon name="ios-log-out" style={styles.logoutIcon} />
            <Text style={styles.btnText}>LOG OUT</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    borderWidth: 1,
    borderColor: '#121212',
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    borderRadius: 5,
    width: '100%'
  },
  logoutIcon: { fontSize: 25, color: '#121212' },
  btnText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#121212',
    fontSize: 18,
    paddingLeft: 15
  }
});

const mapStateToProps = ({ user, auth }) => ({
  admin: auth.data.admin,
  isSpaceOwner: user.isSpaceOwner,
  username: auth.authenticated ? auth.data.attributes.sub : null,
  adminMode: user.adminMode
});

export default connect(mapStateToProps, { toggleUserType, unsetAuthUser, toggleAdminMode })(
  ProfileButtons
);
