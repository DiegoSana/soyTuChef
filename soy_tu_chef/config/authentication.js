module.exports.isAuthenticated = function isAuthenticated(req, res, next) {

    if (req.session.token)
        return next();

    res.redirect('/login');
}