const ElementLocator = require('./elementLocator');

class sl {
    static driver = null;
    static elementLocator = null;

    /**
     * Inicializa a classe `sl` com uma instância do Selenium WebDriver.
     * @param {import('selenium-webdriver').WebDriver} driver - Instância do Selenium WebDriver.
     */
    static initialize(driver) {
        sl.driver = driver;
        sl.elementLocator = new ElementLocator(driver);
    }

    /**
     * Obtém um elemento com base no seletor fornecido.
     * @param {string} selector - Seletor para localizar o elemento.
     * @returns {ElementWrapper} - Instância de `ElementWrapper` que encapsula o elemento localizado.
     */
    static get(selector) {
        return sl.elementLocator.get(selector);
    }

    /**
     * Localiza um elemento que contém o texto especificado.
     * @param {string} text - Texto a ser localizado no elemento.
     * @returns {ElementWrapper} - Instância de `ElementWrapper` que encapsula o elemento encontrado.
     */
    static contains(text) {
        return sl.elementLocator.contains(text);
    }

    /**
     * Altera o foco para uma nova janela.
     * @param {number} [screen=1] - Índice da janela para a qual mudar o foco. O padrão é 1.
     * @returns {Promise<void>}
     */
    static switchToNewWindow(screen) {
        return sl.elementLocator.switchToNewWindow(screen);
    }

    /**
     * Manipula alertas na tela.
     * @returns {Object} - Objeto contendo métodos para aceitar ou rejeitar o alerta.
     */
    static alert() {
        return sl.elementLocator.alert();
    }
}

module.exports = sl;
