import React, { useState, useEffect } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import { Modal, Button, Nav, Form } from 'react-bootstrap';
import moment from 'moment';
import { roundTime } from '../../helpers/utilities';
import $ from 'jquery';

const CustomScheduleModal = ({ show, handleClose, handleSave }) => {
  const [activeType, setActiveType] = useState('single'); //multiple, range
  const [selectedDate, setSelectedDate] = useState([]);
  const [multipleDates, setMultipleDates] = useState([]);
  const [range, setRange] = useState({ from: null, to: null });

  const [startTimeArr, setStartTimeArr] = useState([]);
  const [endTimeArr, setEndTimeArr] = useState([]);

  const setStartTimeArray = (start) => {
    console.log('set start time ', start);
    var d = moment(`${moment(new Date()).format('ll')} 12:00 AM`)._d;
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
    // if(moment(d).format('ll')==moment(end).format('ll')){
    //   d=end;
    // }
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
    console.log('end time arr:', timeArray);
    setEndTimeArr([...timeArray]);
  };

  // $('.single-start-time-input').on('click', function() {
  //   $(this).val('');
  // });
  // $('.single-start-time-input').on('mouseleave', function() {
  //   if ($(this).val() == '') {
  //     $(this).val(moment(selectedDate[0]).format('LT'));
  //   }
  // });
  // $('.multiple-start-time-input').on('click', function() {
  //   $(this).val('');
  // });
  // $('.multiple-start-time-input').on('mouseleave', function() {
  //   if ($(this).val() == '') {
  //     $(this).val(moment(multipleDates[0]).format('LT'));
  //   }
  // });

  if (document.querySelector('.single-start-time-input')) {
    document.querySelector('.single-start-time-input').addEventListener('click', function () {
      document.querySelector('.single-start-time-input').value = '';
    });
  }
  if (document.querySelector('.single-start-time-input')) {
    document.querySelector('.single-start-time-input').addEventListener('mouseleave', function () {
      if (document.querySelector('.single-start-time-input').value == '') {
        if (moment(selectedDate[0]).format('LT') === 'Invalid date') {
          document.querySelector('.single-start-time-input').value = '';
        } else {
          document.querySelector('.single-start-time-input').value = moment(selectedDate[0]).format(
            'LT'
          );
        }
      }
    });
  }

  if (document.querySelector('.multiple-start-time-input')) {
    document.querySelector('.multiple-start-time-input').addEventListener('click', function () {
      document.querySelector('.multiple-start-time-input').value = '';
    });
  }
  if (document.querySelector('.multiple-start-time-input')) {
    document
      .querySelector('.multiple-start-time-input')
      .addEventListener('mouseleave', function () {
        if (document.querySelector('.multiple-start-time-input').value == '') {
          if (moment(multipleDates[0][0]).format('LT') === 'Invalid date') {
            document.querySelector('.multiple-start-time-input').value = '';
          } else {
            document.querySelector('.multiple-start-time-input').value = moment(
              multipleDates[0][0]
            ).format('LT');
          }
        }
      });
  }

  if (document.querySelector('.range-start-time-input')) {
    document.querySelector('.range-start-time-input').addEventListener('click', function () {
      document.querySelector('.range-start-time-input').value = '';
    });
  }
  if (document.querySelector('.range-start-time-input')) {
    document.querySelector('.range-start-time-input').addEventListener('mouseleave', function () {
      if (document.querySelector('.range-start-time-input').value == '') {
        if (moment(range.from).format('LT') === 'Invalid date') {
          document.querySelector('.range-start-time-input').value = '';
        } else {
          document.querySelector('.range-start-time-input').value = moment(range.from).format('LT');
        }
      }
    });
  }
  // $('.range-start-time-input').on('mouseleave', function() {
  //   if ($(this).val() == '') {
  //     $(this).val(moment(range.from).format('LT'));
  //   }
  // });

  $('.single-end-time-input').on('click', function () {
    $(this).val('');
  });
  $('.single-end-time-input').on('mouseleave', function () {
    if ($(this).val() == '') {
      // console.log("End Local : ",endLocal);
      if (moment(selectedDate[1]).format('LT') === 'Invalid date') {
        $(this).val('');
      } else {
        $(this).val(moment(selectedDate[1]).format('LT'));
      }
    }
  });

  $('.multiple-end-time-input').on('click', function () {
    $(this).val('');
  });
  $('.multiple-end-time-input').on('mouseleave', function () {
    if ($(this).val() == '') {
      // console.log("End Local : ",endLocal);
      if (moment(multipleDates[0][1]).format('LT') === 'Invalid date') {
        $(this).val('');
      } else {
        $(this).val(moment(multipleDates[0][1]).format('LT'));
      }
    }
  });

  $('.range-end-time-input').on('click', function () {
    $(this).val('');
  });
  $('.range-end-time-input').on('mouseleave', function () {
    if ($(this).val() == '') {
      if (moment(range.to).format('LT') === 'Invalid date') {
        $(this).val('');
      } else {
        $(this).val(moment(range.to).format('LT'));
      }
    }
  });

  const handleSingleDateSelect = (day, { selected }) => {
    // console.log('selected date : ', selectedDate);
    setSelectedDate(
      selected
        ? []
        : [new Date(new Date(day).setHours(0, 0, 0)), new Date(new Date(day).setHours(23, 59, 59))]
    );
  };

  const handleMultipleDateSelect = (day, { selected }) => {
    setMultipleDates([
      ...multipleDates,
      [new Date(new Date(day).setHours(0, 0, 0)), new Date(new Date(day).setHours(23, 59, 59))]
    ]);
    // console.log(multipleDates);
    // console.log(day);
    // console.log('selected', selected);
    // if (selected) {
    //   const selectedIndex = multipleDates.filter((selectedDay) =>
    //     DateUtils.isSameDay(selectedDay[1], day)
    //   );
    //   if (selectedIndex.length > 0) {
    //     setMultipleDates(
    //       multipleDates.filter((selectedDay) => !DateUtils.isSameDay(selectedDay[1], day))
    //     );
    //   }
    // } else {
    //   setMultipleDates([...multipleDates, [day, day]]);
    // }
  };

  const handleRangeSelect = (day) => {
    // console.log('range', range);
    const r = DateUtils.addDayToRange(day, range);
    // console.log('r', r);
    setRange({
      from: new Date(new Date(r.from).setHours(0, 0, 0)),
      to: new Date(new Date(r.to).setHours(23, 59, 59))
    });
    // console.log('range', range);
  };

  const checkValidity = () => {
    if (!multipleDates[0][0] || !multipleDates[0][1]) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmitHandler = () => {
    if (activeType == 'single') {
      if (selectedDate.length == 0 || !selectedDate[0]) {
        alert('Please select a date');
      } else {
        handleSave([{ startDate: selectedDate[0], endDate: selectedDate[1] }]);
        handleClose();
      }
    } else if (activeType == 'multiple') {
      if (multipleDates.length == 0) {
        alert('Please select dates');
      } else {
        if (!checkValidity()) {
          alert('Please select start & end time');
        } else {
          // console.log(multipleDates.map((item) => [item[0], item[1]]));
          handleSave(multipleDates.map((item) => ({ startDate: item[0], endDate: item[1] })));
          handleClose();
        }
      }
    } else if (activeType == 'range') {
      if (!range) {
        alert('Please select a range');
      } else if (range.to && !range.from) {
        alert('Please select start of range');
      } else if (range.from && !range.to) {
        alert('Please select end of range');
      } else {
        handleSave([{ startDate: range.from, endDate: range.to }]);
        handleClose();
      }
    }
  };

  useEffect(() => {
    setStartTimeArray(new Date());
    setEndTimeArray(new Date());
  }, []);

  const { from, to } = range;
  const modifiers = { start: from, end: to };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Time Range</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Nav
          variant="pills"
          activeKey={activeType}
          style={{ display: 'flex', justifyContent: 'center' }}>
          <Nav.Item>
            <Nav.Link
              eventKey="single"
              onClick={() => {
                setActiveType('single');
              }}>
              Single
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="multiple"
              onClick={() => {
                setActiveType('multiple');
              }}>
              Multiple
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="range"
              onClick={() => {
                setActiveType('range');
              }}>
              Range
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {activeType == 'single' && (
          <>
            <DayPicker selectedDays={selectedDate} onDayClick={handleSingleDateSelect} />
            {selectedDate[0] && (
              <Form>
                <Form.Group
                  controlId="exampleForm.SelectCustom"
                  style={{ marginTop: '5px !important' }}>
                  <Form.Label>Start Time</Form.Label>
                  <input
                    list="single-start-time"
                    value={
                      moment(selectedDate[0]).format('LT') === 'Invalid date'
                        ? ''
                        : moment(selectedDate[0]).format('LT')
                    }
                    className="form-control single-start-time-input"
                    placeholder="Start Time"
                    onChange={(event) => {
                      console.log(
                        'start time :',
                        moment(event.target.value, 'LT').isValid(),
                        selectedDate[0],
                        event.target.value,
                        moment(
                          `${moment(selectedDate[0]).format('ll')} ${event.target.value}`,
                          'lll'
                        )._d
                      );
                      if (moment(event.target.value, 'LT').isValid()) {
                        setSelectedDate([
                          moment(
                            `${moment(selectedDate[0]).format('ll')} ${event.target.value}`,
                            'lll'
                          )._d,
                          moment(
                            `${moment(selectedDate[0]).format('ll')} ${event.target.value}`,
                            'lll'
                          ).add(1, 'hour')._d
                        ]);
                      }
                    }}
                  />
                  <datalist id="single-start-time" hidden={false}>
                    {startTimeArr.map((t) => (
                      <option value={t} />
                    ))}
                  </datalist>
                </Form.Group>

                <Form.Group
                  controlId="exampleForm.SelectCustom mt-2"
                  style={{ marginTop: '5px !important' }}>
                  <Form.Label>End Time</Form.Label>

                  <input
                    list="single-end-time"
                    value={
                      moment(selectedDate[1]).format('LT') === 'Invalid date'
                        ? ''
                        : moment(selectedDate[1]).format('LT')
                    }
                    className="form-control single-end-time-input"
                    placeholder="End Time"
                    onChange={(event) => {
                      setSelectedDate([
                        selectedDate[0],
                        moment(
                          `${moment(selectedDate[1]).format('ll')} ${event.target.value}`,
                          'lll'
                        )._d
                      ]);
                    }}
                  />
                  <datalist id="single-end-time">
                    {endTimeArr.map((t) => (
                      <option value={t} />
                    ))}
                  </datalist>
                </Form.Group>
              </Form>
            )}
          </>
        )}

        {activeType == 'multiple' && (
          <>
            {' '}
            <DayPicker
              selectedDays={[].concat(...multipleDates)}
              onDayClick={handleMultipleDateSelect}
            />
            {multipleDates.length > 0 && (
              <Form>
                <Form.Group
                  controlId="exampleForm.SelectCustom"
                  style={{ marginTop: '5px !important' }}>
                  <Form.Label>Start Time</Form.Label>
                  <input
                    list="multiple-start-time"
                    value={
                      moment(multipleDates[0][0]).format('LT') === 'Invalid date'
                        ? ''
                        : moment(multipleDates[0][0]).format('LT')
                    }
                    className="form-control multiple-start-time-input"
                    placeholder="Start Time"
                    onChange={(event) => {
                      setMultipleDates(
                        multipleDates.map((item) => [
                          moment(`${moment(item[0]).format('ll')} ${event.target.value}`, 'lll')._d,
                          item[1]
                        ])
                      );
                    }}
                  />
                  <datalist id="multiple-start-time" hidden={false}>
                    {startTimeArr.map((t) => (
                      <option value={t} />
                    ))}
                  </datalist>
                </Form.Group>

                <Form.Group
                  controlId="exampleForm.SelectCustom mt-2"
                  style={{ marginTop: '5px !important' }}>
                  <Form.Label>End Time</Form.Label>

                  <input
                    list="multiple-end-time"
                    value={
                      moment(multipleDates[0][1]).format('LT') === 'Invalid date'
                        ? ''
                        : moment(multipleDates[0][1]).format('LT')
                    }
                    className="form-control multiple-end-time-input"
                    placeholder="End Time"
                    onChange={(event) => {
                      setMultipleDates(
                        multipleDates.map((item, index) => [
                          item[0],
                          moment(`${moment(item[1]).format('ll')} ${event.target.value}`, 'lll')._d
                        ])
                      );
                    }}
                  />
                  <datalist id="multiple-end-time">
                    {endTimeArr.map((t) => (
                      <option value={t} />
                    ))}
                  </datalist>
                </Form.Group>
              </Form>
            )}
          </>
        )}

        {activeType == 'range' && (
          <>
            <DayPicker
              className="Selectable"
              numberOfMonths={1}
              selectedDays={[from, { from, to }]}
              modifiers={modifiers}
              onDayClick={handleRangeSelect}
            />
            {from && to && (
              <Form>
                <Form.Group
                  controlId="exampleForm.SelectCustom"
                  style={{ marginTop: '5px !important' }}>
                  <Form.Label>Start Time</Form.Label>
                  <input
                    list="range-start-time"
                    value={
                      moment(from).format('LT') === 'Invalid date' ? '' : moment(from).format('LT')
                    }
                    className="form-control range-start-time-input"
                    placeholder="Start Time"
                    onChange={(event) => {
                      console.log(event.target.value, from);
                      setRange({
                        from: moment(`${moment(from).format('ll')} ${event.target.value}`, 'lll')
                          ._d,
                        to: moment(`${moment(to).format('ll')} ${event.target.value}`, 'lll')._d
                      });
                    }}
                  />
                  <datalist id="range-start-time" hidden={false}>
                    {startTimeArr.map((t) => (
                      <option value={t} />
                    ))}
                  </datalist>
                </Form.Group>

                <Form.Group
                  controlId="exampleForm.SelectCustom mt-2"
                  style={{ marginTop: '5px !important' }}>
                  <Form.Label>End Time</Form.Label>
                  <input
                    list="range-end-time"
                    value={
                      moment(to).format('LT') === 'Invalid date' ? '' : moment(to).format('LT')
                    }
                    className="form-control range-end-time-input"
                    placeholder="End Time"
                    onChange={(event) => {
                      setRange({
                        ...range,
                        to: moment(`${moment(to).format('ll')} ${event.target.value}`)._d
                      });
                    }}
                  />
                  <datalist id="range-end-time">
                    {endTimeArr.map((t) => (
                      <option value={t} />
                    ))}
                  </datalist>
                </Form.Group>
              </Form>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSubmitHandler}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomScheduleModal;
