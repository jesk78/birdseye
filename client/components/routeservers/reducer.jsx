
// Routeserver Reducer

import {LOAD_ROUTESERVERS_REQUEST,
        LOAD_ROUTESERVERS_SUCCESS,
        LOAD_ROUTESERVER_STATUS_SUCCESS,

        LOAD_ROUTESERVER_PROTOCOL_REQUEST,
        LOAD_ROUTESERVER_PROTOCOL_SUCCESS,

        LOAD_ROUTESERVER_ROUTES_REQUEST,
        LOAD_ROUTESERVER_ROUTES_SUCCESS,

        SET_PROTOCOLS_FILTER_VALUE,
        SET_ROUTES_FILTER_VALUE}
  from './actions'

const initialState = {
  all: [],
  details: {},
  protocols: {},
  routes: {},

  protocolsFilterValue: "",
  routesFilterValue: "",

  isLoading: false,

  routesAreLoading: false,
  protocolsAreLoading: false
};


export default function reducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_ROUTESERVERS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case LOAD_ROUTESERVERS_SUCCESS:
      return Object.assign({}, state, {
        all: action.payload.routeservers,
        isLoading: false
      });

    case LOAD_ROUTESERVER_ROUTES_REQUEST:
      return Object.assign({}, state, {
        routesAreLoading: true
      });

    case LOAD_ROUTESERVER_PROTOCOL_REQUEST:
      return Object.assign({}, state, {
        protocolsAreLoading: true
      })

    case LOAD_ROUTESERVER_PROTOCOL_SUCCESS:
      var protocols = Object.assign({}, state.protocols, {
        [action.payload.routeserverId]: action.payload.protocol
      });
      return Object.assign({}, state, {
        protocols: protocols,
        protocolsAreLoading: false
      });

    case LOAD_ROUTESERVER_ROUTES_SUCCESS:
      var routes = Object.assign({}, state.routes, {
        [action.payload.protocolId]: action.payload.routes
      });
      return Object.assign({}, state, {
        routes: routes,
        routesAreLoading: false
      });


    case LOAD_ROUTESERVER_STATUS_SUCCESS:
      var details = Object.assign({}, state.details, {
        [action.payload.routeserverId]: action.payload.status
      });
      return Object.assign({}, state, {
        details: details
      });

    case SET_PROTOCOLS_FILTER_VALUE:
    case SET_ROUTES_FILTER_VALUE:
      return Object.assign({}, state, action.payload);

  }
  return state;
}


