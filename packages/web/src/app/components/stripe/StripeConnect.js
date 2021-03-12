import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CheckCircle } from "react-feather";
import { gql, useQuery } from "@apollo/client";
import { Button, Spinner } from "react-bootstrap";
import { client } from "../../graphql/index";

const stripe_Retrieve_Account = gql`
  query StripeRetrieveAccount($userId: String!) {
    stripeRetrieveAccount(userId: $userId)
  }
`;

const stripe_Create_Login_Link_Account = gql`
  query stripeCreateLoginLinkAccount($userId: String!) {
    stripeCreateLoginLinkAccount(userId: $userId)
  }
`;

const stripe_Create_Account_Links = gql`
  query StripeCreateAccountLinks(
    $userId: String!
    $email: String!
    $type: String!
    $refresh_url: String!
    $return_url: String!
  ) {
    stripeCreateAccountLinks(
      userId: $userId
      email: $email
      type: $type
      refresh_url: $refresh_url
      return_url: $return_url
    )
  }
`;

const StripeConnect = (props) => {
  const [disabled, setDisabled] = useState(false);
  const { loading, error, data } = useQuery(stripe_Retrieve_Account, {
    variables: { userId: props.userId },
  });

  const onClickAccountLink = async () => {
    try {
      setDisabled(true);
      const link = await client.query({
        query: stripe_Create_Account_Links,
        variables: {
          userId: props.userId,
          email: props.userEmail,
          type: "account_onboarding",
          refresh_url: window.location.href,
          return_url: window.location.href,
        },
      });
      window.location.replace(
        JSON.parse(link.data.stripeCreateAccountLinks).url
      );
      setDisabled(false);
    } catch (error) {
      setDisabled(false);
      alert("Something went wrong!");
    }
  };

  const onClickLoginLink = async () => {
    try {
      setDisabled(true);
      const loginLink = await client.query({
        query: stripe_Create_Login_Link_Account,
        variables: {
          userId: props.userId,
        },
      });
      window.open(
        JSON.parse(loginLink.data.stripeCreateLoginLinkAccount).url,
        "_blank"
      );
      setDisabled(false);
    } catch (error) {
      console.log("loginLink == ", error);
      setDisabled(false);
      alert("Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <div className="container pt-4">
      {JSON.parse(data.stripeRetrieveAccount) === null ||
      JSON.parse(data.stripeRetrieveAccount).details_submitted === false ? (
        <div className="text-center">
          <Button
            onClick={onClickAccountLink}
            className="my-0 mx-auto"
            style={{
              pointerEvents: disabled ? "none" : "auto",
              minWidth: "150px",
            }}
          >
            {disabled ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Add withdrawal settings"
            )}
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <h3>
            Stripe Account Connected{" "}
            <CheckCircle className="text-success mt-n1" />
          </h3>
          <Button
            onClick={onClickLoginLink}
            className="my-0 mx-auto"
            style={{
              pointerEvents: disabled ? "none" : "auto",
              minWidth: "150px",
            }}
          >
            {disabled ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Update withdrawal settings"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    userId: auth.authenticated ? auth.data.attributes.sub : null,
    userEmail: auth.authenticated ? auth.data.attributes.email : null,
    userData: auth.authenticated ? auth.data.attributes : null,
  };
};

export default connect(mapStateToProps)(StripeConnect);
