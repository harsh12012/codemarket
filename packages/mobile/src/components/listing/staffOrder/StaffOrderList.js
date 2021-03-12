import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useGetAllBookings } from '@parkyourself-frontend/shared/hooks/bookings';
import ParkingOrderCard from './ParkingOrderCard';
import NoFound from '../../common/NoFound';
import SearchInput from '../../common/SearchInput';
import LoadingSpinner from '../../common/LoadingSpinner';

export default function UsersList({ status, driverId, ownerId, listingId, screen }) {
  
  const { allData, loading, filter, setFilter, loadMore } = useGetAllBookings({
    status,
    driverId,
    ownerId,
    listingId,
    screen
  });


  return (
    <View style={styles.outerView}>
      <View style={styles.searchRow}>
        <SearchInput
          onChangeText={(value) => setFilter({ ...filter, search: value })}
          value={filter.search}
          placeholder="Search..."
        />
      </View>
      <FlatList
        data={allData.bookings}
        renderItem={({ item, index }) => <ParkingOrderCard booking={item} />}
        keyExtractor={(item) => item._id}
        onEndReached={loadMore}
        onEndThreshold={0.1}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <NoFound loading={loading} count={allData.count} label="Bookings" />
        )}
        ListFooterComponent={() => (loading && allData.count > 0 ? <LoadingSpinner /> : null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerView: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 10 },
  searchRow: {
    marginVertical: 10
  }
});
