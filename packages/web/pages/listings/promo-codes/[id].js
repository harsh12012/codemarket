import { useRouter } from 'next/router';
import { useGetOneListing } from '@parkyourself-frontend/shared/hooks/listings';
import UserLayout from '../../../src/app/components/other/UserLayout';
import PromoCodes from '../../../src/pages/PromoCodes';
import Loading from '../../../src/app/components/other/Loading';

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  return <UserLayout authRequired={true}>{id && <PromoCodePage id={id} />}</UserLayout>;
}

const PromoCodePage = ({ id }) => {
  const { data, loading, error } = useGetOneListing(id);
  if (loading || error || !data) {
    return <Loading />;
  }
  return <PromoCodes id={id} listing={data.getListing} />;
};
