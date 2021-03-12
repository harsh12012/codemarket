import scriptLoader from 'react-async-script-loader';
import Dashboard from '../src/pages/Dashboard';
import UserLayout from '../src/app/components/other/UserLayout';

function DashboardPage() {
  return (
    <UserLayout authRequired={true}>
      <Dashboard />
    </UserLayout>
  );
}

export default scriptLoader([
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyDF0pzALjYYanPshuclFzq_2F24xZWZjOg&libraries=geometry,drawing,places'
])(DashboardPage);
