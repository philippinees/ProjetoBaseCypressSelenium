const { By, until, Select } = require('selenium-webdriver')
const chalk = require('chalk')

class ElementWrapper {
    constructor(driver, element) {
        /**
         * @param {import('selenium-webdriver').WebDriver} driver - Instância do Selenium WebDriver.
         * @param {import('selenium-webdriver').WebElement} element - Instância do elemento da web a ser manipulado.
         */
        this.driver = driver;
        this.element = element;
    }

    /**
     * Clicks on the element.
     * @returns {ElementWrapper} - Returns the `ElementWrapper` instance for chaining.
     */
    async click() {
        console.log(chalk.gray(`Clicking the element `) + chalk.cyanBright(`${await this.getElementDescription()}`))
        await this.element.click();
        return this;
    }

    async type(text) {
        /**
         * Digita texto no elemento.
         * @param {string} text - Texto a ser digitado no elemento.
         * @returns {Promise<this>} - Retorna a instância atual para encadeamento.
         */
        console.log(chalk.gray(`Typing '${text}' to the element `) + chalk.cyanBright(`${await this.getElementDescription()}`))
        await this.element.sendKeys(text);
        return this;
    }

    async clear() {
        /**
         * Limpa o texto do elemento (usado principalmente para elementos `<input>`).
         * @returns {Promise<this>} - Retorna a instância atual para encadeamento.
         */
        console.log(chalk.gray(`Clearing the element `) + chalk.cyanBright(`${await this.getElementDescription()}`))
        await this.element.clear();
        return this;
    }

    async typeSlowly(text, delay = 2) {
        console.log(chalk.gray(`Typing slowly '${text}' to the element `) + chalk.cyanBright(`${await this.getElementDescription()}`))
        for (const char of text) {
            await this.element.sendKeys(char);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        return this;
    }

    async getText() {
        /**
         * Obtém o texto do elemento.
         * @returns {Promise<string>} - Texto do elemento.
         */
        return await this.element.getText();
    }

    async isVisible() {
        /**
         * Verifica se o elemento está visível.
         * @returns {Promise<this>} - Retorna a instância atual para encadeamento.
         */
        console.log(chalk.gray(`Checking if the element is visible `) + chalk.cyanBright(`${await this.getElementDescription()}`))
        await this.driver.wait(until.elementIsVisible(this.element), 10000);
        console.log(chalk.cyanBright('Element is visible'))
        return this;
    }

    async isDisplayed() {
        /**
         * Verifica se o elemento está exibido.
         * @returns {Promise<this>} - Retorna a instância atual para encadeamento.
         * @throws {Error} - Lança um erro se o elemento não estiver visível.
         */
        console.log(chalk.gray(`Checking if the element is displayed `) + chalk.cyanBright(`${await this.getElementDescription()}`))
        const isVisible = await this.element.isDisplayed();
        console.log(`Element is visible: ${isVisible}`);
        if (!isVisible) {
            throw new Error('Element is not visible');
        }
        return this;
    }

    async isEnabled() {
        /**
         * Verifica se o elemento está habilitado.
         * @returns {Promise<this>} - Retorna a instância atual para encadeamento.
         * @throws {Error} - Lança um erro se o elemento não estiver habilitado.
         */
        console.log(chalk.gray(`Checking if the element is enabled `) + chalk.cyanBright(`${await this.getElementDescription()}`))
        const isEnabled = await this.element.isEnabled();
        console.log(`Element is enabled: ${isEnabled}`);
        if (!isEnabled) {
            throw new Error('Element is not enabled');
        }
        return this;
    }

    async executeScript(script = "arguments[0].click();") {
        /**
         * Executa um script no elemento.
         * @param {string} [script="arguments[0].click();"] - Script a ser executado no elemento. Por padrão, clica no elemento.
         * @returns {Promise<this>} - Retorna a instância atual para encadeamento.
         */
        console.log(chalk.gray(`Executing script to element `) + chalk.cyanBright(`${await this.getElementDescription()}`))
        await this.driver.executeScript(script, this.element);
        return this;
    }

    async select(value) {
        /**
         * Seleciona uma opção em um elemento `<select>`.
         * @param {string} value - Valor da opção a ser selecionada.
         * @throws {Error} - Lança um erro se o elemento não for um `<select>`.
         */
        console.log(chalk.gray(`Selecting '${value}' in the element `) + chalk.cyanBright(`${await this.getElementDescription()}`))
        const tagName = await this.element.getTagName();
        if (tagName === 'select') {
            const select = new Select(this.element);
            await select.selectByVisibleText(value);
        } else {
            throw new Error('Element is not a <select> element');
        }
    }

    async getSelectedValue() {
        /**
         * Obtém o valor selecionado de um elemento `<select>`.
         * @returns {Promise<string>} - Valor da opção selecionada.
         * @throws {Error} - Lança um erro se o elemento não for um `<select>`.
         */
        console.log(chalk.gray(`Getting selected value from the element `) + chalk.cyanBright(`${await this.getElementDescription()}`))
        const tagName = await this.element.getTagName();
        if (tagName === 'select') {
            const select = new Select(this.element);
            const selectedOption = await select.getFirstSelectedOption();
            const value = await selectedOption.getText();
            console.log(`Selected value: ${value}`);
            return value;
        } else {
            throw new Error('Element is not a <select> element');
        }
    }

    /**
     * Lê o conteúdo da tabela em um formato estruturado.
     * @returns {Promise<Array<Object>>} - Uma promessa que resolve para uma lista de objetos representando as linhas da tabela.
     */
    async getTable() {
        console.log(chalk.gray(`Getting table values... `) + chalk.cyanBright(`${await this.getElementDescription()}`))
        const tagName = await this.element.getTagName()
        if (tagName.toLowerCase() !== 'table') {
            throw new Error('Element is not a table.')
        }
        const rows = await this.element.findElements(By.css('tr'))
        const tableData = []

        for (const row of rows) {
            const rowData = {}
            const cells = await row.findElements(By.css('td, th'))

            for (let i = 0; i < cells.length; i++) {
                const cellText = await cells[i].getText()
                rowData[`column${i}`] = cellText
                console.log(chalk.gray(`VALUES: `) + chalk.cyanBright(`${cellText}`))
            }

            tableData.push(rowData)
        }
        
        return tableData
    }

    async getValue() {
        /**
         * Obtém o valor do atributo `value` do elemento.
         * Usado para campos de entrada, como `<input>`.
         * @returns {Promise<string>} - Valor do atributo `value`.
         */
        console.log(chalk.gray(`Getting value from the element `) + chalk.cyanBright(`${await this.getElementDescription()}`))
        const value = await this.element.getAttribute('value');
        console.log(chalk.gray(`VALUE: `) + chalk.cyanBright(`${value}`))
        return value;
    }

    async wait(time) {
        /**
         * Aguarda um período de tempo.
         * @param {number} time - Tempo em milissegundos para aguardar.
         * @returns {Promise<this>} - Retorna a instância atual para encadeamento.
         */
        console.log(`Waiting for ${time}ms`);
        console.log(chalk.gray(`Waiting for... `) + chalk.cyanBright(`${time}ms`))
        await this.driver.sleep(time);
        return this;
    }

    
    async expectVisible() {
        /**
             * Verifica se o elemento está visível e retorna um valor booleano
             * @returns {Promise<boolean>} - Retorna a instância atual para encadeamento.
             * 
        */
        console.log(chalk.gray(`Checking if the element is visible `) + chalk.cyanBright(`${await this.getElementDescription()}`))
        const isVisible = await this.element.isDisplayed();
        console.log(chalk.gray(`Checking if the element is visible `) + chalk.cyanBright(`${isVisible}`))
        if (isVisible) {
            return true
        }

        return false;
    }

    async getElementDescription() {
        /**
         * Obtém uma descrição do elemento.
         * @returns {Promise<string>} - Descrição do elemento, como seu nome de tag.
         */
        const tagName = await this.element.getTagName();
        return tagName;
    }
}

module.exports = ElementWrapper;

