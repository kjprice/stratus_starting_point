export const SET_ROUTES = 'SET_ROUTES';
export const SET_ROUTES_ERROR = 'SET_ROUTES_ERROR';
export const SELECT_ROUTE = 'SELECT_ROUTE';

export const setRoutes = (routes) => {
	return { type: SET_ROUTES, payload: routes };
};

export const setRoutesError = (error) => {
	return { type: SET_ROUTES_ERROR, payload: error };
};

export const selectRoute = (routeId) => {
	return { type: SELECT_ROUTE, payload: routeId };
};
