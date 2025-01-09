const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const vehicleInfoController = require('../controllers/vehicleInfoController');
const aiRecognitionController = require('../controllers/aiRecognitionController');
const eventBasicInfoController = require('../controllers/eventBasicInfoController');
const violationController = require('../controllers/violationController');

// 更新路由配置，使用更簡潔的路徑
router.get('/tickets/:id', ticketController.getTicketById);
router.get('/vehicle-info/:violationId', vehicleInfoController.getVehicleInfoByViolationId);
router.get('/ai-recognition/:violationId', aiRecognitionController.getAiRecognitionByViolationId);
router.get('/event-basic-info/:violationId', eventBasicInfoController.getEventBasicInfoByViolationId);

module.exports = router;
