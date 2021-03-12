
import UserLayout from '../../src/app/components/other/UserLayout';
import Settings from '../../src/pages/Settings';

export default function Page() {
  return (
    <UserLayout authRequired={true}>
      <Settings/> 
    </UserLayout>
  );
}
