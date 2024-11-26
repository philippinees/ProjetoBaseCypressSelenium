const DriverFactory = require("../support/driverFactory");
const sl = require('./sl/sl');
const {Select} = require('selenium-webdriver/lib/select.js')
const { By, until } = require('selenium-webdriver')
const { expect } = require('chai');

class PageBase {
    constructor() {
        if (new.target === PageBase) {
            throw new TypeError("A classe Page Base não pode ser instanciada diretamente!");
        }
        this.browser = process.env.browser || 'chrome';
        this.headless = process.env.headless === 'true';
        this.driver = this.initDriver();
        sl.initialize(this.driver);
    }

    initDriver() {
        return DriverFactory.createDriver(this.browser, this.headless);
    }

    async close() {
        if (this.driver) {
            try {
                if (process.env.close === 'true') {
                    DriverFactory.quitDriver();
                }
            } catch (error) {
                console.warn('O driver já estava fechado ou inacessível:', error);
            } finally {
                this.driver = null;
            }
        }
    }

    async preencheCamposFormulario(campos, valores){ //implementar command
        let i = 0
        for (let element of campos) {
            await this.driver.findElement(By.id(element)).clear()
            await this.driver.findElement(By.id(element)).sendKeys(valores[i])
            i++
        } 
    }

    async selecionaPesquisarPor(dropDowmList,opcaoEscolhida){
        let selecionaPesquisarPor = await this.driver.findElement(By.id(dropDowmList))
        let opcao = new Select(selecionaPesquisarPor)
        await opcao.selectByVisibleText(opcaoEscolhida)
    }

    async selecionaOpcaoRadioBtn(radioBtn, opcaoEscolhida){
        let radioButton = await this.driver.findElement(By.xpath(`//table[@id='${radioBtn}']//label[text()='${opcaoEscolhida}']/preceding-sibling::input[@type='radio']`));
        await radioButton.click();
    }

    async VerificaAlerta(mensagemEsperada){
        await this.driver.sleep(1000)
            await this.driver.wait(until.alertIsPresent(), 10000);
            let alert = await this.driver.switchTo().alert();
            expect(await alert.getText()).to.contain(mensagemEsperada)
            await alert.accept()
    }

    async preencheMultiplosCampos(campos, valoresCampos){
        let i = 0
        for (const item of valoresCampos) {
            const [chave, valor] = Object.entries(item)[0];
            await this.driver.sleep(200)
            if(chave === 'input'){
                await this.driver.findElement(By.id(campos[i])).sendKeys(valor)
                i++
            } else if(chave === 'select'){
                await this.selecionaPesquisarPor(campos[i], valor)
                i++
            } else if(chave === 'radioBtn'){
                await this.selecionaOpcaoRadioBtn(campos[i], valor)
                i++
            } else {
                throw new Error(`Tipo de campo ${chave} não encontrado `);
            }

        }
    }

    async verificarEConfirmarAlertaExporadico() {
        try {
            await this.driver.wait(
                async () => (await this.driver.switchTo().alert()) !== null, 2000
            );
            let alerta = await this.driver.switchTo().alert();
            await alerta.accept();
        } catch (error) {
            console.log('erro', error)
            if (error.name !== 'NoSuchAlertError' && error.name !== 'UnexpectedAlertOpenError' ) {
                throw error;
            }
            
        }
    }
    

}

module.exports = PageBase;