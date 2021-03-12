import React from 'react';
import { SafeAreaView, View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import colors from '@parkyourself-frontend/shared/config/colors';

export default function AddressModal({ visible = false, onHide, onSelect = () => {} }) {
  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onHide} style={styles.backBtn}>
              <AntDesignIcon name="close" size={28} color="#666" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.label}>Search Your Location</Text>
            <GooglePlacesAutocomplete
              onPress={onSelect}
              placeholder="Search Your Location"
              clearButtonMode
              poweredContainer={false}
              listViewDisplayed={false}
              fetchDetails
              nearbyPlacesAPI="GooglePlacesSearch"
              GooglePlacesSearchQuery={{
                rankby: 'distance',
                type: ['cities']
              }}
              GooglePlacesDetailsQuery={{
                fields: ['formatted_address', 'geometry']
              }}
              debounce={200}
              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
              enablePoweredByContainer={false}
              query={{
                key: 'AIzaSyDF0pzALjYYanPshuclFzq_2F24xZWZjOg',
                language: 'en',
                location: '30.36214,78.26541',
                radius: 100
              }}
              styles={{
                textInputContainer: {
                  width: '100%',
                  padding: 0,
                  backgroundColor: '#fff',
                  borderWidth: 2,
                  borderRadius: 5,
                  borderColor: '#d6d6d6',
                  marginTop: 20,
                  marginBottom: 30,
                  elevation: 10
                },
                listView: {
                  position: 'absolute',
                  backgroundColor: 'rgb(255,255,255)',
                  top: 70,
                  zIndex: 99999
                },
                row: {
                  backgroundColor: 'rgb(255,255,255)'
                },
                textInput: {
                  height: '100%',
                  marginTop: 0,
                  marginBottom: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  fontSize: 18,
                  paddingVertical: 10
                }
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: {
    color: colors.secondary,
    fontSize: 20,
    marginBottom: -10,
    marginTop: 20,
    fontWeight: '500'
  }
});
