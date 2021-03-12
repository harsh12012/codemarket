import { useSelector } from 'react-redux';
import UserLayout from '../../src/app/components/other/UserLayout';
import ListingTab from '../../src/app/components/listings/myListing/ListingTab';

export default function Page() {
  const username = useSelector(({ auth }) =>
    auth.authenticated ? auth.data.attributes.sub : null
  );
  return (
    <UserLayout authRequired={true}>
      <ListingTab username={username} />
    </UserLayout>
  );
}
