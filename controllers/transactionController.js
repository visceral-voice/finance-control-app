import { TransactionModel } from '../models/TransactionModel.js';

const search = async (req, res) => {
  const period = req.query.period;
  const description = req.query.description;
  if (!period) {
    res.status(400).send({
      message:
        'É necessário informar o parâmetro /period/, cujo valor deve estar no formato yyyy-mm ',
    });
  }
  try {
    const interval = await TransactionModel.find({ yearMonth: period });

    if (interval.length > 0) {
      if (description !== undefined) {
        const filtered = interval.filter((transaction) =>
          new RegExp(description).test(transaction.description)
        );
        res.send(filtered);
      } else {
        res.send(interval);
      }
    } else {
      res.status(500).send({
        message: 'Nenhuma informação encontrada!',
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Nenhuma informação encontrada!',
    });
  }
};

const insert = async (req, res) => {
  try {
    const transaction = new TransactionModel(req.body);
    await transaction.save();
    res.send(transaction);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualização vazio',
    });
  }

  const id = req.params.id;
  try {
    const transaction = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.send(transaction);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Erro ao atualizar a transação id: ' + id });
  }
};

const erase = async (req, res) => {
  const id = req.params.id;
  try {
    const transaction = await TransactionModel.findByIdAndDelete({ _id: id });
    if (!transaction) {
      res
        .status(400)
        .send({ message: 'Nao foi possivel deletar a transação id: ' + id });
    } else {
      res.status(200).send('Transação excluida');
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar a transação id: ' + id });
  }
};

export default { search, insert, update, erase };
