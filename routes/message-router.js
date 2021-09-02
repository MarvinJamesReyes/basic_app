const express = require('express');
const messageController = require('../controllers/message-controller');
const messageValidator = require('../validation/message-validator');
const router = express.Router();

router.get('/list', messageController.list);
router.post('/save', messageValidator.save, messageController.save);
router.get('/:id', messageValidator.idCheck, messageController.load);
router.put('/:id/update', messageValidator.update, messageController.update);
router.delete('/:id/delete', messageValidator.idCheck, messageController.del);

module.exports = router;
