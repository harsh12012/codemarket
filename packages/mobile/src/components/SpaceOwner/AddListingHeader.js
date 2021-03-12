import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { deleteTempListing } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import {
  addListingLocal,
  updateListingLocal
} from '@parkyourself-frontend/shared/redux/actions/user';
import colors from '@parkyourself-frontend/shared/config/colors';

const AddListingHeader = ({
  onBackButtonPress,
  icon = 'arrowleft',
  activeIndex = 0,
  handleSubmit,
  propertyName,
  edit
}) => {
  const [disabled, setDisabled] = useState(false);

  const onSubmitHandler = async () => {
    try {
      setDisabled(true);
      await handleSubmit();
      setDisabled(false);
      // navigation.navigate('My Listings');
    } catch (error) {
      // console.log('error', error);
      setDisabled(false);
      Alert.alert('Something Went wrong!', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.progressIndicator}>
        <View style={{ ...styles.progress, width: `${activeIndex * 5.8}%` }} />
      </View> */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={onBackButtonPress} style={styles.backBtn}>
          <AntDesignIcon name={icon} size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>{edit ? 'Edit' : 'Add'} Listing</Text>
        {disabled ? (
          <ActivityIndicator style={styles.loading} color="white" size="small" />
        ) : (
          <TouchableOpacity onPress={onSubmitHandler} style={styles.appBarSaveExit}>
            <Text style={styles.save}>Save</Text>
          </TouchableOpacity>
        )}
        {/* {disabled ? (
          <ActivityIndicator style={styles.loading} color="white" size="small" />
        ) : activeIndex == 0 && propertyName == '' ? null : (
          <TouchableOpacity onPress={onSubmitHandler} style={styles.appBarSaveExit}>
            <Text style={styles.save}>Save</Text>
          </TouchableOpacity>
        )} */}
      </View>
      {/* <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={onPress} />
        <Appbar.Content title="Home" titleStyle={styles.appBarTitle} />
        <Appbar.Content title="Save & Exit" titleStyle={styles.appBarSaveExit} />
      </Appbar.Header> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 30,
    backgroundColor: colors.white,
    width: '100%'
    // position: 'absolute',
    // top: 0,
    // marginBottom: 20,
    // paddingBottom: 10,
    // zIndex: 1000000
  },
  progressIndicator: {
    width: '100%',
    height: 5
  },
  progress: {
    height: 10,
    backgroundColor: colors.primary
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  saveBtn: {},
  appBar: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#064298'
  },
  appBarTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    paddingLeft: 10,
    letterSpacing: 0.5,
    textAlignVertical: 'center',
    fontFamily: 'Feather'
  },
  appBarSaveExit: {
    textAlign: 'right',
    textAlignVertical: 'center'
  },
  save: {
    color: 'white',
    fontWeight: '600',
    textAlignVertical: 'center',
    fontFamily: 'Montserrat-Medium'
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
})(AddListingHeader);
