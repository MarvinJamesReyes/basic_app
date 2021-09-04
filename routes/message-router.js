const express = require('express');
const messageController = require('../controllers/message-controller');
const messageValidator = require('../validation/message-validator');
const router = express.Router();

router.get('/', messageController.list);
router.post('/', messageValidator.save, messageController.save);
router.get('/:id', messageValidator.hasId, messageController.load);
router.put('/:id', messageValidator.update, messageController.update);
router.delete('/:id', messageValidator.hasId, messageController.del);

module.exports = router;
