import React,{useState} from 'react';
import { Modal,Button } from 'react-bootstrap';
import dynamic from "next/dynamic";
// import QrReader from 'react-qr-reader'
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { client } from '../graphql';
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false});

const GET_BOOKING = gql`
query GetBooking($id: String!) {
  getBooking(id: $id) {
    driverId
    driverName
    driverEmail
    listingId
    ownerId
    ownerName
    ownerEmail
    address
    images
    startTime
    startDate
    endTime
    endDate
    status
    profileCategory
    vehicle
    payment
    paymentMethod
    createdAt
    qrCode
  }
}`;

const UPDATE_BOOKING = gql`
mutation UpdateBookingStatus($id:String!,$status:String!,$driverEmail:String!,$ownerEmail:String!){
    updateBookingStatus(id:$id,status:$status,driverEmail:$driverEmail,ownerEmail:$ownerEmail){
        driverId
        driverName
        driverEmail
        listingId
        ownerId
        ownerName
        ownerEmail
        address
        images
        startTime
        startDate
        endTime
        endDate
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

const ScanQrModal = ({show,handleClose,updateUpcomingBookings}) => {
    const [updateBooking] = useMutation(UPDATE_BOOKING);

    const [success,setSuccess] = useState(false); 
    const [showModal,setShowModal] = useState(false); 
    const [camera,setCamera] = useState('user');
    const [booking,setBooking] = useState(null);

    const handleError = err => {
        toast.warn(err);
      }

    const toggleCameraType = ()=>{
      if(camera=="user"){
        setCamera("environment");
      }else{
        setCamera("user");
      }
    }

    const handleScan = bookingId => {
        if (bookingId) {
          console.log(bookingId);
          client.query({query:GET_BOOKING,variables:{id:bookingId}}).then(({data})=>{
            if(data.getBooking){
              console.log(data.getBooking);
                setBooking(data.getBooking);
                if(data.getBooking.status=="upcoming"){
                    let response = updateBooking({
                        variables:{id:bookingId,status:"current",driverEmail:data.getBooking.driverEmail,ownerEmail:data.getBooking.ownerEmail}
                    });
                    // console.log('updated booking',response.data.updateBookingStatus);
                    updateUpcomingBookings(bookingId);
                    setSuccess(true);
                    setShowModal(true);
                }else {
                    setSuccess(false);
                    setShowModal(true);
                }
            }else{
                setSuccess(false);
                toast.warn("No Booking found related to the given QR Code!");
            console.log("no booking found");

            }
          }).catch(error=>{
            toast.warn("Something went wrong while scanning the QR Code!");
            console.log(error);
          })
        }
      }


    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
           <Modal.Title>Scan a QR Code to Check In Now</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Button variant="primary" className="mb-2" onClick={toggleCameraType}>Flip Camera</Button>
            <br/>
            <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }} 
          className="qr-code-reader"
          facingMode={camera}
        />

        {booking && 
        <Modal
        show={showModal}
        onHide={()=>{setShowModal(false)}}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{success? 'Ticket Scanned Successfully':'Ticket Scan Unsuccessful'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead">{success? `The ticket for location ${booking.address} has been successfully scanned.The driver has been checked in now.`:`The ticket for location ${booking.address} could not be scanned successfully.Either the ticket is Invalid or the driver is not booked for the location at this time.Please try again.`}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>{setShowModal(false)}}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
}
        </Modal.Body>
        </Modal>
    )
}

export default ScanQrModal;