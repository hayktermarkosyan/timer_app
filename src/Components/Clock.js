import React, {useState} from "react";

let interval;

const Clock = () => {

  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();

  const eventHandler = (eventDate) => {
    const countDownDate = new Date(eventDate).getTime();  
    
    localStorage.setItem('eventDate', eventDate);

    if(interval){
      clearInterval(interval);
    }

    interval = setInterval(() => {
      const now = new Date().getTime();

      let distance = countDownDate - now;

      if(distance < 0) {
        distance = 0;
      }

      // days
      distance = Math.floor(distance / 1000);
      let s = 60 * 60 * 24;
      let days = Math.floor(distance / s);

      // hours
      distance -= days * s;
      s = 60 * 60;
      let hours = Math.floor(distance / s);

      // minutes
      distance -= hours * s;
      s = 60;
      let minutes = Math.floor(distance / s);

      // seconds
      distance -= minutes * s;
      let seconds = Math.floor(distance);

      if (distance < 0) {
        // Stop Timer
        clearInterval(interval.current);
      } else if(isNaN(countDownDate) === false) {
        // Update Timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      } else if(isNaN(countDownDate)) {
        setTimerDays(0);
        setTimerHours(0);
        setTimerMinutes(0);
        setTimerSeconds(0);
      }
    }, 10);
  }

  if(localStorage.length === 1) {
    eventHandler(localStorage.getItem('eventDate'));
  }

  return (
      <div>
        <form className="setEventDate">
          <label htmlFor="eventDate">Date of Event:</label>
          <input 
            name="eventDate" 
            id="eventDate" 
            type="datetime-local"
            value={localStorage.getItem('eventDate')}
            onInput={(e) => {
              eventHandler(e.target.value);
              e.preventDefault();
            }}
          />
        </form>
        
        <div className="clock">
          <section>
            <p>{timerDays}</p>
            <small>Days</small>
          </section>     
          <span>:</span>
          <section>
            <p>{timerHours}</p>
            <small>Hours</small>
          </section>{" "}
          <span>:</span>
          <section>
            <p>{timerMinutes}</p>
            <small>Minutes</small>
          </section>{" "}
          <span>:</span>
          <section>
            <p>{timerSeconds}</p>
            <small>Seconds</small>
          </section>
        </div>
      </div>
  )
}           

export default Clock;