// 3rd Party Modules
const { Router } = require('express');
  
// Local Modules
const productsAPIController = require('../controllers/productsAPIController');
const productsAPIControllerDB = require('../controllers/productsAPIControllerDB');
  
// Initialization
const router = Router();
  
// Requests 
router.get('/v1/produtos', productsAPIController.getProduts);
router.get('/v1/produtos/:id', productsAPIController.getProdutsById);
router.post('/v1/produtos', productsAPIController.createProduct);
router.put('/v1/produtos/:id', productsAPIController.updateProduct);
router.delete('/v1/produtos/:id', productsAPIController.deleteProduct);

router.get('/v2/produtos', productsAPIControllerDB.getProduts);
router.get('/v2/produtos/:id', productsAPIControllerDB.getProdutsById);
router.post('/v2/produtos', productsAPIControllerDB.createProduct);
router.put('/v2/produtos/:id', productsAPIControllerDB.updateProduct);
router.delete('/v2/produtos/:id', productsAPIControllerDB.deleteProduct);
  
module.exports = router;