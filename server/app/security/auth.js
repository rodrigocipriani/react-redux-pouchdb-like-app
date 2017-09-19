/**
 * Created by thiago on 03/06/2017.
 */
'use strict';

module.exports = () => {

    const passport    = require('passport');
    // const config      = require('../config/config');
    const auth        = {};


    auth.initialize = () => {
        return passport.initialize();
    };

    auth.session = () => {
        return passport.session();

    };

    return auth;

};