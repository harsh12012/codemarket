import {
  ADD_TEMP_LISTING,
  UPDATE_TEMP_LISTING,
  DELETE_TEMP_LISTING,
  TEMP_LISTING_UPDATE_LOCATIONDETAILS,
  TEMP_LISTING_UPDATE_SPACEDETAILS,
  TEMP_LISTING_UPDATE_SPACEAVAILABLE,
  TEMP_LISTING_UPDATE_PRICINGDETAILS,
} from "../actions/tempListing";

const initialListing = {
  mobile: false,
  edit: false,
  tStreetViewImages: [],
  tParkingEntranceImages: [],
  tParkingSpaceImages: [],
  thumbnail: "",
  ownerId: "",
  ownerEmail: "",
  ownerName: "",
  locationDetails: {
    listingType: "Residential",
    propertyType: "Driveway",
    propertyName: "",
    country: "United States",
    address: "",
    // unitNum: '',
    city: "",
    state: "",
    postalCode: "",
    code: "+1",
    phone: "",
    marker: {
      type: "Point",
      coordinates: [-122.4324, 37.78825],
    },
    features: [],
    streetViewImages: [],
    parkingEntranceImages: [],
    parkingSpaceImages: [],
  },
  spaceDetails: {
    parkingSpaceType: "Tandem",
    qtyOfSpaces: 4,
    heightRestriction: false,
    height1: { value: 1, unit: "feet" },
    height2: { value: 1, unit: "inches" },
    sameSizeSpaces: true,
    largestSize: "Large",
    motorcycle: false,
    compact: false,
    midsized: false,
    large: true,
    oversized: false,
    motorcycleSpaces: 0,
    compactSpaces: 0,
    midsizedSpaces: 0,
    largeSpaces: 0,
    oversizedSpaces: 0,
    isLabelled: false,
    spaceLabels: [],
    aboutSpace: "",
    accessInstructions: "",
  },
  spaceAvailable: {
    monday: { isActive: false, startTime: new Date(), endTime: new Date() },
    tuesday: { isActive: false, startTime: new Date(), endTime: new Date() },
    wednesday: { isActive: false, startTime: new Date(), endTime: new Date() },
    thursday: { isActive: false, startTime: new Date(), endTime: new Date() },
    friday: { isActive: false, startTime: new Date(), endTime: new Date() },
    saturday: { isActive: false, startTime: new Date(), endTime: new Date() },
    sunday: { isActive: false, startTime: new Date(), endTime: new Date() },
    scheduleType: "24hours",
    // startTime: '',
    // endTime: '',
    customTimeRange: [],
    hasNoticeTime: false,
    noticeTime: { value: 45, unit: "Hours" },
    advanceBookingTime: { value: 1, unit: "Hours" },
    minTime: { value: 1, unit: "Hours" },
    maxTime: { value: 2, unit: "Days" },
    instantBooking: true,
  },
  pricingDetails: {
    pricingType: "flat",
    pricingRates: {
      perHourRate: 5,
      perDayRate: 12,
      perWeekRate: 233,
      perMonthRate: 33,
    },
  },
  // location: LocationDataMarkerInput,
};

const tempListing = (state = initialListing, action) => {
  switch (action.type) {
    case ADD_TEMP_LISTING: {
      return {
        ...state,
        ...action.payload,
        locationDetails: {
          ...state.locationDetails,
          ...action.payload.locationDetails,
        },
        spaceDetails: {
          ...state.spaceDetails,
          ...action.payload.spaceDetails,
        },
        locationDetails: {
          ...state.locationDetails,
          ...action.payload.locationDetails,
        },
        pricingDetails: {
          ...state.pricingDetails,
          ...action.payload.pricingDetails,
        },
      };
    }
    case UPDATE_TEMP_LISTING: {
      return { ...state, ...action.payload };
    }
    case TEMP_LISTING_UPDATE_LOCATIONDETAILS: {
      return {
        ...state,
        locationDetails: { ...state.locationDetails, ...action.payload },
      };
    }
    case TEMP_LISTING_UPDATE_SPACEDETAILS: {
      return {
        ...state,
        spaceDetails: { ...state.spaceDetails, ...action.payload },
      };
    }
    case TEMP_LISTING_UPDATE_PRICINGDETAILS: {
      return {
        ...state,
        pricingDetails: { ...state.pricingDetails, ...action.payload },
      };
    }
    case TEMP_LISTING_UPDATE_SPACEAVAILABLE: {
      return {
        ...state,
        spaceAvailable: { ...state.spaceAvailable, ...action.payload },
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
