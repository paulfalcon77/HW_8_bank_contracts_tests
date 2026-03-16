import { DepositContract } from '../../src/bank/DepositContract'
import { LoanContract } from '../../src/bank/LoanContract'
import { InsuranceContract } from '../../src/bank/InsuranceContract'

describe('Contracts Tests', () => {

  let deposit: DepositContract
  let loan: LoanContract
  let insurance: InsuranceContract

  beforeEach(() => {
    deposit = new DepositContract("id_1", "Morris", false, 1000, 5)
    loan = new LoanContract("id_2", "Anna", false, 5000, 500, 12)
    insurance = new InsuranceContract("id_3", "Bob", false, "forHealth", 250, 2)

    deposit.activate()
    loan.activate()
    insurance.activate()

  })

  afterEach(() => {
    deposit.deactivate()
    loan.deactivate()
    insurance.deactivate()

    console.log(`deposit ${deposit.contractId} deactivated.`)
    console.log(`loan ${loan.contractId} deactivated.`)
    console.log(`insurance ${insurance.contractId} deactivated.`)
  })

  test("Deposit Contract calculate interest", () => {
    expect(deposit.isActive).toBe(true)
    expect(deposit.calculateInterest()).toBe(50)
    expect(deposit.contractId).toBe("id_1")
    expect(deposit.clientName).toBe("Morris")
    expect(deposit.amount).toBe(1000)
    expect(deposit.interestRate).toBe(5)
    deposit.deactivate()
    expect(deposit.isActive).toBe(false)
  })

  test("Loan  Contract calculate payments", () => {
    expect(loan.contractId).toBe("id_2")
    expect(loan.clientName).toBe("Anna")
    expect(loan.loanAmount).toBe(5000)
    expect(loan.monthlyPayment).toBe(500)
    expect(loan.loanTermMonths).toBe(12)
    expect(loan.isActive).toBe(true)
    expect(loan.calculateTotalPayment()).toBe(6000)
    loan.deactivate()
    expect(loan.isActive).toBe(false)

  })
  test('Insurance Contract calculates insurence total', () => {
    expect(insurance.contractId).toBe("id_3")
    expect(insurance.clientName).toBe("Bob")
    expect(insurance.isActive).toBe(true)
    expect(insurance.insuranceType).toBe("forHealth")
    expect(insurance.premium).toBe(250)
    expect(insurance.termYears).toBe(2)
    expect(insurance.calculateTotalPremium()).toBe(500)
    insurance.deactivate()
    expect(insurance.isActive).toBe(false)

  })


})