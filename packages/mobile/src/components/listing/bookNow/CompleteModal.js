import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import colors from '@parkyourself-frontend/shared/config/colors';
import { clearSearchData } from '@parkyourself-frontend/shared/redux/actions/findParking';
import { useDispatch } from 'react-redux';
import ParkingTicket from './ParkingTicket';

export default function CompleteModal({ visible = false, vehicle = null, booking, redirect }) {
  const [showParkingTicket, setShowParkingTicket] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const goHome = () => {
    dispatch(clearSearchData());
    navigation.navigate(redirect);
  };
  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* <View style={styles.header}>
            <TouchableOpacity onPress={onHide} style={styles.backBtn}>
              <AntDesignIcon name="close" size={28} color="#666" />
            </TouchableOpacity>
          </View> */}
          {showParkingTicket ? (
            <ParkingTicket booking={booking} onPress={goHome} vehicle={vehicle} />
          ) : (
            <ScrollView>
              <Text style={styles.label}>{booking.address}</Text>
              <Image style={styles.image} source={require('../../../assets/images/good-job.png')} />
              <Text style={styles.goodJob}>Good Job!</Text>
              <Text style={styles.successText}>Your parking area has been successfuly booked</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View>
                  <TouchableOpacity
                    onPress={() => setShowParkingTicket(true)}
                    style={[styles.button, { backgroundColor: colors.primary }]}>
                    <Text style={[styles.buttonText, { color: colors.white }]}>VIEW QR CODE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={goHome} style={styles.button}>
                    <Text style={styles.buttonText}>GO TO HOME</Text>
                  </TouchableOpacity>
                  {/* <View style={{ marginTop: 30 }} /> */}
                  {/* <TouchableOpacity
                    onPress={() => setShowParkingTicket(true)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>SEND AS GIFT</Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            </ScrollView>
          )}
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
