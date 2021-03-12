import React from 'react';
import { useSelector } from 'react-redux';
import UserLayout from '../src/app/components/other/UserLayout';
import DriverInbox from '../src/app/components/inbox/DriverInbox';
import SpaceOwnerInbox from '../src/app/components/inbox/SpaceOwnerInbox';

export default function Page() {
  const isSpaceOwner = useSelector(({ user }) => user.isSpaceOwner);

  return (
    <UserLayout authRequired={true}>
      {isSpaceOwner ? <SpaceOwnerInbox /> : <DriverInbox />}
    </UserLayout>
  );
}
