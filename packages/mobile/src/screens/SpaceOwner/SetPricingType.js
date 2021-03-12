import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { tempListingPricingD } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import { StyleSheet, View, Text, Switch, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Input from '../../components/Input';
import TipsSettingRatesModal from '../../components/SpaceOwner/TipsSettingRatesModal';

function SetPricingType({
  onBackButtonPress,
  onNextButtonPress,
  pricingDetails,
  tempListingPricingD,
  validated
}) {
  const [visible, setVisible] = useState(false);
  // const [billingType, setBillingType] = useState(
  //   pricingDetails && pricingDetails.pricingType
  //     ? pricingDetails.pricingType == 'Flat'
  //       ? 1
  //       : 0
  //     : 1
  // );

  // const onSubmitHandler = () => {
  //   try {
  //     onNextButtonPress();
  //   } catch (error) {
  //     Alert.alert('Something Went wrong!', 'Unable to set pricing type');
  //   }
  // };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.setPricing}>Set Pricing</Text> */}
      <Text style={styles.heading}>Choose how you want to charge for the bookings</Text>
      <View style={styles.rect}>
        <View style={styles.variableRateColumnRow}>
          <View style={styles.variableRateColumn}>
            <Text style={styles.subHeading}>Variable Rate</Text>
            <Text style={styles.loremIpsum2}>Charge by length of reservation</Text>
          </View>
          <Switch
            value={pricingDetails.pricingType === 'variable'}
            onValueChange={() => tempListingPricingD({ pricingType: 'variable' })}
            trackColor={{
              true: 'rgba(39,170,225,1)',
              false: 'rgba(230, 230, 230,1)'
            }}
            style={styles.switch}
          />
        </View>
      </View>
      <View style={styles.rect}>
        <View style={styles.variableRateColumnRow}>
          <View style={styles.variableRateColumn}>
            <Text style={styles.subHeading}>Flat Rate only</Text>
            <Text style={styles.loremIpsum2}>Charge a flat rate per day</Text>
          </View>
          <Switch
            value={pricingDetails.pricingType === 'flat'}
            onValueChange={() => tempListingPricingD({ pricingType: 'flat' })}
            trackColor={{
              true: 'rgba(39,170,225,1)',
              false: 'rgba(230, 230, 230,1)'
            }}
            style={styles.switch}
          />
        </View>
      </View>
      <View>
        <Text style={styles.heading}>Set your desired rates</Text>
        <Text style={styles.subHeading}>
          {pricingDetails.pricingType === 'flat' ? 'Flat' : 'Variable'} Billing Type
        </Text>
        <Input
          placeholder="Per Hour"
          value={
            pricingDetails.pricingRates.perHourRate === 0
              ? ''
              : pricingDetails.pricingRates.perHourRate.toString()
          }
          validated={validated}
          keyboardType="number-pad"
          onChangeText={(input) =>
            tempListingPricingD({
              pricingRates: {
                ...pricingDetails.pricingRates,
                perHourRate: input
              }
            })
          }
          style={styles.placeholder}
        />
        <Input
          placeholder="Per Day"
          value={
            pricingDetails.pricingRates.perDayRate === 0
              ? ''
              : pricingDetails.pricingRates.perDayRate.toString()
          }
          validated={validated}
          keyboardType="number-pad"
          onChangeText={(input) =>
            tempListingPricingD({
              pricingRates: {
                ...pricingDetails.pricingRates,
                perDayRate: input
              }
            })
          }
          style={styles.placeholder}
        />
        <Input
          placeholder="Per Week"
          value={
            pricingDetails.pricingRates.perWeekRate === 0
              ? ''
              : pricingDetails.pricingRates.perWeekRate.toString()
          }
          validated={validated}
          keyboardType="number-pad"
          onChangeText={(input) =>
            tempListingPricingD({
              pricingRates: {
                ...pricingDetails.pricingRates,
                perWeekRate: input
              }
            })
          }
          style={styles.placeholder}
        />
        <Input
          placeholder="Per Month"
          value={
            pricingDetails.pricingRates.perMonthRate === 0
              ? ''
              : pricingDetails.pricingRates.perMonthRate.toString()
          }
          validated={validated}
          keyboardType="number-pad"
          onChangeText={(input) =>
            tempListingPricingD({
              pricingRates: {
                ...pricingDetails.pricingRates,
                perMonthRate: input
              }
            })
          }
          style={styles.placeholder}
        />
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Text style={styles.loremIpsum2}>Tips for setting appropriate rates</Text>
        </TouchableOpacity>
        <TipsSettingRatesModal visible={visible} onPress={() => setVisible(false)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    // minHeight: Dimensions.get('window').height,
    paddingTop: 0
  },
  setPricing: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24
  },
  heading: {
    color: 'rgba(11,64,148,1)',
    fontSize: 30,
    fontWeight: '700'
    // marginTop: 30,
    // marginVertical: 20
  },
  subHeading: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500'
    // marginTop: 40,
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 15,
    marginVertical: 20
  },
  rect: {
    width: '100%',
    // height: 58,
    borderBottomWidth: 1,
    borderColor: 'rgba(214,214,214,1)',
    marginTop: 20
  },
  variableRate: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 16
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(182,182,182,1)',
    fontSize: 13,
    marginTop: 7
  },
  variableRateColumnRow: {
    // height: 42,
    flexDirection: 'row',
    marginTop: 6,
    marginLeft: 1,
    marginRight: 9,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10
  },
  materialButtonPrimary: {
    width: 100,
    height: 36,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 10,
      height: 10
    },
    elevation: 10,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    marginTop: 157,
    alignSelf: 'center',
    backgroundColor: '#27aae1'
  }
});

const mapStateToProps = ({ tempListing }) => ({
  pricingDetails: tempListing.pricingDetails,
  validated: tempListing.validated
});
export default connect(mapStateToProps, { tempListingPricingD })(SetPricingType);
