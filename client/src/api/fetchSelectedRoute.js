let controller;
import store from '../store';
import {
	selectRoute,
	selectRouteInProgress,
	selectRouteError,
} from '../actions/routes';

// Will use abort signal to kill previous (in progress) calls
const fetchMostRecentSelectedRoute = (routeId, page = 1) => {
	if (controller) {
		controller.abort('New request found');
	}
	controller = new AbortController();
	const signal = controller.signal;
	store.dispatch(selectRouteInProgress());
	return fetch(`/api/entrances/route/${routeId}?skip=${20 * (page - 1)}`, {
		signal,
	})
		.then((res) => res.json())
		.then((route) => store.dispatch(selectRoute(route)))
		.catch((error) => store.dispatch(selectRouteError(error.message)));
};

export default fetchMostRecentSelectedRoute;
