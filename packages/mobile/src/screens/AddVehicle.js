import React, { Component, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ScrollView,
  Dimensions,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { Picker } from '@react-native-community/picker';
import ImagePicker from 'react-native-image-picker';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialButtonPrimary from '../components/MaterialButtonPrimary';
import NextButton from '../components/SpaceOwner/NextButton';
import AddListingHeader from '../components/SpaceOwner/AddListingHeader';
import Input from '../components/Input';
import VehicleSizesModal from '../components/SpaceOwner/VehicleSizesModal';
import { addVehicle } from '../actions/user';

function AddVehicle({ navigation, route, addVehicle }) {
  const { vehicle } = route.params;

  const scrollRef = useRef();

  const [activeIndex, setActiveIndex] = useState(1);

  const [width, setWidth] = useState(0);

  const [validate, setValidate] = useState(false);

  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(false);

  const [image, setImage] = useState(vehicle && vehicle.image ? vehicle.image : null);
  const [licensePlate, setLicensePlate] = useState(
    vehicle && vehicle.licensePlate ? vehicle.licensePlate : ''
  );
  const [type, setType] = useState(vehicle && vehicle.type ? vehicle.type : '');
  const [make, setMake] = useState(vehicle && vehicle.make ? vehicle.make : '');
  const [model, setModel] = useState(vehicle && vehicle.model ? vehicle.model : '');
  const [year, setYear] = useState(vehicle && vehicle.year ? vehicle.year : '');
  const [size, setSize] = useState(vehicle && vehicle.size ? vehicle.size : 'Motorcycle');
  const [color, setColor] = useState(vehicle && vehicle.color ? vehicle.color : '');

  const options = {
    title: 'Select Photo',
    // customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

  const imagePickerHandler = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        setImage(source);

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  const [carData, setCardData] = useState([
    {
      licensePlate: 'DL13OG7584',
      make: 'Toyota',
      model: 'Corolla',
      year: '2012'
    },
    {
      licensePlate: 'GT93PY4981',
      make: 'BMW',
      model: 'M3',
      year: '2015'
    },
    {
      licensePlate: 'US59TM3815',
      make: 'Mercedes',
      model: 'Benz',
      year: '2017'
    },
    {
      licensePlate: 'MY20RM6923',
      make: 'Ford',
      model: 'Figo',
      year: '2013'
    }
  ]);

  const [searchResults, setSearchResults] = useState([]);

  const [showSearchResults, setShowSearchResults] = useState(false);

  const onSearchHandler = (query) => {
    setSearchResults(carData.filter((car) => car.licensePlate.includes(query)));
    setShowSearchResults(true);
  };

  const backButtonHandler = () => {
    if (activeIndex != 1) {
      setActiveIndex(activeIndex - 1);
      scrollRef.current.scrollTo({
        y: 0,
        animated: true
      });
      setWidth(width - 12);
    } else {
      setVisible(false);
    }
  };

  const onSubmitHandler = () => {
    try {
      if (activeIndex != 8) {
        if (
          activeIndex == 1 ||
          (activeIndex == 2 && licensePlate) ||
          (activeIndex == 3 && type) ||
          (activeIndex == 4 && make) ||
          (activeIndex == 5 && model) ||
          (activeIndex == 6 && year) ||
          (activeIndex == 7 && size)
        ) {
          setValidate(false);
          setActiveIndex(activeIndex + 1);
          scrollRef.current.scrollTo({
            y: 0,
            animated: true
          });
          setWidth(width + 12);
        } else {
          setValidate(true);
        }
      } else {
        let vehicle = {
          id: Date.now().toString(),
          licensePlate,
          type,
          make,
          model,
          year,
          size,
          color
        };

        addVehicle(vehicle);
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Something Went wrong!', 'Unable to add your vehicle');
    }
  };

  return (
    <Modal visible={visible}>
      <AddListingHeader
        onPress={backButtonHandler}
        onPressSaveAndExit={onSubmitHandler}
        icon={activeIndex == 1 ? 'close' : 'arrowleft'}
        width={`${width}%`}
      />
      <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
        {/* <Text style={styles.addAVehicle}>Add a Vehicle</Text> */}

        {activeIndex == 1 && (
          <>
            <Text style={styles.heading}>Add photo of your vehicle</Text>
            <TouchableOpacity style={styles.addPhotoBtn} onPress={imagePickerHandler}>
              <Text style={styles.addPhotoBtnText}>+ Add Photo</Text>
            </TouchableOpacity>

            {
              image && (
                // <View style={styles.imageList}>
                <Image key={image.uri} source={image} style={styles.image} />
              )
              /* </View> */
            }
          </>
        )}
        {/* <Text style={styles.heading}>Add photos of your vehicle</Text>
        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIconsIcon
            name="image-plus"
            style={styles.icon}></MaterialCommunityIconsIcon>
          <Text style={styles.uploadImage}>Upload Image</Text>
        </TouchableOpacity> */}
        {activeIndex == 2 && (
          <>
            <Text style={styles.heading}>What's your License Plate?</Text>
            <Input
              placeholder="License Plate"
              placeholderTextColor="rgba(214,214,214,1)"
              value={licensePlate}
              validate={validate}
              onChangeText={(input) => {
                setLicensePlate(input);
                onSearchHandler(input);
              }}
              style={styles.licensePlate}></Input>

            {showSearchResults && (
              <View style={styles.searchResults}>
                {searchResults.map((item) => (
                  <TouchableOpacity
                    key={item.licensePlate}
                    onPress={() => {
                      setLicensePlate(item.licensePlate);
                      setMake(item.make);
                      setModel(item.model);
                      setYear(item.year);
                      setShowSearchResults(false);
                    }}>
                    <Text style={styles.searchResultText}>
                      {item.licensePlate}, {item.make}, {item.model}, {item.year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        )}

        {activeIndex == 3 && (
          <>
            <Text style={styles.heading}>Tell us your Vehicle Type</Text>
            <Input
              style={styles.vehicleType}
              placeholder="Vehicle Type"
              value={type}
              validate={validate}
              onChangeText={(input) => setType(input)}></Input>
          </>
        )}

        {activeIndex == 4 && (
          <>
            <Text style={styles.heading}>Your Vehicle Make</Text>
            <Input
              style={styles.make}
              placeholder="Make"
              value={make}
              validate={validate}
              onChangeText={(input) => setMake(input)}></Input>
          </>
        )}

        {activeIndex == 5 && (
          <>
            <Text style={styles.heading}>Tell us your Vehicle Model</Text>
            <Input
              style={styles.model}
              placeholder="Model"
              value={model}
              validate={validate}
              onChangeText={(input) => setModel(input)}></Input>
          </>
        )}

        {activeIndex == 6 && (
          <>
            <Text style={styles.heading}>What's the manufacturing year?</Text>
            <Input
              placeholder="Year"
              placeholderTextColor="rgba(214,214,214,1)"
              style={styles.placeholder}
              value={year}
              validate={validate}
              onChangeText={(input) => setYear(input)}></Input>
          </>
        )}

        {activeIndex == 7 && (
          <>
            <Text style={styles.heading}>Choose your Vehicle Size</Text>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={size}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setSize(itemValue)}>
                <Picker.Item label="Motorcycle" value="Motorcycle" />
                <Picker.Item label="Compact" value="compact" />
                <Picker.Item label="Mid Sized" value="Mid Sized" />
                <Picker.Item label="Large" value="Large" />
                <Picker.Item label="Over Sized" value="Over Sized" />
              </Picker>
            </View>

            <TouchableOpacity onPress={() => setVisible2(true)}>
              <Text style={styles.loremIpsum}>Vehicle size description</Text>
            </TouchableOpacity>

            <Modal visible={visible2}>
              <VehicleSizesModal onPress={() => setVisible2(false)} />
            </Modal>

            {/* <View style={styles.rect6Stack}>
              <View style={styles.rect6}>
                <View style={styles.motorcycle1StackStackRow}>
                  <TouchableOpacity
                    style={size == 1 ? styles.activeBtn : styles.inactiveBtn}
                    onPress={() => setSize(1)}>
                    <FontAwesomeIcon
                      name="motorcycle"
                      style={
                        size == 1 ? styles.activeIcon : styles.inactiveIcon
                      }></FontAwesomeIcon>
                    <Text
                      style={
                        size == 1 ? styles.activeText : styles.inactiveText
                      }>
                      Motorcycle
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={size == 2 ? styles.activeBtn : styles.inactiveBtn}
                    onPress={() => setSize(2)}>
                    <MaterialCommunityIconsIcon
                      name="car-sports"
                      style={
                        size == 2 ? styles.activeIcon : styles.inactiveIcon
                      }></MaterialCommunityIconsIcon>
                    <Text
                      style={
                        size == 2 ? styles.activeText : styles.inactiveText
                      }>
                      Compact
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={size == 3 ? styles.activeBtn : styles.inactiveBtn}
                    onPress={() => setSize(3)}>
                    <MaterialCommunityIconsIcon
                      name="car-side"
                      style={
                        size == 3 ? styles.activeIcon : styles.inactiveIcon
                      }></MaterialCommunityIconsIcon>
                    <Text
                      style={
                        size == 3 ? styles.activeText : styles.inactiveText
                      }>
                      Mid Sized
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.oversized1StackStack}>
                  <TouchableOpacity
                    style={size == 4 ? styles.activeBtn : styles.inactiveBtn}
                    onPress={() => setSize(4)}>
                    <MaterialCommunityIconsIcon
                      name="car-estate"
                      style={
                        size == 4 ? styles.activeIcon : styles.inactiveIcon
                      }></MaterialCommunityIconsIcon>
                    <Text
                      style={
                        size == 4 ? styles.activeText : styles.inactiveText
                      }>
                      Large
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={size == 5 ? styles.activeBtn : styles.inactiveBtn}
                    onPress={() => setSize(5)}>
                    <FontAwesomeIcon
                      name="truck"
                      style={
                        size == 5 ? styles.activeIcon : styles.inactiveIcon
                      }></FontAwesomeIcon>
                    <Text
                      style={
                        size == 5 ? styles.activeText : styles.inactiveText
                      }>
                      Oversized
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View> */}
          </>
        )}

        {activeIndex == 8 && (
          <>
            <Text style={styles.heading}>Tell us your Vehicle Color</Text>
            <Input
              placeholder="Color"
              placeholderTextColor="rgba(214,214,214,1)"
              value={color}
              onChangeText={(input) => setColor(input)}
              validate={validate}
              style={styles.placeholder2}
            />

            <MaterialButtonPrimary
              onPress={onSubmitHandler}
              caption="ADD VEHICLE"
              style={styles.materialButtonPrimary}
            />
          </>
        )}
      </ScrollView>

      {activeIndex != 8 && <NextButton onPress={onSubmitHandler} />}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    minHeight: Dimensions.get('window').height,
    zIndex: 0,
    paddingVertical: 80
  },
  addAVehicle: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24,
    marginTop: 22,
    marginLeft: 26
  },
  heading: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 10
  },
  addPhotoBtn: {
    borderColor: '#0b4094',
    borderWidth: 2,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 6,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  addPhotoBtnText: {
    color: '#0b4094',
    fontWeight: '700',
    fontSize: 16
  },
  imageList: {},
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10
  },
  pickerContainer: {
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    marginBottom: 10
  },
  picker: {
    width: '100%'
    // marginVertical: 10,
    // fontSize: 18,
  },
  button: {
    width: 326,
    height: 178,
    borderWidth: 1,
    borderColor: 'rgba(221,219,219,1)',
    marginTop: 28,
    marginLeft: 26
  },
  icon: {
    color: 'rgba(214,214,214,1)',
    fontSize: 56,
    height: 61,
    width: 56,
    marginTop: 37,
    marginLeft: 134
  },
  uploadImage: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(214,214,214,1)',
    fontSize: 20,
    marginTop: 7,
    marginLeft: 102
  },
  licensePlate: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 49,
    width: 326,
    fontSize: 20,
    marginTop: 18,
    marginLeft: 26
  },
  searchResults: {},
  searchResultText: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6',
    fontSize: 16
  },
  button2: {
    width: 326,
    height: 51,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginTop: 11,
    marginLeft: 26
  },
  vehicleType: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(214,214,214,1)',
    fontSize: 20,
    marginTop: 14,
    marginLeft: 1
  },
  button3: {
    width: 326,
    height: 51,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginTop: 13,
    marginLeft: 26
  },
  make: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(214,214,214,1)',
    fontSize: 20,
    marginTop: 14,
    marginLeft: 1
  },
  button4: {
    width: 326,
    height: 51,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginTop: 13,
    marginLeft: 26
  },
  model: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(214,214,214,1)',
    fontSize: 20,
    marginTop: 14,
    marginLeft: 2
  },
  placeholder: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 51,
    width: 326,
    fontSize: 20,
    marginTop: 15,
    marginLeft: 26
  },
  vehicleSize: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 20
  },
  loremIpsum: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    textDecorationLine: 'underline',
    fontSize: 15,
    marginTop: 15
  },
  vehicleSizeRow: {
    height: 25,
    flexDirection: 'row',
    marginTop: 32,
    marginLeft: 26,
    marginRight: 21
  },
  rect: {
    top: 0,
    left: 1,
    width: 327,
    height: 201,
    position: 'absolute'
  },
  button5: {
    width: 103,
    height: 96,
    backgroundColor: 'rgba(39,170,225,0.3)'
  },
  icon2: {
    color: 'rgba(39,170,225,1)',
    fontSize: 40,
    height: 40,
    width: 51,
    marginTop: 17,
    marginLeft: 28
  },
  motorcycle: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 13,
    marginTop: 5,
    marginLeft: 20
  },
  button6: {
    width: 103,
    height: 96,
    backgroundColor: 'rgba(39,170,225,0.3)',
    marginLeft: 9
  },
  icon3: {
    top: 0,
    left: 0,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 58,
    height: 63,
    width: 58
  },
  compact: {
    top: 57,
    left: 3,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 13
  },
  icon3Stack: {
    width: 58,
    height: 73,
    marginTop: 5,
    marginLeft: 22
  },
  button7: {
    width: 103,
    height: 96,
    backgroundColor: 'rgba(39,170,225,0.3)',
    marginLeft: 9
  },
  icon4: {
    top: 0,
    left: 0,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 58,
    height: 63,
    width: 58
  },
  midSized: {
    top: 56,
    left: 1,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 13
  },
  icon4Stack: {
    width: 58,
    height: 72,
    marginTop: 8,
    marginLeft: 23
  },
  button5Row: {
    height: 96,
    flexDirection: 'row'
  },
  button8: {
    width: 103,
    height: 96,
    backgroundColor: 'rgba(39,170,225,0.3)',
    marginTop: 8,
    marginLeft: 111
  },
  icon6: {
    color: 'rgba(39,170,225,1)',
    fontSize: 50,
    height: 50,
    width: 50,
    marginTop: 11,
    marginLeft: 26
  },
  oversized: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 13,
    marginTop: 3,
    marginLeft: 25
  },
  button9: {
    top: 104,
    left: 0,
    width: 103,
    height: 96,
    position: 'absolute',
    backgroundColor: 'rgba(39,170,225,0.3)'
  },
  icon5: {
    top: 0,
    left: 0,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 58,
    height: 63,
    width: 58
  },
  large: {
    top: 55,
    left: 12,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 13
  },
  icon5Stack: {
    width: 58,
    height: 71,
    marginTop: 8,
    marginLeft: 23
  },
  rectStack: {
    width: 328,
    height: 201,
    marginTop: 21,
    marginLeft: 27
  },
  placeholder2: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 51,
    width: 327,
    fontSize: 20,
    marginTop: 29,
    marginLeft: 28
  },
  materialButtonPrimary: {
    width: 170,
    // height: 40,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10
    },
    elevation: 20,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 75,
    alignSelf: 'center',
    backgroundColor: '#0b4094',
    paddingVertical: 15,
    borderRadius: 10
  },
  rect6Stack: {
    width: '100%',
    // height: 201,
    marginTop: 28
    // marginLeft: 25,
  },
  rect6: {
    width: '100%'
    // height: 201,
    // position: 'absolute',
  },
  motorcycle1StackStackRow: {
    height: 96,
    flexDirection: 'row'
  },
  oversized1StackStack: {
    width: 103,
    height: 96,
    marginTop: 25,
    flexDirection: 'row'
  },
  activeBtn: {
    width: 120,
    height: 110,
    backgroundColor: 'rgba(39,170,225,1)',
    // marginLeft: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  activeText: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    fontSize: 13
  },
  activeIcon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 58
    // height: 63,
    // width: 58,
  },
  inactiveBtn: {
    width: 120,
    height: 110,
    backgroundColor: 'rgba(39,170,225,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  inactiveText: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 11
  },
  inactiveIcon: {
    color: 'rgba(39,170,225,1)',
    fontSize: 60
    // height: 65,
    // width: 49,
  }
});

export default connect(null, { addVehicle })(AddVehicle);
