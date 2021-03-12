import React, { useEffect, useState } from "react";
import { showLoading, hideLoading } from "react-redux-loading";
import { connect } from "react-redux";
import ImageGallery from "react-image-gallery";
import { gql } from "@apollo/client";
import { client } from "../../graphql/index";
import NotFound from "../other/NotFound";

const GET_ONE_IMAGE_SLIDER_BY_SLUG = gql`
  query GetOneImageSliderBySlug($slug: String!, $userId: String!) {
    getOneImageSliderBySlug(slug: $slug, userId: $userId) {
      _id
      userId
      title
      slug
      images
      published
    }
  }
`;

const ViewImageSlider = (props) => {
  const [images, setImages] = useState([]);
  const [show, setShow] = useState(false);

  const getImageSlider = async () => {
    props.dispatch(showLoading());

    client
      .query({
        query: GET_ONE_IMAGE_SLIDER_BY_SLUG,
        variables: { slug: props.slug, userId: props.userId },
      })
      .then(({ data }) => {
        setImages(
          data.getOneImageSliderBySlug.images.map((i) => {
            let extension = i.split(".").pop().toLowerCase();
            if (
              extension === "png" ||
              extension === "jpg" ||
              extension === "jpeg" ||
              extension === "gif"
            ) {
              return {
                original: i,
                thumbnail: i,
              };
            } else if (
              extension === "mp4" ||
              extension === "webm" ||
              extension === "ogg"
            ) {
              return {
                thumbnail:
                  "https://image.freepik.com/free-vector/video-player-template-media-player-web-page_186930-293.jpg",
                embedUrl: i,
                original: `https://www.xmple.com/wallpaper/solid-color-single-one-colour-pink-plain-1920x1080-c-ffcbef-f-24.svg`,
                // description: "Render custom slides within the gallery",
                renderItem: _renderVideo.bind(this),
              };
            }
          })
        );
        props.dispatch(hideLoading());
      })
      .catch((err) => {
        setShow(true);
        props.dispatch(hideLoading());
      });
  };

  useEffect(() => {
    getImageSlider();
  }, []);

  function _renderVideo(item) {
    let extension = item.embedUrl.split(".").pop().toLowerCase();
    return (
      <video style={{ width: "100%" }} controls>
        <source src={item.embedUrl} type={`video/${extension}`} />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <div>
      {images.length > 0 ? (
        <ImageGallery
          items={images}
          showFullscreenButton={false}
          showPlayButton={false}
        />
      ) : show && props.showError ? (
        <NotFound />
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    userId: auth.authenticated ? auth.data.attributes.sub : "null",
  };
};

export default connect(mapStateToProps)(ViewImageSlider);
