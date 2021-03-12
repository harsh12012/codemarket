import React, { Component, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Dimensions
} from 'react-native';
import { tempListingSpaceD } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import PropTypes from 'prop-types';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioButton from '../../components/RadioButton';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialButtonPrimary from '../../components/MaterialButtonPrimary';
import VehicleSizesModal from '../../components/SpaceOwner/VehicleSizesModal';
import { addListingSpaceDetails } from '../../actions/listing';
import { connect } from 'react-redux';
import { Picker } from '@react-native-community/picker';
import AddListingHeader from '../../components/SpaceOwner/AddListingHeader';
import Input from '../../components/Input';
import RadioListItem from '../../components/RadioListItem';
import { parse } from 'react-native-svg';

function AddListingSpaceDetails({
  onBackButtonPress,
  onNextButtonPress,
  spaceDetails,
  addListingSpaceDetails,
  tempListingSpaceD,
  navigation,
  activeIndex,
  setActiveIndex,
  validated
}) {
  const scrollRef = useRef();

  // const [activeIndex, setActiveIndex] = useState(1);

  const [visible, setVisible] = useState(false);

  // const [validated, setvalidated] = useState(false);

  // const [vehicleHeightLimit, setVehicleHeightLimit] = useState(
  //   spaceDetails && spaceDetails.vehicleHeightLimit ? spaceDetails.vehicleHeightLimit : ''
  // );
  // const [sameSizeSpaces, setSameSizeSpaces] = useState(
  //   spaceDetails && spaceDetails.sameSizeSpaces ? spaceDetails.sameSizeSpaces : false
  // );
  // const [motorcycle, setMotorcycle] = useState(
  //   spaceDetails && spaceDetails.vehicleSizes ? spaceDetails.vehicleSizes.motorcycle : false
  // );
  // const [compact, setCompact] = useState(
  //   spaceDetails && spaceDetails.vehicleSizes ? spaceDetails.vehicleSizes.compact : false
  // );
  // const [midsized, setMidSized] = useState(
  //   spaceDetails && spaceDetails.vehicleSizes ? spaceDetails.vehicleSizes.midsized : false
  // );
  // const [large, setLarge] = useState(
  //   spaceDetails && spaceDetails.vehicleSizes ? spaceDetails.vehicleSizes.large : false
  // );
  // const [oversized, setOversized] = useState(
  //   spaceDetails && spaceDetails.vehicleSizes ? spaceDetails.vehicleSizes.oversized : false
  // );
  // const [visible, setVisible] = useState(false);
  // const [motorcycleSpaces, setMotorcycleSpaces] = useState(
  //   spaceDetails && spaceDetails.motorcycleSpaces ? spaceDetails.motorcycleSpaces : ''
  // );
  // const [compactSpaces, setCompactSpaces] = useState(
  //   spaceDetails && spaceDetails.compactSpaces ? spaceDetails.compactSpaces : ''
  // );
  // const [midsizedSpaces, setMidsizedSpaces] = useState(
  //   spaceDetails && spaceDetails.midsizedSpaces ? spaceDetails.midsizedSpaces : ''
  // );
  // const [largeSpaces, setLargeSpaces] = useState(
  //   spaceDetails && spaceDetails.largeSpaces ? spaceDetails.largeSpaces : ''
  // );
  // const [oversizedSpaces, setOversizedSpaces] = useState(
  //   spaceDetails && spaceDetails.oversizedSpaces ? spaceDetails.oversizedSpaces : ''
  // );
  // const [isLabelled, setIsLabelled] = useState(
  //   spaceDetails && spaceDetails.isLabelled ? spaceDetails.isLabelled : true
  // );
  // const [spaceLabels, setSpaceLabels] = useState(
  //   spaceDetails && spaceDetails.spaceLabels ? spaceDetails.spaceLabels : []
  // );
  // const [aboutSpace, setAboutSpace] = useState(
  //   spaceDetails && spaceDetails.aboutSpace ? spaceDetails.aboutSpace : ''
  // );
  // const [accessInstructions, setAccessInstructions] = useState(
  //   spaceDetails && spaceDetails.accessInstructions ? spaceDetails.accessInstructions : ''
  // );

  // const setParkingSpaceInputs = (qty) => {
  //   var num = parseInt(qty);
  //   let arr = [];
  //   for (let i = 0; i < num; i++) {
  //     arr.push({
  //       id: i + 1,
  //       label: '',
  //       largestSize: oversized
  //         ? 'Over Sized'
  //         : large
  //         ? 'Large'
  //         : midsized
  //         ? 'Mid Sized'
  //         : compact
  //         ? 'Compact'
  //         : 'Motorcycle'
  //     });
  //   }
  //   setSpaceLabels(arr);
  // };

  const setLabelById = (idx, label) => {
    setSpaceLabels(
      spaceLabels.map((item, index) => (index == idx ? { ...item, label: label } : { ...item }))
    );
  };

  const setLabel = (label, idx) => {
    tempListingSpaceD({
      spaceLabels: spaceDetails.spaceLabels.map((item, index) =>
        index == idx ? { ...item, label: label } : item
      )
    });
    console.log('spaceDetails.spaceLabels', spaceDetails.spaceLabels);
  };

  const setLargestSizeById = (idx, size) => {
    setSpaceLabels(
      spaceLabels.map((item, index) =>
        index == idx ? { ...item, largestSize: size } : { ...item }
      )
    );
  };

  const checkAllSpaceLabels = () => {
    var flag = true;
    spaceDetails.spaceLabels.forEach((item) => {
      if (item.label === '') {
        flag = false;
      }
    });
    return flag;
  };

  // const backButtonHandler = () => {
  //   if (activeIndex != 1) {
  //     setActiveIndex(activeIndex - 1);
  //     scrollRef.current.scrollTo({
  //       y: 0,
  //       animated: true
  //     });
  //     setWidth(width - 20);
  //   } else {
  //     onBackButtonPress();
  //   }
  // };

  // const onSubmitHandler = () => {
  //   try {
  //     if (
  //       (activeIndex === 6 && spaceDetails.qtyOfSpaces) ||
  //       activeIndex === 7 ||
  //       (activeIndex === 8 &&
  //         (spaceDetails.motorcycle ||
  //           spaceDetails.compact ||
  //           spaceDetails.midsized ||
  //           spaceDetails.large ||
  //           spaceDetails.oversized) &&
  //         (sameSizeSpaces || spacesSum === qtyOfSpaces)) ||
  //       (activeIndex === 9 && (!spaceDetails.isLabelled || checkAllSpaceLabels())) ||
  //       (activeIndex === 10 && spaceDetails.aboutSpace) ||
  //       (activeIndex === 11 && spaceDetails.accessInstructions)
  //     ) {
  //       setvalidated(false);
  //       setActiveIndex(activeIndex + 1);
  //       scrollRef.current.scrollTo({
  //         y: 0,
  //         animated: true
  //       });
  //       // setWidth(width + 20);
  //     } else {
  //       setvalidated(true);
  //     }
  //     // } else {
  //     //   if (spaceDetails.accessInstructions) {
  //     //     // let spaceDetails = {
  //     //     //   spaceType: parkingSpaceType,
  //     //     //   qtyOfSpaces,
  //     //     //   sameSizeSpaces,
  //     //     //   vehicleHeightLimit,
  //     //     //   vehicleSizes: {
  //     //     //     motorcycle: motorcycle,
  //     //     //     compact: compact,
  //     //     //     midsized: midsized,
  //     //     //     large: large,
  //     //     //     oversized: oversized,
  //     //     //   },
  //     //     //   motorcycleSpaces,
  //     //     //   compactSpaces,
  //     //     //   midsizedSpaces,
  //     //     //   largeSpaces,
  //     //     //   oversizedSpaces,
  //     //     //   isLabelled,
  //     //     //   spaceLabels,
  //     //     //   aboutSpace,
  //     //     //   accessInstructions,
  //     //     // };
  //     //     // addListingSpaceDetails(spaceDetails);
  //     //     onNextButtonPress();
  //     //   } else {
  //     //     setvalidated(true);
  //     //   }
  //     // }
  //   } catch (error) {
  //     Alert.alert('Something Went wrong!', 'Unable to add space details');
  //   }
  // };

  const {
    parkingSpaceType,
    qtyOfSpaces,
    heightRestriction,
    height1,
    height2,
    sameSizeSpaces,
    largestSize,
    motorcycle,
    compact,
    midsized,
    large,
    oversized,
    motorcycleSpaces,
    compactSpaces,
    midsizedSpaces,
    largeSpaces,
    oversizedSpaces,
    isLabelled,
    spaceLabels,
    aboutSpace,
    accessInstructions
  } = spaceDetails;

  const spacesSum =
    parseInt(spaceDetails.motorcycleSpaces) +
    parseInt(spaceDetails.compactSpaces) +
    parseInt(spaceDetails.midsizedSpaces) +
    parseInt(spaceDetails.largeSpaces) +
    parseInt(spaceDetails.oversizedSpaces);
  return (
    <>
      <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
        {activeIndex === 6 && (
          <>
            <Text style={styles.heading}>Choose a Parking Space type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={spaceDetails.parkingSpaceType}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  tempListingSpaceD({ parkingSpaceType: itemValue })
                }>
                <Picker.Item label="Tandem" value="Tandem" />
                <Picker.Item label="Side by Side" value="Side by Side" />
              </Picker>
            </View>

            <Input
              placeholder="Total Quantity of Parking Spaces"
              placeholderTextColor="rgba(182,182,182,1)"
              value={spaceDetails.qtyOfSpaces ? spaceDetails.qtyOfSpaces.toString() : ''}
              validated={validated}
              keyboardType="number-pad"
              onChangeText={(input) =>
                tempListingSpaceD({
                  qtyOfSpaces: input == '' ? 0 : parseInt(input),
                  spaceLabels: [],
                  isLabelled: false,
                  motorcycleSpaces: 0,
                  compactSpaces: 0,
                  midsizedSpaces: 0,
                  largeSpaces: 0,
                  oversizedSpaces: 0
                })
              }
              style={styles.textInput}
            />
            {qtyOfSpaces > 1 && (
              <>
                <Text style={styles.heading}>Are all parking spaces of same size?</Text>
                <RadioListItem
                  label="Yes"
                  checked={spaceDetails.sameSizeSpaces}
                  onPress={() =>
                    tempListingSpaceD({
                      sameSizeSpaces: !spaceDetails.sameSizeSpaces
                    })
                  }
                />
                <RadioListItem
                  label="No, some are different"
                  checked={!spaceDetails.sameSizeSpaces}
                  onPress={() =>
                    tempListingSpaceD({
                      sameSizeSpaces: !spaceDetails.sameSizeSpaces
                    })
                  }
                />
              </>
            )}
          </>
        )}
        {/* {activeIndex === 80 && (
          <>
            <Text style={styles.heading}>Are all parking spaces of same size?</Text>
            <RadioListItem
              label="Yes"
              checked={spaceDetails.sameSizeSpaces}
              onPress={() =>
                tempListingSpaceD({
                  sameSizeSpaces: !spaceDetails.sameSizeSpaces
                })
              }
            />
            <RadioListItem
              label="No, some are different"
              checked={!spaceDetails.sameSizeSpaces}
              onPress={() =>
                tempListingSpaceD({
                  sameSizeSpaces: !spaceDetails.sameSizeSpaces
                })
              }
            />
            <RadioListItem
              label="No Height Restriction"
              checked={!spaceDetails.heightRestriction}
              onPress={() =>
                tempListingSpaceD({
                  heightRestriction: !spaceDetails.heightRestriction
                })
              }
            />
            {spaceDetails.heightRestriction && (
              <>
                <View style={styles.phone}>
                  <Input
                    placeholder="Height"
                    placeholderTextColor="rgba(182,182,182,1)"
                    style={styles.placeholder}
                    value={spaceDetails.height1.value.toString()}
                    keyboardType="number-pad"
                    validated={validated}
                    onChangeText={(input) =>
                      tempListingSpaceD({
                        height1: { ...spaceDetails.height1.value, value: input }
                      })
                    }
                  />
                  <Picker
                    selectedValue={spaceDetails.height1.unit}
                    style={{ width: 120, marginTop: 0 }}
                    onValueChange={(itemValue) =>
                      tempListingSpaceD({
                        height1: {
                          ...spaceDetails.height1.value,
                          unit: itemValue
                        }
                      })
                    }>
                    <Picker.Item label="feet" value="feet" />
                    <Picker.Item label="meters" value="meters" />
                  </Picker>
                </View>
                <View style={styles.phone}>
                  <Input
                    placeholder="Height"
                    placeholderTextColor="rgba(182,182,182,1)"
                    style={styles.placeholder}
                    value={spaceDetails.height2.value.toString()}
                    keyboardType="number-pad"
                    validated={validated}
                    onChangeText={(input) =>
                      tempListingSpaceD({
                        height2: { ...spaceDetails.height2.value, value: input }
                      })
                    }
                  />
                  <Picker
                    selectedValue={spaceDetails.height2.unit}
                    style={{ width: 120, marginTop: 0 }}
                    onValueChange={(itemValue) =>
                      tempListingSpaceD({
                        height2: {
                          ...spaceDetails.height2.value,
                          unit: itemValue
                        }
                      })
                    }>
                    <Picker.Item label="inches" value="inches" />
                  </Picker>
                </View>
              </>
            )}
          </>
        )} */}

        {activeIndex === 7 && (
          <>
            <Text style={styles.heading}>Vehicle Sizes</Text>
            <Text style={styles.description}>
              Select the largest vehicle size for your parking spaces
            </Text>
            {!sameSizeSpaces && (
              <>
                <Text style={styles.description}>
                  Sum of Entered Spaces / Total Qty. of Spaces : {spacesSum} /{' '}
                  {spaceDetails.qtyOfSpaces}
                </Text>
                {validated && parseInt(spacesSum) !== parseInt(qtyOfSpaces) && (
                  <Text style={styles.requiredText}>
                    Sum of all spaces must equal the total quantity of spaces
                  </Text>
                )}
              </>
            )}
            <RadioListItem
              label="Motorcycle"
              checked={spaceDetails.motorcycle}
              onPress={() => {
                if (sameSizeSpaces) {
                  tempListingSpaceD({
                    motorcycle: true,
                    compact: false,
                    midsized: false,
                    large: false,
                    oversized: false,
                    largestSize: 'Motorcycle'
                  });
                } else {
                  tempListingSpaceD({
                    motorcycle: !spaceDetails.motorcycle,
                    motorcycleSpaces: spaceDetails.motorcycle ? 0 : spaceDetails.motorcycleSpaces
                  });
                }
              }}
            />
            {!spaceDetails.sameSizeSpaces && spaceDetails.motorcycle && (
              <Input
                placeholder="Motorcycle Spaces"
                placeholderTextColor="rgba(182,182,182,1)"
                value={
                  spaceDetails.motorcycleSpaces == 0 ? '' : spaceDetails.motorcycleSpaces.toString()
                }
                validated={validated}
                keyboardType="number-pad"
                onChangeText={(input) => {
                  tempListingSpaceD({
                    motorcycleSpaces: input == '' ? 0 : input
                  });
                }}
                style={styles.textInput}
              />
            )}
            <RadioListItem
              label="Compact"
              checked={spaceDetails.compact}
              onPress={() => {
                if (sameSizeSpaces) {
                  tempListingSpaceD({
                    motorcycle: false,
                    compact: true,
                    midsized: false,
                    large: false,
                    oversized: false,
                    largestSize: 'Compact'
                  });
                } else {
                  tempListingSpaceD({
                    compact: !spaceDetails.compact,
                    compactSpaces: spaceDetails.compact ? 0 : spaceDetails.compactSpaces
                  });
                }
              }}
            />
            {!spaceDetails.sameSizeSpaces && spaceDetails.compact && (
              <Input
                placeholder="No of Compact Spaces"
                placeholderTextColor="rgba(182,182,182,1)"
                value={spaceDetails.compactSpaces == 0 ? '' : spaceDetails.compactSpaces.toString()}
                validated={validated}
                keyboardType="number-pad"
                onChangeText={(input) => {
                  tempListingSpaceD({
                    compactSpaces: input == '' ? 0 : input
                  });
                }}
                style={styles.textInput}
              />
            )}
            <RadioListItem
              label="Mid Sized"
              checked={spaceDetails.midsized}
              onPress={() => {
                if (sameSizeSpaces) {
                  tempListingSpaceD({
                    motorcycle: false,
                    compact: false,
                    midsized: true,
                    large: false,
                    oversized: false,
                    largestSize: 'Midsized'
                  });
                } else {
                  tempListingSpaceD({
                    midsized: !spaceDetails.midsized,
                    midsizedSpaces: spaceDetails.midsized ? 0 : spaceDetails.midsizedSpaces
                  });
                }
              }}
            />
            {!spaceDetails.sameSizeSpaces && spaceDetails.midsized && (
              <Input
                placeholder="No of Mid Sized Spaces"
                placeholderTextColor="rgba(182,182,182,1)"
                value={
                  spaceDetails.midsizedSpaces == 0 ? '' : spaceDetails.midsizedSpaces.toString()
                }
                validated={validated}
                keyboardType="number-pad"
                onChangeText={(input) => {
                  tempListingSpaceD({
                    midsizedSpaces: input == '' ? 0 : input
                  });
                }}
                style={styles.textInput}
              />
            )}
            <RadioListItem
              label="Large"
              checked={spaceDetails.large}
              onPress={() => {
                if (sameSizeSpaces) {
                  tempListingSpaceD({
                    motorcycle: false,
                    compact: false,
                    midsized: false,
                    large: true,
                    oversized: false,
                    largestSize: 'Large'
                  });
                } else {
                  tempListingSpaceD({
                    large: !spaceDetails.large,
                    largeSpaces: spaceDetails.large ? 0 : spaceDetails.largeSpaces
                  });
                }
              }}
            />
            {!spaceDetails.sameSizeSpaces && spaceDetails.large && (
              <Input
                placeholder="No of Large Spaces"
                placeholderTextColor="rgba(182,182,182,1)"
                value={spaceDetails.largeSpaces == 0 ? '' : spaceDetails.largeSpaces.toString()}
                validated={validated}
                keyboardType="number-pad"
                onChangeText={(input) => {
                  tempListingSpaceD({
                    largeSpaces: input == '' ? 0 : input
                  });
                }}
                style={styles.textInput}
              />
            )}
            <RadioListItem
              label="Over sized"
              checked={spaceDetails.oversized}
              onPress={() => {
                if (sameSizeSpaces) {
                  tempListingSpaceD({
                    motorcycle: false,
                    compact: false,
                    midsized: false,
                    large: false,
                    oversized: true,
                    largestSize: 'Large'
                  });
                } else {
                  tempListingSpaceD({
                    oversized: !spaceDetails.oversized,
                    oversizedSpaces: spaceDetails.oversized ? 0 : spaceDetails.oversizedSpaces
                  });
                }
              }}
            />
            {!spaceDetails.sameSizeSpaces && spaceDetails.oversized && (
              <Input
                placeholder="No of Over Sized Spaces"
                placeholderTextColor="rgba(182,182,182,1)"
                value={
                  spaceDetails.oversizedSpaces == 0 ? '' : spaceDetails.oversizedSpaces.toString()
                }
                validated={validated}
                keyboardType="number-pad"
                onChangeText={(input) => {
                  tempListingSpaceD({
                    oversizedSpaces: input == '' ? 0 : input
                  });
                }}
                style={styles.textInput}
              />
            )}

            {validated &&
              !(
                spaceDetails.motorcycle ||
                spaceDetails.compact ||
                spaceDetails.midsized ||
                spaceDetails.large ||
                spaceDetails.oversized
              ) && <Text style={styles.requiredText}>Please select at least one vehicle size</Text>}

            <TouchableOpacity onPress={() => setVisible(true)}>
              <Text style={styles.loremIpsum4}>How do I determine my space size?</Text>
            </TouchableOpacity>
            <Modal visible={visible}>
              <VehicleSizesModal onPress={() => setVisible(false)} />
            </Modal>
          </>
        )}
        {activeIndex === 8 && (
          <>
            <Text style={styles.heading}>Are the spaces numbered or labelled ?</Text>
            <RadioListItem
              label="Yes"
              checked={spaceDetails.isLabelled}
              onPress={() => {
                let tSpaceLabels = [];
                for (let i = 0; i < spaceDetails.qtyOfSpaces; i++) {
                  tSpaceLabels.push({
                    label: '',
                    largestSize: spaceDetails.largestSize
                  });
                }

                tempListingSpaceD({
                  isLabelled: !spaceDetails.isLabelled,
                  spaceLabels: tSpaceLabels
                });
              }}
            />
            <RadioListItem
              label="No"
              checked={!spaceDetails.isLabelled}
              onPress={() =>
                tempListingSpaceD({
                  isLabelled: !spaceDetails.isLabelled,
                  spaceLabels: []
                })
              }
            />
            {spaceDetails.isLabelled &&
              spaceDetails.spaceLabels.map((e, i) => (
                <Input
                  key={i}
                  placeholder={`Label ${i + 1}`}
                  placeholderTextColor="rgba(182,182,182,1)"
                  // defaultValue={e.label}
                  value={e.label}
                  validated={validated}
                  onChangeText={(input) => setLabel(input, i)}
                  style={styles.textInput}
                />
              ))}
            {/* {qtyOfSpaces.length > 0 && (
              <>
                <Text style={styles.subHeading}>Enter Space Labels</Text>
                {spaceLabels.map((item, index) => (
                  <View style={styles.rect7} key={item.id}>
                    <Input
                      placeholder="Space Label/Number"
                      placeholderTextColor="rgba(182,182,182,1)"
                      value={item.label}
                      validated={validated}
                      onChangeText={(input) => {
                        setLabelById(index, input);
                      }}
                      style={styles.spaceLabelNumber}></Input>
                    <Picker
                      selectedValue={item.largestSize}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) => {
                        console.log(itemValue);
                        setLargestSizeById(index, itemValue);
                      }}>
                      {motorcycle && (
                        <Picker.Item label="Motorcycle" value="Motorcycle" />
                      )}
                      {compact && (
                        <Picker.Item label="Compact" value="Compact" />
                      )}
                      {midsized && (
                        <Picker.Item label="Mid Sized" value="Mid Sized" />
                      )}
                      {large && <Picker.Item label="Large" value="Large" />}
                      {oversized && (
                        <Picker.Item label="Over Sized" value="Over Sized" />
                      )}
                    </Picker>
                  </View>
                ))}
              </>
            )} */}
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  phone: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    // minHeight: Dimensions.get('window').height,
    // paddingTop: 50,
    paddingBottom: 50,
    paddingTop: 0
  },
  heading: {
    color: 'rgba(11,64,148,1)',
    fontSize: 30,
    fontWeight: '700'
    // marginTop: 30,
    // marginVertical: 20
  },
  subHeading: {
    color: 'rgba(11,64,148,1)',
    fontSize: 20,
    fontWeight: '700'
    // marginTop: 40
  },
  addAListing1: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24
    // marginLeft: 24,
  },
  spaceDetails: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 18,
    marginTop: 17
    // marginLeft: 23,
  },
  parkingSpaceType: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginTop: 22
    // marginLeft: 23,
  },
  pickerContainer: {
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    marginBottom: 10
  },
  rect5: {
    width: 250,
    height: 112,
    flexDirection: 'row',
    marginTop: 23
    // marginLeft: 23,
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
  },
  rect4Row: {
    height: 112,
    flexDirection: 'row',
    flex: 1
  },
  textInput: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    // height: 44,
    width: '100%',
    // marginTop: 22,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    marginBottom: 20
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    marginTop: 17
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20
  },
  materialRadio: {
    height: 30,
    width: 30
  },
  yes: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    marginLeft: 3
    // marginTop: 8,
  },
  required: {
    borderBottomColor: 'red'
  },
  requiredText: {
    color: 'red',
    marginTop: 10,
    fontSize: 13
  },
  materialRadio1: {
    height: 30,
    width: 30,
    marginLeft: 21
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    marginLeft: 3
    // marginTop: 6,
  },
  materialRadioRow: {
    height: 30,
    flexDirection: 'row',
    marginTop: 11,
    // marginLeft: 27,
    marginRight: 100,
    alignItems: 'center'
  },
  textInput1: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    // height: 44,
    width: '100%',
    marginTop: 14,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1
    // marginBottom: 20,
    // marginLeft: 24,
  },
  vehicleSizes: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginTop: 17
    // marginLeft: 27,
  },
  description: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    fontSize: 16,
    lineHeight: 22
    // marginLeft: 27,
  },
  rect6: {
    width: '100%',
    height: 201
    // position: 'absolute',
  },
  motorcycle1: {
    top: 62,
    left: 20,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 13
  },
  button5: {
    top: 0,
    left: 0,
    width: 103,
    height: 96,
    position: 'absolute',
    backgroundColor: 'rgba(39,170,225,0.3)'
  },
  motorcycle1Stack: {
    top: 0,
    left: 0,
    width: 103,
    height: 96,
    position: 'absolute'
  },
  icon9: {
    top: 17,
    left: 28,
    position: 'absolute',
    color: 'rgba(39,170,225,1)',
    fontSize: 40,
    height: 40,
    width: 51
  },
  motorcycle1StackStack: {
    width: 103,
    height: 96
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
  rect6Stack: {
    width: '100%',
    height: 201,
    marginTop: 28
    // marginLeft: 25,
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    textDecorationLine: 'underline',
    marginTop: 50,
    alignSelf: 'center',
    fontSize: 16
  },
  compactCarSpaces: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginTop: 49
    // marginLeft: 25,
  },
  numerOfSpaces: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 51,
    width: '100%',
    fontSize: 16,
    marginTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6'
    // marginLeft: 27,
  },
  largeCarSpaces: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginTop: 18
    // marginLeft: 28,
  },
  numerOfSpaces1: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 51,
    width: '100%',
    fontSize: 16,
    marginTop: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6'
    // marginLeft: 27,
  },
  loremIpsum5: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    marginTop: 20
    // marginLeft: 26,
  },
  materialRadio3: {
    height: 30,
    width: 30
  },
  yes1: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    marginLeft: 3
  },
  materialRadio2: {
    height: 30,
    width: 30,
    marginLeft: 51
  },
  no: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    marginLeft: 5
  },
  materialRadio3Row: {
    height: 30,
    flexDirection: 'row',
    marginTop: 8,
    // marginLeft: 20,
    marginRight: 195
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20
  },
  enterSpaceLabels: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 16,
    marginTop: 39
    // marginLeft: 30,
  },
  picker: {
    width: '100%'
    // marginVertical: 10,
  },
  rect7: {
    width: '100%',
    // height: 110,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 10,
      height: 10
    },
    elevation: 10,
    shadowOpacity: 0.1,
    shadowRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginTop: 24,
    // marginLeft: 21,
    backgroundColor: '#fff',
    padding: 10
  },
  spaceLabelNumber: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 50,
    width: '100%',
    fontSize: 16,
    marginTop: 4,
    // marginLeft: 18,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1
  },
  spaceLabelNumber1: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 50,
    width: '100%',
    fontSize: 16,
    // marginLeft: 19,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1
  },
  spaceLabelNumber2: {
    top: 54,
    left: 19,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 50,
    width: 296,
    fontSize: 16
  },
  rect8: {
    top: 0,
    left: 0,
    width: 335,
    height: 110,
    position: 'absolute',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 10,
      height: 10
    },
    elevation: 120,
    shadowOpacity: 0.1,
    shadowRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)'
  },
  spaceLabelNumber2Stack: {
    top: 0,
    left: 0,
    width: 335,
    height: 110,
    position: 'absolute'
  },
  spaceLabelNumber3: {
    top: 4,
    left: 18,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 50,
    width: 296,
    fontSize: 16
  },
  spaceLabelNumber2StackStack: {
    width: 335,
    height: 110,
    marginTop: 19,
    marginLeft: 21
  },
  spaceLabelNumber4: {
    top: 54,
    left: 19,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 50,
    width: 296,
    fontSize: 16
  },
  rect9: {
    top: 0,
    left: 0,
    width: 335,
    height: 110,
    position: 'absolute',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 10,
      height: 10
    },
    elevation: 120,
    shadowOpacity: 0.1,
    shadowRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)'
  },
  spaceLabelNumber4Stack: {
    top: 0,
    left: 0,
    width: 335,
    height: 110,
    position: 'absolute'
  },
  spaceLabelNumber5: {
    top: 4,
    left: 18,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 50,
    width: 296,
    fontSize: 16
  },
  spaceLabelNumber4StackStack: {
    width: 335,
    height: 110,
    marginTop: 19,
    marginLeft: 21
  },
  spaceLabelNumber6: {
    top: 54,
    left: 19,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 50,
    width: 296,
    fontSize: 16
  },
  rect10: {
    top: 0,
    left: 0,
    width: 335,
    height: 110,
    position: 'absolute',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 10,
      height: 10
    },
    elevation: 120,
    shadowOpacity: 0.1,
    shadowRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)'
  },
  spaceLabelNumber6Stack: {
    top: 0,
    left: 0,
    width: 335,
    height: 110,
    position: 'absolute'
  },
  spaceLabelNumber7: {
    top: 4,
    left: 18,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 50,
    width: 296,
    fontSize: 16
  },
  spaceLabelNumber6StackStack: {
    width: 335,
    height: 110,
    marginTop: 19,
    marginLeft: 21
  },
  spaceLabelNumber8: {
    top: 54,
    left: 19,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 50,
    width: 296,
    fontSize: 16
  },
  rect11: {
    top: 0,
    left: 0,
    width: 335,
    height: 110,
    position: 'absolute',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 10,
      height: 10
    },
    elevation: 120,
    shadowOpacity: 0.1,
    shadowRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)'
  },
  spaceLabelNumber8Stack: {
    top: 0,
    left: 0,
    width: 335,
    height: 110,
    position: 'absolute'
  },
  spaceLabelNumber9: {
    top: 4,
    left: 18,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 50,
    width: 296,
    fontSize: 16
  },
  spaceLabelNumber8StackStack: {
    width: 335,
    height: 110,
    marginTop: 19,
    marginLeft: 21
  },
  loremIpsum6: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    fontSize: 16,
    marginTop: 20
    // marginLeft: 23,
  },
  placeholder: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 183,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginTop: 21,
    padding: 10,
    fontSize: 18
    // marginLeft: 23,
  },
  accessInstructions: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(11,64,148,1)',
    fontSize: 16,
    marginTop: 20
    // marginLeft: 26,
  },
  placeholder1: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 183,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginTop: 19,
    padding: 10
    // marginLeft: 23,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backBtnText: {
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  materialButtonPrimary1: {
    width: 100,
    height: 36,
    marginTop: 69,
    alignSelf: 'center',
    marginBottom: 50
  }
});

const mapStateToProps = ({ tempListing }) => ({
  spaceDetails: tempListing.spaceDetails,
  validated: tempListing.validated
});

export default connect(mapStateToProps, { tempListingSpaceD })(AddListingSpaceDetails);
