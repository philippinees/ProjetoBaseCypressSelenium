const env = require('../cypress.env.json');

class RouterBaseConfig {
    #url
    constructor() {
        if (new.target === RouterBaseConfig) {
            throw new Error('A classe RouterBaseConfig não pode ser instanciada diretamente.');
        }

        this.#url = `${env.config.UrlBase + env.config.BaseDados + env.config.sisprevweb}` || ''
    }

    _getUrl(controller) {
        return `${this.#url}${controller}`
    }
}

module.exports = RouterBaseConfig;
