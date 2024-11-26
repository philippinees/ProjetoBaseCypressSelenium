const PageBase = require("../pageBase");
const sl = require('../sl/sl')

class Navegar extends PageBase {
    
    async para(url){
        console.log('Navegou para -> ', url)
        await this.driver.get(url)
    }
}

module.exports = new Navegar()