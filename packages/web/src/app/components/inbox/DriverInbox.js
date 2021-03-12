import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGetOneListingClient } from '@parkyourself-frontend/shared/hooks/listings';
import { useSelector } from 'react-redux';
import Inbox from './Inbox';
import Loading from '../other/Loading';

export default function Page() {
  const router = useRouter();
  const { newChat = null, parking = null } = router.query;
  const { getOneListing } = useGetOneListingClient();
  //   const [intial, setIntial] = useState(false);
  const [data, setData] = useState({
    initial: false,
    showChatBox: false,
    user2Id: '',
    listingLocation: ''
  });
  const user1Id = useSelector(({ auth }) => (auth.authenticated ? auth.data.attributes.sub : null));

  useEffect(() => {
    if (newChat && parking) {
      getOneListing(parking)
        .then(({ data }) => {
          if (data && data.getListing && data.getListing.locationDetails.address) {
            setData({
              ...data,
              initial: true,
              listingLocation: data.getListing.locationDetails.address,
              user2Id: data.getListing._id,
              showChatBox: true
            });
          }
        })
        .catch((error) => {
          setData({ ...data, initial: true });
        });
    } else {
      setData({ ...data, initial: true });
    }
  }, [newChat, parking]);

  if (!data.initial) {
    return <Loading />;
  }

  return (
    <Inbox
      user1Id={user1Id}
      user2Id={data.user2Id}
      listingLocation={data.listingLocation}
      showChatBox={data.showChatBox}
    />
  );
}
