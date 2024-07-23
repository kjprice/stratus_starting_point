let controller;
import store from './store';
import { selectRoute } from './actions/routes';

// Will use abort signal to kill previous (in progress) calls
const fetchMostRecentSelectedRoute = (routeId) => {
	if (controller) {
		controller.abort('New request found');
	}
	controller = new AbortController();
	const signal = controller.signal;
	return fetch(`/api/entrances/route/${routeId}`, { signal })
		.then((res) => res.json())
		.then((route) => store.dispatch(selectRoute(route)));
};

export default fetchMostRecentSelectedRoute;
