import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { View, TextInput, StyleSheet, Text, Platform } from 'react-native';

export default function Input({ validated, value, ...rest }) {
  return (
    <View style={styles.container}>
      <View
        style={
          validated && !value
            ? { ...styles.inputContainer, ...styles.required }
            : styles.inputContainer
        }>
        <Text style={styles.label}>{rest.label || rest.placeholder}</Text>
        <TextInput value={value} {...rest} style={styles.textInput} />
      </View>
      {validated && !value && <Text style={styles.requiredText}>This field is required</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  inputContainer: {
    marginVertical: 10,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    width: '100%'
  },
  label: {
    color: colors.secondary,
    fontSize: 15,
    marginBottom: Platform.OS === 'ios' ? 5 : -10,
    fontWeight: 'bold'
  },
  textInput: {
    fontSize: 18,
    marginBottom: Platform.OS === 'ios' ? 0 : -10
  },
  required: {
    borderBottomColor: 'red'
  },
  requiredText: {
    color: 'red',
    fontSize: 12
  }
});
