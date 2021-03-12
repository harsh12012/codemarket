import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { useMutation, gql } from "@apollo/client";
import { showLoading, hideLoading } from "react-redux-loading";
import slugify from "slugify";
import { Trash, Edit } from "react-feather";
import Rating from "./sub-components/ProductRating";
import { Form } from "react-bootstrap";

const PUBLISH_UPDATE_ONE_ROOM = gql`
  mutation UpdateOneRoom($id: ID!, $published: Boolean) {
    updateOneRoom(id: $id, published: $published) {
      _id
      published
    }
  }
`;
const UPDATE_ONE_ROOM = gql`
  mutation UpdateOneRoom(
    $id: ID!
    $title: String
    $slug: String
    $price: Int
    $description: String
  ) {
    updateOneRoom(
      id: $id
      title: $title
      slug: $slug
      price: $price
      description: $description
    ) {
      _id
      title
      slug
      price
      description
    }
  }
`;

const ProductDescriptionInfo = ({ dispatch, role, room }) => {
  const [publishRoomMutation] = useMutation(PUBLISH_UPDATE_ONE_ROOM);
  const [updateOneRoom] = useMutation(UPDATE_ONE_ROOM);
  const [payload, setPayload] = useState({
    edit: false,
    _id: "",
    title: "",
    price: "",
    description: "",
  });
  const [disabled, setDisabled] = useState(false);

  const handlePublish = async (v) => {
    try {
      dispatch(showLoading());
      let res = await publishRoomMutation({
        variables: {
          id: room._id,
          published: v,
        },
      });
      // alert(`Publish ${v}`);
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      alert("Something went wrong!");
    }
  };

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const productCartQty = 0;

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    dispatch(showLoading());
    setDisabled(true);
    try {
      let res = await updateOneRoom({
        variables: {
          title: payload.title,
          slug: slugify(payload.title, { lower: true }),
          price: payload.price,
          description: payload.description,
          id: payload._id,
        },
      });
      setPayload({
        edit: false,
      });
      dispatch(hideLoading());
      setDisabled(false);
      alert("Room Updated Sucessfully");
    } catch (error) {
      dispatch(hideLoading());
      alert("Something went wrong!");
      setDisabled(false);
    }
  };

  const onClickEdit = () => {
    setPayload({
      edit: true,
      _id: room._id,
      title: room.title,
      price: room.price,
      description: room.description,
    });
  };

  return (
    <div className="product-details-content ml-70">
      {role === "admin" &&
        (payload.edit ? (
          <div
            style={{ zIndex: "3", right: "5px" }}
            className="position-absolute"
          >
            <button
              disabled={disabled}
              onClick={handleSubmitEdit}
              className="account__btn d-inline w-auto"
            >
              Save
            </button>
          </div>
        ) : (
          <div
            style={{ zIndex: "3", right: "5px" }}
            className="position-absolute"
          >
            <Edit
              size={35}
              color="#002556"
              style={{ cursor: "pointer" }}
              onClick={onClickEdit}
              className="mr-2"
            />
            <button
              onClick={() => handlePublish(!room.published)}
              disabled={disabled}
              className="account__btn d-inline w-auto"
            >
              {room.published ? "Unpublish" : "Publish"}
            </button>
          </div>
        ))}

      {payload.edit ? (
        <h2>
          <input
            name="title"
            onChange={handleChange}
            placeholder="Title"
            style={{ border: "none", fontSize: "26px", width: "100%" }}
            value={payload.title}
          />
        </h2>
      ) : (
        <h2>{room.title}</h2>
      )}

      <div className="product-details-price">
        {payload.edit ? (
          <span>
            <input
              name="price"
              type="number"
              onChange={handleChange}
              placeholder="Price"
              style={{ border: "none", width: "100%", color: "#fe5252" }}
              value={payload.price}
            />
          </span>
        ) : (
          <span>{"$" + room.price} </span>
        )}
      </div>
      <div className="pro-details-rating-wrap">
        <div className="pro-details-rating">
          <Rating ratingValue={4} />
        </div>
      </div>
      <div className="pro-details-list">
        {payload.edit ? (
          <p>
            <Form.Control
              name="description"
              onChange={handleChange}
              placeholder="Description"
              style={{ border: "none", width: "100%", padding: "0px" }}
              value={payload.description}
              as="textarea"
              rows="4"
            />
          </p>
        ) : (
          <p>{room.description}</p>
        )}
      </div>
      <div className="pro-details-quality">
        <div className="pro-details-cart btn-hover">
          <button>Book Now</button>
        </div>
      </div>
      <div className="pro-details-meta">
        <span>Tags :</span> <span> Office space </span>
      </div>

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    // userId: auth.authenticated ? auth.data.attributes.sub : "null",
    role: auth.authenticated
      ? auth.data.signInUserSession.accessToken.payload["cognito:groups"][0]
      : "user",
  };
};

export default connect(mapStateToProps)(ProductDescriptionInfo);
