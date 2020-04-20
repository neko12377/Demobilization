import React from 'react';
import styles from './index.scss';

export default function Form(props) {
  const { inputDate } = props;

  return (
    <form
      className={styles.form}
    >
      <input
        type="date"
        onChange={inputDate}
      />
    </form>
  );
}
