import colors from '@parkyourself-frontend/shared/config/colors';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { extendMoment } from 'moment-range';
import { connect } from 'react-redux';

const placeholderImage = require('../../../assets/images/cars.jpg');

const moment2 = extendMoment(moment);

function ListingCard({ navigation, parking, price = 'NaN' ,userData}) {

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.imageRow}
          onPress={() => navigation.navigate('DetailsScreen', { item: parking })}>
          <Image
            source={
              parking.locationDetails.streetViewImages.length > 0 &&
              parking.locationDetails.streetViewImages[0].includes('http')
                ? { uri: parking.locationDetails.streetViewImages[0] }
                : placeholderImage
            }
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.topRow}
            onPress={() => navigation.navigate('DetailsScreen', { item: parking })}>
            <View style={styles.nameRow}>
              <Text style={styles.title}>{parking.locationDetails.address}</Text>
            </View>
            <View>
              <View style={styles.durationView}>
                <Text style={styles.durationText}>Manager</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${price}</Text>
            <TouchableOpacity
              style={styles.ratingButton}
              onPress={() =>
                navigation.navigate('Reviews', {
                  id: parking?._id
                })
              }>
              <Ionicons name="star" style={styles.star} />
              <Ionicons name="star" style={styles.star} />
              <Ionicons name="star" style={styles.star} />
              <Ionicons name="star" style={styles.star} />
              <Ionicons name="star-half-sharp" style={styles.star} />
              <Text style={styles.ratingText}>4.7(183)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PayNow', { item: parking })}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('DetailsScreen', { item: parking })}>
          <Text style={styles.buttonText2}>More Details</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate("ChatScreen", {
           user1Id: parking?.ownerId,
           user2Id:userData?.sub,
           listingLocation:parking?.locationDetails?.address
        })} style={styles.button2}>
          <Text style={styles.buttonText2}>Chat With Owner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = ({ auth }) => ({
  userData: auth.data.attributes
});

export default connect(mapStateToProps)(ListingCard)

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
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
    fontWeight: 'bold',
    color: colors.primary
  },
  subTitle: {
    marginVertical: 5
  },
  ownerName: {
    // textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  feature: {
    borderColor: colors.secondary,
    borderWidth: 1
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
    justifyContent: 'space-around',
    paddingTop: 10,
    marginTop: 10,
    borderTopWidth: 0.5,
    borderColor: colors.grey
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    paddingHorizontal: 0,
    marginHorizontal: 4,
    borderRadius: 2,
    flex: 0.4,
    alignItems: 'center'
  },
  button2: {
    backgroundColor: colors.white,
    padding: 10,
    paddingHorizontal: 0,
    marginHorizontal: 4,
    borderRadius: 2,
    flex: 0.4,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.primary
  },
  buttonText: { color: colors.white, fontSize: 13, textAlign: 'center' },
  buttonText2: { color: colors.primary, fontSize: 13, textAlign: 'center' },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingVertical: 10
  },
  price: { fontWeight: 'bold' },
  ratingButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ratingText: {
    color: colors.black,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 5
  },
  star: { color: colors.yellow, fontSize: 20 }
});
