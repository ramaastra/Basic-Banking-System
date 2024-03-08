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
      accountNumber: this.#accountNumber,
      customerName: this.customerName,
      balance: this.#balance
    };
  }

  async deposit(amount) {
    try {
      if (amount <= 0 || typeof amount != 'number') {
        throw new Error('Jumlah deposit invalid');
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.#balance += amount;
      return 'success';
    } catch (error) {
      return `Penarikan Gagal:\n${error.message}`;
    }
  }

  async withdraw(amount) {
    try {
      if (amount <= 0 || typeof amount != 'number') {
        throw new Error('Jumlah penarikan invalid');
      } else if (amount > this.#balance) {
        throw new Error(
          `Saldo tidak mencukupi untuk penarikan dengan jumlah Rp${amount}`
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.#balance -= amount;
      return 'success';
    } catch (error) {
      return `Penarikan Gagal:\n${error.message}`;
    }
  }
}

const customerName = window.prompt(
  '====== Selamat Datang di Bank Binarian! ======\n' +
    'Masukkan nama Anda untuk membuat rekening bank'
);

const customerAccount = new BankAccount(customerName);
const customerAccountInfo = customerAccount.getAccountInfo();
window.alert(
  'Rekening berhasil dibuat:\n' +
    `- Nomor Rekening: ${customerAccountInfo.accountNumber}\n` +
    `- Nama Nasabah: ${customerAccountInfo.customerName}\n` +
    `- Saldo Saat Ini: Rp${customerAccountInfo.balance}\n`
);

async function main() {
  let selectedMenu;
  do {
    const input = window.prompt(
      '=== Selamat Datang di Bank Binarian! ===\n' +
        'Silahkan input angka:\n' +
        '  1. Info rekening\n' +
        '  2. Deposit\n' +
        '  3. Tarik tunai\n' +
        '  4. Keluar\n'
    );

    selectedMenu = parseInt(input);
    switch (selectedMenu) {
      case 1:
        const customerAccountInfo = customerAccount.getAccountInfo();
        window.alert(
          'Informasi rekening:\n' +
            `- Nomor Rekening: ${customerAccountInfo.accountNumber}\n` +
            `- Nama Nasabah: ${customerAccountInfo.customerName}\n` +
            `- Saldo Saat Ini: Rp${customerAccountInfo.balance}\n`
        );
        break;
      case 2:
        const depositAmount = window.prompt('Masukkan jumlah deposit');
        const depositInfo = await customerAccount.deposit(
          parseInt(depositAmount)
        );
        if (depositInfo === 'success') {
          window.alert(`Deposit dengan jumlah Rp${depositAmount} berhasil`);
        } else {
          window.alert(depositInfo);
        }
        break;
      case 3:
        const withdrawAmount = window.prompt('Masukkan jumlah deposit');
        const withdrawInfo = await customerAccount.withdraw(
          parseInt(withdrawAmount)
        );
        if (withdrawInfo === 'success') {
          window.alert(`Penarikan dengan jumlah Rp${withdrawAmount} berhasil`);
        } else {
          window.alert(withdrawInfo);
        }
        break;
      case 4:
        alert(
          'Terima kasih sudah mempercayai Bank Binarian!\n' +
            '- Dibuat oleh I Putu Rama Astra Arimbawa'
        );
        break;
      default:
        alert('Gagal input pilihan menu:\nInput invalid');
        break;
    }
  } while (selectedMenu !== 4);
}

main();
