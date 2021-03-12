import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Switch,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setListingPricingDetails } from '../../actions/listing';
import MaterialButtonPrimary from '../../components/MaterialButtonPrimary';
import TipsSettingRatesModal from '../../components/SpaceOwner/TipsSettingRatesModal';
import VariableVsFlatModal from '../../components/SpaceOwner/VariableVsFlatModal';
import NextButton from '../../components/SpaceOwner/NextButton';
import AddListingHeader from '../../components/SpaceOwner/AddListingHeader';
import Input from '../../components/Input';

function VariableBillingType({
  onBackButtonPress,
  onNextButtonPress,
  setListingPricingDetails,
  pricingDetails
}) {
  const [width, setWidth] = useState(pricingDetails && pricingDetails.pricingType ? 100 : 0);

  const [validate, setValidate] = useState(false);

  const [perHourRate, setPerHourRate] = useState(
    pricingDetails && pricingDetails.pricingRates ? pricingDetails.pricingRates.perHourRate : '1.80'
  );
  const [perDayRate, setPerDayRate] = useState(
    pricingDetails && pricingDetails.pricingRates ? pricingDetails.pricingRates.perDayRate : '13.00'
  );
  const [perWeekRate, setPerWeekRate] = useState(
    pricingDetails && pricingDetails.pricingRates
      ? pricingDetails.pricingRates.perWeekRate
      : '60.00'
  );
  const [perMonthRate, setPerMonthRate] = useState(
    pricingDetails && pricingDetails.pricingRates
      ? pricingDetails.pricingRates.perMonthRate
      : '200.00'
  );
  const [perWeek, setPerWeek] = useState(
    pricingDetails && pricingDetails.pricingRates ? pricingDetails.pricingRates.perWeek : false
  );
  const [perMonth, setPerMonth] = useState(
    pricingDetails && pricingDetails.pricingRates ? pricingDetails.pricingRates.perMonth : true
  );

  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const backButtonHandler = () => {
    onBackButtonPress(2);
  };

  const onSubmitHandler = () => {
    setVisible2(false);
    try {
      if (perHourRate && perDayRate && perWeekRate && perMonthRate) {
        setValidate(false);
        let pricingDetails = {
          pricingType: 'Variable',
          pricingRates: {
            perHourRate,
            perDayRate,
            perWeekRate,
            perMonthRate,
            perWeek,
            perMonth
          }
        };
        setListingPricingDetails(pricingDetails);
        // navigation.navigate('SaveSpaceDetails');
        onNextButtonPress();
      } else {
        setValidate(true);
      }
    } catch (error) {
      Alert.alert('Something Went wrong!', 'Unable to set pricing details');
    }
  };

  return (
    <>
      <AddListingHeader onPress={backButtonHandler} width={`${width}%`} activeIndex={activeIndex} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* <Text style={styles.setPricing1}>Set Pricing</Text> */}
        <Text style={styles.heading}>Set your desired rates</Text>
        <Text style={styles.subHeading}>Variable Billing Type</Text>
        <Text style={styles.dailyMaximum}>Per Hour</Text>
        <Input
          placeholder="Per Hour (in USD)"
          value={perHourRate}
          onChangeText={(input) => setPerHourRate(input)}
          keyboardType="number-pad"
          validate={validate}
          style={styles.placeholder}></Input>

        <Text style={styles.dailyMaximum}>Per Day</Text>
        <Input
          placeholder="Per Day (in USD)"
          value={perDayRate}
          onChangeText={(input) => setPerDayRate(input)}
          keyboardType="number-pad"
          validate={validate}
          style={styles.placeholder}></Input>

        <Text style={styles.dailyMaximum}>Per Week</Text>
        <View styles={styles.perWeek}>
          <Input
            placeholder="Per Week (in USD)"
            value={perWeekRate}
            onChangeText={(input) => setPerWeekRate(input)}
            keyboardType="number-pad"
            validate={validate}
            style={styles.placeholder}></Input>
          <Switch
            value={perWeek}
            trackColor={{
              true: 'rgba(230, 230, 230,1)',
              false: 'rgba(155,155,155,1)'
            }}
            disabled={false}
            style={styles.switch}></Switch>
        </View>

        <Text style={styles.dailyMaximum}>Per Month</Text>
        <View styles={styles.perWeek}>
          <Input
            placeholder="Per Month (in USD)"
            value={perMonthRate}
            onChangeText={(input) => setPerMonthRate(input)}
            keyboardType="number-pad"
            validate={validate}
            style={styles.placeholder}></Input>
          <Switch
            value={perMonth}
            trackColor={{
              true: 'rgba(230, 230, 230,1)',
              false: 'rgba(155,155,155,1)'
            }}
            disabled={false}
            style={styles.switch}></Switch>
        </View>
        <TouchableOpacity onPress={() => setVisible1(true)}>
          <Text style={styles.loremIpsum2}>Tips for setting appropriate rates</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVisible2(true)}>
          <Text style={styles.loremIpsum2}>Variable vs Flat Rates</Text>
        </TouchableOpacity>

        {/* <MaterialButtonPrimary
        onPress={onPressHandler}
        caption="NEXT"
        style={styles.materialButtonPrimary1}></MaterialButtonPrimary> */}
        <TipsSettingRatesModal visible={visible1} onPress={() => setVisible1(false)} />
        <VariableVsFlatModal visible={visible2} onPress={onSubmitHandler} />
      </ScrollView>
      <NextButton onPress={onSubmitHandler} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    zIndex: 1,
    // paddingVertical: 50,
    paddingBottom: 80
  },
  setPricing1: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24
  },
  heading: {
    color: 'rgba(11,64,148,1)',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 30,
    marginVertical: 20
  },
  subHeading: {
    color: '#27aae1',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20
  },
  loremIpsum: {
    // fontFamily: 'roboto-300',
    color: 'rgba(11,64,148,1)',
    fontSize: 16,
    marginTop: 13
  },
  flatBillingType: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 17,
    marginTop: 45,
    fontWeight: '700'
  },
  dailyMaximum: {
    // fontFamily: 'roboto-regular',
    color: '#b6b6b6',
    fontSize: 16,
    marginTop: 22
  },
  perWeek: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  switch: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  placeholder: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 40,
    width: '100%',
    fontSize: 18,
    marginTop: 10,
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    textDecorationLine: 'underline',
    marginTop: 37,
    fontSize: 16
  },
  materialButtonPrimary1: {
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
    marginTop: 136,
    alignSelf: 'center',
    backgroundColor: '#27aae1'
  }
});

VariableBillingType.propTypes = {
  setListingPricingDetails: PropTypes.func.isRequired
};

export default connect(null, { setListingPricingDetails })(VariableBillingType);
