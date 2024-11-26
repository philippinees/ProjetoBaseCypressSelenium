const { By, until } = require('selenium-webdriver');
const ElementWrapper = require('./elementWrapper');
const chalk = require('chalk');

class ElementLocator {
    constructor(driver) {
        // Inicializa a classe com uma instância do Selenium WebDriver
        this.driver = driver;
    }

    /**
     * Obtém um elemento com base no seletor fornecido.
     * @param {string} selector - Seletor usado para localizar o elemento.
     * @returns {ElementWrapper} - Retorna um `ElementWrapper` que encapsula o elemento localizado.
     * @throws {Error} - Lança um erro se o seletor for inválido.
     */
    get(selector) {
        // Verifica se o seletor é válido (não nulo e do tipo string)
        if (!selector || typeof selector !== 'string') {
            throw new Error(`Invalid selector: ${selector}`);
        }

        // Divide o seletor por ' > ' para suportar seletores aninhados
        const ids = selector.split(' > ');

        // Se o seletor tiver múltiplas partes (elementos aninhados), chama o método correspondente
        if (ids.length > 1) {
            return this.#getNestedElement(ids);
        }

        // Caso contrário, obtém o elemento usando o seletor simples
        return this.#getSingleElement(selector);
    }

    /**
     * Obtém um elemento único com base no seletor.
     * @param {string} selector - Seletor usado para localizar o elemento.
     * @returns {ElementWrapper} - Retorna um `ElementWrapper` que encapsula o elemento localizado.
     */
    #getSingleElement(selector) {
        let element;

        // Switch para determinar o tipo de seletor e chamar o método de busca correspondente
        switch (true) {
            case this.#isIdSelector(selector):
                element = this.#findById(selector);
                break;
            case this.#isNameSelector(selector):
                element = this.#findByName(selector);
                break;
            case this.#isLinkTextSelector(selector):
                element = this.#findByLinkText(selector);
                break;
            case this.#isXPathSelector(selector):
                element = this.#findByXPath(selector);
                break;
            case this.#isClassSelector(selector):
                element = this.#findByClass(selector);
                break;
            case this.#isCSSSelector(selector):
                element = this.#findByCSS(selector);
                break;
            case this.#isTitleSelector(selector):
                element = this.#findByCSS(selector);
                break;
            case this.#isPartialLinkTextSelector(selector):
                element = this.#findByPartialLinkText(selector);
                break;
            default:
                element = this.#defaultFindById(selector);
        }

        // Retorna um ElementWrapper para encapsular o elemento localizado
        return new ElementWrapper(this.driver, element);
    }

    /**
     * Obtém um elemento aninhado usando IDs separados por ' > '.
     * @param {string[]} ids - IDs dos elementos aninhados.
     * @returns {ElementWrapper} - Retorna um `ElementWrapper` que encapsula o elemento localizado.
     */
    #getNestedElement(ids) {
        // Localiza o elemento raiz pelo primeiro ID
        let element = this.driver.findElement(By.id(ids[0]));

        // Itera pelos IDs subsequentes para localizar os elementos aninhados
        for (let i = 1; i < ids.length; i++) {
            element = element.findElement(By.id(ids[i]));
        }

        // Retorna o elemento localizado, esperando até que esteja visível
        return new ElementWrapper(this.driver, this.driver.wait(until.elementIsVisible(element), 10000));
    }

    /**
     * Verifica se o seletor é um seletor de title.
     * @param {string} selector - Seletor a ser verificado.
     * @returns {boolean} - Retorna true se for um seletor de title.
     */
    #isTitleSelector(selector) {
        return selector.startsWith('[title="') && selector.endsWith('"]');
    }

    /**
     * Verifica se o seletor é um seletor de ID.
     * @param {string} selector - Seletor a ser verificado.
     * @returns {boolean} - Retorna true se for um seletor de ID.
     */
    #isIdSelector(selector) {
        return selector.startsWith('[id="') && selector.endsWith('"]');
    }

    /**
     * Verifica se o seletor é um seletor de nome.
     * @param {string} selector - Seletor a ser verificado.
     * @returns {boolean} - Retorna true se for um seletor de nome.
     */
    #isNameSelector(selector) {
        return selector.startsWith('[name="') && selector.endsWith('"]');
    }

    /**
     * Verifica se o seletor é um seletor de link text.
     * @param {string} selector - Seletor a ser verificado.
     * @returns {boolean} - Retorna true se for um seletor de link text.
     */
    #isLinkTextSelector(selector) {
        return selector.startsWith('[link="') && selector.endsWith('"]');
    }

    /**
     * Verifica se o seletor é um seletor XPath.
     * @param {string} selector - Seletor a ser verificado.
     * @returns {boolean} - Retorna true se for um seletor XPath.
     */
    #isXPathSelector(selector) {
        return selector.startsWith('/') || selector.startsWith('(');
    }

    /**
     * Verifica se o seletor é um seletor de classe.
     * @param {string} selector - Seletor a ser verificado.
     * @returns {boolean} - Retorna true se for um seletor de classe.
     */
    #isClassSelector(selector) {
        return selector.startsWith('[class="') && selector.endsWith('"]') || selector.startsWith('.');
    }

    /**
     * Verifica se o seletor é um seletor CSS.
     * @param {string} selector - Seletor a ser verificado.
     * @returns {boolean} - Retorna true se for um seletor CSS.
     */
    #isCSSSelector(selector) {
        return selector.startsWith('#') || selector.startsWith('.');
    }

    /**
     * Verifica se o seletor é um seletor de partial link text.
     * @param {string} selector - Seletor a ser verificado.
     * @returns {boolean} - Retorna true se for um seletor de partial link text.
     */
    #isPartialLinkTextSelector(selector) {
        return selector.startsWith('[partialLink="') && selector.endsWith('"]');
    }

    /**
     * Localiza um elemento com base em um seletor de classe.
     * @param {string} selector - Seletor usado para localizar o elemento.
     * @returns {Promise<WebElement>} - Promessa que resolve para o elemento localizado.
     */
    #findByClass(selector) {
        console.log(chalk.gray(`Using get - element ${selector} selected by `) + chalk.cyanBright('ClassName'))
        const className = selector.startsWith('.') ? selector.slice(1) : this.#extractSelectorValue(selector, 8, -2);
        return this.driver.wait(until.elementLocated(By.className(className)), 10000);
    }

    /**
     * Localiza um elemento com base em um seletor de ID.
     * @param {string} selector - Seletor usado para localizar o elemento.
     * @returns {Promise<WebElement>} - Promessa que resolve para o elemento localizado.
     */
    #findById(selector) {
        console.log(chalk.grey(`Using get - element ${selector} selected by `) + chalk.cyanBright('Id'))
        const id = this.#extractSelectorValue(selector, 5, -2);
        return this.driver.wait(until.elementLocated(By.id(id)), 10000);
    }

    /**
    * Método de fallback para localizar um elemento por ID se nenhum tipo específico de seletor for identificado.
    * @param {string} selector - Seletor usado para localizar o elemento. Espera-se que seja um seletor de ID.
    * @returns {Promise<WebElement>} - Promessa que resolve para o elemento localizado.
    * @throws {Error} - Lança um erro se o seletor não for um ID válido.
    */
    #defaultFindById(selector) {
        console.log(chalk.grey(`Using get - element ${selector} selected by `) + chalk.cyanBright('Id'))
        return this.driver.wait(until.elementLocated(By.id(selector)), 10000);
    }

    /**
     * Localiza um elemento com base em um seletor de nome.
     * @param {string} selector - Seletor usado para localizar o elemento.
     * @returns {Promise<WebElement>} - Promessa que resolve para o elemento localizado.
     */
    #findByName(selector) {
        console.log(chalk.grey(`Using get - element ${selector} selected by `) + chalk.cyanBright('Name'))
        const name = this.#extractSelectorValue(selector, 7, -2);
        return this.driver.wait(until.elementLocated(By.name(name)), 10000);
    }

    /**
     * Localiza um elemento com base em um seletor de link text.
     * @param {string} selector - Seletor usado para localizar o elemento.
     * @returns {Promise<WebElement>} - Promessa que resolve para o elemento localizado.
     */
    #findByLinkText(selector) {
        console.log(chalk.grey(`Using get - element ${selector} selected by `) + chalk.cyanBright('LinkText'))
        const linkText = this.#extractSelectorValue(selector, 7, -2);
        return this.driver.wait(until.elementLocated(By.linkText(linkText)), 10000);
    }

    /**
     * Localiza um elemento com base em um seletor XPath.
     * @param {string} selector - Seletor usado para localizar o elemento.
     * @returns {Promise<WebElement>} - Promessa que resolve para o elemento localizado.
     */
    #findByXPath(selector) {
        console.log(chalk.grey(`Using get - element ${selector} selected by `) + chalk.cyanBright('Xpath'))
        return this.driver.wait(until.elementLocated(By.xpath(selector)), 10000);
    }

    /**
     * Localiza um elemento com base em um seletor CSS.
     * @param {string} selector - Seletor usado para localizar o elemento.
     * @returns {Promise<WebElement>} - Promessa que resolve para o elemento localizado.
     */
    #findByCSS(selector) {
        console.log(chalk.grey(`Using get - element ${selector} selected by `) + chalk.cyanBright('Css'))
        let selectCss = selector.replace(/^[.#]+/, '');
        return this.driver.wait(until.elementLocated(By.css(selectCss)), 10000);
    }

    /**
     * Localiza um elemento com base em um seletor de partial link text.
     * @param {string} selector - Seletor usado para localizar o elemento.
     * @returns {Promise<WebElement>} - Promessa que resolve para o elemento localizado.
     */
    #findByPartialLinkText(selector) {
        console.log(chalk.grey(`Using get - element ${selector} selected by `) + chalk.cyanBright('PartialLinkText'))
        const partialLinkText = this.#extractSelectorValue(selector, 14, -2);
        return this.driver.wait(until.elementLocated(By.partialLinkText(partialLinkText)), 10000);
    }

    /**
     * Extrai o valor do seletor removendo prefixos e sufixos.
     * @param {string} selector - Seletor a ser processado.
     * @param {number} start - Índice inicial para extração.
     * @param {number} end - Índice final para extração.
     * @returns {string} - Valor extraído do seletor.
     */
    #extractSelectorValue(selector, start, end) {
        return selector.slice(start, end);
    }

    /**
     * Localiza um elemento que contém um texto específico.
     * @param {string} text - Texto que o elemento deve conter.
     * @returns {ElementWrapper} - Retorna um `ElementWrapper` que encapsula o elemento localizado.
     */
    contains(text) {
        console.log(chalk.grey(`Using contains - element ${selector} selected by `) + chalk.cyanBright('PartialLinkText'))
        const xpath = `//*[contains(text(),'${text}')]`;
        const element = this.driver.wait(until.elementLocated(By.xpath(xpath)), 10000);
        return new ElementWrapper(this.driver, element);
    }

    // /**
    //  * Alterna para uma nova janela aberta, identificada pelo índice.
    //  * @param {number} [screen=1] - Índice da janela para a qual alternar.
    //  * @returns {Promise<void>}
    //  */
    // async switchToNewWindow(screen = 1) {
    //     try {
    //         // Espera 6 segundos para garantir que a nova janela seja aberta
    //         const handles = await this.driver.getAllWindowHandles();
    //         await this.driver.switchTo().window(handles[screen]);
    //     } catch (error) {
    //         console.error("Target window already closed.", error);
    //     }
    // }

    /**
 * Alterna para uma nova janela aberta, identificada pelo índice.
 * @param {number} [screen=1] - Índice da janela para a qual alternar.
 * @returns {Promise<void>}
 */
async switchToNewWindow(screen = 1) {
    try {

        await this.driver.sleep(2000)
        const handles = await this.driver.getAllWindowHandles()

        if (handles.length <= screen) {
            throw new Error('The window index provided exceeds the number of open windows.')
        }

        console.log(chalk.grey(`Accessing new window in the index  `) + chalk.cyanBright(`${screen}`))
        await this.driver.switchTo().window(handles[screen])

    } catch (error) {
        console.error("Error changing focus to new window:", error.message)

        if (error.message.includes("Target window already closed") || error.message.includes("invalid argument: 'handle' must be a string")) {
            console.warn('The target window has already been closed or the handle is invalid. Trying to reopen or focus on the window.')

            try {
                const handles = await this.driver.getAllWindowHandles()
                if (handles.length > 0) {
                    console.log(chalk.grey(`Focusing on the first window available as fallback `))
                    await this.driver.switchTo().window(handles[0])
                } else {
                    console.log(chalk.yellow(`No window available to focus. Test may fail`))
                }
            } catch (fallbackError) {
                console.error('Erro ao tentar focar na janela de fallback:', fallbackError.message)
            }
        }
    }
}

    /**
     * Retorna um alerta de JavaScript.
     * @returns {Promise<Alert>} - Promessa que resolve para o alerta presente.
     * @private
     */
    async #returnAlert() {
        await this.driver.wait(until.alertIsPresent(), 30000);
        return this.driver.switchTo().alert();
    }

    /**
     * Lida com alertas de JavaScript, permitindo aceitar ou rejeitar.
     * @returns {Object} - Objeto com métodos `accept` e `dismiss` para interagir com o alerta.
     */
    alert() {
        let alert = null;
        return {
            accept: async () => {
                alert = await this.#returnAlert();
                await alert.accept();
            },
            dismiss: async () => {
                alert = await this.#returnAlert();
                await alert.dismiss();
            },
            getText: async () => {
                alert = await this.#returnAlert();
                return alert.getText();
            }
        };
    }
}

module.exports = ElementLocator;
