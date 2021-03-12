import React, { Component, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialButtonPrimary from './MaterialButtonPrimary';
import { client } from '../app/graphql';
import { gql, useMutation, useSubscription } from '@apollo/client';
import { connect } from 'react-redux';
import { Rating, AirbnbRating } from 'react-native-ratings';

const GET_LISTING = gql`
  query GetListing($id: ID!) {
    getListing(id: $id) {
      _id
      ownerId
      ownerName
      ownerEmail
      reviews
    }
  }
`;

const GET_LISTING_REVIEWS = gql`
  query GetListingReviews($listingId: String!) {
    getListingReviews(listingId: $listingId) {
      _id
      listingId
      ownerId
      ownerName
      driverId
      driverName
      rating
      feedback
      createdAt
    }
  }
`;

const CREATE_LISTING_REVIEW = gql`
  mutation CreateListingReview(
    $listingId: String!
    $ownerId: String!
    $ownerName: String!
    $driverId: String!
    $driverName: String!
    $rating: Float!
    $feedback: String!
  ) {
    createListingReview(
      listingId: $listingId
      ownerId: $ownerId
      ownerName: $ownerName
      driverId: $driverId
      driverName: $driverName
      rating: $rating
      feedback: $feedback
    ) {
      _id
      listingId
      ownerId
      ownerName
      driverId
      driverName
      rating
      feedback
      createdAt
    }
  }
`;

const UPDATE_LISTING_REVIEW = gql`
  mutation updateListingReview(
    $id: ID!
    $listingId: String!
    $ownerId: String!
    $ownerName: String!
    $driverId: String!
    $driverName: String!
    $rating: Float!
    $feedback: String!
  ) {
    updateListingReview(
      id: $id
      listingId: $listingId
      ownerId: $ownerId
      ownerName: $ownerName
      driverId: $driverId
      driverName: $driverName
      rating: $rating
      feedback: $feedback
    ) {
      _id
      listingId
      ownerId
      ownerName
      driverId
      driverName
      rating
      feedback
      createdAt
    }
  }
`;

function AddReviewModal({
  route,
  userData,
  navigation,
  reviewData,
  setModalVisible,
  setReviews,
  reviews,
  address
}) {
  const [allReview, setAllReview] = useState([]);
  const [listing, setListing] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState({ rating: 0, feedback: '' });
  const [listingId, setListingId] = useState(null);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (route) {
      const {
        params: { listingId, booking }
      } = route;
      setListingId(listingId);
      setBooking(booking);
    }
  }, [route]);

  // console.log('Reviews', allReview);

  const getReviews = async () => {
    client
      .query({
        query: GET_LISTING_REVIEWS,
        variables: { listingId: listingId }
      })
      .then(({ data }) => {
        console.log('data', data);
        setAllReview(data.getListingReviews);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getReviews();
  }, [listingId]);

  const [createListingReview] = useMutation(CREATE_LISTING_REVIEW);
  const [updateReviews] = useMutation(UPDATE_LISTING_REVIEW);

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (reviewData) {
      setFeedback(reviewData.feedback);
      setRating(reviewData.rating);
    }
  }, [reviewData]);

  const addListingReviewHandler = async () => {
    if (!!reviewData && Object.keys(reviewData).length > 0) {
      try {
        const response = await updateReviews({
          variables: {
            id: reviewData._id,
            listingId: reviewData.listingId,
            ownerId: reviewData.ownerId,
            ownerName: reviewData.ownerName,
            driverId: reviewData.driverId,
            driverName: reviewData.driverName,
            rating: rating,
            feedback: feedback
          }
        });

        const newReviews =
          !!reviews &&
          reviews.map((item) => {
            if (item._id === response.data.updateListingReview._id) {
              return response.data.updateListingReview;
            } else {
              return item;
            }
          });
        setReviews(newReviews);

        // console.log('newReviews', newReviews);
        // navigation.goBack();
        setModalVisible(false);

        // toast.success('Review Added Successfully');
      } catch (error) {
        alert('Something Went Wrong!');
        console.log(error);
      }
    } else {
      try {
        let reviewIds = !!allReview && allReview.map((item) => item.driverId);
        if (allReview != null) {
          if (reviewIds.includes(userData?.sub)) {
            alert('Review Already Added!');
            return;
          }
        }

        const response = await createListingReview({
          variables: {
            listingId: listingId,
            ownerId: booking?.ownerId,
            ownerName: booking?.ownerName,
            driverId: userData.sub,
            driverName: userData.name,
            rating: rating,
            feedback: feedback,
            date: new Date().toString()
          }
        });

        // console.log('response', response);
        // setReviews(response.createListingReview);
        navigation.goBack();
      } catch (error) {
        console.log(error);
        alert('Something Went Wrong!');
      }
    }
  };

  const onSubmitHandler = () => {
    try {
      if (!!feedback && !!rating) {
        addListingReviewHandler();
        // handleClose();
      } else {
        setValidated(true);
        alert('Enter feedback and review');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    client
      .query({
        query: GET_LISTING,
        variables: { id: listingId }
      })
      .then(({ data }) => {
        setListing(data.getListing);
      })
      .catch((err) => {});
    client
      .query({
        query: GET_LISTING_REVIEWS,
        variables: { listingId: listingId }
      })
      .then(({ data }) => {
        if (data.getListingReviews) {
          if (data.getListingReviews.length == 0) {
            setRating(0);
          } else {
            let sum = 0;
            data.getListingReviews.forEach((item) => {
              sum += item.rating;
            });
            setRating(sum / data.getListingReviews.length);
          }
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <View
      style={{
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}>
      <View style={styles.rectStack}>
        <View style={styles.rect}>
          <Text style={styles.loremIpsum}>Review your experience</Text>
          <Text style={styles.loremIpsum2}>{booking?.address || address}</Text>

          <View style={styles.rect2}>
            <View style={styles.imageRow}>
              {/* <Image
              source={require('../assets/images/cars2.jpg')}
              resizeMode="stretch"
              style={styles.image}></Image> */}
              <Text style={styles.loremIpsum3}>
                Owner Name : {booking?.ownerName || reviewData?.ownerName}
              </Text>
            </View>
          </View>
          <Text style={styles.loremIpsum4}>How was your experience at the location ?</Text>
          {/* <Text style={styles.provideARating}>Provide a rating :</Text>
        <View style={styles.rect3Stack}>
         
          {/* <View style={styles.rect3}>
            <View style={styles.icon1Row}>
              <EntypoIcon name="star" style={styles.icon1}></EntypoIcon>
              <EntypoIcon name="star" style={styles.icon2}></EntypoIcon>
              <EntypoIcon name="star" style={styles.icon3}></EntypoIcon>
              <EntypoIcon name="star" style={styles.icon4}></EntypoIcon>
            </View>
          </View> 
          <EntypoIcon name="star" style={styles.icon}></EntypoIcon>
        </View> */}
          {/* <Rating
            type="star"
            ratingCount={5}
            imageSize={30}
            style={{ marginTop: 20 }}
            showRating
            onFinishRating={(val) => setRating(val)}
            value={2}
            defaultRating={2}
            // showRating

            // onFinishRating={(val) => setFeedback(val)}
          /> */}
          <AirbnbRating
            count={5}
            onFinishRating={(val) => setRating(val)}
            defaultRating={rating}
            size={20}
            reviews={['1/5', '2/5', '3/5', '4/5', '5/5']}
          />
          <Text style={styles.provideAFeedback}>Provide a feedback :</Text>
          <View style={{ display: 'flex', justifyContent: 'center' }}>
            <TextInput
              placeholder="Write your feedback here..."
              numberOfLines={10}
              maxLength={200}
              style={styles.textInput}
              onChangeText={(val) => setFeedback(val)}
              value={feedback}
            />
          </View>
          <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
            <MaterialButtonPrimary
              caption="SUBMIT"
              onPress={onSubmitHandler}
              style={styles.materialButtonPrimary}></MaterialButtonPrimary>

            {!!reviewData && (
              <MaterialButtonPrimary
                caption="CANCEL"
                onPress={() => setModalVisible(false)}
                style={styles.materialButtonPrimary}></MaterialButtonPrimary>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = ({ auth }) => ({
  userData: auth.data.attributes
});
export default connect(mapStateToProps)(AddReviewModal);

const styles = StyleSheet.create({
  rect: {
    backgroundColor: '#fff',
    top: 0,
    width: 350,
    // height: 529,
    // position: 'absolute',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 7,
    left: 0
  },
  loremIpsum: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 22,
    marginTop: 18,
    marginLeft: 56
  },
  rect2: {
    width: 350,
    height: 105,
    flexDirection: 'row',
    marginTop: 15
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 15,
    marginLeft: 12,
    marginTop: 52
  },
  imageRow: {
    height: 70,
    flexDirection: 'row',
    flex: 1,
    marginRight: 54,
    marginLeft: 17,
    marginTop: 23
  },
  loremIpsum4: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    marginTop: 24,
    marginLeft: 15
  },
  provideARating: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    marginTop: 14,
    marginLeft: 15
  },
  rect3: {
    top: 0,
    left: 1,
    width: 149,
    height: 29,
    position: 'absolute',
    flexDirection: 'row'
  },
  icon1: {
    color: 'rgba(243,216,50,1)',
    fontSize: 26,
    height: 29,
    width: 26
  },
  icon2: {
    color: 'rgba(243,216,50,1)',
    fontSize: 26,
    height: 29,
    width: 26,
    marginLeft: 5
  },
  icon3: {
    color: 'rgba(243,216,50,1)',
    fontSize: 26,
    height: 29,
    width: 26,
    marginLeft: 3
  },
  icon4: {
    color: 'rgba(243,216,50,1)',
    fontSize: 26,
    height: 29,
    width: 26,
    marginLeft: 4
  },
  icon1Row: {
    height: 29,
    flexDirection: 'row',
    flex: 1,
    marginRight: 3,
    marginLeft: 30
  },
  icon: {
    top: 0,
    left: 0,
    // position: 'absolute',
    color: 'rgba(243,216,50,1)',
    fontSize: 26,
    height: 29,
    width: 26
  },
  rect3Stack: {
    width: 150,
    height: 29,
    marginTop: 12,
    marginLeft: 91
  },
  provideAFeedback: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 17,
    marginTop: 23,
    marginLeft: 15
  },
  textInput: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    height: 105,
    // width: 316,
    margin: 20,
    marginTop: 10,
    // marginLeft: 17,
    borderWidth: 1,
    borderColor: 'lightgrey',
    textAlignVertical: 'top'
  },
  materialButtonPrimary: {
    width: 100,
    height: 36,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 60,
    shadowOpacity: 0.37,
    shadowRadius: 20,
    marginTop: 10,
    // marginLeft: 121,
    marginBottom: 10,
    marginRight: 10
  },
  loremIpsum2: {
    top: 40,
    // left: 88,
    // position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 18,
    paddingLeft: 15,
    width: 350
    // height: 529
    // justifyContent: 'flex-start'
    // right:0
  },
  rectStack: {
    height: 529,
    // marginTop: 41,
    marginLeft: 11
  }
});
