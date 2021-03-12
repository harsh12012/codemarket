import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { ActivityIndicator, Text, StyleSheet, TouchableOpacity, View } from 'react-native';

const NextButton = ({
  showLeftButton = false,
  onPressLeftButton,
  onPress,
  label = 'Next',
  label2 = 'Back',
  disabled = false
}) => {
  return (
    <View
      style={[styles.row, showLeftButton ? {} : { justifyContent: 'flex-end' }]}
      disabled={disabled}>
      {showLeftButton && (
        <TouchableOpacity style={styles.button} onPress={onPressLeftButton}>
          {disabled ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <Text style={styles.text}>{label2 || 'back'}</Text>
          )}
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {disabled ? (
          <ActivityIndicator color={colors.white} size="small" />
        ) : (
          <Text style={styles.text}>{label}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 10,
    borderRadius: 10,
    zIndex: 100
  },
  text: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 18
  }
});

export default NextButton;
