import colors from '@parkyourself-frontend/shared/config/colors';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useGetAllBookings } from '@parkyourself-frontend/shared/hooks/bookings';
import BookingCard from './BookingCard';
import ParkingOrderCard from './ParkingOrderCard';
import NoFound from '../common/NoFound';
import SearchInput from '../common/SearchInput';
import LoadingSpinner from '../common/LoadingSpinner';

let oneYearFromNow = new Date();
oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
let yearsBackFromNow = new Date();
yearsBackFromNow.setFullYear(yearsBackFromNow.getFullYear() - 20);
const defaultStartDate = yearsBackFromNow;
const defaultEndDate = oneYearFromNow;

export default function UsersList({
  status,
  driverId,
  ownerId,
  listingId,
  parkingOrder,
  screen,
  range,
  amount,
  visit
}) {
  const [search, setSearch] = useState(null);

  const { allData, loading, filter, setFilter, loadMore } = useGetAllBookings({
    status,
    driverId,
    ownerId,
    listingId,
    screen,
    startDate: range.startDate,
    endDate: range.endDate,
    minAmount: amount ? amount[0] : null,
    maxAmount: amount ? amount[1] : null,
    minDuration: visit ? visit[0] : null,
    maxDuration: visit ? visit[1] : null
  });

  // console.log('all data', allData);

  return (
    <View style={styles.outerView}>
      <View style={styles.searchRow}>
        <SearchInput
          onChangeText={(value) => setFilter({ ...filter, search: value })}
          value={search}
          placeholder="Search..."
        />
      </View>
      <FlatList
        data={allData.bookings}
        renderItem={({ item, index }) =>
          parkingOrder ? <ParkingOrderCard booking={item} /> : <BookingCard booking={item} />
        }
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
