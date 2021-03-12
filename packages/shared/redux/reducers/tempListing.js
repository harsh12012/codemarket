import {
  ADD_TEMP_LISTING,
  TEMP_LISTING_MOBILE_INITIAL,
  UPDATE_TEMP_LISTING,
  DELETE_TEMP_LISTING,
  TEMP_LISTING_UPDATE_LOCATIONDETAILS,
  TEMP_LISTING_UPDATE_SPACEDETAILS,
  TEMP_LISTING_UPDATE_SPACEAVAILABLE,
  TEMP_LISTING_UPDATE_PRICINGDETAILS
} from '../actions/tempListing';

const initialListing = {
  activeIndex: 0,
  validated: false, // true,
  listingTypeOptions: [],
  propertyTypeOptions: [],
  mobile: false,
  edit: false,
  tStreetViewImages: [],
  tParkingEntranceImages: [],
  tParkingSpaceImages: [],
  thumbnail: '',
  ownerId: '',
  ownerEmail: '',
  ownerName: '',
  locationDetails: {
    listingType: '', // 'Residential',
    propertyType: '', // 'Driveway',
    propertyName: '', // 'Sample Listing',
    country: 'United States',
    address: '',
    // unitNum: '',
    city: '',
    state: '',
    postalCode: '',
    code: '+1',
    phone: '', // '8053007217',
    marker: {
      type: 'Point',
      coordinates: [-122.4324, 37.78825]
    },
    features: [],
    streetViewImages: [],
    parkingEntranceImages: [],
    parkingSpaceImages: []
  },
  spaceDetails: {
    parkingSpaceType: '', // 'Tandem',
    qtyOfSpaces: 0, // 4,
    heightRestriction: false,
    height1: { value: 1, unit: 'feet' },
    height2: { value: 1, unit: 'inches' },
    sameSizeSpaces: true,
    largestSize: '', // 'Large',
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
    isLabelled: false,
    spaceLabels: [],
    aboutSpace: '',
    accessInstructions: ''
  },
  spaceAvailable: {
    monday: { isActive: false, startHour: 9, startMinute: 30, endHour: 18, endMinute: 10 },
    tuesday: { isActive: false, startHour: 9, startMinute: 30, endHour: 18, endMinute: 30 },
    wednesday: { isActive: false, startHour: 9, startMinute: 30, endHour: 18, endMinute: 30 },
    thursday: { isActive: false, startHour: 9, startMinute: 30, endHour: 18, endMinute: 30 },
    friday: { isActive: false, startHour: 9, startMinute: 30, endHour: 18, endMinute: 30 },
    saturday: { isActive: false, startHour: 9, startMinute: 30, endHour: 18, endMinute: 30 },
    sunday: { isActive: false, startHour: 9, startMinute: 30, endHour: 18, endMinute: 10 },
    scheduleType: '', // '24hours',
    customTimeRange: [],
    hasNoticeTime: false,
    noticeTime: { value: 0, unit: 'Hours' }, // { value: 3600000, unit: 'Hours' },
    advanceBookingTime: { value: 0, unit: 'Days' }, // { value: 86400000, unit: 'Days' },
    minTime: { value: 0, unit: 'Hours' }, // { value: 3600000, unit: 'Hours' },
    maxTime: { value: 0, unit: 'Days' }, // { value: 86400000, unit: 'Days' },
    instantBooking: true
  },
  pricingDetails: {
    pricingType: '', // 'flat',
    pricingRates: {
      perHourRate: 0,
      perDayRate: 0,
      perWeekRate: 0,
      perMonthRate: 0
    }
  }
  // location: LocationDataMarkerInput,
};

const tempListing = (state = initialListing, action) => {
  switch (action.type) {
    case TEMP_LISTING_MOBILE_INITIAL: {
      return { ...initialListing, mobile: true };
    }
    case ADD_TEMP_LISTING: {
      return {
        ...state,
        ...action.payload,
        locationDetails: {
          ...state.locationDetails,
          ...action.payload.locationDetails
        },
        spaceDetails: {
          ...state.spaceDetails,
          ...action.payload.spaceDetails
        },
        pricingDetails: {
          ...state.pricingDetails,
          ...action.payload.pricingDetails
        }
      };
    }
    case UPDATE_TEMP_LISTING: {
      return { ...state, ...action.payload };
    }
    case TEMP_LISTING_UPDATE_LOCATIONDETAILS: {
      return {
        ...state,
        locationDetails: { ...state.locationDetails, ...action.payload }
      };
    }
    case TEMP_LISTING_UPDATE_SPACEDETAILS: {
      return {
        ...state,
        spaceDetails: { ...state.spaceDetails, ...action.payload }
      };
    }
    case TEMP_LISTING_UPDATE_PRICINGDETAILS: {
      return {
        ...state,
        pricingDetails: { ...state.pricingDetails, ...action.payload }
      };
    }
    case TEMP_LISTING_UPDATE_SPACEAVAILABLE: {
      return {
        ...state,
        spaceAvailable: { ...state.spaceAvailable, ...action.payload }
      };
    }
    case DELETE_TEMP_LISTING: {
      return initialListing;
    }
    default: {
      return state;
    }
  }
};
export default tempListing;
