/**
 * Created by f9329476 on 12/05/2017.
 */

class BrError {

    constructor() {
        // console.log('arguments', arguments);
        const arg1 = arguments[0];
        let arg2   = arguments[1];
        let arg3   = arguments[2];

        if (typeof arg2 === 'object') {
            arg3 = arg2;
            arg2 = null;
        }

        if (arg3) {
            this._params = arg3;
        }

        if (!arg2) {
            if (!arg1.stack) {
                this._msg = arg1;
            }
            this._error = new Error(arg1);
        } else {
            if (!arg1.stack) {
                this._msg   = arg1;
                this._error = new Error(arg2);
            } else {
                this._msg   = arg2;
                this._error = new Error(arg1);
            }
        }
    }

    // static add(msg, erro) {
    //     this._msg   = msg;
    //     this._error = new Error(erro);
    // }

    get error() {
        return this._error;
    }

    get message() {
        return this._msg || 'Erro interno do servidor';
    }

    get params() {
        return this._params || {};
    }
}

module.exports = BrError;
