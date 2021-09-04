const express = require('express');
const MessageController = require('../controllers/message-controller');
const messageValidator = require('../validation/message-validator');
const messageController = new MessageController();
const router = express.Router();

router.get('/', messageController.list.bind(messageController));
router.post('/', messageValidator.save, messageController.save.bind(messageController));
router.get('/:id', messageValidator.hasId, messageController.load.bind(messageController));
router.put('/:id', messageValidator.update, messageController.update.bind(messageController));
router.delete('/:id', messageValidator.hasId, messageController.del.bind(messageController));

module.exports = router;