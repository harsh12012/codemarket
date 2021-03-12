import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { useQuery, gql } from "@apollo/client";
import { connect } from "react-redux";
import LayoutTwo from "../layouts/LayoutTwo";
import LayoutThree from "../layouts/LayoutThree";
import Breadcrumb from "../components/breadcrumbs/Breadcrumb";
import BreadcrumbCustom from "../components/breadcrumbs/BreadcrumbCustom";
import ContactMap from "../components/contact-maps/ContactMap";
import NotFound from "../app/components/other/NotFound";

const GET_ONE_ROOM_BY_SLUG = gql`
  query GetOneRoomBySlug($slug: String!, $userId: String!) {
    getOneRoomBySlug(slug: $slug, userId: $userId) {
      _id
      userId
      title
      slug
      price
      description
      images
      published
    }
  }
`;

const FullRoom = ({ userId }) => {
  let { slug } = useParams();
  const { loading, error, data } = useQuery(GET_ONE_ROOM_BY_SLUG, {
    variables: { slug, userId },
  });
  if (loading) return null;
  // const tempError =
  //   error ||
  //   (data && data.getOneRoomBySlug === null) ||
  //   (data &&
  //     !data.getOneRoomBySlug.published &&
  //     data.getOneRoomBySlug.userId !== userId);
  if (
    error ||
    (data && data.getOneRoomBySlug === null) ||
    (data &&
      !data.getOneRoomBySlug.published &&
      data.getOneRoomBySlug.userId !== userId)
  ) {
    return (
      <LayoutThree>
        <Breadcrumb title="PAGE NOT FOUND" />
        <NotFound />
      </LayoutThree>
    );
  }
  console.log("Room = ", data.getOneRoomBySlug.images[0]);
  console.log("Room = ", data);
  return (
    <Fragment>
      <MetaTags>
        <title>Unitabiz | Contact</title>
        <meta
          name="description"
          content="Contact page of React JS Crypto Currency Template."
        />
      </MetaTags>
      <LayoutTwo theme="white">
        {/* breadcrumb */}
        <BreadcrumbCustom image={data.getOneRoomBySlug.images[0]} />
        {/* contact page content */}
        <section className="conact__area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="contact__title">
                  <h2>{data.getOneRoomBySlug.title}</h2>
                  <h2 className="my-1">${data.getOneRoomBySlug.price}</h2>
                  <p>{data.getOneRoomBySlug.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 col-12">
                <div className="google__map">
                  {/* contact map */}
                  <ContactMap latitude="47.444" longitude="-122.176" />
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12 sm__mt--40 md__mt--40">
                <div className="dg__contact__wrapper">
                  <form className="contact-form">
                    <div className="single-contact-form">
                      <span>Full Name</span>
                      <input type="text" name="firstname" />
                    </div>
                    <div className="single-contact-form">
                      <span>Email</span>
                      <input type="email" name="email" />
                    </div>
                    <div className="single-contact-form">
                      <span>Subject</span>
                      <input type="text" name="subject" />
                    </div>
                    <div className="single-contact-form message">
                      <span>Message</span>
                      <textarea name="message" defaultValue={""} />
                    </div>
                    <div className="contact-btn">
                      <button type="submit" disabled={true}>
                        Submit
                        <span className="ti-arrow-right" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LayoutTwo>
    </Fragment>
  );
};

// export default FullRoom;
const mapStateToProps = ({ auth }) => {
  return {
    userId: auth.authenticated ? auth.data.attributes.sub : "null",
  };
};

export default connect(mapStateToProps)(FullRoom);
