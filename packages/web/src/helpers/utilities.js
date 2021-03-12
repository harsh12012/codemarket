//convert 24 hr timing to 12 hr am pm
export function convertTo12hrformat(time24) {
  var ts = time24;
  var H = +ts.substr(0, 2);
  var h = H % 12 || 12;
  h = h < 10 ? '0' + h : h; // leading 0 at the left for 1 digit hours
  var ampm = H < 12 ? ' AM' : H == 24 ? ' AM' : ' PM';
  ts = h + ts.substr(2, 3) + ampm;
  return ts;
}

//round off time to nearest 15 mins
export const roundTime = (time, minutesToRound) => {

  let [hours, minutes] = time.split(':');
  hours = parseInt(hours);
  minutes = parseInt(minutes);

  // Convert hours and minutes to time in minutes
  time = (hours * 60) + minutes; 

  let rounded = Math.ceil(time / minutesToRound) * minutesToRound;
  let rHr = ''+Math.floor(rounded / 60)
  let rMin = ''+ rounded % 60

  return rHr.padStart(2, '0')+':'+rMin.padStart(2, '0')
}