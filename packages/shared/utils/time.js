import moment from 'moment';

const oneMinute = 60000;
const oneHour = 3600000;
const oneDay = 86400000;

export const convertToUnit = (value, unit) => {
  let newValue = 0;
  if (value === 0) {
    newValue = '';
  } else if (unit === 'Minutes') {
    newValue = value / oneMinute;
  } else if (unit === 'Hours') {
    newValue = value / oneHour;
  } else if (unit === 'Days') {
    newValue = value / oneDay;
  }
  return newValue;
};

export const convertToMilliseconds = (value, unit) => {
  let newValue = 0;
  if (value === '') {
    newValue = 0;
  } else if (unit === 'Minutes') {
    newValue = value * oneMinute;
  } else if (unit === 'Hours') {
    newValue = value * oneHour;
  } else if (unit === 'Days') {
    newValue = value * oneDay;
  }
  return parseInt(newValue);
};

export const timeTo12HrFormat = (hour, minute) => {
  let tempHour = hour;
  let meridiem = 'AM';
  if (hour >= 12) {
    meridiem = 'PM';
    if (hour > 12) {
      tempHour -= 12;
    }
  }
  return `${tempHour === '00' ? '12': tempHour}:${minute === 0 ? '00' : minute} ${meridiem}`;
};

export const getDateRange = (startDate, endDate) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  let sDate = new Date(startDate);
  let eDate = new Date(endDate);
  console.log(sDate.getDate());
  if (startDate !== '' && endDate !== '') {
    if (sDate.getMonth() === eDate.getMonth()) {
      return `${sDate.getDate()} - ${eDate.getDate()} ${monthNames[eDate.getMonth()]}`;
    } else {
      return `${sDate.getDate()} ${monthNames[sDate.getMonth()]} - ${eDate.getDate()} ${
        monthNames[eDate.getMonth()]
      }`;
    }
  } else {
    return `${new Date(startDate).getDate()} ${monthNames[new Date(startDate).getMonth()]}`;
  }
};

export function getRangeOfDates(startDate, stopDate) {
  var dateArray = [];
  var currentDate = moment(startDate);
  var stopDate = moment(stopDate);
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
}


export const saveDateAndTime = (startDate,endDate,startTime,endTime) =>{
  const st = new Date(startDate);
  const et = new Date(endDate);
  st.setHours(startTime.getHours())
  st.setMinutes(startTime.getMinutes())
  et.setHours(endTime.getHours())
  et.setMinutes(endTime.getMinutes())
  return {
    startTime:st.toString(),
    endTime:et.toString()
  }
}

export const changeToRoundOfDate = (newdate, hr = 0) => {
  const roundate = new Date(newdate);
  roundate.setHours(hr);
  roundate.setMinutes(0);
  return new Date(roundate);
};

export const changeToNewRoundOfDateTime = (newdate) => {
  const roundate = new Date(newdate);
  if(roundate.getMinutes() <= 15){
    roundate.setMinutes(15);
  }else if(roundate.getMinutes() > 15 && roundate.getMinutes() <= 30){
    roundate.setMinutes(30);
  }else if(roundate.getMinutes() > 30 && roundate.getMinutes() <=45){
    roundate.setMinutes(45);
  }else{
    roundate.setHours(roundate.getHours()+1);
    roundate.setMinutes(0);
  }
  return new Date(roundate);
};