import { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from 'react-redux-loading';

const GET_ONE = gql`
  query Query {
    getOneFee {
      fee
      decimal
    }
  }
`;

const GET_ONE_POLICY = gql`
  query Query {
    getOnePolicy {
      details
    }
  }
`;

const GET_ONE_TERM_CONDITION = gql`
  query Query {
    getOneTermCondition {
      terms
    }
  }
`;

const GET_ONE_PROPERTY = gql`
  query GetOneFormOption($id: ID!) {
    getOneFormOption(id: $id) {
      _id
      title
      options {
        label
        value
        published
      }
      formName
      published
    }
  }
`;

const UPDATE_ONE_PROPERTY = gql`
  mutation UpdateOneFormOption($id: ID!, $options: [FormOptionInput], $updatedBy: String) {
    updateOneFormOption(id: $id, options: $options, updatedBy: $updatedBy) {
      _id
      title
      options {
        label
        value
        published
      }
      formName
      published
    }
  }
`;

const CREATE_FAQ = gql`
  mutation CreateFaq($roles: [String!]!, $topic: String!, $question: String!, $answer: String!) {
    createFaq(roles: $roles, topic: $topic, question: $question, answer: $answer) {
      _id
      roles
      topic
      question
      answer
      createdAt
    }
  }
`;

const UPDATE_FAQ = gql`
  mutation updateFaq(
    $id: ID!
    $roles: [String!]!
    $topic: String!
    $question: String!
    $answer: String!
  ) {
    updateFaq(id: $id, roles: $roles, topic: $topic, question: $question, answer: $answer) {
      _id
      roles
      topic
      question
      answer
      createdAt
    }
  }
`;

const GET_ALL_FAQ_TOPIC = gql`
  query getAllFaqTopics {
    getAllFaqTopics {
      _id
      topic
    }
  }
`;

const DELETE_FAQ = gql`
  mutation deleteFaq($id: ID!) {
    deleteFaq(id: $id)
  }
`;

export function useAppFee() {
  const data = useQuery(GET_ONE);
  return data;
}

export function useAppPolicy() {
  const data = useQuery(GET_ONE_POLICY, { fetchPolicy: 'network-only' });
  return data;
}

export function useAppTermCondition() {
  const data = useQuery(GET_ONE_TERM_CONDITION, { fetchPolicy: 'network-only' });
  return data;
}

export function useCRUDPropertyType(id) {
  const { data, loading, error } = useQuery(GET_ONE_PROPERTY, { variables: { id } });
  const [updateOneFormOption] = useMutation(UPDATE_ONE_PROPERTY);
  const [disabled, updateDisabled] = useState(false);
  const [payload, setPayload] = useState({
    index: 0,
    options: []
  });
  const [oneData, setOneData] = useState({ options: [] });
  const [form, setForm] = useState({ form: false, edit: false });
  const userId = useSelector(({ auth }) => (auth.authenticated ? auth.data.attributes.sub : null));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error && data) {
      setOneData(data.getOneFormOption);
    }
  }, [data]);

  const handleEdit = (index) => {
    setPayload({
      index,
      options: oneData.options.map((i) => ({
        value: i.value,
        label: i.label,
        published: i.published
      }))
    });
    setForm({ edit: true, form: true });
  };

  const handleAddNew = () => {
    setPayload({
      index: oneData.options.length,
      options: [
        ...oneData.options.map((i) => ({
          value: i.value,
          label: i.label,
          published: i.published
        })),
        { value: '', label: '', published: true }
      ]
    });
    setForm({ edit: false, form: true });
  };

  const handleSubmit = async () => {
    updateDisabled(true);
    dispatch(showLoading());
    try {
      let { data } = await updateOneFormOption({
        variables: {
          id: id,
          options: payload.options,
          updatedBy: userId
        }
      });
      setOneData({
        ...oneData,
        options: data.updateOneFormOption.options
      });
      updateDisabled(false);
      setForm({ edit: false, form: false });
      dispatch(hideLoading());
    } catch (err) {
      // console.log(error);
      updateDisabled(false);
      dispatch(hideLoading());
    }
  };

  const handleChangeFormOption = (value) => {
    let tempA = [...payload.options];
    tempA = tempA.map((a, i) => {
      if (i === payload.index) {
        let tempa = a;
        tempa.value = value;
        tempa.label = value;
        return tempa;
      } else {
        return a;
      }
    });
    setPayload({
      ...payload,
      options: tempA
    });
  };

  const handleDelete = async (index) => {
    try {
      updateDisabled(true);
      dispatch(showLoading());
      const tempOptions = oneData.options.filter((o, i) => i !== index);
      let { data } = await updateOneFormOption({
        variables: {
          id,
          options: tempOptions.map((i) => ({
            value: i.value,
            label: i.label,
            published: i.published
          })),
          updatedBy: userId
        }
      });
      setOneData({
        ...oneData,
        options: data.updateOneFormOption.options
      });
      updateDisabled(false);
      dispatch(hideLoading());
    } catch (err) {
      updateDisabled(false);
      dispatch(hideLoading());
    }
  };

  const handlePublish = async (index) => {
    try {
      updateDisabled(true);
      dispatch(showLoading());
      let { data } = await updateOneFormOption({
        variables: {
          id,
          options: oneData.options.map((o, i) => {
            if (i === index) {
              console.log('Changed Status');
              return {
                value: o.value,
                label: o.label,
                published: !o.published
              };
            } else {
              return {
                value: o.value,
                label: o.label,
                published: o.published
              };
            }
          }),
          updatedBy: userId
        }
      });
      setOneData({
        ...oneData,
        options: data.updateOneFormOption.options
      });
      updateDisabled(false);
      dispatch(hideLoading());
    } catch (er) {
      updateDisabled(false);
      dispatch(hideLoading());
      // alert('Something went wrong!');
    }
  };

  return {
    setForm,
    payload,
    data,
    loading,
    error,
    handleDelete,
    handleChangeFormOption,
    handleSubmit,
    handleAddNew,
    handleEdit,
    form,
    disabled,
    oneData,
    handlePublish
  };
}

export default function useCRUDFaq() {
  const [createFaq] = useMutation(CREATE_FAQ);
  const [deleteFaq] = useMutation(DELETE_FAQ);
  const [updateFaq] = useMutation(UPDATE_FAQ);
  const handleAddFaq = async (data) => {
    try {
      const response = await createFaq({ variables: data });
      console.log(response.data.createFaq);
      console.log('FAQ Added Successfully');
      return response.data.createFaq;
    } catch (error) {
      console.log(error);
      console.log('Something went wrong');
      return null;
    }
  };

  const handleDeleteFaq = async (id) => {
    try {
      const response = await deleteFaq({ variables: { id: id } });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log('Something went wrong');
      return null;
    }
  };

  const handleUpdateFaq = async (data) => {
    try {
      const response = await updateFaq({
        variables: {
          id: data.id,
          roles: data.roles,
          topic: data.topic,
          question: data.question,
          answer: data.answer
        }
      });
      console.log('FAQ Updated Successfully');
      console.log('FAQ Update', response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log('Something went wrong');
      return null;
    }
  };

  return {
    handleAddFaq,
    handleDeleteFaq,
    handleUpdateFaq
  };
}

export function useGetAllFaqTopics() {
  const data = useQuery(GET_ALL_FAQ_TOPIC);
  return data;
}


