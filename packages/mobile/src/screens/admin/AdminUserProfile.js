import React from 'react';
import UserProfile from '../../components/admin/users/UserProfile';

export default function AdminUserProfile({ route }) {
  const { user } = route.params;
  return <UserProfile user={user} />;
}
