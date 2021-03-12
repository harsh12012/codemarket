import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import moment from 'moment';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import $ from 'jquery';
import { updateListingLocal } from '../redux/actions/user';
import { roundTime } from '../../helpers/utilities';
import { client } from '../graphql';

const PUBLISH_LISTING = gql`
  mutation UpdateListing($id: ID!, $published: Boolean) {
    updateListing(id: $id, published: $published) {
      _id
      ownerId
      ownerEmail
      ownerName
      published
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

const stripe_Retrieve_Account = gql`
  query StripeRetrieveAccount($userId: String!) {
    stripeRetrieveAccount(userId: $userId)
  }
`;

const PublishListingModal = ({ show, handleClose, id, updateListingLocal, userId }) => {
  const router = useRouter();
  const [publishListing] = useMutation(PUBLISH_LISTING);

  const [time, setTime] = useState(new Date());

  const [validated, setValidated] = useState(false);
  const [disabled, updateDisabled] = useState(false);

  const [startTimeArr, setStartTimeArr] = useState([]);

  const setStartTimeArray = (start) => {
    console.log('set start time ', start);
    var d = moment(`${moment(new Date()).format('ll')} 12:00 AM`)._d;
    if (moment(d).format('ll') == moment(start).format('ll')) {
      d = start;
    }
    let timeArray = [];
    for (let i = 0; i < 96; i++) {
      if (
        moment(d)
          .add(15 * i, 'minutes')
          .format('L') !== moment(d).format('L')
      ) {
        break;
      }
      let s = moment(d)
        .add(15 * i, 'minutes')
        .format('LT');

      let t = roundTime(s, 15);

      let ft = t + (s.substring(s.length - 3) === ' AM' ? ' AM' : ' PM');
      // console.log("time :",ft);
      timeArray.push(ft);
    }
    setStartTimeArr(timeArray);
  };

  const lateCheckoutHandler = () => {
    // if(value==0){
    //   alert("Time can't be zero");
    //   return;
    // }
    // if(value && unit){
    //   setValidated(false);
    //       let ed = moment(end).add(value,unit)._d;
    //       handleLateCheckout({id:_id,end:ed,start:start});
    //       handleClose();
    // }else{
    //     setValidated(true);
    // }
  };

  const checkWithdrawalSettings = async () => {
    let data = await client.query({
      query: stripe_Retrieve_Account,
      variables: { userId: userId }
    });
    // .then(({data})=>{
    console.log('data :', data);
    if (data.stripeRetrieveAccount) {
      console.log('data :', data.stripeRetrieveAccount);
      let stripeData = JSON.parse(data.stripeRetrieveAccount);
      console.log(stripeData);
      if (!stripeData.details_submitted) {
        alert('Details not submitted');
        router.push('/withdrawal-settings');
        return false;
      } else {
        if (!stripeData.payouts_enabled) {
          alert('Please Update your Withdrawal Settings');
          router.push('/withdrawal-settings');
          return false;
        } else {
          return true;
        }
      }
    } else {
      return false;
    }
    // }).catch((error)=>{console.log(error);});
  };

  $('.start-time-input').on('click', function () {
    $(this).val('');
  });
  $('.start-time-input').on('mouseleave', function () {
    if ($(this).val() == '') {
      $(this).val(moment(time).format('LT'));
    }
  });

  const handlePublish = async () => {
    try {
      if (!checkWithdrawalSettings()) {
        alert('Withdrawal Settings not Set Up. Please Set it and Try again');
        return;
      } else {
        updateDisabled(true);
        let res = await publishListing({
          variables: {
            id: id,
            published: true
          }
        });
        alert('Listing Activated Successfully');

        updateListingLocal(res.data.updateListing);

        updateDisabled(false);
        handleClose();
        // props.dispatch(hideLoading());
      }
    } catch (error) {
      updateDisabled(false);
      // props.dispatch(hideLoading());
      console.log(error);
      alert('Activation Failed!', 'Please try again');
    }
  };

  useEffect(() => {
    setStartTimeArray(time);
  }, [time]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="faq-modal"
      backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Activate Your Listing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">
          Your listing has been successfully created. Do you want to go live now?
        </p>
        <Button variant="primary" disabled={disabled} onClick={handlePublish}>
          Activate
        </Button>
        <br />
        <br />
        <p className="lead">Tell us when do you want to go live.</p>
        <div className="timepicker" style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div>
            <p className="description" style={{ marginTop: '0px', color: '#000' }}>
              Start Date
            </p>
            <DatePicker
              clearIcon={null}
              value={time}
              minDate={new Date()}
              onChange={(value) => {
                setTime(
                  moment(`${moment(value).format('ll')} ${moment(time).format('LT')}`, 'lll')._d
                );
              }}
            />
          </div>
          <Form>
            <Form.Group
              controlId="exampleForm.SelectCustom"
              style={{ marginTop: '5px !important' }}>
              <Form.Label>Start Time</Form.Label>
              <input
                list="start-time"
                value={moment(time).format('LT')}
                className="form-control start-time-input"
                placeholder="Start Time"
                onChange={(event) => {
                  setTime(moment(`${moment(time).format('ll')} ${event.target.value}`, 'lll')._d);
                }}
              />
              <datalist id="start-time" hidden={false}>
                {startTimeArr.map((t) => (
                  <option value={t} />
                ))}
              </datalist>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={disabled}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleClose();
          }}
          disabled={disabled}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = ({ auth }) => ({
  userId: auth.data.attributes.sub
});

export default connect(mapStateToProps, { updateListingLocal })(PublishListingModal);
