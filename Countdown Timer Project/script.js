const days = document.getElementById('days')
const hours = document.getElementById('hours')
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
const birthday = '25 Jan 2023'; //targetDate

function countdown() {
  const birthDate = new Date(birthday)
  const current_Date = new Date();

  const remainder = (birthDate - current_Date) / 1000;
  const days_left = Math.floor(remainder / 3600 / 24);
  const hours_left = Math.floor(remainder / 3600) % 24;
  const minutes_left = (Math.floor(remainder / 60) % 60);
  const seconds_left = Math.floor(remainder % 60);

  days.innerHTML = days_left;
  hours.innerHTML = setTime(hours_left);
  minutes.innerHTML = setTime(minutes_left);
  seconds.innerHTML = setTime(seconds_left);

}

function setTime(time) {
  return time < 10 ? (`0${time}`) : time;
}
countdown();

setInterval(countdown, 1000); //calls the countdown function every second

