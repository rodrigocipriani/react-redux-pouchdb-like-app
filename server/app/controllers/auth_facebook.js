'use strict';

module.exports = (app) => {

    const passport         = require('passport');
    const FacebookStrategy = require('passport-facebook').Strategy;
    // const UsuarioService = app.services.usuario;
    const config           = require('../../config/config');

    // estratégia local - login
    passport.use('facebook', new FacebookStrategy({
            clientID     : config.auth.facebookId,
            clientSecret : config.auth.facebookPass,
            callbackURL  : `${config.host}/login/facebook/return`,
            profileFields: ['id', 'displayName', 'verified ', 'email']
        },
        (accessToken, refreshToken, profile, done) => {

            console.log("accessToken", accessToken);
            console.log("refreshToken", refreshToken);
            console.log("profile", profile);
            // UsuarioService.cadastrarUsuarioExterno(profile.username)
            //     .then(usuario => {
            //         if (!usuario) {
            //             console.log('Usuário inexistente: ', profile.username);
            //             return done(null, false, 'Dados não conferem');
            //         }
            //
            //         usuario.senha = '';
            return done(null, profile);
            // return done(null, usuario);
            //
            //
            //     }).catch((erro) => {
            //     console.log('erro:', erro);
            //     return done(erro);
            // });
        }));


    passport.serializeUser((usuario, cb) => {
        console.log("entrando usuario", usuario);
        cb(null, usuario);
        // done(null, usuario.usuario_id);
    });

    passport.deserializeUser((obj, cb) => {
        console.log("saindo", obj);
        cb(null, obj)
        // passport.deserializeUser((id, done) => {
        // console.log("saindo", id);
        // UsuarioService
        //     .obterUsuarioPorId(id)
        //     .then((usuario) => {
        //         if (!usuario) {
        //             done('Usuário Inexistente');
        //         } else {
        //             done(null, usuario);
        //         }
        //     })
        //     .catch((erro) => {
        //         console.log('erro: ', erro);
        //         done(erro);
        //     });
    });

};