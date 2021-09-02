const MessageModel = require('../models/message-model')

module.exports = {
	async load(req, res, next) {
		const { id } = req.params;

		try {
			const model = new MessageModel({ id });
			const [results] = await model.load();

			if (!results) return res.send('Record not found');
			return res.json(results);
		} catch(err) { next(err) }
	},

	async list(req, res, next) {
		try {
			const model = new MessageModel();
			const results = await model.list(model.table);

			return res.json({ results });
		} catch(err) { next(err) }
	},

	async save(req, res, next) {
		const { record } = req.body;

		try {
			const model = new MessageModel(record);
			const [results] = await model.save();

			return res.send(`Record Saved - ${results}`);
		} catch(err) { next(err) }
	},

	async update(req, res, next) {
		const { id } = req.params;
		const { record } = req.body;

		try {
			const model = new MessageModel({ id, ...record });
			const [results] = await model.update();

			if (!results) return res.send('Record not found');
			return res.send(`Record Updated - ${results}`);
		} catch(err) { next(err) }
	},

	async del(req, res, next) {
		const { id } = req.params;

		try {
			const model = new MessageModel({ id });
			const [results] = await model.del();

			if (!results) return res.send('Record not found');
			return res.send(`Record Deleted - ${results}`);
		} catch(err) { next(err) }
	},
};