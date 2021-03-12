import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import ReviewItem from '../components/ReviewItem';
import { gql } from '@apollo/client';
import { client } from '@parkyourself-frontend/shared/graphql';

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

const GET_LISTING = gql`
  query GetListing($id: ID!) {
    getListing(id: $id) {
      _id
      ownerId
      ownerName
      ownerEmail
      reviews
      locationDetails {
        address
      }
    }
  }
`;

function Reviews({ route, id, navigation }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [data, setData] = useState([]);

  const {
    params: { listingId, booking, editId }
  } = route;

  const getReviews = async () => {
    client
      .query({ query: GET_LISTING_REVIEWS, variables: { listingId: booking.listingId } })
      .then(({ data }) => {
        console.log('data', data);
        setReviews(data.getListingReviews);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getReviews();
  }, [booking]);

  useEffect(() => {
    // getReviews();
    client
      .query({ query: GET_LISTING, variables: { id: route?.params?.id } })
      .then(({ data }) => {
        if (data.getListing) {
          setListing(data.getListing);
          setLoading(false);
          // console.log('listing', data);
        }
      })
      .catch((error) => {
        // console.log(error);
        setLoading(false);
      });
  }, [id]);

  // if (!id) {
  //   return <Text>Access Denied</Text>;
  // }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  // console.log('reviews', reviews);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.reviews}>Reviews</Text>
        {!loading && reviews.length === 0 && (
          <Text
            style={{
              color: 'rgba(11,64,148,1)',
              fontSize: 20,
              marginTop: 30
              // paddingHorizontal: 20
            }}>
            {' '}
            No Review
          </Text>
        )}
        <Text style={styles.loremIpsum}>{listing?.locationDetails?.address}</Text>
        <ScrollView>
          {reviews.map((d) => (
            <ReviewItem
              review={d}
              key={d._id}
              id={d._id}
              username={d.driverName}
              text={d?.feedback}
              date={d.createdAt}
              rating={d.rating}
              navigation={navigation}
              listingId={listingId}
              booking={booking}
              editId={editId}
              setReviews={setReviews}
              reviews={reviews}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#fff'
  },
  reviews: {
    color: 'rgba(11,64,148,1)',
    fontSize: 28,
    marginTop: 30,
    paddingHorizontal: 20
  },
  loremIpsum: {
    color: 'rgba(11,64,148,1)',
    fontSize: 19,
    opacity: 0.75,
    marginTop: 13,
    marginBottom: 40,
    paddingHorizontal: 20
  }
});

export default Reviews;
