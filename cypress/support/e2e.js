import './commands'
import './sqlCommands'

Cypress.on('uncaught:exception', (err, runnable) => {
    if(err.message.includes('expected')){
        return true
    }
    if(err.message.includes('string was not in a correct format')){
        return true
    }
    return false
})





