import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useMutation } from '@apollo/client';
import { connect } from 'react-redux';
import { deleteTempListing } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import MaterialButtonPrimary from '../../components/MaterialButtonPrimary';
import AddListingHeader from '../../components/SpaceOwner/AddListingHeader';
import { addListingLocal, updateListingLocal } from '../../app/redux/actions/user';
import ListingService from '../../app/services/listing.service';

function SaveSpaceDetails({
  navigation,
  onBackButtonPress,
  tempListing,
  deleteTempListing,
  userData,
  addListingLocal,
  updateListingLocal
}) {
  const [createListing] = useMutation(ListingService.CREATE_LISTING);
  const [updateListing] = useMutation(ListingService.UPDATE_LISTING);

  const [disabled, setDisabled] = useState(false);
  const backButtonHandler = () => {
    onBackButtonPress(1);
  };

  const onSubmitHandler = async () => {
    try {
      setDisabled(true);
      await ListingService.addListingService(
        tempListing,
        createListing,
        updateListing,
        userData,
        addListingLocal,
        updateListingLocal
      );
      deleteTempListing();
      setDisabled(false);
      // if (tempListing.edit) {
      //   navigation.navigate('MyListingsScreen');
      // } else {
      //   navigation.navigate('SpaceOwnerDashboard');
      // }
      navigation.navigate('MyListingsScreen');
    } catch (error) {
      console.log(error);
      setDisabled(false);
      Alert.alert('Something Went wrong!', error.message);
    }
  };

  return (
    <>
      <AddListingHeader onPress={backButtonHandler} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Add a Space</Text>
        <Text style={styles.loremIpsum}>
          All the details related to the parking space have been recieved, do you wish to save the
          details? If you want to edit any details, please click back icon and do so. Once all
          details are correct you can save it.
        </Text>
        {disabled ? (
          <ActivityIndicator style={styles.loading} color="#0b4094" size="large" />
        ) : (
          <MaterialButtonPrimary
            onPress={onSubmitHandler}
            caption="SAVE ALL DETAILS"
            style={styles.materialButtonPrimary}
          />
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50
  },
  addASpace: {
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
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 18,
    lineHeight: 24,
    marginTop: 30
  },
  loading: {
    marginTop: 75
  },
  materialButtonPrimary: {
    width: 170,
    // height: 40,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10
    },
    elevation: 20,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 75,
    alignSelf: 'center',
    backgroundColor: '#0b4094',
    paddingVertical: 15,
    borderRadius: 10
  }
});

const mapStateToProps = ({ tempListing, auth }) => ({
  tempListing,
  userData: auth.authenticated ? auth.data.attributes : null
});
export default connect(mapStateToProps, {
  deleteTempListing,
  addListingLocal,
  updateListingLocal
})(SaveSpaceDetails);
