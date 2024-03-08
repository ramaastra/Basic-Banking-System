class BankAccount {
  constructor(customerName) {
    this.customerName = customerName;
    this.setAccountNumber();
    this.#balance = 0;
  }

  #accountNumber;
  #balance;

  setAccountNumber() {
    const accountNumber = Math.floor(100000 + Math.random() * 900000);
    this.#accountNumber = accountNumber;
  }

  getAccountInfo() {
    return {
      'Account Number': this.#accountNumber,
      'Customer Name': this.customerName,
      'Current Balance': this.#balance,
    };
  }

  deposit(amount) {
    try {
      if (amount <= 0 || typeof amount != 'number') {
        throw new Error('invalid amount to deposit');
      }

      this.#balance += amount;
      return `success: deposit with amount ${amount} added to account`;

    } catch (error) {
      return `error: ${error.message}`;
    }
  }

  withdraw(amount) {
    try {
      if (amount <= 0 || typeof amount != 'number') {
        throw new Error('invalid amount to withdraw');
      } else if (amount > this.#balance) {
        throw new Error(`balance insufficient to withdraw with amount ${amount}`);
      }

      this.#balance -= amount;
      return `success: withdrawed ${amount} from account`;

    } catch (error) {
      return `error: ${error.message}`;
    }
  }
}

const myAccount = new BankAccount(customerName='Rama Astra');

const depositInfo = myAccount.deposit(100000);
console.log(depositInfo);

const withdrawInfo = myAccount.withdraw(50000);
console.log(withdrawInfo);

console.log(myAccount.getAccountInfo());
