"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const DeleteUserController_1 = require("./controllers/user/DeleteUserController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const ListUserController_1 = require("./controllers/user/ListUserController");
const UpdateUserController_1 = require("./controllers/user/UpdateUserController");
const isAuthenticated_2 = require("./middlewares/isAuthenticated");
const CreateProjectController_1 = require("./controllers/project/CreateProjectController");
const ListProjectController_1 = require("./controllers/project/ListProjectController");
const UpdateProjectController_1 = require("./controllers/project/UpdateProjectController");
const DeleteProjectController_1 = require("./controllers/project/DeleteProjectController");
const CreateFunctionPointController_1 = require("./controllers/functionpoint/CreateFunctionPointController");
const ListFunctionPointController_1 = require("./controllers/functionpoint/ListFunctionPointController");
const UpdateFunctionPointController_1 = require("./controllers/functionpoint/UpdateFunctionPointController");
const DeleteFunctionPointController_1 = require("./controllers/functionpoint/DeleteFunctionPointController");
const router = (0, express_1.Router)();
exports.router = router;
//ROUTES
//-- ROTAS USER --
router.post('/user/createAdmin', isAuthenticated_2.isCreatingAdmin, new CreateUserController_1.CreateUserController().handle);
router.post('/user', isAuthenticated_1.isAuthenticated, new CreateUserController_1.CreateUserController().handle);
router.post('/session', new AuthUserController_1.AuthUserController().handle);
router.patch('/user', isAuthenticated_1.isAuthenticated, new UpdateUserController_1.UpdateUserController().handle);
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailuserController().handle);
router.get('/user', isAuthenticated_1.isAuthenticated, new ListUserController_1.ListUserController().handle);
router.patch('/user/remove', isAuthenticated_1.isAuthenticated, new DeleteUserController_1.DeleteUserController().handle);
router.post('/project', isAuthenticated_1.isAuthenticated, new CreateProjectController_1.CreateProjectController().handle);
router.get('/project', isAuthenticated_1.isAuthenticated, new ListProjectController_1.ListProjectController().handle);
router.patch('/project', isAuthenticated_1.isAuthenticated, new UpdateProjectController_1.UpdateProjectController().handle);
router.delete('/project', isAuthenticated_1.isAuthenticated, new DeleteProjectController_1.DeleteProjectController().handle);
router.post('/functionpoint', isAuthenticated_1.isAuthenticated, new CreateFunctionPointController_1.CreateFunctionPointController().handle);
router.get('/functionpoint', isAuthenticated_1.isAuthenticated, new ListFunctionPointController_1.ListFunctionPointController().handle);
router.patch('/functionpoint', isAuthenticated_1.isAuthenticated, new UpdateFunctionPointController_1.UpdateFunctionPointController().handle);
router.delete('/functionpoint', isAuthenticated_1.isAuthenticated, new DeleteFunctionPointController_1.DeleteFunctionPointController().handle);
router.get('/', (req, res) => {
    return res.json({ sucess: true, menssage: "sucess" });
});
