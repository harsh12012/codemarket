import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput } from 'react-native';
import Dates from 'react-native-dates';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '@parkyourself-frontend/shared/config/colors';

let oneWeekFrom = new Date();
oneWeekFrom = oneWeekFrom.setDate(oneWeekFrom.getDate() + 7);

export default class ReactNativeDatesDemo extends Component {
  state = {
    focus: 'startDate',
    startDate: new Date(),
    endDate: new Date(oneWeekFrom)
  };

  render() {
    const isDateBlocked = (date) => false;

    const onDatesChange = ({ startDate, endDate, focusedInput }) =>
      this.setState({ ...this.state, focus: focusedInput }, () =>
        this.setState({ ...this.state, startDate, endDate })
      );

    return (
      <View style={styles.container}>
        <Dates
          onDatesChange={onDatesChange}
          isDateBlocked={isDateBlocked}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          focusedInput={this.state.focus}
          focusedMonth={moment('05/09/2030', 'DD/MM/YYYY')}
          range
        />
        <View>
          <View>
            <Text>Item to give cash credit for:</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TextInput placeholder="Test" style={{ justifyContent: 'flex-start' }} />
              </View>
              <View style={{ flex: 1 }}>
                <TextInput placeholder="Test" style={{ justifyContent: 'flex-end' }} />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              backgroundColor: 'red'
              // alignContent: 'stretch'
            }}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // flexGrow: 1
    // marginTop: 20
  },
  button: {
    backgroundColor: colors.primary,
    width: '100%'
    // flex: 0.4,
    // flexDirection: 'column',
    // justifyContent: 'center'
  },
  text: {
    color: colors.white
  }
});
