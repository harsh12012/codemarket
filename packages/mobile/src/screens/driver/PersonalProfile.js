/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '@parkyourself-frontend/shared/config/colors';
import { useCRUDVehicle } from '@parkyourself-frontend/shared/hooks/vehicle';
import { Auth } from 'aws-amplify';
import { connect, useSelector } from 'react-redux';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AddVehicleModal from '../../components/vehicle/AddVehicleModal';
import { menu, icons, buttons } from '../../styles/Styles';

function PersonalProfile({navigation}){
    const {
        allData: { vehicles },
        payload,
        setPayload,
        disabled,
        deleteVehicleHandler,
        addVehicleHandler
    } = useCRUDVehicle();

    const [showPersonalForm, setShowPersonalForm] = useState(false);
    const [showVehicles, setShowVehicles] = useState(false);
    const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
    const userData = useSelector(({ auth }) => auth.data.attributes);
    const { email, name, sub } = userData;
    const [userProfile, setUserProfile] = useState({
        name
    });
    const navigationHandler = (screen) => {
        navigation.navigate(screen);
    };
    const userProfileSubmitHandler = async() =>{
        if(userProfile.name === name){
          console.log("same username")
          setShowPersonalForm(false)
        }else{
          try {
              const user = await Auth.currentAuthenticatedUser();
              const res =  await Auth.updateUserAttributes(user, {name:name });
              console.log(res)
              setShowPersonalForm(false)
          } catch (error) {
              console.log(error)
          }
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileFeatureWrapper}>
                <TouchableOpacity style={styles.wrapperNoBorder} onPress={() => setShowPersonalForm(!showPersonalForm)}>
                    <View style={menu.wrapperInner}>
                        <MaterialIcons name="person" style={icons.menuLabelIcon} />
                        <Text style={menu.text}>Driver Personal Profile</Text>
                    </View>
                    {/* <MaterialIcons name="create" style={icons.menuLabelIcon} /> */}
                </TouchableOpacity>
                {showPersonalForm &&
                (
                <View style={styles.form}>
                    {/* <TextInput placeholder="First Name" placeholderTextColor="rgba(211,211,211,1)" style={styles.textInput}/>
                    <TextInput placeholder="Last Name" placeholderTextColor="rgba(211,211,211,1)" style={styles.textInput}/> */}
                    <TextInput
                      placeholder="Name"
                      placeholderTextColor="rgba(211,211,211,1)"
                      style={styles.textInput}
                      value={userProfile.name}
                      onChangeText={(text) => setUserProfile({...userProfile,name:text})}
                    />
                    <View style={styles.placeholderStack}>
                        <TouchableOpacity
                          style={buttons.cancel}
                          onPress={() => setShowPersonalForm(false)}
                        >
                        <Text style={buttons.text}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={buttons.save} 
                          onPress={userProfileSubmitHandler}
                        >
                        <Text style={buttons.text}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                    )}
            </View>
            {/* <View style={menu.wrapperNoBorder}>
                <Text style={styles.btnText1}>{ profileType === 'personal' ? 'Switch to Business Profile' : 'Switch to Personal Profile' }</Text>
                <Switch
                trackColor={{false: '#b2b2b2', true: colors.secondary}}
                thumbColor="white"
                ios_backgroundColor="#b2b2b2"
                onValueChange={() => toggleProfileType()}
                value={profileType === 'personal'}
                />
            </View> */}
            <View style={styles.profileFeatureWrapper}>
                <TouchableOpacity style={styles.wrapperNoBorder} onPress={() => setShowVehicles(!showVehicles)}>
                <View style={menu.wrapperInner}>
                    <FontAwesomeIcon name="car" style={icons.menuLabelIcon} />
                    <Text style={menu.text}>Vehicles</Text>
                </View>
                </TouchableOpacity>
                {showVehicles && (
                <View style={styles.form}>
                    {vehicles &&
                    vehicles.map((item) => (
                        <View style={styles.vehicle} key={item._id}>
                        <Text style={styles.vehicleName}>
                            {`${item.year} ${item.make} ${item.model}`}
                        </Text>
                        <View style={styles.iconBtnRow}>
                            <TouchableOpacity
                              onPress={() => {
                                setPayload({ ...payload, ...item, id: item._id, mobile: true, edit: true });
                                setShowAddVehicleModal(true);
                              }}
                              style={styles.iconBtn}
                            >
                            <EvilIconsIcon name="pencil" size={28} color="#888" />
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => deleteVehicleHandler(item._id)}
                              style={styles.iconBtn}
                            >
                            <EvilIconsIcon name="trash" size={28} color="#888" />
                            </TouchableOpacity>
                        </View>
                        </View>
                    ))}
                    <AddVehicleModal
                      visible={showAddVehicleModal}
                      onHide={() => setShowAddVehicleModal(false)}
                      payload={payload}
                      setPayload={setPayload}
                      addVehicleHandler={addVehicleHandler}
                      disabled={disabled}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setPayload({
                        id: '',
                        mobile: true,
                        edit: false,
                        licensePlate: 'licensePlate',
                        type: 'type',
                        make: 'make',
                        model: 'model',
                        year: '2021',
                        size: 'Large',
                        color: 'red',
                        image: '',
                        imageFile: null
                        });
                        setShowAddVehicleModal(true);
                      }}
                      style={styles.addVehicleBtn}
                    >
                    <EntypoIcon name="circle-with-plus" style={styles.addVehicleIcon} />
                    <Text style={styles.addVehicle}>Add New Vehicles</Text>
                    </TouchableOpacity>
                </View>
                )}
            </View>
            <TouchableOpacity
              style={menu.wrapperNoBorder}
              onPress={() => {
                navigationHandler('Payments');
              }}
            >
                <View style={menu.wrapperInner}>
                <FontAwesomeIcon name="credit-card" style={icons.menuLabelIcon} />
                <Text style={menu.text}>Payment</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={menu.wrapperNoBorder}
              onPress={() => {
                navigationHandler('MyReviews');
              }}
            >
                <View style={menu.wrapperInner}>
                <FontAwesomeIcon name="star-o" style={icons.menuLabelIcon} />
                <Text style={menu.text}>Reviews</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={menu.wrapperNoBorder}>
                <View style={menu.wrapperInner}>
                <FeatherIcon name="gift" style={icons.menuLabelIcon} />
                <Text style={menu.text}>Send a Gift</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={menu.wrapperNoBorder}
              onPress={() => {
                navigationHandler('ReferFriend');
              }}
            >
                <View style={menu.wrapperInner}>
                <FontAwesome5Icon name="hands-helping" style={icons.menuLabelIcon} />
                <Text style={menu.text}>Refer a Friend</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={menu.wrapperNoBorder}
              onPress={() => {
                navigationHandler('FAQ');
              }}
            >
                <View style={menu.wrapperInner}>
                <FeatherIcon name="help-circle" style={icons.menuLabelIcon} />
                <Text style={menu.text}>FAQs</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 10,
      minHeight: '100%'
    },
    wrapperNoBorder: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 14,
      alignItems: 'center'
  },
    profileFeatureWrapper: {
      marginLeft: 10,
      marginRight: 10
    },
    featureWrapper2: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    featureWrapperInner: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    textInput: {
      fontSize: 17,
      color: 'black',
      fontFamily: 'Montserrat-Medium',
      borderColor: '#CECECE',
      borderWidth: 1,
      paddingLeft: 15,
      marginBottom: 15,
      borderRadius: 5
    },
    btnText1: {
      fontFamily: 'Montserrat-Medium',
      color: '#121212',
      fontSize: 20
    },
    addVehicleIcon: {
      color: colors.secondary,
      fontSize: 25,
      maxHeight: 26,
      maxWidth: 29
    },
    addVehicle: {
      color: colors.secondary,
      fontSize: 18,
      marginLeft: 15,
      fontFamily: 'Montserrat-Medium'
    },
    addVehicleBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
    },
    vehicle: {
      padding: 10,
      borderBottomColor: '#c2c2c2',
      borderBottomWidth: 0.5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    vehicleName: {
      fontSize: 18,
      fontFamily: 'Montserrat-Regular'
    },
    iconBtnRow: {
      flexDirection: 'row'
    },
    iconBtn: {
      marginHorizontal: 5
    },
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    profileColumn: {
      marginLeft: 19
    },
    form: {
      paddingHorizontal: 15,
      paddingVertical: 15,
    },
    placeholderStack: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    requiredInput:{
      fontSize: 17,
      color: 'black',
      fontFamily: 'Montserrat-Medium',
      borderColor: 'red',
      borderWidth: 1,
      paddingLeft: 10,
      marginBottom: 15,
      borderRadius: 5
    },
    inputText: {
      fontSize: 17,
      color: '#121212',
      marginBottom: 15,
      fontFamily: 'Montserrat-Medium'
    }
});

export default PersonalProfile;