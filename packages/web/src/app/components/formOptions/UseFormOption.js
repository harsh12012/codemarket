import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { Form } from "react-bootstrap";
import { client } from "../../graphql/index";

const GET_ONE = gql`
  query GetOneFormOption($id: ID!) {
    getOneFormOption(id: $id) {
      _id
      title
      options {
        label
        value
      }
      formName
      published
    }
  }
`;

const UseFormOption = ({ id, value, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState({ options: [] });
  const getAllData = async () => {
    setLoading(true);
    try {
      let { data } = await client.query({
        query: GET_ONE,
        variables: { id: id },
      });
      // console.log("Data", data);
      setAllData(data.getOneFormOption);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <Form.Control value={value} onChange={onChange} as="select" custom>
      {allData.options.map((o, i) => (
        <option value={o.value}>{o.label}</option>
      ))}
    </Form.Control>
  );
};

export default UseFormOption;
