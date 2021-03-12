import UserLayout from '../../src/app/components/other/UserLayout';
import FAQs from '../../src/pages/FAQs';

export default function Page() {
  return (
    <UserLayout authRequired={true}>
      <FAQs />
    </UserLayout>
  );
}
