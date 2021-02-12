import React, { useState, useEffect } from 'react';
import SelectFilter from './components/SelectFilter';
import * as api from './api/ApiService';
import TransactionControl from './components/TransactionControl';
import ModalTransaction from './components/ModalTransaction';

export default function App() {
  const [yearMonth, setYearMonth] = useState('');
  const [action, setAction] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [initTransactions, setInitTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let today = new Date();
    const YearMonth =
      (today.getMonth() + 1).toString() + today.getFullYear().toString();
    setYearMonth(YearMonth);
    searchTransactions(YearMonth);
  }, []);

  async function searchTransactions(YearMonth) {
    const transaction = await api.getFilterTransactions(YearMonth);
    setTransactions(transaction);
    setInitTransactions(transaction);
  }
  const handleSelectChange = (newValue) => {
    setYearMonth(newValue);
    searchTransactions(newValue);
  };

  const handleDelete = async (transactionToDelete) => {
    const isDeleted = await api.deleteTransaction(transactionToDelete);
    if (isDeleted) {
      searchTransactions(yearMonth);
    }
  };

  const handleModalPersist = async (transactionToPersist, action) => {
    setSelectedTransaction(transactionToPersist);
    setAction(action);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handlePersistData = async (formData, action) => {
    if (action === 'edit') {
      await api.updateTransaction(formData);
    } else {
      await api.createTransaction(formData);
    }

    setIsModalOpen(false);
    searchTransactions(yearMonth);
  };

  const handleInputFilter = (filter) => {
    //const filterTransactions = [...initTransactions];
    const filterTransactions = initTransactions.map(
      ({
        _id,
        description,
        value,
        category,
        year,
        month,
        day,
        yearMonth,
        yearMonthDay,
        type,
      }) => {
        return {
          _id,
          description,
          value,
          category,
          year,
          month,
          day,
          yearMonth,
          yearMonthDay,
          type,
          filtered: description.toLowerCase(),
        };
      }
    );

    const transaction = filterTransactions.filter((transaction) =>
      new RegExp(filter).test(transaction.description)
    );
    setTransactions(transaction);
  };

  return (
    <div className="center">
      <h5>
        <b>Bootcamp Full Stack - Desafio Final</b>
      </h5>
      <h5>Controle Financeiro Pessoal</h5>
      <div className="center">
        <SelectFilter YearMonth={yearMonth} onChange={handleSelectChange} />
      </div>
      <TransactionControl
        transactions={transactions}
        onDelete={handleDelete}
        onPersist={handleModalPersist}
        onFilter={handleInputFilter}
      />
      {isModalOpen && (
        <ModalTransaction
          onSave={handlePersistData}
          onClose={handleClose}
          selectedTransaction={selectedTransaction}
          action={action}
        />
      )}
    </div>
  );
}
