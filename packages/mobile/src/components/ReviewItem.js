import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacityl,
  Modal,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import { gql, useMutation } from '@apollo/client';
import { connect } from 'react-redux';
import AddReviewModal from '../components/addReviewModal';

function ReviewItem({
  username,
  text,
  date,
  rating,
  id,
  navigation,
  listingId,
  booking,
  editId,
  review,
  setReviews,
  reviews,
  userData
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const DELETE_LISTING_REVIEW = gql`
    mutation deleteListingReview($id: ID!) {
      deleteListingReview(id: $id)
    }
  `;

  const [deleteReviews] = useMutation(DELETE_LISTING_REVIEW);

  const handleDeleteReview = async (id) => {
    // console.log('called', id);
    try {
      const response = await deleteReviews({
        variables: { id: id }
      });
      console.log('response', response);
      const data = reviews.filter((review) => review._id != id);
      setReviews(data);
    } catch (error) {
      console.log(error);
      // toast.warn("Something Went Wrong!");
    }
  };

  return (
    <View style={styles.rect}>
      <SafeAreaView onPress={() => setModalVisible(false)}>
        <Modal
          animationType="slide"
          onPress={() => setModalVisible(false)}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(false);
          }}>
          <AddReviewModal
            setModalVisible={setModalVisible}
            setReviews={setReviews}
            reviewData={review}
            reviews={reviews}
            address={booking?.address}
          />
        </Modal>
      </SafeAreaView>
      <View style={styles.rect2Stack}>
        <View style={styles.rect2}>
          <View style={styles.rect3Row}>
            <View style={styles.rect3}>
              <Svg viewBox="0 0 52.64 50.89" style={styles.ellipse}>
                <Ellipse
                  stroke="rgba(230, 230, 230,1)"
                  strokeWidth={0}
                  fill="rgba(194,194,194,1)"
                  cx={26}
                  cy={25}
                  rx={26}
                  ry={25}></Ellipse>
              </Svg>
            </View>
            <View style={styles.andrewRowColumn}>
              <View style={styles.andrewRow}>
                <Text style={styles.andrew}>{username}</Text>
                <Text style={styles.may302019}>{date}</Text>
              </View>
              <View style={styles.rect4Stack}>
                <View style={styles.rect4}></View>
                {/* rgba(206,206,204,1) */}

                {/* <IoniconsIcon name="ios-star" style={styles.icon2}></IoniconsIcon> */}

                <IoniconsIcon
                  name="ios-star"
                  style={[
                    styles.icon2,
                    rating > 0 ? { color: 'rgba(251,209,54,1)' } : { color: 'rgba(206,206,204,1)' }
                  ]}></IoniconsIcon>
                <IoniconsIcon
                  name="ios-star"
                  style={[
                    styles.icon3,
                    rating > 1 ? { color: 'rgba(251,209,54,1)' } : { color: 'rgba(206,206,204,1)' }
                  ]}></IoniconsIcon>
                <IoniconsIcon
                  name="ios-star"
                  style={[
                    styles.icon4,
                    rating > 2 ? { color: 'rgba(251,209,54,1)' } : { color: 'rgba(206,206,204,1)' }
                  ]}></IoniconsIcon>
                <IoniconsIcon
                  name="ios-star"
                  style={[
                    styles.icon5,
                    rating > 3 ? { color: 'rgba(251,209,54,1)' } : { color: 'rgba(206,206,204,1)' }
                  ]}></IoniconsIcon>
                <IoniconsIcon
                  name="ios-star"
                  style={[
                    styles.icon6,
                    rating > 4 ? { color: 'rgba(251,209,54,1)' } : { color: 'rgba(206,206,204,1)' }
                  ]}></IoniconsIcon>
              </View>
            </View>
          </View>
        </View>
        <EntypoIcon name="user" style={styles.icon}></EntypoIcon>
      </View>
      <Text style={styles.loremIpsum2}>{text}</Text>
      {userData?.sub === review?.driverId ? (
        <View style={styles.iconBtnRow}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            // navigation.navigate('AddReviewModal', {
            //   listingId: booking.listingId,
            //   _id: booking?._id,
            //   address: booking?.address,
            //   booking: booking,
            //   edit: true,
            //   reviewData: review
            // })
            // }
            // onPress={() => {
            //   setPayload({ ...payload, ...item, id: item._id, mobile: true, edit: true });
            //   setShowAddVehicleModal(true);
            // }}
            style={styles.iconBtn}>
            <EvilIconsIcon name="pencil" size={28} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteReview(review._id)}>
            <EvilIconsIcon name="trash" size={28} color="#888" />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const mapStateToProps = ({ user, auth }) => ({
  bookings: user.bookings,
  loading: user.loading,
  userData: auth.data.attributes
});

export default connect(mapStateToProps)(ReviewItem);

const styles = StyleSheet.create({
  rect: {
    width: '100%',
    // height: 175,
    borderWidth: 1,
    borderColor: 'rgba(232,228,228,1)',
    // marginTop: 19,
    paddingBottom: 30
  },
  iconBtnRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  iconBtn: {
    marginHorizontal: 5
  },
  rect2: {
    top: -1,
    left: 0,
    width: 334,
    height: 70,
    position: 'absolute'
  },
  rect3: {
    width: 79,
    height: 70,
    marginTop: -1
  },
  ellipse: {
    width: 60,
    height: 60,
    marginTop: 9,
    marginLeft: 11
  },
  andrew: {
    // fontFamily: 'roboto-700',
    color: '#121212',
    fontSize: 17
  },
  may302019: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    opacity: 0.52,
    marginLeft: 14,
    marginTop: 2
  },
  andrewRow: {
    height: 20,
    flexDirection: 'row'
  },
  rect4: {
    top: 2,
    left: 0,
    width: 136,
    height: 26,
    position: 'absolute'
  },
  icon2: {
    top: 0,
    left: 1,
    position: 'absolute',
    color: 'rgba(251,209,54,1)',
    fontSize: 21,
    height: 27,
    width: 21
  },
  icon3: {
    top: 0,
    left: 26,
    position: 'absolute',
    color: 'rgba(251,209,54,1)',
    fontSize: 21,
    height: 27,
    width: 22
  },
  icon4: {
    top: 0,
    left: 51,
    position: 'absolute',
    color: 'rgba(251,209,54,1)',
    fontSize: 21,
    height: 27,
    width: 22
  },
  icon5: {
    top: 0,
    left: 75,
    position: 'absolute',
    color: 'rgba(251,209,54,1)',
    fontSize: 21,
    height: 27,
    width: 22
  },
  icon6: {
    top: 0,
    left: 100,
    position: 'absolute',
    color: 'rgba(206,206,204,1)',
    fontSize: 21,
    height: 27,
    width: 22
  },
  rect4Stack: {
    width: 136,
    height: 28,
    marginTop: 4
  },
  andrewRowColumn: {
    width: 155,
    marginLeft: 11,
    marginTop: 14,
    marginBottom: 4
  },
  rect3Row: {
    height: 70,
    flexDirection: 'row',
    marginRight: 89
  },
  icon: {
    top: 13,
    left: 16,
    position: 'absolute',
    color: 'rgba(255,255,255,1)',
    fontSize: 53,
    height: 58,
    width: 53
  },
  rect2Stack: {
    width: 334,
    height: 71,
    marginTop: 18,
    marginLeft: 22
  },
  loremIpsum2: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    fontSize: 15,
    opacity: 0.71,
    marginTop: 20,
    marginLeft: 34
  }
});
