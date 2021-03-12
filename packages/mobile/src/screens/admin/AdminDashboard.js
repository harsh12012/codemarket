/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import colors from '@parkyourself-frontend/shared/config/colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { menu, icons } from '../../styles/Styles';

const settings = [
  { name: 'Property Type', navigate: 'AdminPropertyType' },
  { name: 'Listing Type', navigate: 'AdminListingType' },
  { name: 'Application Fee', navigate: 'AdminAppFee' },
  { name: 'Privacy Policy', navigate: 'AdminPrivacyPolicy' },
  { name: 'FAQ', navigate: 'AdminFAQ' }
];

function SpaceOwnerDashboard({ navigation }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity 
          style={[menu.wrapperNoBorder, styles.topPadding]}
          onPress={() => navigation.navigate('AdminUsers')}
        >
          <View style={menu.wrapperInner}>
            <MaterialCommunityIconsIcon
              name="account-multiple-outline"
              style={icons.menuLabelIcon}
            />
            <Text style={menu.text}>Users</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={menu.wrapperNoBorder}
          onPress={() => navigation.navigate('AdminBooking')}
        >
          <View style={menu.wrapperInner}>
            <MaterialCommunityIconsIcon
              name="calendar-clock"
              style={icons.menuLabelIcon}
            />
            <Text style={menu.text}>Bookings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={menu.wrapperNoBorder}
          onPress={() => navigation.navigate('AdminParking')}
        >
          <View style={menu.wrapperInner}>
            <FontAwesomeIcon 
              name="car" 
              style={icons.menuLabelIcon} 
            />
            <Text style={menu.text}>Parking Inventory</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={menu.wrapperNoBorder}
          onPress={() => navigation.navigate('AdminRegStats')}
        >
          <View style={menu.wrapperInner}>
            <MaterialCommunityIconsIcon
              name="clipboard-text-outline"
              style={icons.menuLabelIcon}
            />
            <Text style={menu.text}>Registration Stats</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={menu.wrapperNoBorder}
          onPress={() => {}}
        >
          <View style={menu.wrapperInner}>
            <FeatherIcon 
              name="mail" 
              style={icons.menuLabelIcon} 
            />
            <Text style={menu.text}>Messages</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={menu.wrapperNoBorder}
          onPress={() => {}}
        >
          <View style={menu.wrapperInner}>
            <MaterialCommunityIconsIcon
              name="cash"
              style={icons.menuLabelIcon}
            />
            <Text style={menu.text}>Cashouts</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={menu.wrapperNoBorder} 
          onPress={() => setShowMenu(!showMenu)}
        >
          <View style={menu.wrapperInner}>
            <FeatherIcon name="settings" style={icons.menuLabelIcon} />
            <Text style={menu.text}>Settings</Text>
          </View>
        </TouchableOpacity>
        {showMenu && (
          <View style={styles.subListWrapper}>
            {settings.map((o, i) => (
              <TouchableOpacity
                key={o.name}
                style={i === (settings.length - 1) ? styles.subListItemWrapperNoBorder : styles.subListItemWrapper}
                onPress={() => (o.navigate ? navigation.navigate(o.navigate) : {})}
              >
                <Text style={styles.subListItemLabel}>{o.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    minHeight: '100%'
  },
  topPadding: {
    paddingTop: 25
  },
  subListWrapper: {
    paddingBottom: 10,
    marginHorizontal: 10
  },
  subListItemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: '#C2C2C2',
    borderBottomWidth: 0.5
  },
  subListItemWrapperNoBorder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  subListItemLabel: {
    fontFamily: 'Montserrat-Menium',
    fontSize: 18,
    letterSpacing: 0.5
  },
  subListArrowIcon: {
    color: '#B2B2B2',
    fontSize: 12
  }
});

// SpaceOwnerDashboard.propTypes = {
//   toggleUserType: PropTypes.func.isRequired,
//   isSpaceOwner: PropTypes.bool.isRequired,
// };

// const mapStateToProps = (state) => ({
//   isSpaceOwner: state.user.isSpaceOwner,
// });

// export default connect(mapStateToProps, {toggleUserType})(SpaceOwnerDashboard);
export default SpaceOwnerDashboard;
