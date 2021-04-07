module.exports.postCreate = function (req, res, next) {
    var errors = [];
    const name = req.body.name;
    if (!name) {
        console.log('error');
        return;
    };
    res.locals.novapo = "hi";
    next();
}