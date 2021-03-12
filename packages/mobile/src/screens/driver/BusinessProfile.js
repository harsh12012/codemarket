/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useCRUDVehicle } from '@parkyourself-frontend/shared/hooks/vehicle';
import { connect, useSelector } from 'react-redux';
import {
    useGetUserBusinessProfile,
    useCRUDBusinessProfile
  } from '@parkyourself-frontend/shared/hooks/driver';
import colors from '@parkyourself-frontend/shared/config/colors';
import { Picker } from '@react-native-community/picker';
import { isEmptyObject } from '@parkyourself-frontend/shared/utils/emptyObject';
import { Auth } from 'aws-amplify';
import AddVehicleModal from '../../components/vehicle/AddVehicleModal';
import { countryCodes } from '../../constants/countryCodes';
import { menu, icons, buttons } from '../../styles/Styles';

function BusinessProfile({navigation}){
    const {
        allData: { vehicles },
        payload,
        setPayload,
        disabled,
        deleteVehicleHandler,
        addVehicleHandler
      } = useCRUDVehicle();

      const [showBusinessForm, setShowBusinessForm] = useState(false);
      const [formEdit, setFormEdit] = useState({
        businessProfile: false,
        userProfile: false
      });
      const [showVehicles, setShowVehicles] = useState(false);
      const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
      const [editBusinessProfile, setEditBusinessProfile] = useState(false);
      const [bprofileData, setbProfileData] = useState({});
      const userData = useSelector(({ auth }) => auth.data.attributes);
      const { email, name, sub } = userData;
      const {
        handleValidateBusinessProfileAndCreate,
        handleDeleteBusinessProfile,
        getUserBusinessProfile,
        handleUpdateBusinessProfile
      } = useCRUDBusinessProfile();
      const [businessProfileState, setbusinessProfileState] = useState({
        businessEmail: '',
        businessMobile: '',
        businessName: '',
        businessMobileCode: '+1'
      });
      const [businessErrVal, setbusinessErrVal] = useState({
        businessEmail: false,
        businessMobile: false,
        businessName: false,
        businessMobileCode: false
      });
      const navigationHandler = (screen) => {
        navigation.navigate(screen);
      };
      const handleBusinessProfileInputChange = (key, value) => {
        setbusinessProfileState({
          ...businessProfileState,
          [key]: value
        });
      };
      const createBusinessProfileHandler = async () => {
        if (formEdit.businessProfile) {
          // console.log(businessProfileState, sub, bprofileData['_id']);
          const { data, error } = await handleUpdateBusinessProfile(
            businessProfileState,
            sub,
            bprofileData['_id']
          );
          if (error) {
            // console.log(error);
          } else {
            // console.log(data);
            setbProfileData(data);
            setbusinessProfileState({
              businessEmail: data.businessEmail,
              businessMobile: data.businessMobile,
              businessName: data.businessName,
              businessMobileCode: data.businessMobileCode
            });
            setEditBusinessProfile(false);
          }
        } else {
          const { data, error, errorFields } = await handleValidateBusinessProfileAndCreate(
            businessProfileState,
            sub
          );
    
          if (error) {
            console.log('Failed', errorFields);
            setbusinessErrVal(errorFields);
          } else {
            console.log(data);
            setbProfileData(data);
            setEditBusinessProfile(false);
            handleResetErrValues();
          }
        }
      };
      const { data, loading, error } = getUserBusinessProfile();
      const handleResetErrValues = () => {
        setbusinessErrVal({
          businessEmail: false,
          businessMobile: false,
          businessName: false,
          businessMobileCode: false
        });
      };
    
      const deleteBusinessProfileHandler = async () => {
        const { data, error } = await handleDeleteBusinessProfile(bprofileData['_id']);
        if (data) {
          setbProfileData({});
          console.log(data);
        } else {
          console.log(error);
        }
      };

      useEffect(() => {
        if (data && data.getUserBusinessProfile) {
          console.log('called');
          setbProfileData(data.getUserBusinessProfile);
          setbusinessProfileState({
            businessEmail: data.getUserBusinessProfile.businessEmail,
            businessMobile: data.getUserBusinessProfile.businessMobile,
            businessName: data.getUserBusinessProfile.businessName,
            businessMobileCode: data.getUserBusinessProfile.businessMobileCode
          });
        }
      }, [data]);

    return (
      <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileFeatureWrapper}>
                <TouchableOpacity 
                  style={styles.featureWrapperInner} 
                  onPress={() => {
                      setShowBusinessForm(!showBusinessForm);
                      setEditBusinessProfile(false);
                  }}
                >
                  <View style={menu.wrapperInner}>
                      <SimpleLineIconsIcon name="briefcase" style={icons.menuLabelIcon} />
                      { isEmptyObject(bprofileData) ? <Text style={menu.text}>Create business profile</Text> : <Text style={menu.text}>Driver Business Profile</Text> }
                  </View>
                </TouchableOpacity>
                {showBusinessForm &&
                ((!editBusinessProfile && (
                    <View style={styles.form}>
                    {!isEmptyObject(bprofileData) ? (
                        <>
                        <Text style={styles.inputText}>
                            {bprofileData ? bprofileData.businessName : ''}
                        </Text>
                        <Text style={styles.inputText}>
                            {bprofileData ? bprofileData.businessEmail : ''}
                        </Text>
                        <Text style={styles.inputText}>
                            {bprofileData
                            ? `${bprofileData.businessMobileCode} ${bprofileData.businessMobile}`
                            : ''}
                        </Text>
                        <View style={styles.placeholderStack}>
                            <TouchableOpacity
                            style={buttons.save}
                            onPress={() =>{
                                setEditBusinessProfile(true)
                                setFormEdit({
                                ...formEdit,
                                businessProfile: true
                                });
                            }}
                            >
                            <Text style={buttons.text}>Change</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={buttons.delete}
                            onPress={deleteBusinessProfileHandler}
                            >
                            <Text style={buttons.text}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        </>
                    ) : (
                        <TouchableOpacity
                        style={buttons.create}
                        onPress={() => setEditBusinessProfile(true)}
                        >
                        <Text style={buttons.text}>Create a business profile</Text>
                        </TouchableOpacity>
                    )}
                    </View>
                )) ||
                    (editBusinessProfile && (
                    <View style={styles.form}>
                        <TextInput
                        placeholder="Business Name"
                        placeholderTextColor="rgba(211,211,211,1)"
                        defaultValue={
                            bprofileData ? bprofileData.businessName : businessProfileState.businessName
                        }
                        style={businessErrVal.businessName ? styles.requiredInput : styles.textInput}
                        onChangeText={(text) => handleBusinessProfileInputChange('businessName', text)}
                        />
                        <TextInput
                        placeholder="Business Email"
                        placeholderTextColor="rgba(211,211,211,1)"
                        defaultValue={
                            bprofileData ? bprofileData.businessEmail : businessProfileState.businessEmail
                        }
                        style={businessErrVal.businessEmail ? styles.requiredInput : styles.textInput}
                        onChangeText={(text) => handleBusinessProfileInputChange('businessEmail', text)}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View 
                            style={[styles.textInput,{ marginRight: 10 }]}
                        >
                            <Picker
                            mode="dialog"
                            selectedValue={businessProfileState.businessMobileCode}
                            style={{ width: 100 }}
                            onValueChange={(itemValue, itemIndex) => {
                                handleBusinessProfileInputChange('businessMobileCode', itemValue);
                                console.log(itemValue, typeof itemValue);
                            }}
                            >
                            {countryCodes.map((item) => {
                                return <Picker.Item label={item.code} value={item.code} key={item.code} />;
                            })}
                            </Picker>
                        </View>
                        <TextInput
                            placeholder="Mobile Number"
                            placeholderTextColor="rgba(211,211,211,1)"
                            defaultValue={bprofileData ? bprofileData.businessMobile : ''}
                            keyboardType="numeric"
                            style={[
                            businessErrVal.businessMobile ? styles.requiredInput : styles.textInput,
                            { flex: 1 }
                            ]}
                            onChangeText={(text) => handleBusinessProfileInputChange('businessMobile', text)}
                        />
                        </View>

                        <View style={styles.placeholderStack}>
                        {/* <TextInput placeholder="Password" placeholderTextColor="rgba(211,211,211,1)" /> */}
                        <TouchableOpacity
                            style={buttons.cancel}
                            onPress={() => {
                            setEditBusinessProfile(false);
                            handleResetErrValues();
                            }}
                        >
                            <Text style={buttons.text}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={buttons.save} 
                            onPress={createBusinessProfileHandler}
                        >
                            <Text style={buttons.text}>Save</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    )))}
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
                <TouchableOpacity style={styles.featureWrapper2} onPress={() => setShowVehicles(!showVehicles)}>
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
    profileFeatureWrapper: {
      paddingVertical: 12,
      marginLeft: 10,
      marginRight: 10,
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
      paddingTop: 10,
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
      paddingTop: 15,
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

export default BusinessProfile;