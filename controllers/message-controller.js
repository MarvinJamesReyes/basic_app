const MessageModel = require('../models/message-model')

module.exports = {
	async list(req, res, next) {
		try {
			const model = new MessageModel();
			const results = await model.list(model.table);
			const message = 'List of records';

			return res.json({ message, results });
		} catch(err) { next(err) }
	},

	async save(req, res, next) {
		const { record } = req.body;

		try {
			const model = new MessageModel(record);
			const [results] = await model.save();
			const message = 'Record saved';

			return res.status(201).json({ message, results });
		} catch(err) { next(err) }
	},

	async load(req, res, next) {
		const { id } = req.params;

		try {
			const model = new MessageModel({ id });
			const [results] = await model.load();
			const message = 'Record loaded';

			if (!results) return res.json({ message: 'Record not found' });
			return res.json({ message, results });
		} catch(err) { next(err) }
	},

	async update(req, res, next) {
		const { id } = req.params;
		const { record } = req.body;

		try {
			const model = new MessageModel({ id, ...record });
			const [results] = await model.update();
			const message = 'Record updated';

			if (!results) return res.json({ message: 'Record not found' });
			return res.json({ message, results });
		} catch(err) { next(err) }
	},

	async del(req, res, next) {
		const { id } = req.params;

		try {
			const model = new MessageModel({ id });
			const [results] = await model.del();
			const message = 'Record deleted';

			if (!results) return res.json({ message: 'Record not found' });
			return res.json({ message, results });
		} catch(err) { next(err) }
	},
};