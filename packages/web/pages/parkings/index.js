import scriptLoader from 'react-async-script-loader';
import FindParking from '../../src/pages/FindParking';
import UserLayout from '../../src/app/components/other/UserLayout';

function Page(props) {
  return (
    <UserLayout authRequired={true}>
      {props.isScriptLoaded && props.isScriptLoadSucceed ? <FindParking /> : null}
    </UserLayout>
  );
}
export default scriptLoader([
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyDF0pzALjYYanPshuclFzq_2F24xZWZjOg&libraries=geometry,drawing,places'
])(Page);
