import React from 'react';
import TotalCont from './TotalCont';
import { formatedNumbers, formatedCurrency } from '../Helpers/HelpersFormated';

export default function ResumeTransactions({ transactions }) {
  const contTransactions = transactions.length;
  let totalReceitas = 0;
  let totalDespesas = 0;
  transactions.forEach((transaction) => {
    if (transaction.type === '+') {
      totalReceitas = totalReceitas + transaction.value;
    } else {
      totalDespesas = totalDespesas + transaction.value;
    }
  });
  const totalResult = totalReceitas - totalDespesas;
  const green = 'Green';
  const red = 'Red';
  return (
    <div style={styles.flexRow}>
      <TotalCont
        textContent="Lançamentos"
        countContent={formatedNumbers(contTransactions)}
        contColor="Black"
      />
      <TotalCont
        textContent="Receitas"
        countContent={formatedCurrency(totalReceitas)}
        contColor={green}
      />
      <TotalCont
        textContent="Despesas"
        countContent={formatedCurrency(totalDespesas)}
        contColor={red}
      />
      <TotalCont
        textContent="Saldo"
        countContent={formatedCurrency(totalResult)}
        contColor={totalResult < 0 ? red : green}
      />
    </div>
  );
}

const styles = {
  flexRow: {
    paddingLeft: '10px',
    paddingRight: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItens: 'center',
    border: '1px solid gray',
    borderRadius: '8px',
    justifyContent: 'space-between',
  },
};
