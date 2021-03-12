import React from 'react';
import { SafeAreaView, View, Modal, StyleSheet } from 'react-native';
import colors from '@parkyourself-frontend/shared/config/colors';
import ParkingTicket from '../listing/bookNow/ParkingTicket';

export default function CompleteModal({ visible = false, vehicle = null, booking, onHide }) {
  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* <View style={styles.header}>
            <TouchableOpacity onPress={onHide} style={styles.backBtn}>
              <AntDesignIcon name="close" size={28} color="#666" />
            </TouchableOpacity>
          </View> */}
          <ParkingTicket booking={booking} onPress={onHide} vehicle={vehicle} />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, flex: 1 },
  label: {
    color: colors.secondary,
    fontSize: 20,
    marginBottom: -10,
    marginTop: 20,
    fontWeight: '500'
  },
  image: { width: 200, height: 200, alignSelf: 'center', marginTop: 20 },
  goodJob: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: colors.secondary,
    marginVertical: 10
  },
  successText: { textAlign: 'center', fontSize: 25, color: colors.primary },
  button: {
    backgroundColor: colors.white,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.primary
  },
  buttonText: { textAlign: 'center', color: colors.primary, fontWeight: 'bold', fontSize: 17 }
});
