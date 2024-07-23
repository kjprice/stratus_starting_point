import {
	SET_ROUTES,
	SET_ROUTES_ERROR,
	SELECT_ROUTE,
	SET_PAGE,
} from '../actions/routes';

const defaultState = {
	error: null,
	routes: null,
	selectedRoute: null,
	page: 1,
	routeColorsById: {},
};

const setRouteColorsById = (routes) => {
	const routeColorsById = {};
	routes.forEach(({ route_id, route_color }) => {
		routeColorsById[route_id] = '#' + route_color;
	});
	return routeColorsById;
};

const RoutesReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_PAGE:
			return {
				...state,
				page: action.payload,
			};
		case SELECT_ROUTE:
			return {
				...state,
				selectedRoute: action.payload,
			};
		case SET_ROUTES:
			return {
				...state,
				error: null,
				routeColorsById: setRouteColorsById(action.payload),
				routes: action.payload,
			};
		case SET_ROUTES_ERROR:
			return {
				...state,
				routes: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default RoutesReducer;
