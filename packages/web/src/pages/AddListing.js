import React, { useState, useEffect } from 'react';
import { Form, InputGroup, FormControl, Spinner, Button, Card } from 'react-bootstrap';
import AddListingHeader from '../app/components/AddListingHeader';
import CheckBoxItem from '../app/components/CheckBoxItem';
import RadioItem from '../app/components/RadioItem';
import MapContainer from '../app/components/MapContainer';
import { connect } from 'react-redux';
import slugify from 'slugify';
import { Storage } from 'aws-amplify';
import { useMutation, gql, useQuery } from '@apollo/client';
import { v4 as uuid } from 'uuid';
import { showLoading, hideLoading } from 'react-redux-loading';
import config from '@parkyourself-frontend/shared/aws-exports';
import { client } from '../app/graphql/index';
import moment from 'moment';
import {
  addListingLocation,
  addListingSpaceDetails,
  addListingSpaceAvailable,
  addListingPricingDetails,
  saveSpaceDetails
} from '../app/redux/actions/listing';
import { Trash, XCircle } from 'react-feather';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { convertTo12hrformat } from '../helpers/utilities';
import AddListingButtonRow from '../app/components/AddListingButtonRow';
import StartEndTimePicker from '../app/components/StartEndTimePicker';
import SpaceOwnerContainer from '../app/components/SpaceOwnerContainer';
import { updateListingLocal } from '../app/redux/actions/user';
// import DatePicker from "react-multi-date-picker";
import Geocode from 'react-geocode';
import CustomScheduleModal from '../app/components/CustomScheduleModal';
import StartEndDateTimePicker from '../app/components/StartEndDateTimePicker';
import { useRouter } from 'next/router';
import PublishListingModal from '../app/components/PublishListingModal';
import Compress from 'browser-image-compression';

Geocode.setApiKey('AIzaSyDF0pzALjYYanPshuclFzq_2F24xZWZjOg');

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

const GET_LISTING = gql`
  query GetListing($id: ID!) {
    getListing(id: $id) {
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

const countryCodes = [
  { code: '+1', country: 'United States' },
  { code: '+93', country: 'Afghanistan' },
  { code: '+358', country: 'Aland Islands' },
  { code: '+355', country: 'Albania' },
  { code: '+213', country: 'Algeria' },
  { code: '+54', country: 'Argentina' },
  { code: '+61', country: 'Australia' },
  { code: '+43', country: 'Austria' },
  { code: '+1', country: 'Bahamas' },
  { code: '+973', country: 'Bahrain' },
  { code: '+880', country: 'Bangladesh' },
  { code: '+1', country: 'Barbados' },
  { code: '+375', country: 'Belarus' },
  { code: '+32', country: 'Belgium' },
  { code: '+975', country: 'Bhutan' },
  { code: '+55', country: 'Brazil' },
  { code: '+359', country: 'Bulgaria' },
  { code: '+855', country: 'Cambodia' },
  { code: '+1', country: 'Canada' },
  { code: '+236', country: 'Central African Republic' },
  { code: '+56', country: 'Chile' },
  { code: '+86', country: 'China' },
  { code: '+57', country: 'Colombia' },
  { code: '+506', country: 'Costa Rica' },
  { code: '+53', country: 'Cuba' },
  { code: '+420', country: 'Czech Republic' },
  { code: '+45', country: 'Denmark' },
  { code: '+1', country: 'Dominica' },
  { code: '+1', country: 'Dominican Republic' },
  { code: '+593', country: 'Ecuador' },
  { code: '+20', country: 'Egypt' },
  { code: '+251', country: 'Ethiopia' },
  { code: '+679', country: 'Fiji' },
  { code: '+358', country: 'Finland' },
  { code: '+33', country: 'France' },
  { code: '+995', country: 'Georgia' },
  { code: '+49', country: 'Germany' },
  { code: '+30', country: 'Greece' },
  { code: '+299', country: 'Greenland' },
  { code: '+224', country: 'Guinea' },
  { code: '+852', country: 'Hong Kong' },
  { code: '+36', country: 'Hungary' },
  { code: '+91', country: 'India' },
  { code: '+98', country: 'Iran' },
  { code: '+964', country: 'Iraq' },
  { code: '+39', country: 'Italy' },
  { code: '+1', country: 'Jamaica' },
  { code: '+81', country: 'Japan' },
  { code: '+254', country: 'Kenya' },
  { code: '+965', country: 'Kuwait' },
  { code: '+961', country: 'Lebanon' },
  { code: '+218', country: 'Libya' },
  { code: '+352', country: 'Luxembourg' },
  { code: '+853', country: 'Macau' },
  { code: '+389', country: 'Macedonia' },
  { code: '+60', country: 'Malaysia' },
  { code: '+230', country: 'Mauritius' },
  { code: '+52', country: 'Mexico' },
  { code: '+95', country: 'Myanmar' },
  { code: '+264', country: 'Namibia' },
  { code: '+31', country: 'Netherlands' },
  { code: '+64', country: 'New Zealand' },
  { code: '+234', country: 'Nigeria' },
  { code: '+850', country: 'North Korea' },
  { code: '+47', country: 'Norway' },
  { code: '+968', country: 'Oman' },
  { code: '+92', country: 'Pakistan' },
  { code: '+507', country: 'Panama' },
  { code: '+63', country: 'Philippines' },
  { code: '+351', country: 'Portugal' },
  { code: '+974', country: 'Qatar' },
  { code: '+242', country: 'Republic of the Congo' },
  { code: '+7', country: 'Russia' },
  { code: '+378', country: 'San Marino' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+65', country: 'Singapore' },
  { code: '+252', country: 'Somalia' },
  { code: '+27', country: 'South Africa' },
  { code: '+34', country: 'Spain' },
  { code: '+94', country: 'Sri Lanka' },
  { code: '+41', country: 'Switzerland' },
  { code: '+886', country: 'Taiwan' },
  { code: '+66', country: 'Thailand' },
  { code: '+90', country: 'Turkey' },
  { code: '+256', country: 'Uganda' },
  { code: '+380', country: 'Ukraine' },
  { code: '+971', country: 'United Arab Emirates' },
  { code: '+44', country: 'United Kingdom' },

  { code: '+39', country: 'Vatican' },
  { code: '+58', country: 'Venezuela' },
  { code: '+84', country: 'Vietnam' },
  { code: '+967', country: 'Yemen' },
  { code: '+260', country: 'Zambia' },
  { code: '+263', country: 'Zimbabwe' }
];

const featureList = [
  '24/7 access',
  'Car Wash',
  'Covered',
  'EV Charging',
  'Fenced',
  'Mobile Pass',
  'Paved',
  'Security',
  'Staff onsite',
  'Tandem',
  'Unpaved',
  'Valet'
];

const AddListing = ({
  locationDetails,
  spaceDetails,
  spaceAvailable,
  pricingDetails,
  addListingLocation,
  addListingSpaceDetails,
  addListingSpaceAvailable,
  addListingPricingDetails,
  isSpaceOwner,
  saveSpaceDetails,
  listing,
  listings,
  location,
  queryParams,
  userData,
  updateListingLocal,
  hideLoading,
  showLoading
}) => {
  const router = useRouter();
  const [createListing] = useMutation(CREATE_LISTING);
  const [updateListing] = useMutation(UPDATE_LISTING);

  // const searchParams = new URLSearchParams(location.search);

  const { loading, error, data } = useQuery(GET_LISTING, {
    variables: { id: router.query.id }
  });

  // state variables
  // console.log(listing);

  const [activeIndex, setActiveIndex] = useState(1);
  const [tempError, setTempError] = useState('<error>');

  const [progress, setProgress] = useState(0);

  // const [validate, setValidate] = useState(false);
  const [validated, setValidated] = useState(false);

  //================== Location Details ======================

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('');
  const [published, setPublished] = useState(false);
  const [disabled, updateDisabled] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [locationData, setLocationData] = useState({
    listingType: 'Business',
    propertyType: 'Driveway',
    propertyName: '',
    country: countryCodes[0].country,
    address: '',
    unitNum: '',
    city: '',
    state: '',
    postalCode: '',
    code: countryCodes[0].code,
    phone: '',
    marker: {
      type: 'Point',
      coordinates: [-122.4324, 37.78825]
    },
    streetViewImages: [],
    parkingEntranceImages: [],
    parkingSpaceImages: [],
    features: []
  });

  const [streetViewImageFiles, setStreetViewImageFiles] = useState([]);
  const [parkingEntranceImageFiles, setParkingEntranceImageFiles] = useState([]);
  const [parkingSpaceImageFiles, setParkingSpaceImageFiles] = useState([]);
  const [streetViewTempImages, setStreetViewTempImages] = useState([]);
  const [parkingEntranceTempImages, setParkingEntranceTempImages] = useState([]);
  const [parkingSpaceTempImages, setParkingSpaceTempImages] = useState([]);

  const [spaceDetailsData, setSpaceDetailsData] = useState({
    parkingSpaceType: 'Tandem',
    qtyOfSpaces: 1,
    heightRestriction: true,
    height1: { value: 0, unit: 'feet' },
    height2: { value: 0, unit: 'inches' },
    sameSizeSpaces: true,
    largestSize: '',
    motorcycle: false,
    compact: false,
    midsized: false,
    large: false,
    oversized: false,
    motorcycleSpaces: 0,
    compactSpaces: 0,
    midsizedSpaces: 0,
    largeSpaces: 0,
    oversizedSpaces: 0,
    isLabelled: null,
    spaceLabels: [],
    aboutSpace: '',
    accessInstructions: ''
  });

  const today = new Date();

  const [spaceAvailableData, setSpaceAvailableData] = useState({
    monday: { isActive: false, startTime: new Date(), endTime: new Date() },
    tuesday: { isActive: false, startTime: new Date(), endTime: new Date() },
    wednesday: { isActive: false, startTime: new Date(), endTime: new Date() },
    thursday: { isActive: false, startTime: new Date(), endTime: new Date() },
    friday: { isActive: false, startTime: new Date(), endTime: new Date() },
    saturday: { isActive: false, startTime: new Date(), endTime: new Date() },
    sunday: { isActive: false, startTime: new Date(), endTime: new Date() },
    scheduleType: '',
    // startTime: '',
    // endTime: '',
    customTimeRange: [],
    hasNoticeTime: true,
    noticeTime: { value: 0, unit: 'Hours' },
    advanceBookingTime: { value: 0, unit: 'Hours' },
    minTime: { value: 0, unit: 'Hours' },
    maxTime: { value: 0, unit: 'Days' },
    instantBooking: 0
  });

  const [pricingDetailsData, setPricingDetailsData] = useState({
    pricingType: '',
    pricingRates: {
      perHourRate: 0,
      perDayRate: 0,
      perWeekRate: 0,
      perMonthRate: 0
    }
  });

  const [showCustomScheduleModal, setShowCustomScheduleModal] = useState(false);
  const [customRange, setCustomRange] = useState([new Date(), new Date()]);

  const [listingId, setListingId] = useState(null);

  const [search, setSearch] = useState('');

  const onChangeSearch = (value) => {
    setSearch(value);
  };

  // upload the image to S3 and then save it in the GraphQL API
  async function handleSubmit() {
    // e.preventDefault();
    updateDisabled(true);
    showLoading();
    try {
      let streetViewImageArray = [];
      let parkingEntranceImageArray = [];
      let parkingSpaceImageArray = [];
      let thumbnailURL = 'none';
      if (streetViewImageFiles.length > 0) {
        const options = {
          maxSizeMB: 0.03,
          maxIteration: 70,
          useWebWorker: true
        };
        let { type: cmimeType } = streetViewImageFiles[0];
        let thumbnailExtension = streetViewImageFiles[0].name.split('.').pop().toLowerCase();
        let compressedFile = await Compress(streetViewImageFiles[0], options);
        let thumbnailKey = `images/thumbnail/${uuid()}thumbnail.${thumbnailExtension}`;
        thumbnailURL = `https://${bucket}.s3.${region}.amazonaws.com/public/${thumbnailKey}`;
        await Storage.put(thumbnailKey, compressedFile, {
          contentType: cmimeType
        });
      }
      for (let i = 0; i < streetViewImageFiles.length; i++) {
        let file = streetViewImageFiles[i];
        let fileName = file.name.split('.')[0].toLowerCase();
        let extension = file.name.split('.')[1].toLowerCase();
        let { type: mimeType } = file;
        let key = `images/${uuid()}${fileName}.${extension}`;
        let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
        streetViewImageArray.push(url);
        // setLocationData({ ...locationData, images: [...images, url] });
        await Storage.put(key, file, {
          contentType: mimeType
        });
      }

      for (let i = 0; i < parkingEntranceImageFiles.length; i++) {
        let file = parkingEntranceImageFiles[i];
        let fileName = file.name.split('.')[0].toLowerCase();
        let extension = file.name.split('.')[1].toLowerCase();
        let { type: mimeType } = file;
        let key = `images/${uuid()}${fileName}.${extension}`;
        let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
        parkingEntranceImageArray.push(url);
        // setLocationData({ ...locationData, images: [...images, url] });
        await Storage.put(key, file, {
          contentType: mimeType
        });
      }

      for (let i = 0; i < parkingSpaceImageFiles.length; i++) {
        let file = parkingSpaceImageFiles[i];
        let fileName = file.name.split('.')[0].toLowerCase();
        let extension = file.name.split('.')[1].toLowerCase();
        let { type: mimeType } = file;
        let key = `images/${uuid()}${fileName}.${extension}`;
        let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
        parkingSpaceImageArray.push(url);
        // setLocationData({ ...locationData, images: [...images, url] });
        await Storage.put(key, file, {
          contentType: mimeType
        });
      }

      setLocationData({
        ...locationData,
        streetViewImages: streetViewImageArray,
        parkingEntranceImages: parkingEntranceImageArray,
        parkingSpaceImages: parkingSpaceImageArray
      });

      const response = await createListing({
        variables: {
          thumbnail: thumbnailURL,
          ownerId: userData.sub,
          ownerName: userData.name,
          ownerEmail: userData.email,
          locationDetails: {
            ...locationData,
            streetViewImages: streetViewImageArray,
            parkingEntranceImages: parkingEntranceImageArray,
            parkingSpaceImages: parkingSpaceImageArray
          },
          spaceDetails: spaceDetailsData,
          spaceAvailable: spaceAvailableData,
          pricingDetails: pricingDetailsData,
          location: marker
        }
      });
      setListingId(response.data.createListing._id);
      updateDisabled(false);
      hideLoading();
      console.log('response : ', response);
      saveSpaceDetails({
        // locationDetails: locationData,
        // spaceDetails: spaceDetailsData,
        // spaceAvailable: spaceAvailableData,
        // pricingDetails: pricingDetailsData,
        ...response.data.createListing
      });

      alert('Listing Added Successfully!');
      setSaveSuccess(true);
    } catch (error) {
      // console.log(error.message.includes("E11000"));
      updateDisabled(false);
      console.log(error);
      setTempError(error);
      hideLoading();
      if (error.message.includes('E11000')) {
        return alert('Title is already present!');
      }
      alert('Something went wrong please try again');
    }
  }

  //edit listing handler
  const handleSubmitEdit = async () => {
    // e.preventDefault();
    updateDisabled(true);
    try {
      showLoading();
      let streetViewImageArray = [...streetViewImages];
      let parkingEntranceImageArray = [...parkingEntranceImages];
      let parkingSpaceImageArray = [...parkingSpaceImages];

      for (let i = 0; i < streetViewImageFiles.length; i++) {
        let file = streetViewImageFiles[i];
        let fileName = file.name.split('.')[0].toLowerCase();
        let extension = file.name.split('.')[1].toLowerCase();
        let { type: mimeType } = file;
        let key = `images/${uuid()}${fileName}.${extension}`;
        let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
        streetViewImageArray.push(url);
        await Storage.put(key, file, {
          contentType: mimeType
        });
      }

      for (let i = 0; i < parkingEntranceImageFiles.length; i++) {
        let file = parkingEntranceImageFiles[i];
        let fileName = file.name.split('.')[0].toLowerCase();
        let extension = file.name.split('.')[1].toLowerCase();
        let { type: mimeType } = file;
        let key = `images/${uuid()}${fileName}.${extension}`;
        let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
        parkingEntranceImageArray.push(url);
        await Storage.put(key, file, {
          contentType: mimeType
        });
      }

      for (let i = 0; i < parkingSpaceImageFiles.length; i++) {
        let file = parkingSpaceImageFiles[i];
        let fileName = file.name.split('.')[0].toLowerCase();
        let extension = file.name.split('.')[1].toLowerCase();
        let { type: mimeType } = file;
        let key = `images/${uuid()}${fileName}.${extension}`;
        let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
        parkingSpaceImageArray.push(url);
        await Storage.put(key, file, {
          contentType: mimeType
        });
      }

      let res = await updateListing({
        variables: {
          locationDetails: {
            ...locationData,
            streetViewImages: streetViewImageArray,
            parkingEntranceImages: parkingEntranceImageArray,
            parkingSpaceImages: parkingSpaceImageArray
          },
          spaceDetails: spaceDetailsData,
          spaceAvailable: spaceAvailableData,
          pricingDetails: pricingDetailsData,
          id: id,
          published: false,
          location: marker
        }
      });
      console.log('updated response : ', res);
      updateListingLocal(res.data.updateListing);

      hideLoading();
      updateDisabled(false);
      // setShowModal(false);
      alert('Listing updated successfully!');
      setSaveSuccess(true);
    } catch (error) {
      console.log(error);
      alert('Something went wrong!', 'Please try again');
      updateDisabled(false);
      hideLoading();
    }
  };

  const handleFileChange = (e) => {
    let imageArray = [];
    // let videoArray = [];
    let imageFileArray = [];
    // let videoFileArray = [];
    let tempFiles = [];
    if (e.target.name == 'streetView') {
      // if (edit) imageArray = [...streetViewImages];
      tempFiles = [...e.target.files];
    } else if (e.target.name == 'parkingEntrance') {
      // if (edit) imageArray = [...parkingEntranceImages];
      tempFiles = [...e.target.files];
    } else if (e.target.name == 'parkingSpace') {
      // if (edit) imageArray = [...parkingSpaceImages];
      tempFiles = [...e.target.files];
    }
    // if (edit) imageArray = [...images];
    // let tempFiles = [...imageFiles, ...e.target.files];
    // imageArray=[];
    for (let i = 0; i < tempFiles.length; i++) {
      imageArray.push(URL.createObjectURL(tempFiles[i]));
      imageFileArray.push(tempFiles[i]);
    }

    tempFiles = imageFileArray;
    if (e.target.name == 'streetView') {
      setStreetViewTempImages(imageArray);
      setStreetViewImageFiles(tempFiles);
    } else if (e.target.name == 'parkingEntrance') {
      setParkingEntranceTempImages(imageArray);
      setParkingEntranceImageFiles(tempFiles);
    } else if (e.target.name == 'parkingSpace') {
      setParkingSpaceTempImages(imageArray);
      setParkingSpaceImageFiles(tempFiles);
    }
  };

  const handleRemoveImage = (value, type) => {
    let tempImageArray = [];
    let tempFilesArray = [];
    let images = [];
    if (type == 'streetView') {
      tempImageArray = [...streetViewTempImages];
      tempFilesArray = [...streetViewImageFiles];
      images = [...streetViewImages];
    } else if (type == 'parkingEntrance') {
      tempImageArray = [...parkingEntranceTempImages];
      tempFilesArray = [...parkingEntranceImageFiles];
      images = [...parkingEntranceImages];
    } else if (type == 'parkingSpace') {
      tempImageArray = [...parkingSpaceTempImages];
      tempFilesArray = [...parkingSpaceImageFiles];
      images = [...parkingSpaceImages];
    }

    let index = tempImageArray.indexOf(value);
    if (index !== -1) {
      if (edit) {
        let tempEditImageArray = [...images];
        if (index + 1 > images.length) {
          tempFilesArray.splice(index, 1);
        }
        tempEditImageArray.splice(index, 1);
      }
      tempImageArray.splice(index, 1);
      if (!edit) tempFilesArray.splice(index, 1);

      if (type == 'streetView') {
        setStreetViewTempImages(tempImageArray);
        setStreetViewImageFiles(tempFilesArray);
      } else if (type == 'parkingEntrance') {
        setParkingEntranceTempImages(tempImageArray);
        setParkingEntranceImageFiles(tempFilesArray);
      } else if (type == 'parkingSpace') {
        setParkingSpaceTempImages(tempImageArray);
        setParkingSpaceImageFiles(tempFilesArray);
      }
    }
  };

  const handleSelect = async (value) => {
    setSearch(value);
    // const details = await geocodeByAddress(value);
    // console.log(details);

    geocodeByAddress(value)
      .then((details) => {
        let add = '';
        let country = 'Afghanistan';
        let city = '';
        let state = '';
        let postalCode = '';
        let code = '+93';

        console.log(details[0]);

        add = details[0].formatted_address;

        details[0].address_components.forEach((item) => {
          // if (item.types.includes('route')) {
          //   add += `${item.long_name}, `;
          // }
          // if (item.types.includes('sublocality')) {
          //   add += `${item.long_name}, `;
          // }
          if (item.types.includes('country')) {
            country = item.long_name;
          }
          if (item.types.includes('administrative_area_level_1')) {
            state = item.long_name;
          }
          if (item.types.includes('administrative_area_level_2')) {
            city = item.long_name;
          }
          if (item.types.includes('postal_code')) {
            postalCode = item.long_name;
          }
        });

        setLocationData({
          ...locationData,
          country: country,
          address: add,
          city: city,
          state: state,
          postalCode: postalCode,
          marker: {
            type: 'Point',
            coordinates: [details[0].geometry.location.lng(), details[0].geometry.location.lat()]
          },
          code: countryCodes.find((i) => i.country == country).code
        });

        return getLatLng(details[0]);
      })
      .then((latLng) => {
        console.log('Success', latLng);
        // setLocationData({ ...locationData, marker: latLng });
      })
      .catch((error) => console.error('Error', error));
  };

  const onChangeLocationData = (event) => {
    console.log(event.target.name, event.target.value);
    console.log(locationData);
    setLocationData({
      ...locationData,
      [event.target.name]: event.target.value
    });
  };

  const onChangeSpaceDetailsData = (event) => {
    console.log(event.target.name, event.target.value);
    console.log(spaceDetailsData);

    setSpaceDetailsData({
      ...spaceDetailsData,
      [event.target.name]: event.target.value
    });
  };

  const onChangeSpaceAvailableData = (event) => {
    console.log(event.target.name, event.target.value);
    console.log(spaceAvailableData);
    setSpaceAvailableData({
      ...spaceAvailableData,
      [event.target.name]: event.target.value
    });
  };

  const onChangePricingDetailsData = (event) => {
    console.log(event.target.name, event.target.value);
    setPricingDetailsData({
      ...pricingDetailsData,
      [event.target.name]: event.target.value
    });
  };

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
  } = locationData;

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
  } = spaceDetailsData;

  const {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    scheduleType,
    // startTime,
    // endTime,
    customTimeRange,
    hasNoticeTime,
    noticeTime,
    advanceBookingTime,
    minTime,
    maxTime,
    instantBooking
  } = spaceAvailableData;

  const { pricingType, pricingRates } = pricingDetailsData;

  // //============== Utility Functions =============================================================

  const toggleFeatures = (feature) => {
    console.log(features);
    console.log(feature);
    if (!features) {
      setLocationData({
        ...locationData,
        features: [feature]
      });
    } else {
      if (features.includes(feature)) {
        setLocationData({
          ...locationData,
          features: features.filter((item) => item != feature)
        });
      } else {
        setLocationData({ ...locationData, features: [...features, feature] });
      }
    }

    console.log(features);
  };

  const setParkingSpaceInputs = (qty) => {
    console.log('setParkingSpaceInputs');
    var num = qty;
    let arr = [];
    if (sameSizeSpaces) {
      for (let i = 0; i < num; i++) {
        arr.push({
          label: '',
          largestSize: largestSize,
          isBooked: false
        });
      }
    } else {
      if (motorcycle) {
        for (let i = 0; i < motorcycleSpaces; i++) {
          arr.push({
            label: '',
            largestSize: 'Motorcycle',
            isBooked: false
          });
        }
      }
      if (compact) {
        for (let i = 0; i < compactSpaces; i++) {
          arr.push({
            label: '',
            largestSize: 'Compact',
            isBooked: false
          });
        }
      }
      if (midsized) {
        for (let i = 0; i < midsizedSpaces; i++) {
          arr.push({
            label: '',
            largestSize: 'Mid Sized',
            isBooked: false
          });
        }
      }

      if (large) {
        for (let i = 0; i < largeSpaces; i++) {
          arr.push({
            label: '',
            largestSize: 'Large',
            isBooked: false
          });
        }
      }
      if (oversized) {
        for (let i = 0; i < oversizedSpaces; i++) {
          arr.push({
            label: '',
            largestSize: 'Over Sized',
            isBooked: false
          });
        }
      }
    }
    // setSpaceDetailsData({
    //   ...spaceDetailsData,
    //   spaceLabels: arr,
    // });

    console.log(arr);
    return arr;
  };

  // if (qtyOfSpaces) {
  //   setParkingSpaceInputs(qtyOfSpaces);
  // }

  const setLabelById = (idx, label) => {
    setSpaceDetailsData({
      ...spaceDetailsData,
      spaceLabels: spaceLabels.map((item, index) =>
        index == idx ? { ...item, label: label } : { ...item }
      )
    });
    console.log(spaceLabels);
  };

  const setLargestSizeById = (idx, size) => {
    setSpaceDetailsData({
      ...spaceDetailsData,
      spaceLabels: spaceLabels.map((item, index) =>
        index == idx ? { ...item, largestSize: size } : { ...item }
      )
    });
    console.log(spaceLabels);
  };

  const checkAllSpaceLabels = () => {
    var flag = true;
    spaceLabels.forEach((item) => {
      if (!item.label || !item.largestSize) {
        console.log('found invalid space label');
        flag = false;
      }
    });
    return flag;
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

  const backButtonHandler = () => {
    if (activeIndex != 1) {
      setActiveIndex(activeIndex - 1);

      setProgress(progress - 5);
    }
  };

  const onSubmitHandler = () => {
    try {
      if (activeIndex != 19) {
        if (
          (activeIndex == 1 && propertyName) ||
          (activeIndex == 2 &&
            country &&
            address &&
            city &&
            state &&
            postalCode &&
            code &&
            phone) ||
          activeIndex == 3 ||
          activeIndex == 4 ||
          activeIndex == 5 ||
          (activeIndex == 6 && qtyOfSpaces >= 1) ||
          (activeIndex == 7 &&
            sameSizeSpaces != null &&
            (heightRestriction ? height1.value > 0 : true)) ||
          (activeIndex == 8 &&
            ((sameSizeSpaces && largestSize) ||
              (!sameSizeSpaces &&
                (motorcycle || compact || midsized || large || oversized) &&
                checkTotalCount()))) ||
          (activeIndex == 9 && isLabelled != null && (isLabelled ? checkAllSpaceLabels() : true)) ||
          (activeIndex == 10 && aboutSpace) ||
          (activeIndex == 11 && accessInstructions) ||
          (activeIndex == 12 &&
            (scheduleType == '24hours' ||
              (scheduleType == 'fixed' &&
                (monday.isActive ? monday.startTime && monday.endTime : true) &&
                (tuesday.isActive ? tuesday.startTime && tuesday.endTime : true) &&
                (wednesday.isActive ? wednesday.startTime && wednesday.endTime : true) &&
                (thursday.isActive ? thursday.startTime && thursday.endTime : true) &&
                (friday.isActive ? friday.startTime && friday.endTime : true) &&
                (saturday.isActive ? saturday.startTime && saturday.endTime : true) &&
                (sunday.isActive ? sunday.startTime && sunday.endTime : true)) ||
              (scheduleType == 'custom' && customTimeRange.length > 0))) ||
          // (activeIndex == 14 &&
          //   ((scheduleType == 'fixed' && startTime && endTime) ||
          //     scheduleType == '24hours' ||
          //     (scheduleType == 'custom' && customTimeRange))) ||
          (activeIndex == 13 &&
            (!hasNoticeTime ||
              (hasNoticeTime && noticeTime.value !== '' && noticeTime.value >= 0))) ||
          (activeIndex == 14 && advanceBookingTime.value !== '' && advanceBookingTime.value >= 0) ||
          (activeIndex == 15 &&
            minTime.value !== '' &&
            minTime.value >= 0 &&
            maxTime.value !== '' &&
            maxTime.value >= 0) ||
          (activeIndex == 16 && !(instantBooking === '')) ||
          (activeIndex == 17 && pricingType) ||
          (activeIndex == 18 &&
            pricingRates.perHourRate !== '' &&
            pricingRates.perDayRate !== '' &&
            pricingRates.perWeekRate !== '' &&
            pricingRates.perMonthRate !== '' &&
            pricingRates.perHourRate >= 0 &&
            pricingRates.perDayRate >= 0 &&
            pricingRates.perWeekRate >= 0 &&
            pricingRates.perMonthRate >= 0)
        ) {
          setValidated(false);
          setActiveIndex(activeIndex + 1);
          setProgress(progress + 6);
        } else {
          setValidated(true);
        }
      } else {
        if (edit) {
          handleSubmitEdit();
        } else {
          handleSubmit();
        }

        console.log(locationData);
        console.log(spaceDetailsData);
        console.log(spaceAvailableData);
        console.log(pricingDetailsData);
      }
    } catch (error) {
      alert('Something Went wrong!', 'Unable to add location data');
    }
  };

  const saveAndExitHandler = () => {
    try {
      if (edit) {
        console.log('saveAndExitHandler handleSubmitEdit');
        handleSubmitEdit();
      } else {
        console.log('saveAndExitHandler handleSubmit');
        handleSubmit();
      }
    } catch (err) {
      alert('Unable to save your listing', 'Please Try Again');
    }
  };

  const onMapClick = (mapProps, map, clickEvent) => {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        console.log(response);
        handleSelect(response.results[0].formatted_address);
      },
      (error) => {
        console.error(error);
      }
    );

    console.log(locationData);
  };

  // const fetchPlaces

  const setScheduleType = (type) => {
    console.log(type);
    setSpaceAvailableData({ ...spaceAvailableData, scheduleType: type });

    console.log(locationData);
  };

  const setNoticeTime = (time) => {
    console.log(time);
    setSpaceAvailableData({ ...spaceAvailableData, noticeTime: time });

    console.log(locationData);
  };

  const setAdvanceBookingTime = (time) => {
    console.log(time);

    setSpaceAvailableData({ ...spaceAvailableData, advanceBookingTime: time });

    console.log(locationData);
  };

  const setMinTime = (time) => {
    console.log(time);

    setSpaceAvailableData({ ...spaceAvailableData, minTime: time });
    console.log(locationData);
  };

  const setMaxTime = (time) => {
    console.log(time);

    setSpaceAvailableData({ ...spaceAvailableData, maxTime: time });
    console.log(locationData);
  };

  const setPricingType = (type) => {
    console.log(type);
    setPricingDetailsData({ ...pricingDetailsData, pricingType: type });

    console.log(locationData);
  };

  const setPricingRates = (rate) => {
    console.log(rate);
    setPricingDetailsData({
      ...pricingDetailsData,
      pricingRates: { ...pricingRates, ...rate }
    });
    console.log(locationData);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        // setMarker({
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude,
        // });
        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
          (response) => {
            console.log(response);
            const address = response.results[0].formatted_address;
            console.log(address);
            handleSelect(response.results[0].formatted_address);
          },
          (error) => {
            console.error(error);
          }
        );
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  useEffect(() => {
    // function getLocation() {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //       console.log(position);
    //       setLocationData({
    //         ...locationData,
    //         marker: {
    //           lat: position.coords.latitude,
    //           lng: position.coords.longitude,
    //         },
    //       });
    //     });
    //   } else {
    //     console.log('Geolocation is not supported by this browser.');
    //   }
    // }
    // getLocation();
    // let searchParams = new URLSearchParams(location.search);
    // if (searchParams.get('edit') && searchParams.get('id')) {
    //   setEdit(searchParams.get('edit'));
    //   const id = searchParams.get('id');
    //   setId(id);
    //   console.log('edit page');
    //   listings.forEach((item) => {
    //     if (item._id == id) {
    //       console.log(item);
    //       setId(item._id);

    // setLocationData(item.locationDetails);
    // setSpaceDetailsData(item.spaceDetails);
    // setSpaceAvailableData(item.spaceAvailable);
    // setPricingDetailsData(item.pricingDetails);
    if (!error && data != null) {
      console.log(data.getListing);
      setEdit(true);
      setId(data.getListing._id);
      setPublished(data.getListing.published);
      let {
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
      } = data.getListing.locationDetails;
      let {
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
      } = data.getListing.spaceDetails;
      let {
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
      } = data.getListing.spaceAvailable;
      let { pricingType, pricingRates } = data.getListing.pricingDetails;

      let locationData = {
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
        marker: {
          type: 'Point',
          coordinates: marker.coordinates
        },
        streetViewImages,
        parkingEntranceImages,
        parkingSpaceImages,
        features
      };

      let spaceDetailsData = {
        parkingSpaceType,
        qtyOfSpaces,
        heightRestriction,
        height1: { value: height1.value, unit: height1.unit },
        height2: { value: height2.value, unit: height2.unit },
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
        spaceLabels: spaceLabels.map((item) => ({
          label: item.label,
          largestSize: item.largestSize,
          isBooked: item.isBooked
        })),
        aboutSpace,
        accessInstructions
      };

      let spaceAvailableData = {
        monday: {
          isActive: monday.isActive,
          startTime: monday.startTime,
          endTime: monday.endTime
        },
        tuesday: {
          isActive: tuesday.isActive,
          startTime: tuesday.startTime,
          endTime: tuesday.endTime
        },
        wednesday: {
          isActive: wednesday.isActive,
          startTime: wednesday.startTime,
          endTime: wednesday.endTime
        },
        thursday: {
          isActive: thursday.isActive,
          startTime: thursday.startTime,
          endTime: thursday.endTime
        },
        friday: {
          isActive: friday.isActive,
          startTime: friday.startTime,
          endTime: friday.endTime
        },
        saturday: {
          isActive: saturday.isActive,
          startTime: saturday.startTime,
          endTime: saturday.endTime
        },
        sunday: {
          isActive: sunday.isActive,
          startTime: sunday.startTime,
          endTime: sunday.endTime
        },
        scheduleType,
        customTimeRange,
        noticeTime: { value: noticeTime.value, unit: noticeTime.unit },
        advanceBookingTime: {
          value: advanceBookingTime.value,
          unit: advanceBookingTime.unit
        },
        minTime: { value: minTime.value, unit: minTime.unit },
        maxTime: { value: maxTime.value, unit: maxTime.unit },
        instantBooking
      };

      let pricingDetailsData = {
        pricingType,
        pricingRates: {
          perHourRate: pricingRates.perHourRate,
          perDayRate: pricingRates.perDayRate,
          perWeekRate: pricingRates.perWeekRate,
          perMonthRate: pricingRates.perMonthRate
        }
      };

      console.log({
        locationData,
        spaceAvailableData,
        spaceDetailsData,
        pricingDetailsData
      });

      setStreetViewTempImages(streetViewImages);
      setParkingEntranceTempImages(parkingEntranceImages);
      setParkingSpaceTempImages(parkingSpaceImages);

      setLocationData(locationData);
      setSpaceDetailsData(spaceDetailsData);
      setSpaceAvailableData(spaceAvailableData);
      setPricingDetailsData(pricingDetailsData);
    }
  }, [data]);

  const getSpacesCount = () => {
    let sum = 0;
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

    return sum;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (edit && (error || data.getListing == null)) {
    return <div className="loading">Listing Not Found!</div>;
  }

  // if (saveSuccess) {
  //   router.push("/listings/my");
  // }

  return (
    <SpaceOwnerContainer>
      <div className="dg__account section-padding--xl">
        <AddListingHeader
          progress={progress}
          saveAndExitHandler={saveAndExitHandler}
          activeIndex={activeIndex}
        />
        <AddListingButtonRow
          onNextButtonPress={onSubmitHandler}
          onBackButtonPress={backButtonHandler}
          activeIndex={activeIndex}
        />
        {activeIndex == 1 && (
          <div className="question-item">
            <h1 className="heading">Choose a Listing Type</h1>
            <Form validated={validated}>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Control
                  as="select"
                  name="listingType"
                  custom
                  value={listingType}
                  onChange={(event) => {
                    onChangeLocationData(event);
                  }}>
                  <option>Business</option>
                  <option>Residential</option>
                  <option>Others</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Property Name</Form.Label>
                <Form.Control
                  name="propertyName"
                  value={propertyName}
                  onChange={(event) => {
                    onChangeLocationData(event);
                  }}
                  type="text"
                  placeholder="Enter property name"
                  required
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
            </Form>
          </div>
        )}
        {activeIndex == 2 && (
          <div className="question-item">
            <div className="heading-bar">
              <h1 className="heading">Tell us your Listing Address</h1>
              <Button variant="outline-primary" onClick={getCurrentLocation}>
                Use Current Location
              </Button>
            </div>

            {/* <Form.Group controlId='formBasicEmail'>
            <Form.Control type='text' placeholder='Search your location' />
          </Form.Group> */}

            <PlacesAutocomplete value={search} onChange={onChangeSearch} onSelect={handleSelect}>
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Search your location',
                      className: 'location-search-input'
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? {
                            backgroundColor: '#27aae1',
                            cursor: 'pointer',
                            padding: '10px',
                            border: '1px solid #999'
                          }
                        : {
                            backgroundColor: '#ffffff',
                            cursor: 'pointer',
                            padding: '10px',
                            border: '1px solid #999'
                          };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}>
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>

            <Form validated={validated}>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Control
                  as="select"
                  custom
                  name="country"
                  value={country}
                  onChange={(event) => {
                    onChangeLocationData(event);
                  }}>
                  {countryCodes.map((item) => (
                    <option key={item.country}>{item.country}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={address}
                  onChange={(event) => {
                    onChangeLocationData(event);
                  }}
                  required
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="unitNum"
                  placeholder="Unit #"
                  value={unitNum}
                  onChange={(event) => {
                    onChangeLocationData(event);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="City/Town"
                  value={city}
                  onChange={(event) => {
                    onChangeLocationData(event);
                  }}
                  required
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="State/Province"
                  value={state}
                  name="state"
                  onChange={(event) => {
                    onChangeLocationData(event);
                  }}
                  required
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(event) => {
                    onChangeLocationData(event);
                  }}
                  required
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Control
                      as="select"
                      name="code"
                      custom
                      value={code}
                      onChange={(event) => {
                        onChangeLocationData(event);
                      }}>
                      {countryCodes.map((item) => (
                        <option key={item.country}>{item.code}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  name="phone"
                  type="number"
                  min="0"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(event) => {
                    onChangeLocationData(event);
                  }}
                  required
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </InputGroup>
            </Form>
            <div className="question-item">
              <p className="lead" style={{ margin: '10px auto', textAlign: 'center' }}>
                OR
              </p>
              <h1 className="heading">Mark your location on the Map</h1>
              <MapContainer onMapClick={onMapClick} coordinates={marker.coordinates} />
            </div>
          </div>
        )}
        {/* {activeIndex == 3 && (
          <div className='question-item'>
            <h1 className='heading'>Mark your location on the Map</h1>
            <MapContainer
              onMapClick={onMapClick}
              coordinates={marker.coordinates}
            />
          </div>
        )} */}
        {activeIndex == 3 && (
          <div className="question-item">
            <h1 className="heading">Choose a Property Type</h1>
            <Form>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Control
                  as="select"
                  custom
                  name="propertyType"
                  value={propertyType}
                  onChange={(event) => {
                    onChangeLocationData(event);
                  }}>
                  <option>Driveway</option>
                  <option>Residential Garage</option>
                  <option>Open Air Lot</option>
                  <option>Commercial Parking Structure</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </div>
        )}
        {activeIndex == 4 && (
          <div className="question-item">
            <h1 className="heading">Add Photos of your listing</h1>

            <Form>
              <Form.File
                name="streetView"
                onChange={handleFileChange}
                id="custom-file"
                label="Add Street View Images"
                custom
                accept="image/png, image/jpeg, image/jpg, image/gif"
                style={{ marginBottom: '20px' }}
              />
            </Form>

            <div className="images-wrapper">
              {streetViewTempImages &&
                streetViewTempImages.map((url, i) => {
                  return (
                    <div className="d-inline-block w--50 p-1" key={i}>
                      <button
                        disabled={disabled}
                        type="button"
                        onClick={() => handleRemoveImage(url, 'streetView')}
                        className="btn btn-primary btn-sm p-0 rounded-pill shadow position-absolute right-0"
                        style={{
                          zIndex: '3',
                          borderRadius: '50%',
                          backgroundColor: 'red',
                          border: 'none'
                        }}>
                        <XCircle size={20} />
                      </button>
                      <img style={{ width: '100%' }} src={url} />
                    </div>
                  );
                })}
            </div>

            <Form>
              <Form.File
                name="parkingEntrance"
                onChange={handleFileChange}
                id="custom-file"
                label="Add Parking Entrance Images"
                custom
                accept="image/png, image/jpeg, image/jpg, image/gif"
                style={{ marginBottom: '20px' }}
              />
            </Form>

            <div className="images-wrapper">
              {parkingEntranceTempImages &&
                parkingEntranceTempImages.map((url, i) => {
                  return (
                    <div className="d-inline-block w--50 p-1" key={i}>
                      <button
                        disabled={disabled}
                        type="button"
                        onClick={() => handleRemoveImage(url, 'parkingEntrance')}
                        className="btn btn-primary btn-sm p-0 rounded-pill shadow position-absolute right-0"
                        style={{
                          zIndex: '3',
                          borderRadius: '50%',
                          backgroundColor: 'red',
                          border: 'none'
                        }}>
                        <XCircle size={20} />
                      </button>
                      <img style={{ width: '100%' }} src={url} />
                    </div>
                  );
                })}
            </div>

            <Form>
              <Form.File
                name="parkingSpace"
                onChange={handleFileChange}
                id="custom-file"
                label="Add Parking Space Images"
                custom
                accept="image/png, image/jpeg, image/jpg, image/gif"
                style={{ marginBottom: '20px' }}
              />
            </Form>

            <div className="images-wrapper">
              {parkingSpaceTempImages &&
                parkingSpaceTempImages.map((url, i) => {
                  return (
                    <div className="d-inline-block w--50 p-1" key={i}>
                      <button
                        disabled={disabled}
                        type="button"
                        onClick={() => handleRemoveImage(url, 'parkingSpace')}
                        className="btn btn-primary btn-sm p-0 rounded-pill shadow position-absolute right-0"
                        style={{
                          zIndex: '3',
                          borderRadius: '50%',
                          backgroundColor: 'red',
                          border: 'none'
                        }}>
                        <XCircle size={20} />
                      </button>
                      <img style={{ width: '100%' }} src={url} />
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        {activeIndex == 5 && (
          <div className="question-item">
            <h1 className="heading">What features will you offer?</h1>
            {featureList.map((item) => (
              <CheckBoxItem
                key={item}
                label={item}
                onClick={() => {
                  toggleFeatures(item);
                }}
                checked={features ? features.includes(item) : false}
              />
            ))}
          </div>
        )}
        {activeIndex == 6 && (
          <div className="question-item">
            <h1 className="heading">Choose a Parking Space Type</h1>
            <Form validated={validated}>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Control
                  as="select"
                  custom
                  name="parkingSpaceType"
                  value={parkingSpaceType}
                  onChange={(event) => {
                    onChangeSpaceDetailsData(event);
                  }}>
                  <option>Tandem</option>
                  <option>Side By Side</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Total Quantity of Parking Spaces</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Total Quantity of Parking Spaces"
                  required
                  name="qtyOfSpaces"
                  min="1"
                  required
                  value={qtyOfSpaces}
                  onChange={(event) => {
                    // let arr = setParkingSpaceInputs(event.target.value);
                    setSpaceDetailsData({
                      ...spaceDetailsData,
                      qtyOfSpaces: event.target.value
                      // spaceLabels: arr,
                    });
                    // onChangeSpaceDetailsData(event);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Minimum 1 parking space is required.
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </div>
        )}
        {activeIndex == 7 && (
          <div className="question-item">
            <h1 className="heading">Are all parking spaces the same size?</h1>
            <Form validated={validated}>
              {validated && sameSizeSpaces == null && (
                <p className="invalid-feedback-text">Please select Yes or No</p>
              )}
              <RadioItem
                label="Yes"
                name="sameSizeSpaces"
                onClick={(event) => {
                  console.log(spaceDetailsData);
                  // onChangeSpaceDetailsData(event);
                  setSpaceDetailsData({
                    ...spaceDetailsData,
                    sameSizeSpaces: true
                  });
                }}
                value={true}
                checked={sameSizeSpaces == true}
              />
              <RadioItem
                label="No, some are different"
                name="sameSizeSpaces"
                value={false}
                onClick={(event) => {
                  console.log(spaceDetailsData);
                  // onChangeSpaceDetailsData(event);

                  setSpaceDetailsData({
                    ...spaceDetailsData,
                    sameSizeSpaces: false
                  });
                }}
                checked={sameSizeSpaces == false}
              />
              <br />
              {/* <Form.Group controlId='formBasicEmail'>
            <Form.Control
              type='text'
              placeholder='Vehicle height limit in mtrs (if applicable)'
              required
              name='vehicleHeightLimit'
              value={vehicleHeightLimit}
              onChange={(event) => {
                onChangeSpaceDetailsData(event);
              }}
            />
          </Form.Group> */}

              <h4>Vehicle height limit</h4>

              <CheckBoxItem
                label="No Height Restriction"
                name="heightRestriction"
                onClick={(event) => {
                  console.log(spaceDetailsData);
                  // onChangeSpaceDetailsData(event);

                  setSpaceDetailsData({
                    ...spaceDetailsData,
                    heightRestriction: !heightRestriction
                  });
                }}
                checked={!heightRestriction}
              />

              <br />
              {heightRestriction && (
                <div className="vehicleHeight row">
                  <InputGroup className="mb-3 col-lg-5 col-sm-12 col-xs-12">
                    <FormControl
                      placeholder="Height"
                      type="number"
                      min="1"
                      name="height1"
                      required
                      value={height1.value == 0 ? '' : height1.value}
                      onChange={(event) => {
                        console.log(event.target.value);
                        // onChangeLocationData(event);
                        setSpaceDetailsData({
                          ...spaceDetailsData,
                          height1: { ...height1, value: event.target.value }
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                    {/* {validated && height1.value == 0 && (
                      <Form.Control.Feedback type='invalid'>
                        Height can't be zero
                      </Form.Control.Feedback>
                    )} */}
                    <InputGroup.Append>
                      <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                          as="select"
                          custom
                          value={height1.unit}
                          onChange={(event) => {
                            console.log(event.target.value);
                            console.log(spaceDetailsData);
                            setSpaceDetailsData({
                              ...spaceDetailsData,
                              height1: { ...height1, unit: event.target.value }
                            });
                          }}>
                          <option>feet</option>
                          <option>meters</option>
                        </Form.Control>
                      </Form.Group>
                    </InputGroup.Append>
                  </InputGroup>

                  <InputGroup className="mb-3 col-lg-5 col-sm-12 col-xs-12">
                    <FormControl
                      placeholder="Height"
                      type="number"
                      min="0"
                      name="height1"
                      required
                      value={height2.value == 0 ? '' : height2.value}
                      onChange={(event) => {
                        console.log(event.target.value);
                        // onChangeLocationData(event);
                        setSpaceDetailsData({
                          ...spaceDetailsData,
                          height2: {
                            value: event.target.value,
                            unit: height1.unit == 'feet' ? 'inches' : 'centimeters'
                          }
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>

                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">
                        {height1.unit == 'feet' ? 'inches' : 'centimeters'}
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>

                  {/* <Form.Group controlId='formBasicEmail'>
              <Form.Label>Feet/Meters</Form.Label>
              <Form.Control
                type='number'
                min='0'
                name='height1'
                value={height1}
                String
                onChange={(event) => {
                  onChangeSpaceDetailsData(event);
                }}
              />
              <Form.Control.Feedback type='invalid'>
                This field is required
              </Form.Control.Feedback>
            </Form.Group> */}

                  {/* <Form.Group controlId='formBasicPassword'>
              <Form.Label>Inches/Centimeters</Form.Label>
              <Form.Control
                type='number'
                min='0'
                name='height2'
                value={height2}
                onChange={(event) => {
                  onChangeSpaceDetailsData(event);
                }}
              />
              <Form.Control.Feedback type='invalid'>
                This field is required
              </Form.Control.Feedback>
            </Form.Group> */}
                </div>
              )}
            </Form>
          </div>
        )}
        {activeIndex == 8 && (
          <div className="question-item">
            {sameSizeSpaces ? (
              <>
                <h1 className="heading">Select your Vehicle Size?</h1>
                <p className="description">
                  Select the largest vehicle size for your parking spaces
                </p>
                {validated && !largestSize && (
                  <p className="invalid-feedback-text">Please select at least one vehicle</p>
                )}
                <RadioItem
                  label="Motorcycle"
                  name="largestSize"
                  onClick={(event) => {
                    onChangeSpaceDetailsData(event);
                  }}
                  value="Motorcycle"
                  checked={largestSize == 'Motorcycle'}
                />
                <RadioItem
                  label="Compact"
                  name="largestSize"
                  onClick={(event) => {
                    onChangeSpaceDetailsData(event);
                  }}
                  value="Compact"
                  checked={largestSize == 'Compact'}
                />
                <RadioItem
                  label="Mid Sized"
                  name="largestSize"
                  onClick={(event) => {
                    onChangeSpaceDetailsData(event);
                  }}
                  value="Mid Sized"
                  checked={largestSize == 'Mid Sized'}
                />
                <RadioItem
                  label="Large"
                  name="largestSize"
                  onClick={(event) => {
                    onChangeSpaceDetailsData(event);
                  }}
                  value="Large"
                  checked={largestSize == 'Large'}
                />
                <RadioItem
                  label="Over Sized"
                  name="largestSize"
                  onClick={(event) => {
                    onChangeSpaceDetailsData(event);
                  }}
                  value="Over Sized"
                  checked={largestSize == 'Over Sized'}
                />
              </>
            ) : (
              <>
                <h1 className="heading">Select your Vehicle Sizes?</h1>
                <p className="description">
                  Select the largest vehicle size for your parking spaces (choose more than one if
                  you have different sized spaces)
                </p>
                <br />
                {!sameSizeSpaces && qtyOfSpaces > 0 && (
                  <h6>
                    Sum of Entered Spaces / Total Qty. of Spaces : {getSpacesCount()} /{' '}
                    {qtyOfSpaces}{' '}
                  </h6>
                )}{' '}
                <br />
                <CheckBoxItem
                  label="Motorcycle"
                  name="motorcycle"
                  onClick={(event) => {
                    setSpaceDetailsData({
                      ...spaceDetailsData,
                      motorcycle: !motorcycle
                    });
                  }}
                  checked={motorcycle}
                />
                {!sameSizeSpaces && (
                  <Form validated={validated}>
                    {motorcycle && (
                      <Form.Group controlId="formBasicEmail">
                        <br />
                        <Form.Label>Motorcycle Spaces</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          placeholder="Number of Spaces"
                          name="motorcycleSpaces"
                          required
                          onChange={(event) => {
                            onChangeSpaceDetailsData(event);
                          }}
                          value={motorcycleSpaces}
                        />
                        <Form.Control.Feedback type="invalid">
                          This field is required
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Form>
                )}
                <CheckBoxItem
                  label="Compact"
                  name="compact"
                  onClick={(event) => {
                    setSpaceDetailsData({
                      ...spaceDetailsData,
                      compact: !compact
                    });
                  }}
                  checked={compact}
                />
                {!sameSizeSpaces && (
                  <Form validated={validated}>
                    {compact && (
                      <Form.Group controlId="formBasicEmail">
                        <br />
                        <Form.Label>Compact Car Spaces</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          placeholder="Number of Spaces"
                          name="compactSpaces"
                          required
                          onChange={(event) => {
                            onChangeSpaceDetailsData(event);
                          }}
                          value={compactSpaces}
                        />
                        <Form.Control.Feedback type="invalid">
                          This field is required
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Form>
                )}
                <CheckBoxItem
                  label="Mid Sized"
                  name="midsized"
                  onClick={(event) => {
                    setSpaceDetailsData({
                      ...spaceDetailsData,
                      midsized: !midsized
                    });
                  }}
                  checked={midsized}
                />
                {!sameSizeSpaces && (
                  <Form validated={validated}>
                    {midsized && (
                      <Form.Group controlId="formBasicEmail">
                        <br />
                        <Form.Label>Mid Sized Car Spaces</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          placeholder="Number of Spaces"
                          name="midsizedSpaces"
                          required
                          onChange={(event) => {
                            onChangeSpaceDetailsData(event);
                          }}
                          value={midsizedSpaces}
                        />
                        <Form.Control.Feedback type="invalid">
                          This field is required
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Form>
                )}
                <CheckBoxItem
                  label="Large"
                  name="large"
                  onClick={(event) => {
                    setSpaceDetailsData({
                      ...spaceDetailsData,
                      large: !large
                    });
                  }}
                  checked={large}
                />
                {!sameSizeSpaces && (
                  <Form validated={validated}>
                    {large && (
                      <Form.Group controlId="formBasicEmail">
                        <br />
                        <Form.Label>Large Car Spaces</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          placeholder="Number of Spaces"
                          name="largeSpaces"
                          required
                          onChange={(event) => {
                            onChangeSpaceDetailsData(event);
                          }}
                          value={largeSpaces}
                        />
                        <Form.Control.Feedback type="invalid">
                          This field is required
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Form>
                )}
                <CheckBoxItem
                  label="Over Sized"
                  name="oversized"
                  onClick={(event) => {
                    setSpaceDetailsData({
                      ...spaceDetailsData,
                      oversized: !oversized
                    });
                  }}
                  checked={oversized}
                />
                {!sameSizeSpaces && (
                  <Form validated={validated}>
                    {oversized && (
                      <Form.Group controlId="formBasicEmail">
                        <br />
                        <Form.Label>Over Sized Car Spaces</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          placeholder="Number of Spaces"
                          name="oversizedSpaces"
                          required
                          onChange={(event) => {
                            onChangeSpaceDetailsData(event);
                          }}
                          value={oversizedSpaces}
                        />
                        <Form.Control.Feedback type="invalid">
                          This field is required
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Form>
                )}
                {validated && !(motorcycle || compact || midsized || large || oversized) && (
                  <p className="invalid-feedback-text">Please select at least one vehicle</p>
                )}
                {validated &&
                  (motorcycle || compact || midsized || large || oversized) &&
                  !checkTotalCount() && (
                    <p className="invalid-feedback-text">
                      Sum of all spaces must equal the total quantity of spaces
                    </p>
                  )}
              </>
            )}
            <br />
            <br />
            {/* {!sameSizeSpaces && (
              <Form validated={validated}>
                {(motorcycle || compact || midsized || large || oversized) && (
                  <h4>Enter number of spaces for each type</h4>
                )}
                {motorcycle && (
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Motorcycle Spaces</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="Number of Spaces"
                      name="motorcycleSpaces"
                      required
                      onChange={(event) => {
                        onChangeSpaceDetailsData(event);
                      }}
                      value={motorcycleSpaces}
                    />
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                {compact && (
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Compact Car Spaces</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="Number of Spaces"
                      name="compactSpaces"
                      required
                      onChange={(event) => {
                        onChangeSpaceDetailsData(event);
                      }}
                      value={compactSpaces}
                    />
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                {midsized && (
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Mid Sized Car Spaces</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="Number of Spaces"
                      name="midsizedSpaces"
                      required
                      onChange={(event) => {
                        onChangeSpaceDetailsData(event);
                      }}
                      value={midsizedSpaces}
                    />
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                {large && (
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Large Car Spaces</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="Number of Spaces"
                      name="largeSpaces"
                      required
                      onChange={(event) => {
                        onChangeSpaceDetailsData(event);
                      }}
                      value={largeSpaces}
                    />
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                {oversized && (
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Over Sized Car Spaces</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="Number of Spaces"
                      name="oversizedSpaces"
                      required
                      onChange={(event) => {
                        onChangeSpaceDetailsData(event);
                      }}
                      value={oversizedSpaces}
                    />
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
              </Form>
            )} */}
            <p className="modal-link">How do I determine my space size?</p>
          </div>
        )}
        {activeIndex == 9 && (
          <div className="question-item">
            <h1 className="heading">Are the spaces numbered or labelled?</h1>
            <RadioItem
              label="Yes"
              name="isLabelled"
              onClick={(event) => {
                let arr = setParkingSpaceInputs(qtyOfSpaces);
                setSpaceDetailsData({
                  ...spaceDetailsData,
                  isLabelled: true,
                  spaceLabels: arr
                });
              }}
              value={true}
              checked={isLabelled == true}
            />
            <RadioItem
              label="No"
              name="isLabelled"
              onClick={(event) => {
                setSpaceDetailsData({
                  ...spaceDetailsData,
                  isLabelled: false
                });
              }}
              value={false}
              checked={isLabelled == false}
            />
            <br />
            {isLabelled && (
              <Form validated={validated}>
                <h4>Enter Space Labels</h4>
                {spaceLabels.map((item, index) => (
                  <InputGroup className="mb-3">
                    <FormControl
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Space Label/Number"
                      required
                      value={item.label}
                      onChange={({ target: { value } }) => {
                        setLabelById(index, value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      This field is required
                    </Form.Control.Feedback>
                    <InputGroup.Append>
                      <InputGroup.Text id="basic-addon2">{item.largestSize}</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                ))}
              </Form>
            )}
          </div>
        )}
        {activeIndex == 10 && (
          <div className="question-item">
            <h1 className="heading">Tell guests about your space</h1>
            <Form validated={validated}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="aboutSpace"
                  required
                  placeholder="What makes your space great? Is it nearby notable landmarks or destinations"
                  value={aboutSpace}
                  onChange={(event) => {
                    onChangeSpaceDetailsData(event);
                  }}
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
            </Form>
          </div>
        )}
        {activeIndex == 11 && (
          <div className="question-item">
            <h1 className="heading">Tell guests what to do when they arrive</h1>
            <Form validated={validated}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="accessInstructions"
                  required
                  placeholder="Tell guests what to do when they arrive. Provide special instructions (if any)"
                  value={accessInstructions}
                  onChange={(event) => {
                    onChangeSpaceDetailsData(event);
                  }}
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
              </Form.Group>
            </Form>
          </div>
        )}
        {activeIndex == 12 && (
          <div className="question-item">
            <h1 className="heading">What are the timings?</h1>
            {validated && !scheduleType && (
              <p className="invalid-feedback-text">Please select a schedule type</p>
            )}
            <RadioItem
              label="Set to 24 hours a day"
              name="scheduleType"
              onClick={(event) => {
                // setScheduleType(event.target.value == true ? '24hours' : 'daily');
                console.log(spaceAvailableData);
                setSpaceAvailableData({
                  ...spaceAvailableData,
                  scheduleType: '24hours'
                });
              }}
              checked={scheduleType == '24hours'}
            />

            <RadioItem
              label="Set to a Fixed schedule"
              name="scheduleType"
              onClick={(event) => {
                // setScheduleType(event.target.value == true ? 'daily' : '24hours');
                console.log(spaceAvailableData);
                setSpaceAvailableData({
                  ...spaceAvailableData,
                  scheduleType: 'fixed'
                });
              }}
              checked={scheduleType == 'fixed'}
            />
            <RadioItem
              label="Set a Custom Schedule"
              name="scheduleType"
              onClick={(event) => {
                // setScheduleType(event.target.value == true ? 'daily' : '24hours');
                console.log(spaceAvailableData);

                setSpaceAvailableData({
                  ...spaceAvailableData,
                  scheduleType: 'custom'
                });
              }}
              checked={scheduleType == 'custom'}
            />
            {scheduleType == 'fixed' && (
              <div className="question-item">
                <h1 className="heading">At what days can drivers park at your listing?</h1>
                {validated &&
                  scheduleType == 'fixed' &&
                  !(
                    monday.isActive ||
                    tuesday.isActive ||
                    wednesday.isActive ||
                    thursday.isActive ||
                    friday.isActive ||
                    saturday.isActive ||
                    sunday.isActive
                  ) && <p className="invalid-feedback-text">Please select at least one day</p>}

                <CheckBoxItem
                  label="Monday"
                  name="monday"
                  onClick={(event) => {
                    setSpaceAvailableData({
                      ...spaceAvailableData,
                      monday: { ...monday, isActive: !monday.isActive }
                    });
                  }}
                  checked={monday.isActive}
                />
                {/* {monday.isActive && (
                  <StartEndTimePicker
                    start={monday.startTime}
                    end={monday.endTime}
                    validated={validated}
                    onStartChange={(value) => {
                      // setStart(value);
                      // let time = convertTo12hrformat(value);
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        monday: { ...monday, startTime: value },
                      });
                    }}
                    onEndChange={(value) => {
                      // setStart(value);
                      // let time = convertTo12hrformat(value);
                      console.log(spaceAvailableData);
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        monday: { ...monday, endTime: value },
                      });
                    }}
                  />
                )} */}
                {monday.isActive && (
                  <StartEndDateTimePicker
                    start={monday.startTime}
                    end={monday.endTime}
                    onChange={(start, end) => {
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        monday: { ...monday, startTime: start, endTime: end }
                      });
                    }}
                  />
                )}
                <CheckBoxItem
                  label="Tuesday"
                  name="tuesday"
                  onClick={(event) => {
                    setSpaceAvailableData({
                      ...spaceAvailableData,
                      tuesday: { ...tuesday, isActive: !tuesday.isActive }
                    });
                  }}
                  checked={tuesday.isActive}
                />

                {tuesday.isActive && (
                  <StartEndDateTimePicker
                    start={tuesday.startTime}
                    end={tuesday.endTime}
                    onChange={(start, end) => {
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        tuesday: { ...tuesday, startTime: start, endTime: end }
                      });
                    }}
                  />
                )}

                {/* {tuesday.isActive && (
                  <StartEndTimePicker
                    start={tuesday.startTime}
                    end={tuesday.endTime}
                    validated={validated}
                    onStartChange={(value) => {
                      // setStart(value);
                      // let time = convertTo12hrformat(value);
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        tuesday: { ...tuesday, startTime: value },
                      });
                    }}
                    onEndChange={(value) => {
                      // setStart(value);
                      // let time = convertTo12hrformat(value);
                      console.log(spaceAvailableData);
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        tuesday: { ...tuesday, endTime: value },
                      });
                    }}
                  />
                )} */}

                <CheckBoxItem
                  label="Wednesday"
                  name="wednesday"
                  onClick={(event) => {
                    setSpaceAvailableData({
                      ...spaceAvailableData,
                      wednesday: {
                        ...wednesday,
                        isActive: !wednesday.isActive
                      }
                    });
                  }}
                  checked={wednesday.isActive}
                />

                {wednesday.isActive && (
                  <StartEndDateTimePicker
                    start={wednesday.startTime}
                    end={wednesday.endTime}
                    onChange={(start, end) => {
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        wednesday: {
                          ...wednesday,
                          startTime: start,
                          endTime: end
                        }
                      });
                    }}
                  />
                )}

                {/* {wednesday.isActive && (
                  <StartEndTimePicker
                    start={wednesday.startTime}
                    end={wednesday.endTime}
                    validated={validated}
                    onStartChange={(value) => {
                      // setStart(value);
                      // let time = convertTo12hrformat(value);
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        wednesday: { ...wednesday, startTime: value },
                      });
                    }}
                    onEndChange={(value) => {
                      // setStart(value);
                      // let time = convertTo12hrformat(value);
                      console.log(spaceAvailableData);
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        wednesday: { ...wednesday, endTime: value },
                      });
                    }}
                  />
                )} */}

                <CheckBoxItem
                  label="Thursday"
                  name="thursday"
                  onClick={(event) => {
                    setSpaceAvailableData({
                      ...spaceAvailableData,
                      thursday: { ...thursday, isActive: !thursday.isActive }
                    });
                  }}
                  checked={thursday.isActive}
                />

                {thursday.isActive && (
                  <StartEndDateTimePicker
                    start={thursday.startTime}
                    end={thursday.endTime}
                    onChange={(start, end) => {
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        thursday: {
                          ...thursday,
                          startTime: start,
                          endTime: end
                        }
                      });
                    }}
                  />
                )}

                {/* {thursday.isActive && (
                  <StartEndTimePicker
                    start={thursday.startTime}
                    end={thursday.endtime}
                    validated={validated}
                    onStartChange={(value) => {
                      // setStart(value);
                      // let time = convertTo12hrformat(value);
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        thursday: { ...thursday, startTime: value },
                      });
                    }}
                    onEndChange={(value) => {
                      // setStart(value);
                      // let time = convertTo12hrformat(value);
                      console.log(spaceAvailableData);
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        thursday: { ...thursday, endTime: value },
                      });
                    }}
                  />
                )} */}

                <CheckBoxItem
                  label="Friday"
                  name="friday"
                  onClick={(event) => {
                    setSpaceAvailableData({
                      ...spaceAvailableData,
                      friday: { ...friday, isActive: !friday.isActive }
                    });
                  }}
                  checked={friday.isActive}
                />
                {friday.isActive && (
                  <StartEndDateTimePicker
                    start={friday.startTime}
                    end={friday.endTime}
                    onChange={(start, end) => {
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        friday: { ...friday, startTime: start, endTime: end }
                      });
                    }}
                  />
                )}

                {/* {friday.isActive && (
                  <StartEndTimePicker
                    start={friday.startTime}
                    end={friday.endTime}
                    validated={validated}
                    onStartChange={(value) => {
                      // setStart(value);
                      // let time = convertTo12hrformat(value);
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        friday: { ...friday, startTime: value },
                      });
                    }}
                    onEndChange={(value) => {
                      // setStart(value);
                      // let time = convertTo12hrformat(value);
                      console.log(spaceAvailableData);
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        friday: { ...friday, endTime: value },
                      });
                    }}
                  />
                )} */}

                <CheckBoxItem
                  label="Saturday"
                  name="saturday"
                  onClick={(event) => {
                    setSpaceAvailableData({
                      ...spaceAvailableData,
                      saturday: { ...saturday, isActive: !saturday.isActive }
                    });
                  }}
                  checked={saturday.isActive}
                />

                {saturday.isActive && (
                  <StartEndDateTimePicker
                    start={saturday.startTime}
                    end={saturday.endTime}
                    onChange={(start, end) => {
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        saturday: {
                          ...saturday,
                          startTime: start,
                          endTime: end
                        }
                      });
                    }}
                  />
                )}

                {/* {saturday.isActive && (
                  <StartEndTimePicker
                    start={saturday.startTime}
                    end={saturday.endTime}
                    validated={validated}
                    onStartChange={(value) => {
                      // setStart(value);
                      // let time = convertTo12hrformat(value);
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        saturday: { ...saturday, startTime: value },
                      });
                    }}
                    onEndChange={(value) => {
                      // setStart(value);
                      // let time = convertTo12hrformat(value);
                      console.log(spaceAvailableData);
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        saturday: { ...saturday, endTime: value },
                      });
                    }}
                  />
                )} */}

                <CheckBoxItem
                  label="Sunday"
                  name="sunday"
                  onClick={(event) => {
                    setSpaceAvailableData({
                      ...spaceAvailableData,
                      sunday: { ...sunday, isActive: !sunday.isActive }
                    });
                    console.log(spaceAvailableData);
                  }}
                  checked={sunday.isActive}
                />

                {sunday.isActive && (
                  <StartEndDateTimePicker
                    start={sunday.startTime}
                    end={sunday.endTime}
                    onChange={(start, end) => {
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        sunday: { ...sunday, startTime: start, endTime: end }
                      });
                    }}
                  />
                )}

                {/* {sunday.isActive && (
                  <StartEndTimePicker
                    start={sunday.startTime}
                    end={sunday.endTime}
                    validated={validated}
                    onStartChange={(value) => {
                      // setStart(value);
                      // let time = convertTo12hrformat(value);
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        sunday: { ...sunday, startTime: value },
                      });
                    }}
                    onEndChange={(value) => {
                      // setStart(value);
                      // let time = convertTo12hrformat(value);
                      console.log(spaceAvailableData);
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        sunday: { ...sunday, endTime: value },
                      });
                    }}
                  />
                )} */}
              </div>
            )}

            <br />
            {scheduleType == 'custom' && (
              <>
                <h1 className="heading">Select a time range</h1>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setShowCustomScheduleModal(true);
                  }}>
                  Add a Time Range
                </Button>
                <br />
                <CustomScheduleModal
                  show={showCustomScheduleModal}
                  handleClose={() => {
                    setShowCustomScheduleModal(false);
                  }}
                  handleSave={(dates) => {
                    console.log(customTimeRange);
                    setSpaceAvailableData({
                      ...spaceAvailableData,
                      customTimeRange: [...customTimeRange, ...dates]
                    });
                  }}
                />
                <br />

                {customTimeRange.map((item, idx) => (
                  <Card>
                    <Card.Body
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                      {`${moment(item[0]).format('lll')} to ${moment(item[1]).format('lll')}`}{' '}
                      <Button
                        variant="danger"
                        onClick={() => {
                          setSpaceAvailableData({
                            ...spaceAvailableData,
                            customTimeRange: customTimeRange.filter((item, index) => index !== idx)
                          });
                        }}>
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
                {/* <DateTimeRangePicker
                  value={customRange}
                  onChange={(value) => {
                    setCustomRange(value);
                    // let time = convertTo12hrformat(value);
                    console.log(value);
                    setSpaceAvailableData({
                      ...spaceAvailableData,
                      customTimeRange: [
                        value[0].toString(),
                        value[1].toString(),
                      ],
                    });
                  }}
                />
              </> */}
              </>
            )}
            {/* <Button variant='outline-primary'>Set a Custom Schedule</Button> */}
          </div>
        )}

        {activeIndex == 13 && (
          <div className="question-item">
            <h1 className="heading">How much notice time do you need before guests arrives?</h1>
            <CheckBoxItem
              label="Set it to None"
              name="hasNoticeTime"
              onClick={(event) => {
                setSpaceAvailableData({
                  ...spaceAvailableData,
                  hasNoticeTime: !hasNoticeTime
                });
              }}
              checked={!hasNoticeTime}
            />
            <br />
            {hasNoticeTime && (
              <Form validated={validated}>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Notice Time"
                    type="number"
                    min="0"
                    name="noticeTime"
                    required
                    value={noticeTime.value ? noticeTime.value : ''}
                    onChange={(event) => {
                      console.log(event.target.value);
                      // onChangeLocationData(event);
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        noticeTime: {
                          ...noticeTime,
                          value: event.target.value
                        }
                      });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required
                  </Form.Control.Feedback>
                  <InputGroup.Append>
                    <Form.Group controlId="exampleForm.SelectCustom">
                      <Form.Control
                        as="select"
                        custom
                        value={noticeTime.unit}
                        onChange={(event) => {
                          console.log(event.target.value);
                          console.log(spaceAvailableData);
                          setSpaceAvailableData({
                            ...spaceAvailableData,
                            noticeTime: {
                              ...noticeTime,
                              unit: event.target.value
                            }
                          });
                        }}>
                        <option>Minutes</option>
                        <option>Hours</option>
                        <option>Days</option>
                      </Form.Control>
                    </Form.Group>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
            )}

            <p className="description">
              Tip : At least 2 days' notice can help you plan for a guest's arrival, but you might
              miss out last minute trips.
            </p>
          </div>
        )}
        {activeIndex == 14 && (
          <div className="question-item">
            <h1 className="heading">How far in advance can guests book?</h1>
            {/* <PlusMinusItem
            onPlus={() => {
              setAdvanceBookingTime(advanceBookingTime + 1);
            }}
            onMinus={() => {
              if (advanceBookingTime != 1) {
                setAdvanceBookingTime(advanceBookingTime - 1);
              }
            }}
            label={`${advanceBookingTime} ${
              advanceBookingTime == 1 ? 'Hour' : 'Hours'
            }`}
          /> */}

            <Form validated={validated}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Advance Booking Time"
                  type="number"
                  min="0"
                  required
                  name="advanceBookingTime"
                  value={advanceBookingTime.value ? advanceBookingTime.value : ''}
                  onChange={(event) => {
                    console.log(event.target.value);
                    // onChangeLocationData(event);
                    setSpaceAvailableData({
                      ...spaceAvailableData,
                      advanceBookingTime: {
                        ...advanceBookingTime,
                        value: event.target.value
                      }
                    });
                  }}
                />
                <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
                <InputGroup.Append>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Control
                      as="select"
                      custom
                      value={advanceBookingTime.unit}
                      onChange={(event) => {
                        console.log(event.target.value);
                        console.log(spaceAvailableData);
                        setSpaceAvailableData({
                          ...spaceAvailableData,
                          advanceBookingTime: {
                            ...advanceBookingTime,
                            unit: event.target.value
                          }
                        });
                      }}>
                      <option>Minutes</option>
                      <option>Hours</option>
                      <option>Days</option>
                    </Form.Control>
                  </Form.Group>
                </InputGroup.Append>
              </InputGroup>
            </Form>

            <p className="description">
              Tip : Avoid cancelling or declining guests by only unblocking dates you can host.
            </p>
          </div>
        )}
        {activeIndex == 15 && (
          <div className="question-item">
            <h1 className="heading">How long can guests stay?</h1>
            {/* <PlusMinusItem
            onPlus={() => {
              setMinTime(minTime + 1);
            }}
            onMinus={() => {
              if (minTime != 1) {
                setMinTime(minTime - 1);
              }
            }}
            label={`${minTime} ${minTime == 1 ? 'Hour' : 'Hours'} Minimum`}
          />
          <PlusMinusItem
            onPlus={() => {
              if (maxTime != 30) {
                setMaxTime(maxTime + 1);
              }
            }}
            onMinus={() => {
              if (maxTime != 0) {
                setMaxTime(maxTime - 1);
              }
            }}
            label={`${maxTime} ${maxTime <= 1 ? 'Day' : 'Days'} Maximum`}
          /> */}

            <Form validated={validated}>
              <Form.Group>
                <Form.Label>Minimum Time</Form.Label>

                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Minimum Time"
                    type="number"
                    min="0"
                    name="minTime"
                    value={minTime.value ? minTime.value : ''}
                    required
                    onChange={(event) => {
                      console.log(event.target.value);
                      // onChangeLocationData(event);
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        minTime: { ...minTime, value: event.target.value }
                      });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required
                  </Form.Control.Feedback>
                  <InputGroup.Append>
                    <Form.Group controlId="exampleForm.SelectCustom">
                      <Form.Control
                        as="select"
                        custom
                        value={minTime.unit}
                        onChange={(event) => {
                          console.log(event.target.value);
                          console.log(spaceAvailableData);
                          setSpaceAvailableData({
                            ...spaceAvailableData,
                            minTime: { ...minTime, unit: event.target.value }
                          });
                        }}>
                        <option>Hours</option>
                        <option>Days</option>
                      </Form.Control>
                    </Form.Group>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <Form.Label>Maximum Time</Form.Label>

                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Maximum Time"
                    type="number"
                    min="0"
                    required
                    name="maxTime"
                    value={maxTime.value ? maxTime.value : ''}
                    onChange={(event) => {
                      console.log(event.target.value);
                      // onChangeLocationData(event);
                      setSpaceAvailableData({
                        ...spaceAvailableData,
                        maxTime: { ...maxTime, value: event.target.value }
                      });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required
                  </Form.Control.Feedback>
                  <InputGroup.Append>
                    <Form.Group controlId="exampleForm.SelectCustom">
                      <Form.Control
                        as="select"
                        custom
                        value={maxTime.unit}
                        onChange={(event) => {
                          console.log(event.target.value);
                          console.log(spaceAvailableData);
                          setSpaceAvailableData({
                            ...spaceAvailableData,
                            maxTime: { ...maxTime, unit: event.target.value }
                          });
                        }}>
                        <option>Hours</option>
                        <option>Days</option>
                      </Form.Control>
                    </Form.Group>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </Form>

            <p className="description">
              Tip : Shorter trips can mean more reservations but you might have to turn over your
              space more often.
            </p>
          </div>
        )}
        {activeIndex == 16 && (
          <div className="question-item">
            <h1 className="heading">Which booking process do you prefer?</h1>
            {validated && instantBooking === '' && (
              <p className="invalid-feedback-text">Please select a booking process type</p>
            )}
            <RadioItem
              label="Instant Booking"
              name="instantBooking"
              onClick={(event) => {
                // onChangeSpaceAvailableData(event);
                setSpaceAvailableData({
                  ...spaceAvailableData,
                  instantBooking: true
                });
              }}
              checked={instantBooking === true}
            />
            <RadioItem
              label="Approval is required"
              name="instantBooking"
              onClick={(event) => {
                // onChangeSpaceAvailableData(event);
                setSpaceAvailableData({
                  ...spaceAvailableData,
                  instantBooking: false
                });
              }}
              checked={instantBooking === false}
            />
          </div>
        )}
        {activeIndex == 17 && (
          <div className="question-item">
            <h1 className="heading">Choose how you want to charge for the bookings?</h1>
            <RadioItem
              label="Variable Rate"
              name="pricingType"
              onClick={(event) => {
                // setPricingType(event.target.value == true ? 'variable' : 'flat');
                setPricingDetailsData({
                  ...pricingDetailsData,
                  pricingType: 'variable'
                });
              }}
              checked={pricingType == 'variable'}
            />
            <p className="small-muted">Charge by length of reservation</p>
            <RadioItem
              label="Flat Rate"
              name="pricingType"
              onClick={(event) => {
                // setPricingType(event.target.value == true ? 'flat' : 'variable');
                setPricingDetailsData({
                  ...pricingDetailsData,
                  pricingType: 'flat'
                });
              }}
              checked={pricingType == 'flat'}
            />
            <p className="small-muted">Charge a flat rate per day</p>

            {validated && !pricingType && (
              <p className="invalid-feedback-text">Please select a billing type</p>
            )}
          </div>
        )}
        {activeIndex == 18 &&
          (pricingType == 'flat' ? (
            <div className="question-item">
              <h1 className="heading">Set your desired rates</h1>
              <h4>Flat Billing Type</h4>
              <br />
              <Form validated={validated}>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    aria-label="Per Hour"
                    placeholder="Per Hour"
                    type="number"
                    required
                    min="0"
                    value={pricingRates.perHourRate ? pricingRates.perHourRate : ''}
                    name="perHourRate"
                    onChange={({ target: { value } }) => {
                      setPricingRates({ perHourRate: value });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required
                  </Form.Control.Feedback>
                  <InputGroup.Append>
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    aria-label="Per Day"
                    placeholder="Per Day"
                    type="number"
                    min="0"
                    required
                    value={pricingRates.perDayRate ? pricingRates.perDayRate : ''}
                    name="perDayRate"
                    onChange={({ target: { value } }) => {
                      setPricingRates({ perDayRate: value });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required
                  </Form.Control.Feedback>
                  <InputGroup.Append>
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    aria-label="Per Week"
                    placeholder="Per Week"
                    type="number"
                    min="0"
                    required
                    value={pricingRates.perWeekRate ? pricingRates.perWeekRate : ''}
                    name="perWeekRate"
                    onChange={({ target: { value } }) => {
                      setPricingRates({ perWeekRate: value });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required
                  </Form.Control.Feedback>
                  <InputGroup.Append>
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    aria-label="Per Month"
                    placeholder="Per Month"
                    type="number"
                    min="0"
                    required
                    value={pricingRates.perMonthRate ? pricingRates.perMonthRate : ''}
                    name="perMonthRate"
                    onChange={({ target: { value } }) => {
                      setPricingRates({ perMonthRate: value });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required
                  </Form.Control.Feedback>
                  <InputGroup.Append>
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
              <p className="modal-link">Tips for setting appropriate rates</p>
            </div>
          ) : (
            <div className="question-item">
              <h1 className="heading">Set your desired rates</h1>
              <h4>Variable Billing Type</h4>
              <br />
              <Form validated={validated}>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    aria-label="Per Hour"
                    placeholder="Per Hour"
                    type="number"
                    required
                    min="0"
                    value={pricingRates.perHourRate ? pricingRates.perHourRate : ''}
                    name="perHourRate"
                    onChange={({ target: { value } }) => {
                      setPricingRates({ perHourRate: value });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required
                  </Form.Control.Feedback>
                  <InputGroup.Append>
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    aria-label="Per Day"
                    placeholder="Per Day"
                    type="number"
                    min="0"
                    required
                    value={pricingRates.perDayRate ? pricingRates.perDayRate : ''}
                    name="perDayRate"
                    onChange={({ target: { value } }) => {
                      setPricingRates({ perDayRate: value });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required
                  </Form.Control.Feedback>
                  <InputGroup.Append>
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    aria-label="Per Week"
                    placeholder="Per Week"
                    type="number"
                    min="0"
                    required
                    value={pricingRates.perWeekRate ? pricingRates.perWeekRate : ''}
                    name="perWeekRate"
                    onChange={({ target: { value } }) => {
                      setPricingRates({ perWeekRate: value });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required
                  </Form.Control.Feedback>
                  <InputGroup.Append>
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    aria-label="Per Month"
                    placeholder="Per Month"
                    type="number"
                    min="0"
                    required
                    value={pricingRates.perMonthRate ? pricingRates.perMonthRate : ''}
                    name="perMonthRate"
                    onChange={({ target: { value } }) => {
                      setPricingRates({ perMonthRate: value });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required
                  </Form.Control.Feedback>
                  <InputGroup.Append>
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
              <p className="modal-link">Tips for setting appropriate rates</p>
            </div>
          ))}
        {activeIndex == 19 && (
          <div className="question-item">
            <h1 className="heading">Add your Space</h1>
            <p className="description">
              All the details related to the parking space have been recieved, do you wish to save
              the details? If you want to edit any details, please click back icon and do so. Once
              all details are correct you can save it.
            </p>

            <p>Error : {JSON.stringify(tempError)}</p>

            <Button
              disabled={disabled}
              variant="primary"
              onClick={() => {
                onSubmitHandler();
              }}>
              {disabled ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Create Listing'
              )}
            </Button>
            {listing && (
              <PublishListingModal
                show={saveSuccess}
                handleClose={() => {
                  setSaveSuccess(false);
                  router.push('/listings/my');
                }}
                id={listingId}
              />
            )}
          </div>
        )}
      </div>
    </SpaceOwnerContainer>
  );
};

const mapStateToProps = ({ listing, user, auth }) => ({
  locationDetails: listing.locationDetails,
  spaceDetails: listing.spaceDetails,
  spaceAvailable: listing.spaceAvailable,
  pricingDetails: listing.pricingDetails,
  isSpaceOwner: user.isSpaceOwner,
  listings: user.listings,
  listing: listing,
  userData: auth.data.attributes
});

export default connect(mapStateToProps, {
  addListingLocation,
  addListingSpaceDetails,
  addListingSpaceAvailable,
  addListingPricingDetails,
  saveSpaceDetails,
  updateListingLocal,
  showLoading,
  hideLoading
})(AddListing);
