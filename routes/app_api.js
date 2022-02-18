const controller = require('../controllers/UserController');
module.exports = (app) => {
    app.post('/signin', controller.signin);
    app.post('/signup', controller.signup);
}

