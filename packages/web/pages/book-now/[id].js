import { useRouter } from 'next/router';
import { useGetOneListing } from '@parkyourself-frontend/shared/hooks/listings';
import UserLayout from '../../src/app/components/other/UserLayout';
import BookNow from '../../src/pages/BookNow';
import Loading from '../../src/app/components/other/Loading';

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  return <UserLayout authRequired={true}>{id && <BookNowPage id={id} />}</UserLayout>;
}

const BookNowPage = ({ id }) => {
  const { data, loading, error } = useGetOneListing(id);
  if (loading || error || !data) {
    return <Loading />;
  }
  return <BookNow id={id} listing={data.getListing} />;
};
