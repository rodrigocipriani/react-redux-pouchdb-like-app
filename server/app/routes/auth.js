/**
 * Created by thiag on 10/06/2017.
 */

const passport = require('passport');

module.exports = (app) => {

    const controller = app.controllers.auth;


    app.route('/login')
        .get(function (req, res) {
            res.render('login');
        });

    app.route('/login/facebook')
        .get(passport.authenticate('facebook', {scope: ['email']}));
    // .get(controller.logarFacebook);

    app.route('/login/facebook/return')
    // .get(controller.logarFacebook);
        .get(passport.authenticate('facebook', {failureRedirect: '/login', successRedirect: '/'}));

};