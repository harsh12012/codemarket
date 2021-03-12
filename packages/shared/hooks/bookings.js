import { useState, useEffect } from 'react';
import { useQuery, gql, useMutation, useSubscription } from '@apollo/client';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { client } from '../graphql';
import { useAppFee } from './adminSettings';

const GET_ALL = gql`
  query GetAllBookings(
    $status: String!
    $search: String
    $page: Int
    $limit: Int
    $startDate: AWSDateTime
    $endDate: AWSDateTime
    $sortBy: String
    $driverId: String
    $ownerId: String
    $listingId: String
  ) {
    getAllBookingsSearch(
      status: $status
      search: $search
      page: $page
      limit: $limit
      startDate: $startDate
      endDate: $endDate
      sortBy: $sortBy
      driverId: $driverId
      ownerId: $ownerId
      listingId: $listingId
    ) {
      bookings {
        _id
        driverId
        driverName
        driverEmail
        listingId
        ownerId
        ownerName
        ownerEmail
        address
        images
        start
        end
        payment
        paymentMethod
        vehicle
        profileCategory
        status
        createdAt
        qrCode
        spaceLabel
      }
      count
    }
  }
`;

let oneYearFromNow = new Date();
oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
let yearsBackFromNow = new Date();
yearsBackFromNow.setFullYear(yearsBackFromNow.getFullYear() - 20);
const defaultStartDate = yearsBackFromNow;
const defaultEndDate = oneYearFromNow;

export function useGetAllBookings({
  status,
  driverId,
  ownerId,
  listingId,
  screen = null,
  startDate = null,
  endDate = null
}) {
  const [filter, setFilter] = useState({
    limit: 20,
    page: 1,
    search: '',
    status: 'upcoming',
    sortBy: '-startDate',
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    driverId: null,
    ownerId: null,
    listingId: null
  });

  let sortBy = '-startDate';
  switch (status) {
    case 'upcoming':
      sortBy = 'startDate';
      break;
    case 'current':
      sortBy = 'endDate';
      break;
    default:
      sortBy = '-startDate';
      break;
  }

  const { loading, error, data, refetch, subscribeToMore } = useQuery(GET_ALL, {
    variables: {
      ...filter,
      status,
      driverId,
      ownerId,
      listingId,
      sortBy,
      startDate: startDate || defaultStartDate,
      endDate: endDate || defaultEndDate
    },
    fetchPolicy: 'network-only' // 'cache-and-network' // 'network-only'
  });

  const [allData, setAllData] = useState({
    count: 0,
    bookings: []
  });

  useEffect(() => {
    if (data && data.getAllBookingsSearch) {
      if (filter.page > 1) {
        setAllData({
          ...allData,
          bookings: [...allData.bookings, ...data.getAllBookingsSearch.bookings]
        });
      } else {
        setAllData(data.getAllBookingsSearch);
      }
    }
  }, [data]);

  const loadMore = () => {
    if (allData.count > filter.page * filter.limit) {
      setFilter({ ...filter, page: filter.page + 1 });
    }
  };

  const subscribeToNewComments = (tempSub) =>
    subscribeToMore({
      document: tempSub,
      variables: { driverId, ownerId, listingId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newBookingSub;
        return {
          ...prev,
          getAllBookingsSearch: {
            bookings: [newFeedItem, ...prev.getAllBookingsSearch.bookings]
          }
        };
      }
    });

  useEffect(() => {
    if (status === 'upcoming') {
      let subscriptionData = '';
      if (screen === 'myBookings') {
        subscriptionData = NEW_BOOKING_SUBSCRIPTION_DRIVER;
      } else if (screen === 'parkingOrders') {
        subscriptionData = NEW_BOOKING_SUBSCRIPTION_OWNER;
      } else if (screen === 'staffOrders') {
        subscriptionData = NEW_BOOKING_SUBSCRIPTION_LISTING;
      } else if (screen === 'adminBookings') {
        subscriptionData = NEW_BOOKING_SUBSCRIPTION_ADMIN;
      }
      subscribeToNewComments(subscriptionData);
    }
  }, []);

  return { allData, loading, filter, setFilter, loadMore };
}

const CREATE_BOOKING = gql`
  mutation CreateBooking(
    $createdBy: String
    $driverId: String
    $driverName: String
    $driverEmail: String
    $listingId: String
    $ownerId: String
    $ownerName: String
    $ownerEmail: String
    $address: String
    $images: [String]
    $start: AWSDateTime
    $end: AWSDateTime
    $duration: Long!
    $status: String
    $profileCategory: String
    $vehicle: String
    $payment: Float
    $ownerPayment: Float
    $paymentMethod: String
    $spaceLabel: String
    $paymentIntent: String
    $transferGroup: String
  ) {
    createBooking(
      createdBy: $createdBy
      driverId: $driverId
      driverName: $driverName
      driverEmail: $driverEmail
      listingId: $listingId
      ownerId: $ownerId
      ownerName: $ownerName
      ownerEmail: $ownerEmail
      address: $address
      images: $images
      start: $start
      end: $end
      duration: $duration
      status: $status
      profileCategory: $profileCategory
      vehicle: $vehicle
      payment: $payment
      ownerPayment: $ownerPayment
      paymentMethod: $paymentMethod
      spaceLabel: $spaceLabel
      paymentIntent: $paymentIntent
      transferGroup: $transferGroup
    ) {
      _id
      driverId
      driverName
      driverEmail
      listingId
      ownerId
      ownerName
      ownerEmail
      address
      images
      start
      end
      payment
      paymentMethod
      vehicle
      profileCategory
      status
      createdAt
      qrCode
      spaceLabel
    }
  }
`;

export function useCreateBooking() {
  const [createBookingMutation] = useMutation(CREATE_BOOKING);
  const { start, end, vehicleSelected } = useSelector(({ findParking }) => findParking);

  const userData = useSelector(({ auth, user }) =>
    auth.authenticated
      ? {
          driverId: auth.data.attributes.sub,
          driverName: auth.data.attributes.name,
          driverEmail: auth.data.attributes.email,
          profileType: user.profileType
        }
      : {}
  );

  const [payload, setPayload] = useState({
    useCard: false,
    cardSelected: null,
    spaceLabelSelected: null,
    booking: null
  });

  const savedCardHandler = () => {};

  const createBooking = async ({
    parking,
    payment,
    ownerPayment,
    paymentIntent,
    transferGroup,
    rebookUserData = {}
  }) => {
    return await createBookingMutation({
      variables: {
        ...userData,
        ...rebookUserData,
        createdBy: userData.sub,
        // driverId: userData.sub,
        // driverName: userData.name,
        // driverEmail: userData.email,
        listingId: parking._id,
        ownerId: parking.ownerId,
        ownerName: parking.ownerName,
        ownerEmail: parking.ownerEmail,
        address: parking.locationDetails.address,
        images: [
          ...parking.locationDetails.streetViewImages,
          ...parking.locationDetails.parkingEntranceImages,
          ...parking.locationDetails.parkingSpaceImages
        ],
        start,
        end,
        duration: Date.parse(end) - Date.parse(start),
        payment,
        ownerPayment,
        vehicle: vehicleSelected._id,
        profileCategory: userData.profileType,
        status: 'upcoming',
        paymentMethod: 'card',
        spaceLabel: payload.spaceLabelSelected || '',
        paymentIntent,
        transferGroup
      }
    });
  };
  return { createBooking, payload, setPayload };
}

const GET_ONE_LISTING = gql`
  query GetListing($id: ID!, $vId: ID!) {
    getListing(id: $id) {
      _id
      bookingCount {
        total
      }
      bookings
      createdAt
      location {
        coordinates
        type
      }
      locationDetails {
        address
        city
        country
        code
        features
        listingType
        marker {
          coordinates
          type
        }
        parkingEntranceImages
        parkingSpaceImages
        phone
        postalCode
        propertyName
        propertyType
        state
        streetViewImages
        unitNum
      }
      ownerId
      ownerEmail
      ownerName
      pricingDetails {
        pricingRates {
          perDayRate
          perHourRate
          perMonthRate
          perWeekRate
        }
        pricingType
      }
      published
      reviews
      spaceAvailable {
        advanceBookingTime {
          unit
          value
        }
        customTimeRange {
          startDate
          endDate
        }
        friday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        hasNoticeTime
        instantBooking
        maxTime {
          unit
          value
        }
        minTime {
          unit
          value
        }
        monday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        noticeTime {
          unit
          value
        }
        saturday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        scheduleType
        sunday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        thursday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        tuesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
        wednesday {
          endHour
          endMinute
          isActive
          startHour
          startMinute
        }
      }
      spaceDetails {
        aboutSpace
        accessInstructions
        compact
        compactSpaces
        height1 {
          unit
          value
        }
        height2 {
          unit
          value
        }
        heightRestriction
        isLabelled
        large
        largeSpaces
        largestSize
        midsized
        midsizedSpaces
        motorcycle
        motorcycleSpaces
        oversized
        oversizedSpaces
        parkingSpaceType
        qtyOfSpaces
        sameSizeSpaces
        spaceLabels {
          isBooked
          label
          largestSize
        }
      }
      thumbnail
    }
    getVehicle(id: $vId) {
      _id
      userId
      profileType
      licensePlate
      type
      make
      model
      year
      size
      color
      image
      createdAt
    }
  }
`;

export function useGetListingAndVehicle() {
  const getOneListing = async ({ id = '', vehicle = '' }) => {
    return await client.query({
      query: GET_ONE_LISTING,
      variables: {
        id,
        vId: vehicle
      },
      fetchPolicy: 'network-only'
    });
  };

  return { getOneListing };
}

const UPDATE_BOOKING_STATUS = gql`
  mutation UpdateBookingStatus(
    $id: String!
    $status: String!
    $driverEmail: String!
    $ownerEmail: String!
    $driverId: String
  ) {
    updateBookingStatus(
      id: $id
      status: $status
      driverEmail: $driverEmail
      ownerEmail: $ownerEmail
      driverId: $driverId
    ) {
      _id
      driverId
      driverName
      driverEmail
      listingId
      ownerId
      ownerName
      ownerEmail
      address
      images
      start
      end
      status
      profileCategory
      vehicle
      payment
      paymentMethod
      createdAt
      qrCode
    }
  }
`;

export function useUpdateBookingStatus({ id, driverEmail, ownerEmail, driverId }) {
  const [updateBooking] = useMutation(UPDATE_BOOKING_STATUS);

  const updateBookingStatus = async (status) => {
    return await updateBooking({
      variables: {
        status,
        id,
        driverEmail,
        ownerEmail,
        driverId
      }
    });
  };
  return { updateBookingStatus };
}

const NEW_BOOKING_SUBSCRIPTION_DRIVER = gql`
  subscription newBookingSub($driverId: String) {
    newBookingSub(driverId: $driverId) {
      _id
      driverId
      driverName
      driverEmail
      listingId
      ownerId
      ownerName
      ownerEmail
      address
      images
      start
      end
      payment
      paymentMethod
      vehicle
      profileCategory
      status
      createdAt
      qrCode
      spaceLabel
    }
  }
`;
const NEW_BOOKING_SUBSCRIPTION_LISTING = gql`
  subscription newBookingSub($listingId: String) {
    newBookingSub(listingId: $listingId) {
      _id
      driverId
      driverName
      driverEmail
      listingId
      ownerId
      ownerName
      ownerEmail
      address
      images
      start
      end
      payment
      paymentMethod
      vehicle
      profileCategory
      status
      createdAt
      qrCode
      spaceLabel
    }
  }
`;
const NEW_BOOKING_SUBSCRIPTION_OWNER = gql`
  subscription newBookingSub($ownerId: String) {
    newBookingSub(ownerId: $ownerId) {
      _id
      driverId
      driverName
      driverEmail
      listingId
      ownerId
      ownerName
      ownerEmail
      address
      images
      start
      end
      payment
      paymentMethod
      vehicle
      profileCategory
      status
      createdAt
      qrCode
      spaceLabel
    }
  }
`;

const NEW_BOOKING_SUBSCRIPTION_ADMIN = gql`
  subscription bookingSub {
    bookingSub {
      _id
      driverId
      driverName
      driverEmail
      listingId
      ownerId
      ownerName
      ownerEmail
      address
      images
      start
      end
      payment
      paymentMethod
      vehicle
      profileCategory
      status
      createdAt
      qrCode
      spaceLabel
    }
  }
`;
const BOOKING_SUBSCRIPTION_DRIVER = gql`
  subscription bookingSub($driverId: String) {
    bookingSub(driverId: $driverId) {
      _id
      driverId
      driverName
      driverEmail
      listingId
      ownerId
      ownerName
      ownerEmail
      address
      images
      start
      end
      payment
      paymentMethod
      vehicle
      profileCategory
      status
      createdAt
      qrCode
      spaceLabel
    }
  }
`;

export function useBookingSubDriver(driverId = null) {
  return useSubscription(BOOKING_SUBSCRIPTION_DRIVER, {
    variables: { driverId }
  });
}

const BOOKING_SUBSCRIPTION_OWNER = gql`
  subscription bookingSub($ownerId: String) {
    bookingSub(ownerId: $ownerId) {
      _id
      driverId
      driverName
      driverEmail
      listingId
      ownerId
      ownerName
      ownerEmail
      address
      images
      start
      end
      payment
      paymentMethod
      vehicle
      profileCategory
      status
      createdAt
      qrCode
      spaceLabel
    }
  }
`;

export function useBookingSubOwner(ownerId = null) {
  useSubscription(BOOKING_SUBSCRIPTION_OWNER, {
    variables: { ownerId }
  });
}

const BOOKING_SUBSCRIPTION_LISTING = gql`
  subscription bookingSub($listingId: String) {
    bookingSub(listingId: $listingId) {
      _id
      driverId
      driverName
      driverEmail
      listingId
      ownerId
      ownerName
      ownerEmail
      address
      images
      start
      end
      payment
      paymentMethod
      vehicle
      profileCategory
      status
      createdAt
      qrCode
      spaceLabel
    }
  }
`;

export function useBookingSubListing(listingId = null) {
  useSubscription(BOOKING_SUBSCRIPTION_LISTING, {
    variables: { listingId }
  });
}

export function useBookingSubAdmin() {
  useSubscription(BOOKING_SUBSCRIPTION_ADMIN);
}

const BOOKING_SUBSCRIPTION_ADMIN = gql`
  subscription bookingSub {
    bookingSub {
      _id
      driverId
      driverName
      driverEmail
      listingId
      ownerId
      ownerName
      ownerEmail
      address
      images
      start
      end
      payment
      paymentMethod
      vehicle
      profileCategory
      status
      createdAt
      qrCode
      spaceLabel
    }
  }
`;

export function useCalculateAmount({ start = new Date(), end = new Date(), perHourRate }) {
  const { loading, data, error } = useAppFee();
  const [state, setstate] = useState({
    tax: 1,
    fee: 0,
    amount: 0,
    totalAmount: 0,
    // ownerAmount: 0,
    disabled: true
  });
  const diff = moment.duration(moment(end).diff(moment(start)));
  const tempAmount = perHourRate * diff.asHours();

  useEffect(() => {
    if (data && data.getOneFee) {
      const applicationFee = data.getOneFee.decimal;
      setstate({
        ...state,
        disabled: false,
        amount: parseFloat(tempAmount.toFixed(2)),
        // ownerAmount: parseFloat((tempAmount - tempAmount * fee).toFixed(2)),
        totalAmount: parseFloat((tempAmount + 1 + tempAmount * applicationFee).toFixed(2)),
        fee: parseFloat((tempAmount * applicationFee).toFixed(3)),
        appFee: applicationFee
      });
    } else {
      setstate({ ...state, disabled: true });
    }
  }, [data, tempAmount]);

  return {
    amountCalculation: state,
    amountLoading: loading || state.disabled
  };
}
