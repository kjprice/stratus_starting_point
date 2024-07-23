const env = process.env;
const express = require('express');
const app = express();
const port = env.API_PORT || 9010;
const { getRoutes } = require('./routes');

const listen = async () => {
	const routes = await getRoutes(app);
	routes.forEach((route) => {
		app.use(`/api/${route.name}`, route.router);
	});

	app.listen(port, () => {
		console.log(`StartingPoint API listening on ${port}`);
	});
};

listen();
