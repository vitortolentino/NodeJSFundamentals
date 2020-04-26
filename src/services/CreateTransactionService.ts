import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    const shouldNotCreateTransaction = type === 'outcome' && value > total;

    if (shouldNotCreateTransaction) {
      throw Error("The value can't be greater than income value");
    }

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
