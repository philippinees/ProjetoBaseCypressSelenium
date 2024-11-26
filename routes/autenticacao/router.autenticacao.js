const RouterBaseConfig = require('../router.base.config');

class RouterAutenticacao extends RouterBaseConfig {
    #controller;
    constructor() {
        super();
        this.#controller = '/Login';
    }

    login() {
        return this._getUrl(`${this.#controller}/Login.aspx`);
    }
}

module.exports = new RouterAutenticacao();
