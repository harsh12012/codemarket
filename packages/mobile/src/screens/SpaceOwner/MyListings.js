import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import ListingTabs from '../../components/listing/myListing/ListingTabs';

export default function MyBookings() {
  const username = useSelector(({ auth }) =>
    auth.authenticated ? auth.data.attributes.sub : 'null'
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <ListingTabs username={username} showHeader={true} title="My Listings" />
    </View>
  );
}
