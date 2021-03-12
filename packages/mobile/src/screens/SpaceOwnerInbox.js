import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import ScreenTittle from '../components/common/ScreenTittle';
import { connect } from 'react-redux';
import { useGetOwnerInbox } from './InboxScreen';
import colors from '@parkyourself-frontend/shared/config/colors';
import LoadingSpinner from '../components/common/LoadingSpinner';

const win = Dimensions.get('window');
function Inbox({ navigation, userData, route, listings }) {
  const { loading, data, error } = useGetOwnerInbox();
  if (error) {
    return (
      <View style={styles.centerView}>
        <Text style={styles.location}>Something went wrong</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.topContainer}>
      <ScreenTittle title="Space Owner Inbox" />
      {loading ? (
        <View style={styles.centerView}>
          <LoadingSpinner />
        </View>
      ) : data?.getOwnerInbox?.length ? (
        data?.getOwnerInbox?.map((listing, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('InboxScreen', {
                id: listing?._id
              })
            }>
            <View style={styles.container}>
              <View style={styles.header}>
                {/* <View style={styles.imageContainer}>
                    <Image
                      source={
                        listings?.locationDetails?.streetViewImages.length > 0
                          ? { uri: listings?.locationDetails?.streetViewImages[0] }
                          : require('../assets/images/cars.jpg')
                      }
                      resizeMode="stretch"
                      style={styles.image}
                    />
                  </View> */}
                <View style={styles.title}>
                  <Text style={styles.location}>
                    {listing?.listingAddress}
                    {/* {`${listing?.locationDetails?.address} , ${listing?.locationDetails?.city} , ${listing?.locationDetails?.state} , ${listing?.locationDetails?.postalCode}`} */}
                  </Text>
                  <Text style={styles.bookings}>
                    {/* {item.bookings ? item.bookings.length : 'No'} */}
                    {/* Upcoming Bookings */}
                  </Text>
                </View>
                {/* <View style={styles.tag}>
                  <Text style={styles.tagText}>Manager</Text>
                </View> */}
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.centerView}>
          <Text style={styles.location}>No message found</Text>
        </View>
      )}
    </ScrollView>
  );
}
const mapStateToProps = ({ auth, user }) => ({
  userData: auth.data.attributes,
  listings: user.listings
});
export default connect(mapStateToProps)(Inbox);
const styles = StyleSheet.create({
  centerView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  topContainer: {
    flex: 1,
    backgroundColor: colors.white,
    // margin: 10,
    padding: 10
    // borderWidth: 1,
    // borderColor: 'rgba(197,196,196,1)',
    // shadowColor: 'rgba(0,0,0,1)'
  },
  container: {
    width: '100%',
    // height: 154,
    // position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(197,196,196,1)',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10
    },
    elevation: 20,
    shadowOpacity: 0.17,
    shadowRadius: 20,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10
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
    // backgroundColor: 'rgba(39,170,225,0.2)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tagText: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 9,
    backgroundColor: 'rgba(39,170,225,0.2)',
    paddingHorizontal: 5,
    paddingVertical: 3
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
  loginButton: {
    width: '32%',
    height: 36,
    borderWidth: 1,
    borderColor: 'rgba(39,170,225,1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  login: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 12
  },
  viewDetails: {
    width: '32%',
    height: 36
    // fontSize: 8,
  },
  modifyButton: {
    width: '32%',
    height: 36,
    borderWidth: 1,
    borderColor: 'rgba(39,170,225,1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modify: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 12
  }
});
