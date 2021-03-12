import React from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import {
  updateTempListing,
  deleteTempListing
} from '@parkyourself-frontend/shared/redux/actions/tempListing';
import {
  useAddOneListing,
  useGetAllFormOptions
} from '@parkyourself-frontend/shared/hooks/listings';
import colors from '@parkyourself-frontend/shared/config/colors';
import AddListingLocation from './AddListingLocation';
import AddListingSpaceDetails from './AddListingSpaceDetails';
import SpaceAvailable from './SpaceAvailable';
import SetPricingType from './SetPricingType';
import AddListingMenu from './AddListingMenu';
import AddListingHeader from '../../components/SpaceOwner/AddListingHeader';
import NextButton from '../../components/SpaceOwner/NextButton';

const AddListing = ({ navigation, tempListing, updateTempListing, deleteTempListing }) => {
  const { handleSubmit, handleNext } = useAddOneListing();
  useGetAllFormOptions(JSON.stringify({ formName: 'addListing' }));

  const {
    activeIndex,
    locationDetails: { propertyName }
  } = tempListing;
  const setActiveIndex = (index) => updateTempListing({ activeIndex: index });

  const onBackButtonPress = (count = 1) => {
    if (activeIndex > 0) {
      updateTempListing({ activeIndex: 0 });
    } else {
      deleteTempListing();
      // if (tempListing.edit) {
      //   navigation.navigate('My Listings');
      // } else {
      //   navigation.navigate('Profile');
      // }
      navigation.navigate('My Listings');
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>
      <AddListingHeader
        onBackButtonPress={onBackButtonPress}
        icon={activeIndex == 0 ? 'close' : 'arrowleft'}
        navigation={navigation}
        activeIndex={activeIndex}
        handleSubmit={handleSubmit}
        propertyName={propertyName}
        edit={tempListing.edit}
      />
      {activeIndex === 0 && (
        <AddListingMenu
          navigation={navigation}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          edit={tempListing.edit}
          listing={tempListing}
        />
      )}
      {activeIndex >= 1 && activeIndex < 6 && (
        <AddListingLocation
          navigation={navigation}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
      {activeIndex >= 6 && activeIndex < 9 && (
        <AddListingSpaceDetails
          navigation={navigation}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
      {activeIndex >= 9 && activeIndex < 14 && (
        <SpaceAvailable
          navigation={navigation}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
      {activeIndex === 14 && <SetPricingType navigation={navigation} />}
      {activeIndex > 0 && activeIndex < 15 && (
        <NextButton
          showLeftButton
          onPress={handleNext}
          onPressLeftButton={() => setActiveIndex(activeIndex - 1)}
        />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = ({ tempListing }) => ({
  tempListing
});

export default connect(mapStateToProps, { updateTempListing, deleteTempListing })(AddListing);
