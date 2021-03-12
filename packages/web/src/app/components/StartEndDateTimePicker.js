import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import moment from 'moment';
import { Form } from 'react-bootstrap';
import $ from 'jquery';
import { connect } from 'react-redux';
import { roundTime } from '../../helpers/utilities';

const StartEndDateTimePicker = ({
  startDisabled,
  endDisabled,
  start,
  end,
  validated = false,
  findParking,
  // onStartChange,
  // onEndChange,
  onChange,
  // onStartTimeChange,
  // onEndTimeChange,
  className = ''
}) => {
  // console.log('start : ', start);
  // console.log('end : ', end);
  const { duration } = findParking;
  // let timeArray = [];
  const [startTimeArr, setStartTimeArr] = useState([]);
  const [endTimeArr, setEndTimeArr] = useState([]);

  const [startLocal, setStartLocal] = useState(start);
  const [endLocal, setEndLocal] = useState(end);

  const setStartTimeArray = (start) => {
    // console.log('set start time ', start);
    var d = moment(`${moment(new Date()).format('ll')} 12:00 AM`)._d;
    if (moment(d).format('ll') == moment(start).format('ll')) {
      d = start;
    }
    let timeArray = [];
    for (let i = 0; i < 96; i++) {
      if (
        moment(d)
          .add(15 * i, 'minutes')
          .format('L') !== moment(d).format('L')
      ) {
        break;
      }
      let s = moment(d)
        .add(15 * i, 'minutes')
        .format('LT');

      let t = roundTime(s, 15);

      let ft = t + (s.substring(s.length - 3) === ' AM' ? ' AM' : ' PM');
      // console.log("time :",ft);
      timeArray.push(ft);
    }
    setStartTimeArr(timeArray);
  };

  const setEndTimeArray = (end) => {
    let timeArray = [];
    var d = moment(`${moment(new Date()).format('ll')} 12:00 AM`)._d;
    if (moment(d).format('ll') == moment(end).format('ll')) {
      d = end;
    }
    for (let i = 0; i < 96; i++) {
      if (
        moment(d)
          .add(15 * i, 'minutes')
          .format('L') !== moment(d).format('L')
      ) {
        break;
      }
      let ss = moment(d)
        .add(15 * i, 'minutes')
        .format('LT');

      let t = roundTime(ss, 15);
      let ft = t + (ss.substring(ss.length - 3) === ' AM' ? ' AM' : ' PM');
      timeArray.push(ft);
    }
    // console.log('end time arr:', timeArray);
    setEndTimeArr([...timeArray]);
  };

  useEffect(() => {
    // if(startDate){
    setStartTimeArray(startLocal);
    //  if(endDate){
    setEndTimeArray(endLocal);
    //  }
  }, []);

  $('.start-time-input').on('click', function () {
    $(this).val('');
  });
  $('.start-time-input').on('mouseleave', function () {
    if ($(this).val() == '') {
      $(this).val(moment(startLocal).format('LT'));
    }
  });
  $('.end-time-input').on('click', function () {
    $(this).val('');
  });
  $('.end-time-input').on('mouseleave', function () {
    if ($(this).val() == '') {
      // console.log('End Local : ', endLocal);
      $(this).val(moment(endLocal).format('LT'));
    }
  });

  useEffect(() => {
    setStartLocal(start);
    setEndLocal(end);
  }, [start, end]);

  return (
    <>
      <div className={`timepicker-row ${className}`}>
        <div className="timepicker">
          <p className="description">Start Date</p>
          <DatePicker
            disabled={startDisabled}
            clearIcon={null}
            value={new Date(startLocal)}
            minDate={new Date()}
            onChange={(value) => {
              let s = startLocal;
              setStartLocal(moment(`${moment(value).format('ll')} ${moment(s).format('LT')}`)._d);
              setStartTimeArray(
                moment(`${moment(value).format('ll')} ${moment(s).format('LT')}`)._d
              );
              if (duration === 'hourly') {
                onChange(
                  moment(`${moment(value).format('ll')} ${moment(s).format('LT')}`)._d,
                  moment(`${moment(value).format('ll')} ${moment(s).format('LT')}`).add(2, 'hour')
                    ._d
                );
                setEndLocal(
                  moment(`${moment(value).format('ll')} ${moment(s).format('LT')}`).add(2, 'hour')
                    ._d
                );
              } else if (duration === 'monthly') {
                onChange(
                  moment(`${moment(value).format('ll')} ${moment(s).format('LT')}`)._d,
                  moment(`${moment(value).format('ll')} ${moment(s).format('LT')}`)
                    .add(1, 'month')
                    .subtract(1, 'day')._d
                );
                setEndLocal(
                  moment(`${moment(value).format('ll')} ${moment(s).format('LT')}`)
                    .add(1, 'month')
                    .subtract(1, 'day')._d
                );
              }
            }}
          />
          <Form>
            <Form.Group
              controlId="exampleForm.SelectCustom"
              style={{ marginTop: '5px !important' }}>
              <Form.Label>Start Time</Form.Label>
              <input
                disabled={startDisabled}
                list="start-time"
                value={moment(startLocal).format('LT')}
                className="form-control start-time-input"
                placeholder="Start Time"
                onChange={(event) => {
                  setStartLocal(
                    moment(`${moment(startLocal).format('ll')} ${event.target.value}`)._d
                  );
                  if (duration === 'hourly') {
                    onChange(
                      moment(`${moment(startLocal).format('ll')} ${event.target.value}`)._d,
                      moment(`${moment(startLocal).format('ll')} ${event.target.value}`).add(
                        2,
                        'hour'
                      )._d
                    );
                    setEndLocal(
                      moment(`${moment(startLocal).format('ll')} ${event.target.value}`).add(
                        2,
                        'hour'
                      )._d
                    );
                    setEndTimeArray(
                      moment(`${moment(startLocal).format('ll')} ${event.target.value}`).add(
                        2,
                        'hour'
                      )._d
                    );
                  } else if (duration === 'monthly') {
                    onChange(
                      moment(`${moment(startLocal).format('ll')} ${event.target.value}`)._d,
                      moment(`${moment(startLocal).format('ll')} ${event.target.value}`)
                        .add(1, 'month')
                        .subtract(1, 'day')._d
                    );
                    setEndLocal(
                      moment(`${moment(startLocal).format('ll')} ${event.target.value}`)
                        .add(1, 'month')
                        .subtract(1, 'day')._d
                    );
                    setEndTimeArray(
                      moment(`${moment(startLocal).format('ll')} ${event.target.value}`)._d
                    );
                  }
                }}
              />
              <datalist id="start-time" hidden={false}>
                {startTimeArr.map((t) => (
                  <option value={t} />
                ))}
              </datalist>
            </Form.Group>
          </Form>
        </div>
        <div className="timepicker">
          <p className="description">End Date</p>

          <DatePicker
            disabled={endDisabled}
            clearIcon={null}
            value={new Date(endLocal)}
            minDate={new Date(startLocal)}
            onChange={(value) => {
              let e = endLocal;
              setEndLocal(moment(`${moment(value).format('ll')} ${moment(e).format('LT')}`)._d);
              setEndTimeArray(moment(`${moment(value).format('ll')} ${moment(e).format('LT')}`)._d);
              onChange(
                moment(`${moment(startLocal).format('ll')} ${moment(startLocal).format('LT')}`)._d,
                moment(`${moment(value).format('ll')} ${moment(e).format('LT')}`)._d
              );
            }}
          />
          <Form>
            <Form.Group
              controlId="exampleForm.SelectCustom mt-2"
              style={{ marginTop: '5px !important' }}>
              <Form.Label>End Time</Form.Label>

              <input
                disabled={endDisabled}
                list="end-time"
                value={moment(endLocal).format('LT')}
                className="form-control end-time-input"
                placeholder="End Time"
                onChange={(event) => {
                  let e = endLocal;
                  // console.log('end time val :', event.target.value);
                  setEndLocal(moment(`${moment(e).format('ll')} ${event.target.value}`)._d);
                  onChange(
                    moment(`${moment(startLocal).format('ll')} ${moment(startLocal).format('LT')}`)
                      ._d,
                    moment(`${moment(e).format('ll')} ${event.target.value}`)._d
                  );
                }}
              />
              <datalist id="end-time">
                {endTimeArr.map((t) => (
                  <option value={t} />
                ))}
              </datalist>
            </Form.Group>
          </Form>
        </div>
      </div>
      {/* {validated && !start && !end && (
        <p className='invalid-feedback-text'>
          Please select a start & end Time
        </p>
      )} */}
    </>
  );
};

const mapStateToProps = ({ findParking }) => ({
  findParking: findParking
});

export default connect(mapStateToProps)(StartEndDateTimePicker);
