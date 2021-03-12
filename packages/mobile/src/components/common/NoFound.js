import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoadingSpinner from './LoadingSpinner';

export default function NoFound({ loading = false, count = 0, label = 'Records' }) {
  return (
    <>
      {count > 0 ? null : (
        <View style={styles.box}>
          {loading ? <LoadingSpinner /> : <Text style={styles.text}>No {label} Found</Text>}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  box: { flex: 1, justifyContent: 'center', marginTop: 50 },
  text: { textAlign: 'center', opacity: 0.3, fontWeight: 'bold', fontSize: 20 }
});
