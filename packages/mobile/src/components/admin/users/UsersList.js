import colors from '@parkyourself-frontend/shared/config/colors';
import { useGetAllUser } from '@parkyourself-frontend/shared/hooks/users';
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import UserCard from './UserCard';
import NoFound from '../../common/NoFound';
import SearchInput from '../../common/SearchInput';

export default function UsersList({
  driver,
  spaceOwner,
  showTime,
  lowerRange,
  higherRange,
  activeFilter = null
}) {
  const { filter, setFilter, allData, loading, toggleUser } = useGetAllUser({
    driver: driver ? true : false,
    spaceOwner: spaceOwner ? true : false,
    lowerRange: lowerRange ? lowerRange : null,
    higherRange: higherRange ? higherRange : null,
    active: activeFilter
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
      <NoFound loading={loading} count={allData.count} label="Users" />
      <FlatList
        data={allData.users}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <UserCard user={item} index={index} toggleUser={toggleUser} showTime={showTime} />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerView: { flex: 1, backgroundColor: colors.white },
  searchRow: {
    paddingHorizontal: 10,
    marginVertical: 10
  },
  searchInput: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 2,
    padding: 15,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1
  }
});
