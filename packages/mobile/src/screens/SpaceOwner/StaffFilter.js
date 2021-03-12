import colors from '@parkyourself-frontend/shared/config/colors';
import React, { useContext } from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';
import { FilterContext } from '../../components/common/FilterButton';
import RadioButton from '../../components/common/RadioButton';

const StaffFilter = ({ activeFilter, setActiveFilter, userRoles }) => {
  const { setModal } = useContext(FilterContext);
  const handleSelect = (value) => {
    setActiveFilter(value);
    setModal(false);
  };

  return (
    <View
      style={{
        minHeight: 180,
        width: 170,
        backgroundColor: 'white',
        borderRadius: 1,
        borderColor: colors.primary,
        borderWidth: 1,
        padding: 10
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: colors.primary,
          borderBottomWidth: 1,
          paddingBottom: 10,
          marginBottom: 10
        }}>
        <MaterialCommunityIcon name="filter-variant" size={28} />
        <Text
          style={{
            fontSize: 18,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 5
          }}>
          FILTER BY
        </Text>
      </View>
      <RadioButton
        key="all"
        label="All"
        checked={activeFilter === null}
        onPress={() => handleSelect(null)}
      />

      {userRoles.length > 0 &&
        userRoles.map((role) => {
          return (
            <RadioButton
              key={role.label}
              label={role.label}
              checked={activeFilter === role.value}
              onPress={() => handleSelect(role.value)}
            />
          );
        })}
    </View>
  );
};

export default StaffFilter;

const styles = StyleSheet.create({});
