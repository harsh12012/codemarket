import colors from '@parkyourself-frontend/shared/config/colors';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native-webview';
import ScreenTittle from '../../components/common/ScreenTittle';
import { useAppPolicy } from '@parkyourself-frontend/shared/hooks/adminSettings';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useMutation, gql } from '@apollo/client';
import { connect } from 'react-redux';
import MaterialButtonPrimary from '../../components/MaterialButtonPrimary';
import CKEditor from 'react-native-ckeditor';
const UPDATE_ONE = gql`
  mutation UpdateOne($details: String!, $updatedBy: String!) {
    updateOnePolicy(details: $details, updatedBy: $updatedBy) {
      details
    }
  }
`;

// const loading = null;
function AdminPrivacyPolicy(props) {
  const { loading, error: error2, data: data2 } = useAppPolicy();
  const [disabled, setDisabled] = useState(false);
  const [touched, setTouched] = useState(false);
  const [policy, setPolicy] = useState({
    flag: true
  });
  const [updateOne] = useMutation(UPDATE_ONE);
  const [oneData, setOneData] = useState('');
  const [da, setDa] = useState('');
  useEffect(() => {
    if (!error2 && data2) {
      setOneData(data2.getOnePolicy.details);
    }
  }, [data2]);

  const handleSubmit = async () => {
    setDisabled(true);
    try {
      let { data } = await updateOne({
        variables: {
          details: oneData === '' ? '' : oneData,
          updatedBy: props.userId
        }
      });
      // setOneData(data.updateOneFee.fee);
      setDisabled(false);
      setPolicy({ ...policy, flag: true });
    } catch (error) {
      // console.log(error);
      setDisabled(false);
      Alert.alert('Something went wrong please try again', error.message);
    }
  };

  const onChangePolicy = (value) => {
    if (!touched) setTouched(true);
    setOneData(value);
  };
  const handleSave = (e) => {
    if (oneData !== '' && touched) {
      handleSubmit();
    } else {
      setPolicy({ ...policy, flag: true });
    }
  };
  return (
    <View style={styles.container}>
      <ScreenTittle title="User Agreement" />
      {policy.flag ? (
        <MaterialButtonPrimary
          onPress={() => setPolicy({ ...policy.flag, flag: false })}
          caption="Edit"
          style={styles.materialButtonPrimary}
        />
      ) : (
        <MaterialButtonPrimary
          onPress={handleSave}
          caption="Save"
          style={styles.materialButtonPrimary}
        />
      )}
      {loading ? (
        <LoadingSpinner style={{ marginTop: 40 }} />
      ) : (
        {
          /* <CKEditor
          content={oneData}
          onChange={(value) => {
            setOneData(value);
          }}
        /> */
        }
      )}
      <View>
        <Text>Add rich text editor</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20
  },
  input: {
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    marginBottom: 15,
    textAlignVertical: 'top',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: 'black',
    padding: 5
  },
  disabledinput: {
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    backgroundColor: '#E9ECEF',
    marginBottom: 15,
    textAlignVertical: 'top',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: 'black',
    padding: 5
  },
  materialButtonPrimary: {
    width: 100,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      height: 10,
      width: 10
    },
    elevation: 20,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    marginTop: 10,
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 30
  },
  text: { fontWeight: 'bold', fontSize: 30, marginTop: Platform.OS === 'ios' ? 0 : 9 }
});

const mapStateToProps = ({ auth }) => {
  return {
    userId: auth.authenticated ? auth.data.attributes.sub : null
  };
};

export default connect(mapStateToProps)(AdminPrivacyPolicy);
