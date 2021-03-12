import React from "react";
import dynamic from "next/dynamic";
import scriptLoader from "react-async-script-loader";
import UserLayout from "../../src/app/components/other/UserLayout";
const AddListing = dynamic(() => import("../../src/pages/AddListing"), {
  ssr: false,
});

function Page(props) {
  return (
    <UserLayout authRequired={true}>
      {props.isScriptLoaded && props.isScriptLoadSucceed ? (
        <AddListing />
      ) : null}
    </UserLayout>
  );
}

export default scriptLoader([
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyDF0pzALjYYanPshuclFzq_2F24xZWZjOg&libraries=geometry,drawing,places",
])(Page);
