import colors from '@parkyourself-frontend/shared/config/colors';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
const placeholderImage = require('../../../assets/images/cars.jpg');
import { extendMoment } from 'moment-range';
const moment2 = extendMoment(moment);

export default function ListingCard({ listing, index }) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.imageRow}>
          <Image
            source={
              listing.locationDetails.streetViewImages.length > 0 &&
              listing.locationDetails.streetViewImages[0].includes('http')
                ? { uri: listing.locationDetails.streetViewImages[0] }
                : placeholderImage
            }
            style={styles.image}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.topRow}>
            <View style={styles.nameRow}>
              <Text style={styles.title}>{listing.locationDetails.address}</Text>
            </View>
            <View>
              <View style={styles.durationView}>
                <Text style={styles.durationText}>Manager</Text>
              </View>
            </View>
          </View>
          <View style={styles.nameRow}>
            <Text style={styles.subTitle}>
              Owner: <Text style={styles.ownerName}>{listing.ownerName}</Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonRow}>
        {listing.published ? (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>INACTIVE</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.buttonText2}>ACTIVE</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
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
  subTitle: {
    marginVertical: 5
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    marginTop: 10,
    borderTopWidth: 0.3
  },
  button: {
    backgroundColor: '#C0C0C0',
    padding: 10,
    borderRadius: 2,
    flex: 0.4,
    alignItems: 'center'
  },
  button2: {
    backgroundColor: '#4cbb17',
    padding: 10,
    borderRadius: 2,
    flex: 0.4,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.primary
  },
  buttonText: { color: colors.white, fontSize: 13, textAlign: 'center' },
  buttonText2: { color: colors.white, fontSize: 13, textAlign: 'center' }
});
