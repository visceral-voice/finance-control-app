const formated = Intl.NumberFormat('pt-BR');

function formatedNumbers(number) {
  return formated.format(number);
}

function formatedCurrency(number) {
  return number.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

export { formatedNumbers, formatedCurrency };
