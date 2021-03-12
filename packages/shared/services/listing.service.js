import { Storage } from 'aws-amplify';
import { gql } from '@apollo/client';
import config from '@parkyourself-frontend/shared/aws-exports';
import { client } from '../graphql';

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

const CREATE_LISTING = gql`
  mutation CreateListing(
    $thumbnail: String
    $ownerId: String!
    $ownerEmail: String!
    $ownerName: String!
    $locationDetails: LocationDataInput
    $spaceDetails: SpaceDetailsDataInput
    $spaceAvailable: SpaceAvailableDataInput
    $pricingDetails: PricingDetailsDataInput
    $location: LocationDataMarkerInput
  ) {
    createListing(
      thumbnail: $thumbnail
      ownerId: $ownerId
      ownerEmail: $ownerEmail
      ownerName: $ownerName
      locationDetails: $locationDetails
      spaceDetails: $spaceDetails
      spaceAvailable: $spaceAvailable
      pricingDetails: $pricingDetails
      location: $location
    ) {
      _id
      ownerId
      ownerEmail
      ownerName
      published
      location {
        type
        coordinates
      }
      locationDetails {
        listingType
        propertyType
        propertyName
        address
        city
        state
        country
        postalCode
        code
        phone
        marker {
          type
          coordinates
        }
        streetViewImages
        parkingEntranceImages
        parkingSpaceImages
        features
      }
      spaceDetails {
        parkingSpaceType
        qtyOfSpaces
        heightRestriction
        height1 {
          value
          unit
        }
        height2 {
          value
          unit
        }
        sameSizeSpaces
        largestSize
        motorcycle
        compact
        midsized
        large
        oversized
        motorcycleSpaces
        compactSpaces
        midsizedSpaces
        largeSpaces
        oversizedSpaces
        isLabelled
        spaceLabels {
          label
          largestSize
          isBooked
        }
        aboutSpace
        accessInstructions
      }
      spaceAvailable {
        scheduleType
        monday {
          isActive
          startTime
          endTime
        }
        tuesday {
          isActive
          startTime
          endTime
        }
        wednesday {
          isActive
          startTime
          endTime
        }
        thursday {
          isActive
          startTime
          endTime
        }
        friday {
          isActive
          startTime
          endTime
        }
        saturday {
          isActive
          startTime
          endTime
        }
        sunday {
          isActive
          startTime
          endTime
        }
        customTimeRange
        hasNoticeTime
        noticeTime {
          value
          unit
        }
        advanceBookingTime {
          value
          unit
        }
        minTime {
          value
          unit
        }
        maxTime {
          value
          unit
        }
        instantBooking
      }
      pricingDetails {
        pricingType
        pricingRates {
          perHourRate
          perDayRate
          perWeekRate
          perMonthRate
        }
      }
      bookings
      reviews
      createdAt
    }
  }
`;

const UPDATE_LISTING = gql`
  mutation UpdateListing(
    $id: ID!
    $locationDetails: LocationDataInput
    $spaceDetails: SpaceDetailsDataInput
    $spaceAvailable: SpaceAvailableDataInput
    $pricingDetails: PricingDetailsDataInput
    $location: LocationDataMarkerInput
  ) {
    updateListing(
      id: $id
      locationDetails: $locationDetails
      spaceDetails: $spaceDetails
      spaceAvailable: $spaceAvailable
      pricingDetails: $pricingDetails
      location: $location
    ) {
      _id
      ownerId
      ownerName
      ownerEmail
      published
      location {
        type
        coordinates
      }
      locationDetails {
        listingType
        propertyType
        propertyName
        address
        city
        state
        country
        postalCode
        code
        phone
        marker {
          type
          coordinates
        }
        streetViewImages
        parkingEntranceImages
        parkingSpaceImages
        features
      }
      spaceDetails {
        parkingSpaceType
        qtyOfSpaces
        heightRestriction
        height1 {
          value
          unit
        }
        height2 {
          value
          unit
        }
        sameSizeSpaces
        largestSize
        motorcycle
        compact
        midsized
        large
        oversized
        motorcycleSpaces
        compactSpaces
        midsizedSpaces
        largeSpaces
        oversizedSpaces
        isLabelled
        spaceLabels {
          label
          largestSize
          isBooked
        }
        aboutSpace
        accessInstructions
      }
      spaceAvailable {
        scheduleType
        monday {
          isActive
          startTime
          endTime
        }
        tuesday {
          isActive
          startTime
          endTime
        }
        wednesday {
          isActive
          startTime
          endTime
        }
        thursday {
          isActive
          startTime
          endTime
        }
        friday {
          isActive
          startTime
          endTime
        }
        saturday {
          isActive
          startTime
          endTime
        }
        sunday {
          isActive
          startTime
          endTime
        }
        customTimeRange
        hasNoticeTime
        noticeTime {
          value
          unit
        }
        advanceBookingTime {
          value
          unit
        }
        minTime {
          value
          unit
        }
        maxTime {
          value
          unit
        }
        instantBooking
      }
      pricingDetails {
        pricingType
        pricingRates {
          perHourRate
          perDayRate
          perWeekRate
          perMonthRate
        }
      }
      bookings
      reviews
      createdAt
    }
  }
`;

const GET_OWNER_LISTINGS = gql`
  query GetOwnerListings($ownerId: String!) {
    getOwnerListings(ownerId: $ownerId) {
      _id
      ownerId
      ownerName
      ownerEmail
      published
      location {
        type
        coordinates
      }
      locationDetails {
        listingType
        propertyType
        propertyName
        address
        city
        state
        country
        postalCode
        code
        phone
        marker {
          type
          coordinates
        }
        streetViewImages
        parkingEntranceImages
        parkingSpaceImages
        features
      }
      spaceDetails {
        parkingSpaceType
        qtyOfSpaces
        heightRestriction
        height1 {
          value
          unit
        }
        height2 {
          value
          unit
        }
        sameSizeSpaces
        largestSize
        motorcycle
        compact
        midsized
        large
        oversized
        motorcycleSpaces
        compactSpaces
        midsizedSpaces
        largeSpaces
        oversizedSpaces
        isLabelled
        spaceLabels {
          label
          largestSize
        }
        aboutSpace
        accessInstructions
      }
      spaceAvailable {
        hasNoticeTime
        scheduleType
        instantBooking
        monday {
          isActive
          startTime
          endTime
        }
        tuesday {
          isActive
          startTime
          endTime
        }
        wednesday {
          isActive
          startTime
          endTime
        }
        thursday {
          isActive
          startTime
          endTime
        }
        friday {
          isActive
          startTime
          endTime
        }
        saturday {
          isActive
          startTime
          endTime
        }
        sunday {
          isActive
          startTime
          endTime
        }
        customTimeRange
        noticeTime {
          value
          unit
        }
        advanceBookingTime {
          value
          unit
        }
        minTime {
          value
          unit
        }
        maxTime {
          value
          unit
        }
        instantBooking
      }
      pricingDetails {
        pricingType
        pricingRates {
          perHourRate
          perDayRate
          perWeekRate
          perMonthRate
        }
      }
      bookings
      reviews
      createdAt
    }
  }
`;

const getMyListingService = async (userId, loadUserListings) => {
  const { data } = await client.query({
    query: GET_OWNER_LISTINGS,
    variables: { ownerId: userId }
  });
  if (data.getOwnerListings) {
    return loadUserListings(data.getOwnerListings);
  }
};

const addListingService = async (
  tempListing,
  createListing,
  updateListing,
  userData,
  addListingLocal,
  updateListingLocal
) => {
  let streetViewImageArray = [...tempListing.locationDetails.streetViewImages];
  let parkingEntranceImageArray = [...tempListing.locationDetails.parkingEntranceImages];
  let parkingSpaceImageArray = [...tempListing.locationDetails.parkingSpaceImages];

  const {
    tStreetViewImages: streetViewImageFiles,
    tParkingEntranceImages: parkingEntranceImageFiles,
    tParkingSpaceImages: parkingSpaceImageFiles
  } = tempListing;

  let thumbnailURL = 'none';

  // if (streetViewImageFiles.length > 0) {
  //   const options = {
  //     maxSizeMB: 0.03,
  //     maxIteration: 70,
  //     useWebWorker: true,
  //   };
  //   let {type: cmimeType} = streetViewImageFiles[0];
  //   let thumbnailExtension = streetViewImageFiles[0].name
  //     .split('.')
  //     .pop()
  //     .toLowerCase();
  //   let compressedFile = await Compress(streetViewImageFiles[0], options);
  //   let thumbnailKey = `images/thumbnail/${uuid()}thumbnail.${thumbnailExtension}`;
  //   thumbnailURL = `https://${bucket}.s3.${region}.amazonaws.com/public/${thumbnailKey}`;
  //   await Storage.put(thumbnailKey, compressedFile, {
  //     contentType: cmimeType,
  //   });
  // }

  if (tempListing.mobile) {
    for (let i = 0; i < streetViewImageFiles.length; i++) {
      let file = streetViewImageFiles[i];
      const response = await fetch(file);
      const blob = await response.blob();
      let extension = 'jpeg';
      let key = `images-mobile/${uuid()}-${uuid()}.${extension}`;
      let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
      streetViewImageArray.push(url);
      await Storage.put(key, blob, {
        contentType: 'image/jpeg'
      });
    }

    for (let i = 0; i < parkingEntranceImageFiles.length; i++) {
      let file = parkingEntranceImageFiles[i];
      const response = await fetch(file);
      const blob = await response.blob();
      let extension = 'jpeg';
      let key = `images-mobile/${uuid()}${uuid()}.${extension}`;
      let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
      parkingEntranceImageArray.push(url);
      await Storage.put(key, blob, {
        contentType: 'image/jpeg'
      });
    }

    for (let i = 0; i < parkingSpaceImageFiles.length; i++) {
      let file = parkingSpaceImageFiles[i];
      const response = await fetch(file);
      const blob = await response.blob();
      let extension = 'jpeg';
      let key = `images-mobile/${uuid()}${uuid()}.${extension}`;
      let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
      parkingSpaceImageArray.push(url);
      await Storage.put(key, blob, {
        contentType: 'image/jpeg'
      });
    }
  } else {
    for (let i = 0; i < streetViewImageFiles.length; i++) {
      let file = streetViewImageFiles[i];
      const response = await fetch(file);
      const blob = await response.blob();
      let extension = 'jpeg';
      let key = `images-mobile/${uuid()}-${uuid()}.${extension}`;
      let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
      streetViewImageArray.push(url);
      await Storage.put(key, blob, {
        contentType: 'image/jpeg'
      });
    }

    for (let i = 0; i < parkingEntranceImageFiles.length; i++) {
      let file = parkingEntranceImageFiles[i];
      const response = await fetch(file);
      const blob = await response.blob();
      let extension = 'jpeg';
      let key = `images-mobile/${uuid()}${uuid()}.${extension}`;
      let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
      parkingEntranceImageArray.push(url);
      await Storage.put(key, blob, {
        contentType: 'image/jpeg'
      });
    }

    for (let i = 0; i < parkingSpaceImageFiles.length; i++) {
      let file = parkingSpaceImageFiles[i];
      const response = await fetch(file);
      const blob = await response.blob();
      let extension = 'jpeg';
      let key = `images-mobile/${uuid()}${uuid()}.${extension}`;
      let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
      parkingSpaceImageArray.push(url);
      await Storage.put(key, blob, {
        contentType: 'image/jpeg'
      });
    }
  }

  let variables = {
    thumbnail: streetViewImageArray.length > 0 ? streetViewImageArray[0] : thumbnailURL,
    ownerId: userData.sub,
    ownerName: userData.name,
    ownerEmail: userData.email,
    locationDetails: {
      ...tempListing.locationDetails,
      streetViewImages: streetViewImageArray,
      parkingEntranceImages: parkingEntranceImageArray,
      parkingSpaceImages: parkingSpaceImageArray
    },
    spaceDetails: tempListing.spaceDetails,
    spaceAvailable: tempListing.spaceAvailable,
    pricingDetails: tempListing.pricingDetails,
    location: tempListing.locationDetails.marker
  };
  if (tempListing.edit) {
    const { data } = await updateListing({
      variables: {
        id: tempListing._id,
        published: false,
        ...variables
      }
    });
    updateListingLocal(data.updateListing);
    return data;
  } else {
    const { data: data1 } = await createListing({
      variables
    });
    addListingLocal(data1.createListing);
    return data1;
  }
};

export default {
  addListingService,
  getMyListingService,
  CREATE_LISTING,
  UPDATE_LISTING
};
