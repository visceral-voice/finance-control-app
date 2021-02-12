import axios from 'axios';

const CONST_YEARS = [2019, 2020, 2021];
const CONST_MONTHS = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

function yearMonthDisplay(filterMonthYear) {
  let displays = '';
  if (filterMonthYear.length === 6) {
    displays = `${
      CONST_MONTHS[filterMonthYear.substring(0, 2) - 1]
    }/${filterMonthYear.substring(2)}`;
  } else {
    displays = `${
      CONST_MONTHS[filterMonthYear.substring(0, 1) - 1]
    }/${filterMonthYear.substring(1)}`;
  }
  return displays;
}

const API_URL = 'http://localhost:3001/api/transaction';

async function getFilterTransactions(filterMonthYear) {
  let filterMonth = '';
  let filterYear = '';

  if (filterMonthYear.length === 6) {
    filterMonth = filterMonthYear.substring(0, 2);
    filterYear = filterMonthYear.substring(2);
  } else {
    filterMonth = filterMonthYear.substring(0, 1);
    filterMonth = '0' + filterMonth;
    filterYear = filterMonthYear.substring(1);
  }

  const res = await axios.get(`${API_URL}?period=${filterYear}-${filterMonth}`);
  const filterTransactions = res.data;

  filterTransactions.sort((a, b) => a.day - b.day);
  filterTransactions.sort((a, b) => a.month - b.month);
  filterTransactions.sort((a, b) => a.year - b.year);

  return filterTransactions;
}

async function deleteTransaction(transaction) {
  const res = await axios.delete(`${API_URL}/${transaction._id}`);
  return res;
}

async function updateTransaction(transaction) {
  const res = await axios.put(`${API_URL}/${transaction._id}`, transaction, {
    'Content-Type': 'application/json',
  });
  return res;
}

async function createTransaction(transaction) {
  const res = await axios.post(API_URL, transaction, {
    'Content-Type': 'application/json',
  });
  return res;
}

export {
  CONST_YEARS,
  CONST_MONTHS,
  getFilterTransactions,
  yearMonthDisplay,
  updateTransaction,
  deleteTransaction,
  createTransaction,
};
