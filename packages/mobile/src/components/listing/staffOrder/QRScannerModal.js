import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import colors from '@parkyourself-frontend/shared/config/colors';
import { clearSearchData } from '@parkyourself-frontend/shared/redux/actions/findParking';
import { useDispatch } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ScreenTittle from '../../common/ScreenTittle';

export default function CompleteModal({ visible = false, bookingId, onHide, handleUpdateStatus }) {
  const [showParkingTicket, setShowParkingTicket] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const goHome = () => {
    dispatch(clearSearchData());
    navigation.navigate('My Bookings');
  };

  const onSuccess = (e) => {
    if (e.data == bookingId) {
      handleUpdateStatus('current', true, false);
    } else {
      Alert.alert('Invalid QR Code', 'Please scan again');
      onHide();
    }
  };
  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <ScreenTittle title="Parking Ticket Scanner" textAlign="center" />
          <ActivityIndicator />
          <QRCodeScanner
            onRead={onSuccess}
            showMarker={true}
            topContent={<Text style={styles.heading}>Scan the Parking Ticket</Text>}
            bottomContent={
              <TouchableOpacity style={styles.button} onPress={onHide}>
                <Text style={styles.buttonText}>CLOSE</Text>
              </TouchableOpacity>
            }
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 20, flex: 1 },
  heading: {
    fontWeight: 'bold',
    color: colors.black
  },
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
    backgroundColor: colors.primary,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.primary
  },
  buttonText: { textAlign: 'center', color: colors.white, fontWeight: 'bold', fontSize: 17 }
});
