import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useGetAllListings } from '@parkyourself-frontend/shared/hooks/listings';
import MyListingListItem from './MyListingListItem';
import NoFound from '../../common/NoFound';
import SearchInput from '../../common/SearchInput';
import LoadingSpinner from '../../common/LoadingSpinner';

export default function ListingList({ username = null, active = null }) {
  const { allData, loading, filter, setFilter, loadMore } = useGetAllListings({ username, active });

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
        data={allData.listings}
        renderItem={({ item, index }) => <MyListingListItem item={item} index={index} />}
        keyExtractor={(item) => item._id}
        onEndReached={loadMore}
        onEndThreshold={0.1}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <NoFound loading={loading} count={allData.count} label="Listings" />
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
