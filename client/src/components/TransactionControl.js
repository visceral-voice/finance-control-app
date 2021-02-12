import React, { useState } from 'react';
import ResumeTransactions from './ResumeTransactions';
import { formatedCurrency } from '../Helpers/HelpersFormated';

import css from './TransactionControl.module.css';
import Action from './Action';

export default function TransactionControl({
  transactions,
  onDelete,
  onPersist,
  onFilter,
}) {
  const [textSearch, setTextSearch] = useState('');
  const handleActionClick = (id, type) => {
    const transaction = transactions.find(
      (transaction) => transaction._id === id
    );
    if (type === 'delete') {
      onDelete(transaction);
      return;
    }
    onPersist(transaction, type);
  };

  const handleInputEntry = (event) => {
    const filter = event.currentTarget.value;
    setTextSearch(filter);
    onFilter(filter);
  };

  return (
    <div className="container center">
      <table className={css.table}>
        <thead>
          <tr>
            <th colSpan="3">
              <ResumeTransactions transactions={transactions} />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr key="1">
            <td colSpan="3">
              <div className={css.newFilter}>
                <button
                  className="btn"
                  style={{ width: '220px' }}
                  onClick={handleActionClick}
                  disabled={textSearch.length > 0}
                >
                  + Novo Lançamento
                </button>
                <input
                  id="filterDescrition"
                  type="text"
                  style={{ width: '700px' }}
                  onChange={handleInputEntry}
                  placeholder="Filtro"
                />
              </div>
            </td>
          </tr>
          {transactions.map(
            ({ _id, type, description, value, day, category }) => {
              const tdStyles = type === '+' ? css.tdReceita : css.tdDespesa;
              return (
                <tr key={_id} className={tdStyles}>
                  <td className={css.flexRow}>
                    <span className={css.day}>
                      {day < 10 ? `0${day}` : day}
                    </span>
                    <div className={css.flexCol}>
                      <span className={css.category}>{category}</span>
                      {description}
                    </div>
                  </td>
                  <td className={css.value}>{formatedCurrency(value)}</td>
                  <td align="center">
                    <div className={css.icons}>
                      <Action
                        type="edit"
                        id={_id}
                        onActionClick={handleActionClick}
                      />

                      <Action
                        type="delete"
                        id={_id}
                        onActionClick={handleActionClick}
                      />
                    </div>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
        <tfoot>
          <tr>
            <td width="70%">&nbsp;</td>
            <td width="20%">&nbsp;</td>
            <td width="10%">&nbsp;</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
