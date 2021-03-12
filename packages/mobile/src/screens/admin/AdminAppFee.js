import colors from '@parkyourself-frontend/shared/config/colors';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, ActivityIndicator, Platform } from 'react-native';
import ScreenTittle from '../../components/common/ScreenTittle';
import { useAppFee } from '@parkyourself-frontend/shared/hooks/adminSettings';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useMutation, gql } from '@apollo/client';
import { connect } from 'react-redux';

const UPDATE_ONE = gql`
  mutation UpdateOne($fee: Int!, $updatedBy: String!) {
    updateOneFee(fee: $fee, updatedBy: $updatedBy) {
      fee
    }
  }
`;

// const loading = null;
function AdminAppFee(props) {
  const { loading, error: error2, data: data2 } = useAppFee();
  const [oneData, setOneData] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [touched, setTouched] = useState(false);
  const [updateOne] = useMutation(UPDATE_ONE);

  useEffect(() => {
    if (!error2 && data2) {
      setOneData(data2.getOneFee.fee);
    }
  }, [data2]);

  const handleSubmit = async (fee) => {
    setDisabled(true);
    try {
      let { data } = await updateOne({
        variables: {
          fee: oneData === '' ? 0 : oneData,
          updatedBy: props.userId
        }
      });
      // setOneData(data.updateOneFee.fee);
      setDisabled(false);
    } catch (error) {
      // console.log(error);
      setDisabled(false);
      Alert.alert('Something went wrong please try again', error.message);
    }
  };

  const onChangeFee = (value) => {
    if (!touched) setTouched(true);
    if (value <= 100) {
      setOneData(value);
    }
  };

  useEffect(() => {
    if (oneData !== 0 && touched) {
      handleSubmit();
    }
  }, [oneData]);

  return (
    <View style={styles.container}>
      <ScreenTittle title="Application Fee" />
      {loading ? (
        <LoadingSpinner style={{ marginTop: 40 }} />
      ) : (
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <TextInput
            value={String(oneData)}
            placeholder="Fee"
            keyboardType="numeric"
            numericvalue
            onChangeText={(value) => onChangeFee(value)}
            style={styles.input}
          />
          <Text style={styles.text}>%</Text>
          {disabled && <ActivityIndicator style={{ marginLeft: 20 }} color={colors.secondary} />}
        </View>
      )}
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
    width: 75,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 10
  },
  text: { fontWeight: 'bold', fontSize: 30, marginTop: Platform.OS === 'ios' ? 0 : 9 }
});

const mapStateToProps = ({ auth }) => {
  return {
    userId: auth.authenticated ? auth.data.attributes.sub : null
  };
};

export default connect(mapStateToProps)(AdminAppFee);
