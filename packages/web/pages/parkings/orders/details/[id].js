import { useRouter } from 'next/router';
import UserLayout from '../../../../src/app/components/other/UserLayout';
import BookingDetail from '../../../../src/app/components/booking/BookingDetail';

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  return <UserLayout authRequired={true}>{id && <BookingDetail id={id} />}</UserLayout>;
}
