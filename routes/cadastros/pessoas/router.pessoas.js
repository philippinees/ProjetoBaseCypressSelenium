const RouterBaseConfig = require('../../router.base.config');
class RouterPessoas extends RouterBaseConfig {
    #controller;
    constructor() {
        super();
        this.#controller = '';
    }

    consultaObito() {
        return this._getUrl(`${this.#controller}/Pessoas/pessoas.aspx`);
    }
}

module.exports = new RouterPessoas();
