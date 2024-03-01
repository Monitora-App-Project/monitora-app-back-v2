const express = require("express");

const atletaRouter = express.Router();

const AtletaController = require("../../controllers/Atleta");
const AtletaValidator = require("../../validators/Atleta");
const auth = require("../../middlewares/authentication");

atletaRouter.get("/", AtletaValidator.getAll, auth.authenticateToken, AtletaController.getAll);
atletaRouter.get("/fields", AtletaValidator.getAll, auth.authenticateToken, AtletaController.getByFields);
atletaRouter.get("/:usuario", AtletaValidator.getByUsuario, auth.authenticateToken, AtletaController.getByUsuario);
atletaRouter.post(
  "/",
  // AtletaValidator.create,
  // auth.authenticateToken,
  AtletaController.create
);
atletaRouter.put("/:usuario", AtletaValidator.update, auth.authenticateToken, AtletaController.update);
atletaRouter.delete("/:usuario", AtletaValidator.delete, auth.authenticateToken, AtletaController.delete);

module.exports = atletaRouter;
