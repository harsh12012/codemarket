import colors from '@parkyourself-frontend/shared/config/colors';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {
  useGetListingAndVehicle,
  useUpdateBookingStatus
} from '@parkyourself-frontend/shared/hooks/bookings';
import { updateFindParkingData } from '@parkyourself-frontend/shared/redux/actions/findParking';
import { extendMoment } from 'moment-range';
import { connect, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ParkingTicketModal from './ParkingTicketModal';
import { gql, useMutation, useSubscription } from '@apollo/client';
import { client } from '../../app/graphql';

const GET_LISTING_REVIEWS = gql`
  query GetListingReviews($listingId: String!) {
    getListingReviews(listingId: $listingId) {
      _id
      listingId
      ownerId
      ownerName
      driverId
      driverName
      rating
      feedback
      createdAt
    }
  }
`;

const placeholderImage = require('../../assets/images/cars.jpg');

const moment2 = extendMoment(moment);

function BookingCard({ booking, userData }) {
  // console.log('bookingss', booking); // 60242f77996b3000082aa7e0
  const [reviews, setReviews] = useState([]);
  const [disabled, setDisabled] = useState({
    earlyCheckIn: false,
    lateCheckOut: false,
    cancelled: false
  });
  const [showParkingTicketModal, setShowParkingTicketModal] = useState(false);
  const { getOneListing } = useGetListingAndVehicle();
  const { updateBookingStatus } = useUpdateBookingStatus({
    id: booking._id,
    driverEmail: booking.driverEmail,
    ownerEmail: booking.ownerEmail,
    driverId: booking.driverId
  });

  const handleUpdateStatus = async (status) => {
    try {
      setDisabled({ ...disabled, cancelled: true });
      await updateBookingStatus(status);
      setDisabled({ ...disabled, cancelled: true });
      Alert.alert(`Booking Cancelled`);
    } catch (error) {
      // console.log(error);
      Alert.alert('Something went wrong', error.message);
      setDisabled({ ...disabled, cancelled: true });
    }
  };

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const start = new Date(booking.start);
  const end = new Date(booking.end);
  const range = moment2.range(start, end);
  const monthDiff = range.diff('months');
  const dayDiff = range.diff('days');
  const hourDiff = range.diff('hours');

  const handleEarlyCheckIn = async (early = true) => {
    try {
      setDisabled({ ...disabled, earlyCheckIn: early, lateCheckOut: !early });
      const { data } = await getOneListing({ id: booking.listingId, vehicle: booking.vehicle });
      if (data && data.getListing && data.getVehicle) {
        let tempFindParking = {
          vehicleSelected: data.getVehicle
        };
        let tempParams = {
          item: data.getListing,
          rebook: true,
          rebookUserData: {
            driverId: booking.driverId,
            driverEmail: booking.driverEmail,
            driverName: booking.driverName
          }
        };
        if (early) {
          tempFindParking.start = new Date();
          tempFindParking.end = new Date(booking.start);
          tempParams.startDisabled = false;
          tempParams.endDisabled = true;
        } else {
          let tempEndDate = new Date(
            new Date(booking.end).setHours(new Date(booking.end).getHours() + 3)
          );
          tempEndDate = new Date(new Date(tempEndDate).setMinutes(30));
          tempFindParking.start = new Date(booking.end);
          tempFindParking.end = new Date(tempEndDate);
          tempParams.startDisabled = true;
          tempParams.endDisabled = false;
        }
        setDisabled({ ...disabled, earlyCheckIn: false, lateCheckOut: false });
        dispatch(updateFindParkingData(tempFindParking));
        navigation.navigate('PayNow', tempParams);
      }
    } catch (error) {
      console.log('error', error);
      setDisabled({ ...disabled, earlyCheckIn: false, lateCheckOut: false });
    }
  };

  useEffect(() => {
    client
      .query({
        query: GET_LISTING_REVIEWS,
        variables: { listingId: booking.listingId }
      })
      .then(({ data }) => {
        if (data.getListingReviews) {
          // setReviews(data.getListingReviews);
          let reviewIds = data.getListingReviews.map((item) => item.driverId);

          setReviews(reviewIds);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log('review', reviews, userData.sub);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.imageRow}>
          <Image
            source={booking.images.length > 0 ? { uri: booking.images[0] } : placeholderImage}
            style={styles.image}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.topRow}>
            <View style={styles.nameRow}>
              <Text style={styles.title}>{booking.address}</Text>
            </View>
            <View>
              <View style={styles.durationView}>
                <Text style={styles.durationText}>
                  {monthDiff <= 0 ? (dayDiff <= 0 ? hourDiff : dayDiff) : monthDiff}
                  {monthDiff <= 0 ? (dayDiff <= 0 ? ' hour' : ' day') : ' month'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.nameRow}>
            <Text style={styles.textDate}>
              {moment(new Date(booking.start)).format('lll')} to{' '}
              {moment(new Date(booking.end)).format('lll')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <View
          style={[
            styles.button3,
            booking.status === 'cancelled'
              ? { opacity: 0.7, backgroundColor: colors.lightGrey }
              : {}
          ]}>
          <Text
            style={[styles.buttonText, { color: colors.secondary }]}>{`$${booking.payment.toFixed(
            2
          )} ${booking.status === 'cancelled' ? 'Refund' : 'Paid'}`}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Reviews', {
              id: booking?.listingId,
              booking: booking
            })
          }
          style={styles.ratingButton}>
          <Ionicons name="star" style={styles.star} />
          <Ionicons name="star" style={styles.star} />
          <Ionicons name="star" style={styles.star} />
          <Ionicons name="star" style={styles.star} />
          <Ionicons name="star-half-sharp" style={styles.star} />
          <Text style={styles.ratingText}>4.8(183)</Text>
        </TouchableOpacity>
      </View>
      {booking.status === 'upcoming' && (
        <View
          style={[
            styles.buttonRow,
            Date.parse(booking.start) > Date.parse(new Date()) ? {} : { justifyContent: 'flex-end' }
          ]}>
          {Date.parse(booking.start) > Date.parse(new Date()) && (
            <>
              <TouchableOpacity style={styles.button} onPress={() => handleEarlyCheckIn(true)}>
                {disabled.earlyCheckIn ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <Text style={styles.buttonText}>Early Check In</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => handleUpdateStatus('cancelled')}>
                {disabled.cancelled ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <Text style={styles.buttonText2}>Cancel Booking</Text>
                )}
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity
            style={{ justifyContent: 'center', backgroundColor: colors.lightBlue }}
            onPress={() => setShowParkingTicketModal(true)}>
            <Ionicons name="qr-code" style={{ fontSize: 35, color: colors.primary }} />
          </TouchableOpacity>
        </View>
      )}
      {booking.status === 'current' && (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { flex: 0.45 }]}
            onPress={() => handleEarlyCheckIn(false)}>
            {disabled.lateCheckOut ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>Late Check Out</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
      {booking.status === 'completed' &&
        (reviews?.includes(userData?.sub) ? null : (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AddReviewModal', {
                  listingId: booking.listingId,
                  _id: booking?._id,
                  address: booking?.address,
                  booking: booking
                })
              }
              style={[styles.button, { flex: 1 }]}>
              <Text style={styles.buttonText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
        ))}
      <ParkingTicketModal
        visible={showParkingTicketModal}
        onHide={() => setShowParkingTicketModal(false)}
        booking={booking}
      />
    </View>
  );
}

const mapStateToProps = ({ auth }) => ({
  userData: auth.data.attributes
});

export default connect(mapStateToProps)(BookingCard);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.grey,
    backgroundColor: colors.white,
    marginBottom: 10,
    borderRadius: 1
  },
  topRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageRow: { flexDirection: 'row' },
  image: { width: 50, height: 50, borderRadius: 25 },
  nameRow: {
    marginLeft: 10,
    flex: 1
  },
  title: {
    fontWeight: 'bold'
  },
  ownerName: {
    textDecorationLine: 'underline'
  },
  iconRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  icon: {
    color: '#FFD700',
    fontSize: 16
  },
  durationView: {
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3
  },
  durationText: {
    color: colors.secondary,
    fontSize: 13
  },
  textDate: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 13,
    marginVertical: 5
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    marginTop: 10,
    borderTopWidth: 0.3
  },
  button: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    borderRadius: 2,
    flex: 0.4,
    padding: 10
  },
  button3: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    borderRadius: 2,
    flex: 0.4,
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.secondary
  },
  buttonText: { color: colors.white, fontSize: 13, textAlign: 'center', fontWeight: 'bold' },
  ratingButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 2,
    flex: 0.5,
    alignItems: 'center'
  },
  ratingText: {
    color: colors.black,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 5
  },
  star: { color: colors.yellow, fontSize: 20 },
  button2: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 2,
    flex: 0.4,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.primary
  },
  buttonText2: { color: colors.primary, fontSize: 13, textAlign: 'center', fontWeight: 'bold' }
});
