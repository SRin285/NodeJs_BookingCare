import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  // router.get("/about", navController.getAbout);
  router.get("/crud", homeController.getCRUB);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/updata-crud", homeController.updataCRUD);
  router.get("/deleta-crud", homeController.deleteCRUD);

  router.post("/post-crud", homeController.postCRUD);
  router.post("/pust-crud", homeController.pustCRUD);

  //user Api
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);

  //allCode Api
  router.get("/allcode", userController.getAllCode);

  return app.use("/", router);
  // rest api
};

module.exports = initWebRoutes;
