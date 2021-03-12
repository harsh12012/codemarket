import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenTittle from './ScreenTittle';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import colors from '@parkyourself-frontend/shared/config/colors';
const ModalHeader = ({ title, onClose,style={} }) => {
  return (
    <View style={[styles.modalHeader,style]}>
      <ScreenTittle title={title} />
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <AntDesignIcon name="close" size={28} color={colors.secondary} />
      </TouchableOpacity>
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  }
});
