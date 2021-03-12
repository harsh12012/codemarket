import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { HiArrowRight } from 'react-icons/hi';
import Link from 'next/link';
import moment from 'moment';
import { EmailShareButton, WhatsappShareButton, WhatsappIcon, EmailIcon } from 'react-share';
import html2canvas from 'html2canvas';
import { gql, useMutation } from '@apollo/client';
import { v4 as uuid } from 'uuid';
import config from '@parkyourself-frontend/shared/aws-exports';
import { Storage } from 'aws-amplify';
import { updateBookingLocal } from '../redux/actions/user';
var QRCode = require('qrcode.react');

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

const ADD_QR_CODE_TO_BOOKING = gql`
  mutation UpdateBooking($id: ID!, $qrCode: String) {
    updateBooking(id: $id, qrCode: $qrCode) {
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
      startDate
      startTime
      endDate
      endTime
      payment
      paymentMethod
      vehicle
      profileCategory
      status
      createdAt
      qrCode
    }
  }
`;

const ParkingTicketModal = ({ id, show, handleClose, address, bookingData }) => {
  const [updateBooking] = useMutation(ADD_QR_CODE_TO_BOOKING);
  const { start, end, vehicle } = bookingData;

  const saveImage = async (img) => {
    try {
      //   var filepath = base64Img.imgSync(img, '', 'parkingTicket');
      //   console.log("in save image",filepath);
      // let file = filepath;

      // let fileName = file.name.split('.')[0].toLowerCase();
      // let extension = file.name.split('.')[1].toLowerCase();
      let fileName = 'parking-ticket';
      let extension = 'png';
      let key = `images/${uuid()}${fileName}.${extension}`;
      let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;

      await Storage.put(key, {
        Body: img,
        ContentEncoding: 'base64',
        ContentType: 'image/png'
      });

      const response = await updateBooking({
        variables: { id: id, qrCode: url }
      });
      updateBookingLocal(response.data.updateBooking);
      console.log(response.data.updateBooking);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      {/* <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <div className="parking-ticket-modal">
          <div className="parking-ticket-canvas">
            <h2 className="heading">Parking Ticket</h2>
            <div className="parking-ticket">
              <h6 className="address">{address}</h6>
              {vehicle && (
                <div className="car-details">
                  <h6>
                    Car : {vehicle.make} {vehicle.model} {vehicle.year}{' '}
                  </h6>
                  <h6>License Plate : {vehicle.licensePlate} </h6>
                </div>
              )}
              <div className="booking-time">
                <div className="arrive">
                  <p className="description">Arrive after</p>
                  <h6> {moment(new Date(start)).format('ll')}</h6>
                  <h6>{moment(new Date(start)).format('LT')}</h6>
                </div>
                <HiArrowRight className="right-arrow" />
                <div className="arrive">
                  <p className="description">Exit before</p>
                  <h6> {moment(new Date(end)).format('ll')}</h6>
                  <h6>{moment(new Date(end)).format('LT')}</h6>
                </div>
              </div>
            </div>
            <div className="qr-code-container">
              <p className="description">Show this QR code to enter the Parking area</p>
              <QRCode value={id} className="qr-code" />
            </div>
          </div>
          <br />
          <Button
            variant="primary"
            onClick={() => {
              // const canvas = document.querySelector(".qr-code");
              window.scrollTo(0, 0);
              html2canvas(document.querySelector('.parking-ticket-canvas')).then(function (canvas) {
                document.body.appendChild(canvas);
                const pngUrl = canvas
                  .toDataURL('image/png')
                  .replace('image/png', 'image/octet-stream');
                saveImage(pngUrl);
                let downloadLink = document.createElement('a');
                downloadLink.href = pngUrl;
                downloadLink.download = `${address}.png`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                document.body.removeChild(canvas);
              });
            }}>
            Download
          </Button>
          <br />
          {vehicle && (
            <>
              Share the Parking Ticket on Whatsapp
              <WhatsappShareButton
                url={`Parking Ticket | Booking ID: ${id} | Location: ${address} | Car: ${
                  vehicle.make
                } ${vehicle.model} ${vehicle.year} | License Plate: ${
                  vehicle.licensePlate
                } | Arrive After: ${moment(new Date(start)).format('lll')} | Exit Before: ${moment(
                  new Date(end)
                ).format('lll')}`}>
                <WhatsappIcon size={36} round={true} />
              </WhatsappShareButton>
            </>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Link
          href="/parkings"
          onClick={() => {
            handleClose();
          }}>
          <Button variant="primary">Done</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default ParkingTicketModal;
