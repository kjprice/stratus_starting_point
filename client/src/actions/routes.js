export const SET_ROUTES = 'SET_ROUTES';
export const SET_ROUTES_ERROR = 'SET_ROUTES_ERROR';
export const SELECT_ROUTE = 'SELECT_ROUTE';
export const SET_PAGE = 'SET_PAGE';

export const setRoutes = (routes) => {
	return { type: SET_ROUTES, payload: routes };
};

export const setRoutesError = (error) => {
	return { type: SET_ROUTES_ERROR, payload: error };
};

export const selectRoute = (routeInfo) => {
	return { type: SELECT_ROUTE, payload: routeInfo };
};

export const setPage = (page) => {
	return { type: SET_PAGE, payload: page };
};
