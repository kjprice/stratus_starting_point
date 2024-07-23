const fs = require('fs');
const path = require('path');

const JSONService = require('./JSONService');

module.exports = {
	getRoutes: async (app) => {
		const dataPath = path.join(__dirname, '../fixtures');
		const jsonFixtures = await fs.promises.readdir(dataPath);
		const files = jsonFixtures.filter((f) => f.endsWith('json'));
		const routes = [];

		for (const index in files) {
			const file = files[index];
			const moduleName = path.basename(file, path.extname(file));

			let ServiceClass = JSONService;
			// routes with their a unique service
			try {
				ServiceClass = require(`./${moduleName}.js`);
			} catch {}

			serviceModule = new ServiceClass(path.join(dataPath, file));
			serviceModule.init();

			routes.push({
				name: serviceModule.routeName,
				router: serviceModule.router,
			});
		}

		return routes;
	},
};
