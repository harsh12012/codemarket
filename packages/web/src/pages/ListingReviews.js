import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import AccessDenied from '../app/components/AccessDenied';
import ReviewItem from '../app/components/ReviewItem';
import { client } from '../app/graphql';
import AddListingReviewModal from '../app/components/AddListingReviewModal';
import { toast } from 'react-toastify';

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

const DELETE_LISTING_REVIEW = gql`
  mutation deleteListingReview($id: ID!) {
    deleteListingReview(id: $id)
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

const ListingReviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [editReviewModal, setEditReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({});

  const [deleteReviews] = useMutation(DELETE_LISTING_REVIEW); //Delete Review Mutatuion
  const [updateReviews] = useMutation(UPDATE_LISTING_REVIEW);

  //Handle Delete Review
  const handleDeleteReview = async (id) => {
    console.log('called', id);
    try {
      const response = await deleteReviews({
        variables: { id: id }
      });
      console.log(response.data);
      const data = reviews.filter((review) => review._id != id);
      setReviews(data);
      // console.log(response.data.deleteVehicle);
      // toast.success("Vehicle Deleted Successfully");
    } catch (error) {
      // toast.warn("Something Went Wrong!");
    }
  };

  const handleEditReview = (review) => {
    setEditReviewModal(true);
    setReviewData(review);
  };

  const saveReviewHandler = async (data) => {
    console.log(reviewData);
    try {
      const response = await updateReviews({
        variables: {
          id: reviewData._id,
          listingId: reviewData.listingId,
          ownerId: reviewData.ownerId,
          ownerName: reviewData.ownerName,
          driverId: reviewData.driverId,
          driverName: reviewData.driverName,
          rating: data.rating,
          feedback: data.feedback
        }
      });

      console.log(response.data);
      const newReviews = reviews.map((item) => {
        if (item._id === response.data.updateListingReview._id) {
          return response.data.updateListingReview;
        } else {
          return item;
        }
      });
      setReviews(newReviews);

      toast.success('Review Added Successfully');
    } catch (error) {
      toast.warn('Something Went Wrong!');
      console.log(error);
    }
  };

  const getReviews = async () => {
    client
      .query({ query: GET_LISTING_REVIEWS, variables: { listingId: id } })
      .then(({ data }) => {
        setReviews(data.getListingReviews);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    client
      .query({ query: GET_LISTING, variables: { id: id } })
      .then(({ data }) => {
        if (data.getListing) {
          setListing(data.getListing);
          setLoading(false);
        }
      })
      .catch((error) => {
        // console.log(error);
        setLoading(false);
      });

    getReviews();
  }, []);

  if (!id) {
    return <AccessDenied />;
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  //   if ((error || data.getListingReviews == null)) {
  //     return <div className="loading">No Reviews Found!</div>;
  //   }

  return (
    <div className="dg__account">
      <h1 className="heading">Reviews</h1>
      {listing && <p className="lead">{listing.locationDetails.address}</p>}
      {reviews.length > 0 ? (
        reviews.map((item) => {
          return (
            <ReviewItem
              {...item}
              handleDeleteReview={handleDeleteReview}
              handleEditReview={() => handleEditReview(item)}
            />
          );
        })
      ) : (
        <div className="loading">No Reviews Found!</div>
      )}

      <AddListingReviewModal
        show={editReviewModal}
        handleClose={() => {
          setEditReviewModal(false);
          setReviewData({});
        }}
        handleSave={saveReviewHandler}
        address={listing ? listing.locationDetails.address : ''}
        reviewData={reviewData}
      />
    </div>
  );
};

export default ListingReviews;
