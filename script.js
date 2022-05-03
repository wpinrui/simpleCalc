import {isOperation, getOperand, getOperation, calculate} from "./helpers.js"

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        const c = this.currentOperand
        this.currentOperand = this.currentOperand.substring(0, c.length - 1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return
        } else if (number === '.' && this.currentOperand.length === 0) {
            this.currentOperand = '0.'
            return
        }
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        const p = this.previousOperand
        const c = this.currentOperand
        if (isOperation(getOperation(p)) && c.length === 0)  {
            // replace operation
            this.previousOperand = getOperand(p) + operation
            return
        } else if (isOperation(getOperation(p)) && c.length > 0) {
            // evaluate
            const op1 = getOperand(p)
            const operator = getOperation(p)
            const op2 = c
            this.previousOperand = calculate(op1, operator, op2).toString() + " " + operation
            this.currentOperand = ""
            return
        } 
        this.previousOperand = this.currentOperand.toString() + " " + operation
        this.currentOperand = ""
    }

    compute() {
        const op1 = getOperand(this.previousOperand)
        const operator = getOperation(this.previousOperand)
        const op2 = this.currentOperand
        this.previousOperand = ""
        this.currentOperand = calculate(op1, operator, op2).toString()
    }

    updateDisplay() {
        this.previousOperandTextElement.innerText = this.previousOperand
        this.currentOperandTextElement.innerText = this.currentOperand
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})