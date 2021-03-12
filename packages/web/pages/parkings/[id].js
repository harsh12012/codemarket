import Head from 'next/head';
import React from 'react';
import scriptLoader from 'react-async-script-loader';
import { gql } from '@apollo/client';
import ParkingDetails from '../../src/pages/ParkingDetails';
// import AuthRequired from '../../src/app/components/other/AuthRequired';
import Nav from '../../src/app/components/other/Nav';
import { client } from '../../src/app/graphql/index';

const GET_LISTING = gql`
  query GetListing($id: ID!) {
    getListing(id: $id) {
      thumbnail
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
        streetViewImages
        parkingEntranceImages
        parkingSpaceImages
      }
    }
  }
`;

function Page(props) {
  return (
    <div>
      <Nav />
      <Head>
        <title>Parkyourself</title>
        <link rel="icon" href="/favicon.ico" />
        {props.parking && (
          <>
            <meta
              property="og:title"
              content={`Parking at ${props.parking.locationDetails.address}`}
            />
            <meta
              property="og:description"
              content={`${props.parking.locationDetails.city}, ${props.parking.locationDetails.state}`}
            />
            <meta property="og:image" content={`${props.parking.thumbnail}`} />
            <meta name="twitter:card" content="summary_large_image" />
          </>
        )}
      </Head>
      <div className="container">
        {props.isScriptLoaded && props.isScriptLoadSucceed ? (
          // <AuthRequired redirectPath="/">
          <ParkingDetails />
        ) : // </AuthRequired>
        null}
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const { id } = query;
    const parking = await client.query({
      query: GET_LISTING,
      variables: { id }
    });

    // console.log('parking Query', parking.data.getListing.locationDetails);

    return {
      props: { parking: parking.data.getListing }
    };
  } catch (error) {
    return {
      props: { parking: undefined }
    };
  }
}

export default scriptLoader([
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyDF0pzALjYYanPshuclFzq_2F24xZWZjOg&libraries=geometry,drawing,places'
])(Page);
