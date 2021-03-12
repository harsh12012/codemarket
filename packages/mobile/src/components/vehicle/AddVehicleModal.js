import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import colors from '@parkyourself-frontend/shared/config/colors';
import ImagePicker from 'react-native-image-picker';
import { Picker } from '@react-native-community/picker';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import ScreenTittle from '../common/ScreenTittle';
import Input from '../Input';
import NextButton from '../SpaceOwner/NextButton';

export default function CountryModal({
  visible = false,
  onHide,
  payload,
  setPayload,
  addVehicleHandler,
  disabled
}) {
  const [validated, setValidated] = useState(false);
  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
  const imagePickerHandler = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        setPayload({ ...payload, image: response.uri, imageFile: response.uri });
      }
    });
  };

  const onSave = async () => {
    try {
      if (
        payload.licensePlate &&
        payload.type &&
        payload.make &&
        payload.model &&
        payload.year &&
        payload.size &&
        payload.color
      ) {
        setValidated(false);
        await addVehicleHandler();
        onHide();
      } else {
        // Alert.alert('Complete');
        setValidated(true);
      }
    } catch (error) {
      Alert.alert('Modal Error', error.message);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={onHide} style={styles.closeButton}>
                <AntDesignIcon name="close" size={28} color={colors.secondary} />
              </TouchableOpacity>
              <ScreenTittle title={`${payload.edit ? 'Update' : 'Add'} Vehicle`} />
            </View>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              {/* {activeIndex === 10 && (
                <>
                  <Text style={styles.heading}>Add photo of your vehicle</Text>
                  <TouchableOpacity style={styles.addPhotoBtn} onPress={imagePickerHandler}>
                    <Text style={styles.addPhotoBtnText}>+ Add Photo</Text>
                  </TouchableOpacity>

                  {payload.image && <Image source={payload.image} style={styles.image} />}
                </>
              )} */}

              <View style={styles.inputGroup}>
                <Input
                  placeholder="License Plate"
                  label="What's your License Plate?"
                  value={payload.licensePlate}
                  validated={validated}
                  onChangeText={(input) => setPayload({ ...payload, licensePlate: input })}
                  style={styles.licensePlate}
                />
              </View>
              <View style={styles.inputGroup}>
                <Input
                  style={styles.vehicleType}
                  placeholder="Vehicle Type"
                  label="Tell us your Vehicle Type"
                  value={payload.type}
                  validated={validated}
                  onChangeText={(input) => setPayload({ ...payload, type: input })}
                />
              </View>
              <View style={styles.inputGroup}>
                <Input
                  style={styles.make}
                  placeholder="Make"
                  label="Your Vehicle Make"
                  value={payload.make}
                  validated={validated}
                  onChangeText={(input) => setPayload({ ...payload, make: input })}
                />
              </View>
              <View style={styles.inputGroup}>
                <Input
                  style={styles.model}
                  placeholder="Model"
                  label="Tell us your Vehicle Model"
                  value={payload.model}
                  validated={validated}
                  onChangeText={(input) => setPayload({ ...payload, model: input })}
                />
              </View>
              <View style={styles.inputGroup}>
                <Input
                  placeholder="Year"
                  label="What's the manufacturing year?"
                  value={payload.year}
                  validated={validated}
                  onChangeText={(input) => setPayload({ ...payload, year: input })}
                />
              </View>
              <View style={styles.inputGroup}>
                <Input
                  placeholder="Color"
                  label="Tell us your vehicle color"
                  value={payload.color}
                  onChangeText={(input) => setPayload({ ...payload, color: input })}
                  validated={validated}
                  style={styles.placeholder2}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Choose your Vehicle Size</Text>
                <Picker
                  selectedValue={payload.size}
                  style={styles.picker}
                  onValueChange={(itemValue) => setPayload({ ...payload, size: itemValue })}>
                  <Picker.Item label="Motorcycle" value="motorcycle" />
                  <Picker.Item label="Compact" value="compact" />
                  <Picker.Item label="Mid Sized" value="midsized" />
                  <Picker.Item label="Large" value="large" />
                  <Picker.Item label="Over Sized" value="oversized" />
                </Picker>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Add Photo of your Vehicle</Text>
                {payload.image && payload.image != '' ? (
                  <View style={styles.imageList}>
                    <View style={styles.iconContainer}>
                      <TouchableOpacity
                        onPress={() => setPayload({ ...payload, image: '', imageFile: null })}>
                        <EntypoIcon name="circle-with-cross" style={styles.deleteIcon} />
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{ uri: payload.image }}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </View>
                ) : (
                  <TouchableOpacity style={styles.addPhotoBtn} onPress={imagePickerHandler}>
                    <Text style={styles.addPhotoBtnText}>+ Select Photo</Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
        <NextButton label="Save" onPress={onSave} disabled={disabled} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, flex: 1, paddingTop: 0 },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 10 },
  closeButton: { marginRight: 5 },
  scrollView: {
    marginTop: 10,
    paddingBottom: 100
  },
  heading: {
    fontSize: 20,
    color: colors.black
  },
  inputGroup: { marginVertical: 5 },
  label: {
    color: colors.secondary,
    fontSize: 15,
    fontWeight: 'bold'
  },
  addPhotoBtn: {
    borderColor: '#0b4094',
    borderWidth: 2,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 6,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10
  },
  addPhotoBtnText: {
    color: '#0b4094',
    fontWeight: '700',
    fontSize: 16
  },
  deleteIcon: {
    fontSize: 40,
    color: 'red'
  },
  imageList: { marginVertical: 10 },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 5
    // marginBottom: 25
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 3,
    top: 10,
    left: 5
  }
});
