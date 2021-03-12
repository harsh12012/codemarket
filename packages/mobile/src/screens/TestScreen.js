import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const App = () => {
  const onSuccess = (e) => {
    console.log('e', e.data);
    // Linking.openURL(e.data).catch((err) => console.error('An error occured', err));
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      cameraType="back"
      // markerStyle={{ color: 'red' ,borderColor:"re"}}
      showMarker={true}
      topContent={
        <Text style={styles.centerText}>
          Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and
          scan the QR code.
        </Text>
      }
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default App;
