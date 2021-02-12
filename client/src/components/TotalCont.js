import React from 'react';

export default function TotalCont({ textContent, countContent, contColor }) {
  let styleColor = '';
  if (contColor === 'Blue') {
    styleColor = styles.textBlue;
  }
  if (contColor === 'Green') {
    styleColor = styles.textGreen;
  }
  if (contColor === 'Red') {
    styleColor = styles.textRed;
  }
  if (contColor === 'Black') {
    styleColor = styles.textBlack;
  }
  return (
    <div>
      <span style={styles.textHead}> {textContent}: </span>
      <span style={styleColor}> {countContent} </span>
    </div>
  );
}

const styles = {
  textHead: {
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  textBlue: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: 'Blue',
  },
  textGreen: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: 'Green',
  },
  textRed: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: 'Red',
  },
  textBlack: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: 'Black',
  },
};
