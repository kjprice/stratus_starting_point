const JSONService = require('./JSONService');

class EntranceService extends JSONService {
	constructor(dataPath) {
		super(dataPath);

		this.router.get(`/route/:id`, this.byRoute.bind(this));
	}

	// retrieve a list of entrances by route id
	async byRoute(req, res) {
		const id = req.params.id;
		const skip = req.query.skip || 0;
		const top = req.query.top || 20;
		const filtered = this.data.filter((r) => r.routes.some((r) => r == id));

		// return up to n (top) rows, beginning at skip
		setTimeout(() => {
			res.send(filtered.slice(skip, skip + top));
		}, Math.random() * 3000);
	}
}

module.exports = EntranceService;
