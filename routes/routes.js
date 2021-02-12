import express from 'express';
import controller from '../controllers/transactionController.js';

const transactionRouter = express.Router();

transactionRouter.get('/:period', controller.search);
transactionRouter.get('/', controller.search);
transactionRouter.patch('/:id', controller.update);
transactionRouter.put('/:id', controller.update);
transactionRouter.delete('/:id', controller.erase);
transactionRouter.post('/', controller.insert);

export default transactionRouter;
