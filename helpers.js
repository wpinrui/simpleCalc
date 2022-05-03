function isOperation(str) {
    return str === "+" || str === '-' || str === '*' || str === '÷'
}

function getOperation(str) {
    return str.charAt(str.length - 1)
}

function getOperand(str) {
    return str.substring(0, str.length - 1)
}

function calculate(op1, operator, op2) {
    return operator === '+' 
           ? parseFloat(op1) + parseFloat(op2)
           : operator === '-'
           ? parseFloat(op1) - parseFloat(op2)
           : operator === '*'
           ? parseFloat(op1) * parseFloat(op2)
           : operator === '÷'
           ? parseFloat(op1) / parseFloat(op2)
           : operator === ''
           ? op2
           : alert("Error while attempting to calculate")
}

export {isOperation, getOperation, getOperand, calculate}