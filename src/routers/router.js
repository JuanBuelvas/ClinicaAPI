//Funcionalidad de Express
const {Router} = require("express");
const router = Router();

const apiRoute = '/api';
//Instanciar objeto de notasController
const pacientes = require('../controllers/pacientesController');

//Router Pacientes
router.get(apiRoute + '/pacientes', pacientes.getAll)
router.post(apiRoute + '/pacientes', pacientes.DatosPacientes);
//router.post(apiRoute + '/pacientes', pacientes.leerDatos);


module.exports = router;