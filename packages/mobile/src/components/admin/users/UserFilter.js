import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '@parkyourself-frontend/shared/config/colors';
import RadioButton from '../../common/RadioButton';
import { FilterContext } from '../../common/FilterButton';

export default function UserFilter({ activeFilter, setActiveFilter }) {
  const { setModal } = useContext(FilterContext);
  const handleSelect = (value) => {
    setActiveFilter(value);
    setModal(false);
  };
  return (
    <View
      style={{
        height: 180,
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
      <RadioButton
        key="Active"
        label="Active Users"
        checked={activeFilter === true}
        onPress={() => handleSelect(true)}
      />
      <RadioButton
        key="Block"
        label="Block Users"
        checked={activeFilter === false}
        onPress={() => handleSelect(false)}
      />
    </View>
  );
}
