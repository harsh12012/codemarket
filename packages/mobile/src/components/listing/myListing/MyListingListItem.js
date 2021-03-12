import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useMutation, gql } from '@apollo/client';
import { getRole } from '@parkyourself-frontend/shared/utils/listing';
import omitTypename from '@parkyourself-frontend/shared/utils/omitTypename';
import { connect } from 'react-redux';
import colors from '@parkyourself-frontend/shared/config/colors';
import {
  deleteListingLocal,
  publishListingLocal
} from '@parkyourself-frontend/shared/redux/actions/user';
import { addTempListing } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import { client } from '@parkyourself-frontend/shared/graphql';
import { useNavigation } from '@react-navigation/native';

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id)
  }
`;

const PUBLISH_LISTING = gql`
  mutation UpdateListing($id: ID!, $published: Boolean) {
    updateListing(id: $id, published: $published) {
      _id
    }
  }
`;

const stripe_Retrieve_Account = gql`
  query StripeRetrieveAccount($userId: String!) {
    stripeRetrieveAccount(userId: $userId)
  }
`;

function MyListingListItem({
  userId,
  item,
  deleteListingLocal,
  publishListingLocal,
  addTempListing
}) {
  const [publishListing] = useMutation(PUBLISH_LISTING);
  const [deleteListing] = useMutation(DELETE_LISTING);
  const [disabled, updateDisabled] = useState(false);
  const [loadingD, setloadingD] = useState(false);
  const [loadingP, setloadingP] = useState(false);
  const navigation = useNavigation();
  const { ownerId, staff } = item;

  const {
    listingType,
    propertyType,
    propertyName,
    country,
    address,
    unitNum,
    city,
    state,
    postalCode,
    code,
    phone,
    marker,
    streetViewImages,
    parkingEntranceImages,
    parkingSpaceImages,
    features
  } = item.locationDetails;

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
  } = item.spaceDetails;

  const {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    scheduleType,
    customTimeRange,
    noticeTime,
    advanceBookingTime,
    minTime,
    maxTime,
    instantBooking
  } = item.spaceAvailable;

  const { pricingRates } = item.pricingDetails;

  // const omitTypename = (key, value) => (key === '__typename' ? undefined : value);

  const modifyListingHandler = () => {
    addTempListing({
      ...item,
      validated: true,
      edit: true,
      mobile: true,
      locationDetails: JSON.parse(JSON.stringify(item.locationDetails), omitTypename),
      spaceDetails: JSON.parse(JSON.stringify(item.spaceDetails), omitTypename),
      spaceAvailable: JSON.parse(JSON.stringify(item.spaceAvailable), omitTypename),
      pricingDetails: JSON.parse(JSON.stringify(item.pricingDetails), omitTypename),
      location: JSON.parse(JSON.stringify(item.location), omitTypename)
    });
    navigation.navigate('AddListing');
  };

  const handleDelete = async (id) => {
    try {
      setloadingD(true);
      await deleteListing({
        variables: {
          id: item._id
        }
      });
      setloadingD(false);
      Alert.alert('Listing Deleted Successfully');
      deleteListingLocal(item._id);
    } catch (error) {
      setloadingD(false);
      Alert.alert('Something went wrong!', 'Please try again');
    }
  };

  const checkAllSpaceLabels = () => {
    let flag = true;
    spaceLabels.forEach((item) => {
      if (!item.label || !item.largestSize) {
        // console.log('found invalid space label');
        flag = false;
      }
    });
    return flag;
  };

  const checkWithdrawalSettings = async () => {
    let { data } = await client.query({
      query: stripe_Retrieve_Account,
      variables: { userId: userId }
    });
    // console.log('data :', data);
    if (data.stripeRetrieveAccount) {
      // console.log('data :', data.stripeRetrieveAccount);
      let stripeData = JSON.parse(data.stripeRetrieveAccount);
      // console.log(stripeData);
      if (!stripeData.details_submitted) {
        Alert.alert('Details not submitted');
        // router.push("/withdrawal-settings");
        return false;
      } else {
        if (!stripeData.payouts_enabled) {
          Alert.alert('Please Update your Withdrawal Settings');
          // router.push("/withdrawal-settings");
          return false;
        } else {
          return true;
        }
      }
    } else {
      Alert.alert('Withdrawal Settings not Set Up. Please Set it and Try again');
      // router.push("/withdrawal-settings");
      return false;
    }
    // }).catch((error)=>{console.log(error);});
  };

  const checkTotalCount = () => {
    var flag = true;
    var sum = 0;
    if (motorcycle) {
      sum += parseInt(motorcycleSpaces);
    }
    if (compact) {
      sum += parseInt(compactSpaces);
    }
    if (midsized) {
      sum += parseInt(midsizedSpaces);
    }
    if (large) {
      sum += parseInt(largeSpaces);
    }
    if (oversized) {
      sum += parseInt(oversizedSpaces);
    }

    if (sum != qtyOfSpaces) {
      flag = false;
    }

    return flag;
  };

  const checkIfComplete = async () => {
    if (
      propertyName &&
      country &&
      address &&
      city &&
      state &&
      postalCode &&
      code &&
      phone &&
      qtyOfSpaces >= 1 &&
      (heightRestriction ? height1.value > 0 : true) &&
      ((sameSizeSpaces && largestSize) ||
        (!sameSizeSpaces &&
          (motorcycle || compact || midsized || large || oversized) &&
          checkTotalCount())) &&
      (isLabelled ? checkAllSpaceLabels() : true) &&
      aboutSpace &&
      accessInstructions &&
      (scheduleType == '24hours' ||
        (scheduleType == 'fixed' &&
          (monday.isActive ? monday.startTime && monday.endTime : true) &&
          (tuesday.isActive ? tuesday.startTime && tuesday.endTime : true) &&
          (wednesday.isActive ? wednesday.startTime && wednesday.endTime : true) &&
          (thursday.isActive ? thursday.startTime && thursday.endTime : true) &&
          (friday.isActive ? friday.startTime && friday.endTime : true) &&
          (saturday.isActive ? saturday.startTime && saturday.endTime : true) &&
          (sunday.isActive ? sunday.startTime && sunday.endTime : true)) ||
        (scheduleType == 'custom' && customTimeRange.length > 0)) &&
      noticeTime.value >= 0 &&
      advanceBookingTime.value >= 0 &&
      minTime.value >= 0 &&
      maxTime.value >= 0 &&
      !(instantBooking === '') &&
      pricingRates.perHourRate >= 0 &&
      pricingRates.perDayRate >= 0 &&
      pricingRates.perWeekRate >= 0 &&
      pricingRates.perMonthRate >= 0
    ) {
      if (!(await checkWithdrawalSettings())) {
        return false;
      } else {
        return true;
      }
    } else {
      Alert.alert('Listing Incomplete!', 'Please Complete and Try Again');
      return false;
    }
  };

  const handlePublish = async () => {
    try {
      updateDisabled(true);
      setloadingP(true);
      if (await checkIfComplete()) {
        // props.dispatch(showLoading());
        await publishListing({
          variables: {
            id: item._id,
            published: !item.published
          }
        });

        if (item.published) {
          Alert.alert('Listing Inactivated Successfully');
        } else {
          Alert.alert('Listing Activated Successfully');
        }
        publishListingLocal({ _id: item._id, published: !item.published });
      }
      updateDisabled(false);
      setloadingP(false);
    } catch (error) {
      updateDisabled(false);
      setloadingP(false);
      // console.log(error);
      Alert.alert('Something went wrong!', 'Please try again');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate('DetailsScreen', { item })}>
        <View style={styles.imageContainer}>
          <Image
            source={
              streetViewImages.length > 0
                ? { uri: streetViewImages[0] }
                : require('../../../assets/images/cars.jpg')
            }
            resizeMode="stretch"
            style={styles.image}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.location}>
            {address}
            {/* , {city}, {state}, {postalCode} */}
          </Text>
          <Text style={styles.bookings}>
            {item.bookings ? item.bookings.length : 'No'} Upcoming Bookings
          </Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{getRole({ ownerId, userId, staff })}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StaffParkingOrders', { listingId: item._id })}>
          <Text style={styles.buttonText}>Parking Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Manage Staffs', { listingId: item._id })}>
          <Text style={styles.buttonText}>Manage Staff</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsRow2}>
        <TouchableOpacity style={styles.button2} onPress={modifyListingHandler}>
          <Text style={styles.buttonText2}>Modify</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={handlePublish}>
          {loadingP ? (
            <ActivityIndicator color="#27aae1" />
          ) : (
            <Text style={styles.buttonText2}>{item.published ? 'Unpublish' : 'Publish'}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={handleDelete}>
          {loadingD ? (
            <ActivityIndicator color="#27aae1" />
          ) : (
            <Text style={styles.buttonText2}>Delete</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsRow2}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate('Promo Codes', { listingId: item._id })}>
          <Text style={styles.buttonText2}>Promo Codes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={() => {}}>
          <Text style={styles.buttonText2}>Inbox</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 0.7,
    borderColor: colors.grey,
    padding: 10,
    marginVertical: 5
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageContainer: {
    width: '20%'
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10
  },
  title: {
    width: '65%'
  },
  location: {
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 15,
    fontWeight: '700'
  },
  bookings: {
    // fontFamily: 'roboto-500',
    color: 'rgba(39,170,225,1)',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 10
  },
  tag: {
    width: '15%',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tagText: {
    textTransform: 'capitalize',
    color: colors.secondary,
    fontSize: 9,
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 5,
    paddingVertical: 3
  },
  buttonsRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
    // alignItems: 'center'
  },
  button2: {
    width: '32%',
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText2: {
    color: colors.primary,
    fontSize: 12,
    paddingVertical: 10,
    fontWeight: 'bold'
  },
  buttonsRow: {
    borderTopColor: colors.lightGrey,
    borderTopWidth: 1,
    paddingTop: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: colors.primary,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button1: {
    borderWidth: 1,
    borderColor: colors.primary,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: colors.white,
    fontSize: 12,
    paddingVertical: 10,
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({ auth }) => ({
  userId: auth.data.attributes.sub
});

export default connect(mapStateToProps, {
  deleteListingLocal,
  publishListingLocal,
  addTempListing
})(MyListingListItem);
