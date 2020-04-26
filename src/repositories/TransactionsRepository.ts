import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initialValue = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balance = this.transactions.reduce((accumulated, transaction) => {
      const { income, outcome, total } = accumulated;

      const { type, value } = transaction;
      const isIncome = type === 'income';

      return {
        income: isIncome ? income + value : income,
        outcome: !isIncome ? outcome + value : outcome,
        total,
      };
    }, initialValue);

    return {
      ...balance,
      total: balance.income - balance.outcome,
    };
  }

  public create(data: CreateTransactionDTO): Transaction {
    const transaction = {
      ...data,
      id: uuid(),
    };

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
