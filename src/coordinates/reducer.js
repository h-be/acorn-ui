import {
    SET_COORDINATES,
  } from './actions'
  
  const defaultState = {
    coordinates: []
  }
  
  export default function(state = defaultState, action) {
    const { payload, type } = action
    switch (type) {
      case SET_COORDINATES:
        return {
          ...state,
          coordinates: payload.coordinates
        }
      default:
        return state
    }
  }