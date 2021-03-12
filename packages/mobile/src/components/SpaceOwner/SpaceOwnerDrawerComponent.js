import React from 'react';
import {
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Platform,
} from 'react-native';
import {Auth} from 'aws-amplify';
import PropTypes from 'prop-types';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {toggleUserType} from '../../app/redux/actions/user';
import {unsetAuthUser} from '../../app/redux/actions/auth';

const SpaceOwnerDashboardComponent = ({
  isSpaceOwner,
  toggleUserType,
  unsetAuthUser,
}) => {
  const handleLogout = () => {
    Auth.signOut().then(() => {
      unsetAuthUser();
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/images/headerlogo.jpg')}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.rect13}>
        <Switch
          value={isSpaceOwner}
          trackColor={{true: 'rgba(74,144,226,1)', false: 'rgba(0,0,0,1)'}}
          style={styles.switch}
          onValueChange={toggleUserType}
        />
        <Text style={styles.switchToDriver}>Switch to DRIVER</Text>
      </View>
      <TouchableOpacity style={styles.rect12} onPress={() => handleLogout()}>
        <View style={styles.icon21Row}>
          <IoniconsIcon name="ios-log-out" style={styles.icon21} />
          <Text style={styles.logOut1}>LOG OUT</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 30 : 20,
  },
  image: {
    width: '100%',
    height: 89,
  },
  rect12: {
    width: '100%',
    // height: 40,
    backgroundColor: 'rgba(39,170,225,1)',
    flexDirection: 'row',
    marginTop: 15,
    // marginBottom: 50,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 20,
  },
  icon21: {
    color: 'rgba(254,253,253,1)',
    fontSize: 24,
    height: 27,
    width: 19,
  },
  logOut1: {
    // fontFamily: 'roboto-500',
    color: 'rgba(255,255,255,1)',
    marginLeft: 8,
    marginTop: 6,
  },
  icon21Row: {
    // height: 27,
    flexDirection: 'row',
    flex: 1,
    // marginRight: 36,
    // marginLeft: 30,
    // marginTop: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rect13: {
    width: '100%',
    // height: 43,
    backgroundColor: 'rgba(20,222,113,1)',
    shadowColor: 'rgba(180,177,177,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 20,
    shadowOpacity: 1,
    shadowRadius: 10,
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  switch: {
    // marginLeft: 32,
    // marginTop: 12,
  },
  switchToDriver: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 15,
    marginLeft: 17,
    // marginTop: 15,
  },
});

SpaceOwnerDashboardComponent.propTypes = {
  toggleUserType: PropTypes.func.isRequired,
  unsetAuthUser: PropTypes.func.isRequired,
  isSpaceOwner: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isSpaceOwner: state.user.isSpaceOwner,
});

export default connect(mapStateToProps, {toggleUserType, unsetAuthUser})(
  SpaceOwnerDashboardComponent,
);
