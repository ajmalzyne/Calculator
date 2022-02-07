
class Calculator{
    constructor(previousOperandTextElemnt , currentOperandTextElemnt){
        this.previousOperandTextElemnt = previousOperandTextElemnt
        this.currentOperandTextElemnt =currentOperandTextElemnt
        this.clear()
    }

    clear(){
        this.currentOperant = ''
        this.previousOperant = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperant = this.currentOperant.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === '.' && this.currentOperant.includes('.')) return
        this.currentOperant = this.currentOperant.toString() + number.toString()

    }

    chooseOperation(operation){
        if(this.currentOperant === '') return
        if(this.previousOperant !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperant = this.currentOperant
        this.currentOperant = ''
    }

    compute(){

        let computation
        const prev = parseFloat(this.previousOperant)
        const current = parseFloat(this.currentOperant)
        if(isNaN(prev) || isNaN (current)) return
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
                
        }

        this.currentOperant = computation
        this.operation = undefined
        this.previousOperant = ''

    }

    getDisplayNumber(number){
        const StringNumber = number.toString()
        const integerDigit = parseFloat(StringNumber.split('.')[0])
        const decimalDigit = StringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigit)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigit.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }
        if(decimalDigit != null){
            return `${integerDisplay}.${decimalDigit}`
        }else{
            return integerDisplay
        }
    }

    updateDispplay(){
        this.currentOperandTextElemnt.innerText = this.getDisplayNumber 
        (this.currentOperant)
        if(this.operation != null){
            this.previousOperandTextElemnt.innerText =
            `${this.getDisplayNumber(this.previousOperant)} ${this.operation}`
        }else{
            this.previousOperandTextElemnt.innerText = ''
        }
    }
}



const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElemnt = document.querySelector('[data-previous-operand]')
const currentOperandTextElemnt = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElemnt , currentOperandTextElemnt)

numberButton.forEach(button =>{
    button.addEventListener('click' , ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDispplay()
    })
})

operationButton.forEach(button =>{
    button.addEventListener('click' , ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDispplay()
    })
})

equalsButton.addEventListener('click' , button=>{
    calculator.compute()
    calculator.updateDispplay()
})

allClearButton.addEventListener('click' , button=>{
    calculator.clear()
    calculator.updateDispplay()
})

deleteButton.addEventListener('click' , button=>{
    calculator.delete()
    calculator.updateDispplay()
})



