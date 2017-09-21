'use strict';

module.exports = (app) => {

    const passport       = require('passport');
    const LocalStrategy  = require('passport-local').Strategy;
    // const UsuarioService = app.services.usuario;
    const config         = require('../../config/config');
    const bcrypt         = require(config.lib.bcrypt);

    // estratégia local - login
    passport.use('login', new LocalStrategy({passReqToCallback: true},
        (req, username, password, done) => {
            console.log("aqui logar 2");
            return done(null, username);
            // UsuarioService.recuperarUsuarioPorApelido(username)
            //     .then(usuario => {
            //         if (!usuario) {
            //             console.log('Usuário inexistente: ', username);
            //             return done(null, false, 'Dados não conferem');
            //         } else if (usuario.situacao !== 1) { // 1 confirmado, 0 - pendente
            //             console.log('Confirmar usuário: ', username);
            //             return done(null, false, 'Confirme o cadastro no email');
            //         }
            //         //Validar senha
            //
            //         else if (!bcrypt.compareSync(password, usuario.senha)) {
            //             console.error('senha invalida!');
            //             // return done(null, false,  {chave:  'mensagem.senhaInvalida'});
            //             return done(null, false, 'Dados não conferem');
            //         }
            //         // Tanto usuario e senha estão corretos, retorna usuario através
            //         // do metodo done, e, agora, será considerado um sucesso
            //         // limpa senha
            //         usuario.senha = '';
            //         return done(null, usuario);
            //
            //
            //     }).catch((erro) => {
            //     console.log('erro:', erro);
            //     return done(erro);
            // });
        }))
    // estratégia local - cadastrar
        .use('cadastrar', new LocalStrategy({passReqToCallback: true}, // permite retornar a requisição no callback
            (req, username, password, done) => {
                return done(null, username);
                // const findOrCreateUser = () => {
                //     const identificacao = req.body.identificacao;
                //     const nome          = req.body.nome;
                //     const email         = req.body.email;
                //
                //     UsuarioService.cadastrarUsuario(username, email, nome, password, identificacao)
                //         .then(usuario => {
                //             // retorna usuario criado
                //             return done(null, usuario);
                //         }).catch((erro) => {
                //         console.log('passport - cadastro - erro: ', erro);
                //         return done(null, false, erro);
                //     });
                // };
                // // Delay the execution of findOrCreateUser and execute the method
                // // in the next tick of the event loop
                // process.nextTick(findOrCreateUser);
            })
        );

    // passport.serializeUser((usuario, done) => {
    //     console.log("entrando usuario", usuario);
    //     done(null, usuario.usuario_id);
    // });
    //
    // passport.deserializeUser((id, done) => {
    //     console.log("saindo", id);
    //     UsuarioService.obterUsuarioPorId(id)
    //         .then((usuario) => {
    //             // console.log("usuario", usuario);
    //             // console.log('deserialize usuario - nome=%s', usuario.nome);
    //             if (!usuario) {
    //                 done('Usuário Inexistente');
    //             } else {
    //                 done(null, usuario);
    //             }
    //         })
    //         .catch((erro) => {
    //             console.log('erro: ', erro);
    //             done(erro);
    //         });
    // });

};