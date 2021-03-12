import { useRouter } from 'next/router';
import UserLayout from '../../src/app/components/other/UserLayout';
import ListingReviews from '../../src/pages/ListingReviews';

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  return <UserLayout authRequired={true}>{id && <ListingReviews id={id} />}</UserLayout>;
}
