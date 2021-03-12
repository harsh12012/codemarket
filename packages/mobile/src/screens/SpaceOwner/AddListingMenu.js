import React, { useState } from 'react';
import { connect } from 'react-redux';
import { tempListingPricingD } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import { menu } from '@parkyourself-frontend/shared/config/addListingMenu';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import colors from '@parkyourself-frontend/shared/config/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import { useListingCompleteStatus } from '@parkyourself-frontend/shared/hooks/listings';

function SetPricingType({ onBackButtonPress, setActiveIndex, navigation, edit, listing }) {
  const { listingCompleteStatus } = useListingCompleteStatus({ listing });
  const [subMenu, setSubMenu] = useState(null);

  const toggleSubMenu = (menu) => {
    setSubMenu(subMenu === menu ? null : menu);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{`${edit ? 'Edit' : 'Add'} Listing`}</Text>
        <TouchableOpacity style={styles.item} onPress={() => setActiveIndex(1)}>
          <Text style={styles.label}>Location (1)</Text>
          {!listingCompleteStatus.location.status && (
            <Octicons name="stop" style={styles.incompleteIcon} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => toggleSubMenu('property')}>
          <Text style={styles.label}>Property (2,3,4,5)</Text>
          {!listingCompleteStatus.property.status && (
            <Octicons name="stop" style={styles.incompleteIcon} />
          )}
        </TouchableOpacity>
        {subMenu === 'property' && (
          <View style={styles.subMenuBox}>
            {menu[subMenu].subMenu.map((m, i) => (
              <TouchableOpacity key={i} style={styles.item} onPress={() => setActiveIndex(m.index)}>
                <Text style={styles.label}>{`${m.index} ${m.label}`}</Text>
                {!listingCompleteStatus.property[m.index] && (
                  <Octicons name="stop" style={styles.incompleteIcon} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity style={styles.item} onPress={() => toggleSubMenu('parkingSpaces')}>
          <Text style={styles.label}>Parking Spaces(6,7,8)</Text>
          {!listingCompleteStatus.parkingSpaces.status && (
            <Octicons name="stop" style={styles.incompleteIcon} />
          )}
        </TouchableOpacity>
        {subMenu === 'parkingSpaces' && (
          <View style={styles.subMenuBox}>
            {menu[subMenu].subMenu.map((m, i) => (
              <TouchableOpacity key={i} style={styles.item} onPress={() => setActiveIndex(m.index)}>
                <Text style={styles.label}>{`${m.index} ${m.label}`}</Text>
                {!listingCompleteStatus.parkingSpaces[m.index] && (
                  <Octicons name="stop" style={styles.incompleteIcon} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity style={styles.item} onPress={() => setActiveIndex(9)}>
          <Text style={styles.label}>Availability (9)</Text>
          {!listingCompleteStatus.availability.status && (
            <Octicons name="stop" style={styles.incompleteIcon} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => toggleSubMenu('bookingSettings')}>
          <Text style={styles.label}>Booking Settings (10,11,12,13)</Text>
          {!listingCompleteStatus.bookingSettings.status && (
            <Octicons name="stop" style={styles.incompleteIcon} />
          )}
        </TouchableOpacity>
        {subMenu === 'bookingSettings' && (
          <View style={styles.subMenuBox}>
            {menu[subMenu].subMenu.map((m, i) => (
              <TouchableOpacity key={i} style={styles.item} onPress={() => setActiveIndex(m.index)}>
                <Text style={styles.label}>{`${m.index} ${m.label}`}</Text>
                {!listingCompleteStatus.bookingSettings[m.index] && (
                  <Octicons name="stop" style={styles.incompleteIcon} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity style={styles.item} onPress={() => setActiveIndex(14)}>
          <Text style={styles.label}>Pricing (14)</Text>
          {!listingCompleteStatus.pricing.status && (
            <Octicons name="stop" style={styles.incompleteIcon} />
          )}
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 20,
    paddingBottom: 50,
    paddingTop: 20
  },
  item: {
    marginTop: 20,
    flexDirection: 'row'
  },
  label: { color: colors.black, fontSize: 20, fontWeight: 'bold' },
  title: {
    textAlign: 'left',
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    color: 'black'
  },
  subMenuBox: { paddingLeft: 10 },
  incompleteIcon: { fontSize: 23, color: 'red', marginLeft: 5, marginTop: 1 }
});

const mapStateToProps = ({ tempListing }) => ({
  pricingDetails: tempListing.pricingDetails
});
export default connect(mapStateToProps, { tempListingPricingD })(SetPricingType);
