import React, { useState, useEffect } from 'react';
import { timeTo12HrFormat } from '@parkyourself-frontend/shared/utils/time';
import { ArrowRight, Clock } from 'react-feather';

import DatePicker from 'react-date-picker/dist/entry.nostyle';
import moment from 'moment';
import { Form } from 'react-bootstrap';
import $ from 'jquery';
import { connect } from 'react-redux';
import { roundTime } from '../../../../helpers/utilities';

export default function StartEndTimePicker({
  day = '',
  startHour = 9,
  startMinute = 30,
  endHour = 9,
  endMinute = 30,
  showTimeModal,
  onChange={},
  onStartChange={},
  onEndChange={}

}) {

  let start = new Date()
  start.setDate(start.getDate() - 1)
  start.setHours(startHour)
  start.setMinutes(startMinute)

  let end = new Date()
  end.setHours(endHour)
  end.setMinutes(endMinute)

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
  }, []);

  return (
    <div className="d-flex justify-content-around align-items-lg-center mb-4 mt-1">
      <div className="text-center">
       
        <span
          className="cursor-pointer font-weight-bold"
        >
          {/* <Clock size={20} className="mt-n1 mr-1" /> */}
          <Form>
          <Form.Label>
              Start Time
            </Form.Label>
            <Form.Group
              controlId="exampleForm.SelectCustom"
              style={{ marginTop: '5px !important' }}>
              <input
     
                list="start-time"
                value={moment(startLocal).format('LT')}
                className="form-control start-time-input"
                placeholder="Start Time"
                onChange={(event) => {
                  setStartLocal(
                    moment(`${moment(startLocal).format('ll')} ${event.target.value}`)._d
                  );

                    onStartChange(
                      moment(`${moment(startLocal).format('ll')} ${event.target.value}`)._d
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
                  
                }}
              />
              <datalist id="start-time" hidden={false}>
                {startTimeArr.map((t) => (
                  <option value={t} />
                ))}
              </datalist>
            </Form.Group>
          </Form>
        </span>
      </div>
      <ArrowRight size={20} />
      <div className="text-center">
       
        <span
          className="cursor-pointer font-weight-bold"
         >
          {/* <Clock size={20} className="mt-n1 mr-1" /> */}
          <Form>
            <Form.Label>
              End Time
            </Form.Label>
            <Form.Group
              controlId="exampleForm.SelectCustom mt-2"
              style={{ marginTop: '5px !important' }}>
              <input
   
                list="end-time"
                value={moment(endLocal).format('LT')}
                className="form-control end-time-input"
                placeholder="End Time"
                onChange={(event) => {
                  let e = endLocal;
                  // console.log('end time val :', event.target.value);
                  setEndLocal(moment(`${moment(e).format('ll')} ${event.target.value}`)._d);
                  onEndChange(
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
        </span>
      </div>
    </div>
  );
}
