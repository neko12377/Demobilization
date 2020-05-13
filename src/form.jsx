import React from 'react';
import styles from './index.scss';

export default function Form({ getRemainder }) {
  return (
    <form
      className={styles.form}
    >
      <input
        type="date"
        onChange={getRemainder}
      />
    </form>
  );
}
