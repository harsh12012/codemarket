import UserLayout from '../../src/app/components/other/UserLayout';
import Inbox from '../../src/pages/Inbox';

export default function Page() {
  return (
    <UserLayout authRequired={true}>
      <Inbox />
    </UserLayout>
  );
}
