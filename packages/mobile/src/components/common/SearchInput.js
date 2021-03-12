import React from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';

export default function SearchInput({ placeholder = 'Search...', value = '', onChangeText }) {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.searchInput}
      value={value}
      onChangeText={(text) => onChangeText(text)}
    />
  );
}

const styles = StyleSheet.create({
  searchInput: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 2,
    padding: Platform.OS === 'ios' ? 12 : 7,
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
