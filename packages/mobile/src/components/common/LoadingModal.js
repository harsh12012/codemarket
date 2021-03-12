import colors from '@parkyourself-frontend/shared/config/colors';
import React from 'react';
import { View, Modal, ActivityIndicator, Text } from 'react-native';
import { useSelector } from 'react-redux';

export default function LoadingModal() {
  const loadingModal = useSelector(({ user }) => user.loadingModal);
  return (
    <Modal visible={loadingModal} animationType="fade" transparent>
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.6)'
        }}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    </Modal>
  );
}
