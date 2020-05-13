import React, { useState, useEffect } from 'react';
import Form from './form.jsx';
import styles from './index.scss';

export default function Calendar() {
  const [now, setToNow] = useState(new Date());
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const storageDate = localStorage.getItem('date');
  const [demobilizationDate, setDemobilizationDate] = useState(storageDate || new Date(2020, 6, 29).getTime());
  const defRemainderMillion = demobilizationDate - now.getTime();
  const defR = Math.floor(defRemainderMillion / (1000 * 60 * 60 * 24));
  const [remainder, setRemainder] = useState(defR);

  let preS = 0;
  let preM = 0;

  preS = seconds < 10 ? 0 : '';
  preM = minutes < 10 ? 0 : '';

  function inputDate(event) {
    const furture = event.target.value.split('-', 3);
    const year = parseInt(furture[0], 10);
    const month = parseInt(furture[1], 10) - 1;
    const day = parseInt(furture[2], 10);
    const countdownDate = new Date(year, month, day).getTime();
    const distance = countdownDate - now.getTime();
    const remainderDays = Math.floor(distance / (1000 * 60 * 60 * 24));
    localStorage.setItem('date', countdownDate);
    return remainderDays;
  }

  const getRemainder = (event) => (isNaN(inputDate(event))
    ? setRemainder('--')
    : setRemainder(
      `${inputDate(event)}`,
    ));


  function tick() {
    setToNow(new Date());
    // setRemainder(
    //   Math.floor(
    //     (new Date(2020, 6, 29).getTime() - new Date().getTime())
    //     / (1000 * 60 * 60 * 24),
    //   ),
    // );
  }

  useEffect(() => {
    setInterval(() => tick(), 1000);
  }, []);

  return (
    <div className={styles.container}>
      <Form
        getRemainder={getRemainder}
      />
      <section className={styles.background}>
        <header />
        <div className={styles.page}>
          {now.getDate()}
        </div>
        <div className={styles.date}>
          {`${now.getMonth() + 1} / ${now.getFullYear()}`}
        </div>
        <footer>
          {`${now.getHours()}: ${preM}${minutes}: ${preS}${seconds}`}
        </footer>
      </section>
      <div className={styles.days}>{`離退伍還有 ${remainder} 天`}</div>
    </div>
  );
}
