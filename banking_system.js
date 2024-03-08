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

  async deposit(amount) {
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

  async withdraw(amount) {
    try {
      if (amount <= 0 || typeof amount != 'number') {
        throw new Error('invalid amount to withdraw');
      } else if (amount > this.#balance) {
        throw new Error(
          `balance insufficient to withdraw with amount ${amount}`,
        );
      }

      this.#balance -= amount;
      return `success: withdrawn ${amount} from account`;
    } catch (error) {
      return `error: ${error.message}`;
    }
  }
}

const myAccount = new BankAccount('Rama Astra');

setTimeout(async () => {
  const depositInfo = await myAccount.deposit(100000);
  console.log(depositInfo);
}, 1000);

setTimeout(async () => {
  const withdrawInfo = await myAccount.withdraw(50000);
  console.log(withdrawInfo);
}, 1000);

setTimeout(() => {
  console.log(myAccount.getAccountInfo());
}, 1000);
