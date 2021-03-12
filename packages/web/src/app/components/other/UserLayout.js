import React from "react";
import Head from "next/head";
import AuthRequired from "./AuthRequired";
import Nav from "./Nav";

const UserLayout = (props) => {
  return (
    <div>
      <Head>
        <title>{props.title ? props.title : "Parkyourself"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="container pt-4 pb-2">
        {props.authRequired ? (
          <AuthRequired redirectPath="/">{props.children}</AuthRequired>
        ) : (
          props.children
        )}
      </div>
    </div>
  );
};

export default UserLayout;
