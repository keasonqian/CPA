class BankAccount {
  constructor(x){
    this.x = x
    }

  deposit(y){
    return this.x + y
  }

  WithDraw(y){
    return this.x -y
  }

  Transfer(acct1,accut2, y){
    acct1.deposit(y)
    acct2.WithDraw(y)
  }

  toString(){
    return `(${this.x})`
  }

}

export BankAccount
