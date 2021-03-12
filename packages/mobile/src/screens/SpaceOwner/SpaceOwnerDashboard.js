import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { tempListingMobileInitial } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import { icons, menu } from '../../styles/Styles';

function SpaceOwnerDashboard({ isSpaceOwner, navigation }) {
  const dispatch = useDispatch();

  const navigationHandler = (screen) => {
    navigation.navigate(screen);
  };
  const addListingNavigationHandler = (screen) => {
    dispatch(tempListingMobileInitial());
    navigation.navigate(screen);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.featuresWrapper}>
        <TouchableOpacity
          style={menu.wrapperNoBorder}
          onPress={() => {
            navigationHandler('CreateSpaceOwnerProfile');
          }}
        >
          <View style={menu.wrapperInner}>
            <SimpleLineIconsIcon name="briefcase" style={icons.menuLabelIcon} />
            <Text style={menu.text}>Space Owner Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={menu.wrapperNoBorder} onPress={() => navigationHandler('My Listings')}>
          <View style={menu.wrapperInner}>
            <MaterialCommunityIconsIcon name="calendar-clock" style={icons.menuLabelIcon} />
            <Text style={menu.text}>My Listings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={menu.wrapperNoBorder}
          onPress={() => addListingNavigationHandler('Parking Orders')}
        >
          <View style={menu.wrapperInner}>
            <MaterialCommunityIconsIcon name="calendar-clock" style={icons.menuLabelIcon} />
            <Text style={menu.text}>Parking Orders</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={menu.wrapperNoBorder}
          onPress={() => addListingNavigationHandler('AddListing')}
        >
          <View style={menu.wrapperInner}>
            <FontAwesomeIcon name="credit-card" style={icons.menuLabelIcon} />
            <Text style={menu.text}>Add a Listing</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={menu.wrapperNoBorder}
          onPress={() => {}}
        >
          <View style={menu.wrapperInner}>
            <FeatherIcons name="log-in" style={icons.menuLabelIcon} />
            <Text style={menu.text}>Checkin / Checkout</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={menu.wrapperNoBorder}
          onPress={() => {
            navigationHandler('WithdrawalSettings');
          }}
        >
          <View style={menu.wrapperInner}>
            <MaterialCommunityIconsIcon name="cash-multiple" style={icons.menuLabelIcon} />
            <Text style={menu.text}>Withdrawal Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={menu.wrapperNoBorder}
          onPress={() => navigation.navigate('Payout&DepositScreen')}
        >
          <View style={menu.wrapperInner}>
            <SimpleLineIconsIcon name="notebook" style={icons.menuLabelIcon} />
            <Text style={menu.text}>Payout &amp; Deposit Reports</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={menu.wrapperNoBorder} onPress={() => {}}>
          <View style={menu.wrapperInner}>
            <FontAwesomeIcon name="handshake-o" style={icons.menuLabelIcon} />
            <Text style={menu.text}>Set Staff Credentials</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: '#fff',
    padding: 10
  },
  featuresWrapper: {
    paddingTop: 10
  }
});

// SpaceOwnerDashboard.propTypes = {
//   toggleUserType: PropTypes.func.isRequired,
//   isSpaceOwner: PropTypes.bool.isRequired,
// };

// const mapStateToProps = ({ user, auth }) => ({
//   admin: auth.data.admin,
//   isSpaceOwner: user.isSpaceOwner,
//   userName: auth.authenticated ? auth.data.attributes.name : null,
//   adminMode: user.adminMode
// });

// export default connect(mapStateToProps, { toggleUserType, unsetAuthUser, toggleAdminMode })(
//   SpaceOwnerDashboard
// );

export default SpaceOwnerDashboard;
