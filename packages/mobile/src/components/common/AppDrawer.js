import React from 'react';
import {
  StyleSheet,
  Platform,
  Alert,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { Auth } from 'aws-amplify';
import { unsetAuthUser } from '@parkyourself-frontend/shared/redux/actions/auth';
import { client } from '@parkyourself-frontend/shared/graphql';
import { useRemoveUserEndpoint } from '@parkyourself-frontend/shared/hooks/users';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { toggleUserType, toggleAdminMode } from '@parkyourself-frontend/shared/redux/actions/user';
import colors from '@parkyourself-frontend/shared/config/colors';
import ToggleButton from './ToggleButton';
import MenuItem from './MenuItem';

const AppDrawer = ({username, unsetAuthUser }) => {
  const removeUserEndpoint = useRemoveUserEndpoint();

  const handleLogout = () => {
    Auth.signOut()
      .then(async () => {
        const endpoint = await AsyncStorage.getItem('endpoint');
        if (endpoint) {
          console.log("endpoint:",endpoint,"username:",username);
          await removeUserEndpoint({ username, endpoint });
        }
        client.resetStore();
        unsetAuthUser();
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
        console.log(error.message);
      });
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <Image
          source={require('../../assets/images/headerlogo.jpg')}
          resizeMode="contain"
          style={styles.image}
        />
        {!isSpaceOwner && !adminMode && (
          <>
            <MenuItem label="Book a Parking">
              <MaterialCommunityIconsIcon name="calendar-clock" style={styles.materialCIcon} />
            </MenuItem>
            <MenuItem label="My Bookings">
              <FontAwesomeIcon name="car" style={styles.fontAIcon} />
            </MenuItem>
            <MenuItem label="Book a Parking">
              <MaterialCommunityIconsIcon name="calendar-clock" style={styles.materialCIcon} />
            </MenuItem>
            <MenuItem label="On-Going Parkings">
              <FontAwesomeIcon name="credit-card" style={styles.fontAIcon} />
            </MenuItem>
            <MenuItem label="Messages">
              <FeatherIcon name="mail" style={styles.featherIcon} />
            </MenuItem>
            <MenuItem label="Rent your Space">
              <MaterialCommunityIconsIcon name="cash" style={styles.materialCIcon} />
            </MenuItem>
            <MenuItem label="Send a Gift">
              <MaterialCommunityIconsIcon name="gift" style={styles.featherIcon} />
            </MenuItem>
            <MenuItem label="Refer a Friend">
              <EntypoIcon name="add-user" style={styles.featherIcon} />
            </MenuItem>
            <MenuItem label="FAQ&#39;s">
              <FontAwesomeIcon name="question-circle-o" style={styles.fontAIcon} />
            </MenuItem>
          </>
        )}
        {admin && (
          <ToggleButton
            value={adminMode}
            onChange={toggleAdminMode}
            label={adminMode ? 'Switch to User' : 'Switch to Admin'}
          />
        )}
        {!adminMode && (
          <ToggleButton
            value={isSpaceOwner}
            onChange={toggleUserType}
            label={isSpaceOwner ? 'Switch to Driver' : 'Switch to Space Owner'}
          />
        )}
        <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout()}>
          <IoniconsIcon name="ios-log-out" style={styles.logoutIcon} />
          <Text style={{ color: colors.white, marginLeft: 5 }}>LOG OUT</Text>
        </TouchableOpacity>

        <View style={styles.userRow}>
          <EntypoIcon name="user" style={styles.materialCIcon} />
          <Text style={styles.userText}>{userName}</Text>
        </View> */}
        <View style={styles.appBarLogoWrapper}>
          <Image
            source={require('../../assets/images/headerlogo.jpg')}
            resizeMode="contain"
            style={styles.appBarLogo}
          />
        </View>
        <View style={styles.appBarMenuListWrapper}>
          <TouchableOpacity 
            style={styles.appBarMenuWrapper}
            onPress={() => navigation.navigate("UserProfileStack")}
          >
            <View style={styles.appBarMenuWrapperInner}>
              <MaterialIcons name="person" style={styles.appBarMenuIcon} />
              <Text style={styles.appBarMenuText}>Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.appBarMenuWrapper}
            onPress={() => {}}
          >
            <View style={styles.appBarMenuWrapperInner}>
              <MaterialIcons name="settings" style={styles.appBarMenuIcon} />
              <Text style={styles.appBarMenuText}>Settings</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.appBarMenuWrapper}
            onPress={() => handleLogout()}
          >
            <View style={styles.appBarMenuWrapperInner}>
              <MaterialIcons name="logout" style={styles.appBarMenuIcon} />
              <Text style={styles.appBarMenuText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: 15
  },
  appBarLogoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    paddingLeft: 0
  },
  appBarLogo: {
    maxWidth: '60%',
  },
  appBarMenuListWrapper: {
    paddingHorizontal: 5,
    paddingTop: 10
  },
  appBarMenuWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  appBarMenuWrapperInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  appBarMenuIcon: {
    fontSize: 20,
    maxHeight: 22,
    maxWidth: 22,
    color: colors.grey
  },
  appBarMenuText: {
    fontFamily: 'Helvetica',
    fontSize: 17,
    color: colors.black2,
    paddingLeft: 20
  },
  menuArrowIcon: {
    color: '#B2B2B2',
    fontSize: 14
  },
  materialCIcon: {
    fontSize: 25,
    color: colors.secondary
  },
  fontAIcon: {
    fontSize: 20,
    color: colors.secondary
  },
  featherIcon: {
    fontSize: 23,
    color: colors.secondary
  },
  logoutButton: {
    backgroundColor: 'rgba(39,170,225,1)',
    shadowColor: 'rgba(180,179,179,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 20,
    shadowOpacity: 1,
    shadowRadius: 10,
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%'
  },
  logoutIcon: { fontSize: 30, color: colors.white },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 10
  },
  userText: { fontWeight: 'bold', fontSize: 20, marginLeft: 5 }
});

// const mapStateToProps = ({ user, auth }) => ({
//   admin: auth.data.admin,
//   isSpaceOwner: user.isSpaceOwner,
//   userName: auth.authenticated ? auth.data.attributes.name : null,
//   adminMode: user.adminMode
// });

const mapStateToProps = ({ auth }) => ({
  username: auth.authenticated ? auth.data.attributes.sub : null
});

export default connect(mapStateToProps, { unsetAuthUser })(AppDrawer);
