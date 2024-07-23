const path = require('path');
const fs = require('fs');
const express = require('express');

class JSONService {
	constructor(dataPath) {
		this.dataPath = dataPath;
		this.routeName = path.basename(dataPath, path.extname(dataPath));
		this.router = express.Router();
		this.router.get(`/`, this.find.bind(this));
		this.router.get(`/:id`, this.find.bind(this));

		this.init = this.init.bind(this);
	}

	async init() {
		if (!this.dataPath) {
			throw new Error('dataPath is undefined, unable to load data');
		}

		const data = await fs.promises.readFile(this.dataPath, {
			encoding: 'utf8',
		});
		this.data = JSON.parse(data);
		this.keyProperty = Object.keys(this.data[0])[0];
	}

	async find(req, res) {
		const id = req.params.id;
		const top = req.query.top || 100;
		const skip = req.query.skip || 0;

		// an id is present as /:routeName/:id
		if (id) {
			return res.send(
				this.data.find((r) => {
					return (r[this.keyProperty] = id);
				})
			);
		}

		// return up to n (top) rows, beginning at skip
		setTimeout(() => {
			res.send(this.data.slice(skip, skip + top));
		}, Math.random() * 3000);
	}
}

module.exports = JSONService;
