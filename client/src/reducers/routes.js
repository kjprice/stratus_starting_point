import { SET_ROUTES, SET_ROUTES_ERROR } from '../actions/routes';

const defaultState = {
	error: null,
	routes: null,
};

const RoutesReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_ROUTES:
			return {
				error: null,
				routes: action.payload,
			};
		case SET_ROUTES_ERROR:
			return {
				routes: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default RoutesReducer;
