const userController = require('../controllers/UserController');
const workspaceController = require('../controllers/WorkspaceController');
const planController = require('../controllers/PlanController');
const dashboardController = require('../controllers/DashboardController');

module.exports = (app) => {
    app.post('/signin', userController.signin);
    app.post('/signup', userController.signup);
    
    app.post('/workspace/create', workspaceController.create);
    app.post('/workspace/update', workspaceController.update);
    app.post('/workspace/get', workspaceController.get);
    app.post('/workspace/delete', workspaceController.delete);

    app.post('/plan/create', planController.create);
    app.post('/plan/update', planController.update);
    app.post('/plan/delete', planController.delete);
    app.post('/plan/get', planController.get);
}

