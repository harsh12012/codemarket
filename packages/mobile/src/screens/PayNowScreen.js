import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch
} from 'react-native';
import moment from 'moment';
import colors from '@parkyourself-frontend/shared/config/colors';
import { useDispatch, useSelector } from 'react-redux';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { updateFindParkingData } from '@parkyourself-frontend/shared/redux/actions/findParking';
import { useCheckBookingAvailability } from '@parkyourself-frontend/shared/hooks/listings';
import { useStripeCreatePaymentIntentOffline } from '@parkyourself-frontend/shared/hooks/stripe';
import { toggleProfileType } from '@parkyourself-frontend/shared/redux/actions/user';
import { useCalculateAmount, useCreateBooking } from '@parkyourself-frontend/shared/hooks/bookings';
import DatePicker from '../components/listing/bookNow/DatePicker';
import VehiclePicker from '../components/listing/bookNow/VehiclePicker';
import CardPicker from '../components/listing/bookNow/CardPicker';
import SpaceLabelPicker from '../components/listing/bookNow/SpaceLabelPicker';
import MaterialButtonPrimary from '../components/MaterialButtonPrimary';
import LocationHeader from '../components/LocationHeader';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PayByCardModal from '../components/payment/PayByCardModal';
import CompleteModal from '../components/listing/bookNow/CompleteModal';
import { changeToNewRoundOfDateTime, changeToRoundOfDate } from '@parkyourself-frontend/shared/utils/time';

function PayNowScreen({ navigation, route }) {
  const { start, end, vehicleSelected, profileType } = useSelector(({ findParking, user }) => ({
    ...findParking,
    profileType: user.profileType
  }));
  const sheetRef = useRef(null);
  const vehicleSheetRef = useRef(null);
  const cardSheetRef = useRef(null);
  const spaceLabelSheetRef = useRef(null);
  const [validated, setValidated] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const {
    item: parking,
    rebook = false,
    startDisabled = false,
    endDisabled = false,
    redirect = 'My Bookings',
    rebookUserData = {}
  } = route.params;
  const { address, city, state, postalCode } = parking.locationDetails;
  const [picker, setPicker] = useState({
    showPicker: false,
    mode: 'date',
    type: 'start',
    date: new Date(),
    minimumDate: new Date()
  });
  const { amountCalculation, amountLoading } = useCalculateAmount({
    start,
    end,
    perHourRate: parking.pricingDetails.pricingRates.perHourRate
  });

  const { isLabelled, qtyOfSpaces, spaceLabels } = parking.spaceDetails;
  const {
    availabilityLoading,
    labels,
    availabile,
    error: labelsError
  } = useCheckBookingAvailability({
    id: parking._id,
    start,
    end,
    qtyOfSpaces,
    spaceAvailable: parking.spaceAvailable
  });
  const { createIntentOffline } = useStripeCreatePaymentIntentOffline();
  const { createBooking, payload, setPayload } = useCreateBooking();
  const dispatch = useDispatch();

  const handlePickerChange = (selectedDate) => {
    if (picker.type === 'start') {
      if (picker.mode === 'date' && new Date(selectedDate) > new Date(end)) {
        const tempEndDate = new Date(new Date(selectedDate).setHours(selectedDate.getHours() + 3));
        dispatch(updateFindParkingData({ start: selectedDate, end: tempEndDate }));
      } else {
        dispatch(updateFindParkingData({ start: changeToNewRoundOfDateTime(selectedDate) }));
      }
    } else {
      if(selectedDate <= start){
        dispatch(updateFindParkingData({ end: new Date(new Date(selectedDate).setDate(new Date(start).getDate()+1)) }));
      }else{
        dispatch(updateFindParkingData({ end: selectedDate }));
      }
      
    }
  };

  const showPicker = (date, type = 'start', mode = 'date') => {
    setPicker({
      ...picker,
      date: new Date(date),
      type,
      mode,
      minimumDate: type === 'start' ? new Date() : new Date(start)
      // showPicker: true
    });
    sheetRef.current.snapTo(0);
  };

  const diff = moment.duration(moment(end).diff(moment(start)));

  const toggleProfile = () => {
    dispatch(toggleProfileType());
    setPayload({ ...payload, cardSelected: null });
  };

  const onSubmitHandler = async () => {
    try {
      if (vehicleSelected && (!payload.useCard || payload.cardSelected)) {
        setValidated(false);
        if (payload.useCard) {
          setDisabled(true);
          const { data } = await createIntentOffline({
            payment_method: payload.cardSelected.id,
            ownerId: parking.ownerId,
            amount: amountCalculation.totalAmount,
            fee: amountCalculation.fee
          });
          if (
            data &&
            data.stripeCreatePaymentIntentOffline &&
            data.stripeCreatePaymentIntentOffline.secret === 'succeeded'
          ) {
            // Create Booking
            await handleCreateBooking(
              data.stripeCreatePaymentIntentOffline.id,
              data.stripeCreatePaymentIntentOffline.transferGroup
            );
          } else {
            Alert.alert('Something went wrong please try again');
          }
          // setDisabled(false);
        } else {
          setShowCardModal(true);
          // Alert.alert('Normal');
        }
      } else {
        setValidated(true);
        // Alert.alert('Validation Failed');
      }
    } catch (error) {
      // console.log('onSubmitHandler Error', error);
      Alert.alert('Error', error.message);
      setDisabled(false);
    }
  };

  const handleCreateBooking = async (paymentIntent, transferGroup) => {
    try {
      const { data } = await createBooking({
        parking,
        payment: amountCalculation.totalAmount,
        ownerPayment: amountCalculation.amount,
        paymentIntent,
        transferGroup,
        rebookUserData
      });
      // console.log('createBooking data', data);
      setPayload({ ...payload, booking: data.createBooking });
      setShowCompleteModal(true);
    } catch (error) {
      // console.log('handleCreateBooking Error', error);
      setDisabled(false);
      Alert.alert('Something went wrong', error.message);
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <LocationHeader location={`${address}, ${city}, ${state}, ${postalCode}`} />
          <View style={styles.rect2Stack}>
            <View style={styles.listItem}>
              <Text style={styles.label}>Arriving</Text>
              <View style={styles.rightBox}>
                <Text style={styles.rightLabel} numberOfLines={1}>
                  {moment(start).format('lll')}
                </Text>
                <TouchableOpacity
                  onPress={() => showPicker(start, 'start', 'date')}
                  disabled={startDisabled}>
                  <Text
                    style={[
                      styles.change,
                      { color: startDisabled ? colors.grey : colors.primary }
                    ]}>
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Leaving</Text>
              <View style={styles.rightBox}>
                <Text style={styles.rightLabel} numberOfLines={1}>
                  {moment(end).format('lll')}
                </Text>
                <TouchableOpacity
                  onPress={() => showPicker(end, 'end', 'date')}
                  disabled={endDisabled}>
                  <Text
                    style={[styles.change, { color: endDisabled ? colors.grey : colors.primary }]}>
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Duration</Text>
              <Text style={styles.rightLabel}>{diff.asHours().toFixed(1)} Hours</Text>
            </View>
            {isLabelled && (
              <View style={styles.listItem}>
                <Text style={styles.label}>Space Label</Text>
                <View style={styles.rightBox}>
                  {payload.spaceLabelSelected && (
                    <Text style={styles.rightLabel} numberOfLines={1}>
                      {payload.spaceLabelSelected}
                    </Text>
                  )}
                  <View>
                    <TouchableOpacity onPress={() => spaceLabelSheetRef.current.snapTo(0)}>
                      <Text style={styles.change}>
                        {payload.spaceLabelSelected ? 'Change' : 'Select Space Label'}
                      </Text>
                    </TouchableOpacity>
                    {validated && !payload.spaceLabelSelected && (
                      <Text style={styles.error}>Please Select Space Label</Text>
                    )}
                  </View>
                </View>
              </View>
            )}
            <View style={styles.listItem}>
              <Text style={styles.label}>Vehicle</Text>
              <View style={styles.rightBox}>
                {vehicleSelected && (
                  <Text style={styles.rightLabel} numberOfLines={1}>
                    {`${vehicleSelected.make} ${vehicleSelected.model}`}
                  </Text>
                )}
                <View>
                  <TouchableOpacity
                    onPress={() => vehicleSheetRef.current.snapTo(0)}
                    disabled={rebook}>
                    <Text style={[styles.change, { color: rebook ? colors.grey : colors.primary }]}>
                      {vehicleSelected ? 'Change' : 'Select Vehicle'}
                    </Text>
                  </TouchableOpacity>
                  {validated && !vehicleSelected && (
                    <Text style={styles.error}>Please Select Vehcile</Text>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Profile Category</Text>
              <View
                style={{
                  backgroundColor: colors.lightGrey,
                  flexDirection: 'row',
                  padding: 5,
                  borderRadius: 20
                }}>
                <TouchableOpacity
                  onPress={() => toggleProfile()}
                  style={[
                    styles.profileTypeButton,
                    {
                      backgroundColor:
                        profileType === 'business' ? colors.primary : colors.lightGrey
                    }
                  ]}>
                  <Text
                    style={[
                      styles.profileTypeText,
                      { color: profileType === 'business' ? colors.white : colors.black }
                    ]}>
                    Business
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => toggleProfile()}
                  style={[
                    styles.profileTypeButton,
                    {
                      backgroundColor:
                        profileType === 'personal' ? colors.primary : colors.lightGrey
                    }
                  ]}>
                  <Text
                    style={[
                      styles.profileTypeText,
                      { color: profileType === 'personal' ? colors.white : colors.black }
                    ]}>
                    Personal
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Amount</Text>
              {amountLoading ? (
                <LoadingSpinner />
              ) : (
                <Text style={styles.rightLabel}>${amountCalculation.amount}</Text>
              )}
            </View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Tax</Text>
              {amountLoading ? (
                <LoadingSpinner />
              ) : (
                <Text style={styles.rightLabel}>${amountCalculation.tax}</Text>
              )}
            </View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Fee</Text>
              {amountLoading ? (
                <LoadingSpinner />
              ) : (
                <Text style={styles.rightLabel}>${amountCalculation.fee}</Text>
              )}
            </View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Total Amount</Text>
              {amountLoading ? (
                <LoadingSpinner />
              ) : (
                <Text style={styles.rightLabel}>${amountCalculation.totalAmount}</Text>
              )}
            </View>
            <View style={styles.listItem}>
              <Text style={styles.label}>Use Saved Card</Text>
              <View style={styles.rightBox}>
                <Switch
                  value={payload.useCard}
                  trackColor={{ true: colors.primary, false: colors.grey }}
                  onValueChange={() => setPayload({ ...payload, useCard: !payload.useCard })}
                />
              </View>
            </View>
            {payload.useCard && (
              <View style={styles.listItem}>
                <Text style={styles.label}>Card</Text>
                <View style={styles.rightBox}>
                  {payload.cardSelected && (
                    <Text style={styles.rightLabel} numberOfLines={1}>
                      {`**** **** **** ${payload.cardSelected.card.last4}`}
                    </Text>
                  )}
                  <View>
                    <TouchableOpacity onPress={() => cardSheetRef.current.snapTo(0)}>
                      <Text style={styles.change}>
                        {payload.cardSelected ? 'Change' : 'Select Card'}
                      </Text>
                    </TouchableOpacity>
                    {validated && !payload.cardSelected && (
                      <Text style={styles.error}>Please Select Card</Text>
                    )}
                  </View>
                </View>
              </View>
            )}
            {/* <Text>{`${labelsError}  availabilityLoading - ${availabilityLoading.toString()} availabile - ${availabile.toString()} labels - ${
              labels.length
            }`}</Text> */}
            <View style={{ marginTop: 35 }}>
              {amountLoading || availabilityLoading ? (
                <View>
                  <LoadingSpinner />
                  <Text style={styles.availabilityText}>Checking Space Availability</Text>
                </View>
              ) : availabile ? (
                <MaterialButtonPrimary
                  caption={`PAY $${amountCalculation.totalAmount}`}
                  style={styles.materialButtonPrimary3}
                  onPress={onSubmitHandler}
                  disabled={disabled}
                />
              ) : (
                <Text style={styles.availabilityText}>
                  Parking is unavailable at this time slot
                </Text>
              )}
            </View>
            <PayByCardModal
              visible={showCardModal}
              amount={amountCalculation.totalAmount}
              fee={amountCalculation.totalAmount.fee}
              ownerId={parking.ownerId}
              onHide={() => setShowCardModal(false)}
              onComplete={async (paymentIntent, transferGroup) => {
                await handleCreateBooking(paymentIntent, transferGroup);
                setShowCardModal(false);
              }}
            />
            {payload.booking && (
              <CompleteModal
                visible={showCompleteModal}
                booking={payload.booking}
                vehicle={vehicleSelected}
                redirect={redirect}
              />
            )}
            <Text style={styles.loremIpsum10}>
              By Making payment you indicate your acceptance of our Terms &amp; Conditions and
              Privacy Policy.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomSheet
        ref={sheetRef}
        initialSnap={1}
        snapPoints={[500, 0]}
        borderRadius={20}
        renderContent={(props) => (
          <DatePicker
            {...props}
            minimumDate={picker.minimumDate}
            type={picker.type}
            mode={picker.mode}
            date={picker.type === 'start' ? start : end}
            onChange={handlePickerChange}
            onClose={() => sheetRef.current.snapTo(1)}
          />
        )}
      />
      <BottomSheet
        ref={vehicleSheetRef}
        initialSnap={1}
        snapPoints={[400, 0]}
        borderRadius={20}
        renderContent={(props) => (
          <VehiclePicker
            {...props}
            vehicleSelected={vehicleSelected ? vehicleSelected._id : ''}
            onChange={(item) => dispatch(updateFindParkingData({ vehicleSelected: item }))}
            onClose={() => vehicleSheetRef.current.snapTo(1)}
          />
        )}
      />
      <BottomSheet
        ref={cardSheetRef}
        initialSnap={1}
        snapPoints={[400, 0]}
        borderRadius={20}
        renderContent={(props) => (
          <CardPicker
            {...props}
            cardSelected={payload.cardSelected ? payload.cardSelected.id : ''}
            onChange={(item) => setPayload({ ...payload, cardSelected: item })}
            onClose={() => cardSheetRef.current.snapTo(1)}
          />
        )}
      />
      <BottomSheet
        ref={spaceLabelSheetRef}
        initialSnap={1}
        snapPoints={[400, 0]}
        borderRadius={20}
        renderContent={(props) => (
          <SpaceLabelPicker
            {...props}
            spaceLabelSelected={payload.spaceLabelSelected}
            spaceLabels={spaceLabels}
            onChange={(item) => setPayload({ ...payload, spaceLabelSelected: item })}
            onClose={() => spaceLabelSheetRef.current.snapTo(1)}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: colors.white
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1
  },
  label: {
    color: colors.grey,
    fontSize: 16
  },
  rightBox: { flexDirection: 'row', alignItems: 'center' },
  rightLabel: {
    color: colors.black,
    fontSize: 15,
    textAlign: 'right'
  },
  change: {
    color: colors.primary,
    fontSize: 12,
    marginLeft: 10,
    textAlign: 'right'
  },
  error: { color: 'red', fontSize: 10 },
  profileTypeButton: {
    padding: 5,
    borderRadius: 20
  },
  profileTypeText: {
    color: colors.black
  },
  materialButtonPrimary3: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.primary,
    minWidth: 100
  },
  availabilityText: { color: colors.secondary, textAlign: 'center' },
  loremIpsum10: {
    color: colors.grey,
    textAlign: 'center',
    marginVertical: 30
  },
  rect2Stack: {
    marginTop: 20
  }
});

export default PayNowScreen;
