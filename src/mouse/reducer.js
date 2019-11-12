/*
  There should be a reducer.js file in every feature folder.
  It should define and export a function which takes a state
  and an action, applies that action to the state, and return
  a new state.
*/

import {
  SET_MOUSEDOWN,
  UNSET_MOUSEDOWN,
  SET_COORDINATE,
  UNSET_COORDINATE,
  SET_GOALS,
  UNSET_GOALS,
  SET_SIZE,
  UNSET_SIZE

} from './actions'

const defaultState = {
  mousedown: false,
  coordinate:{
    x:0,
    y:0
  },
  size:{
    w:0,
    h:0
  },
  goals:null
}

export default function(state = defaultState, action) {
  const { coordinate,type,goalsAdresses,size } = action
  switch (type) {
    case SET_MOUSEDOWN:
      return {
        ...state,
        mousedown: true
      }
    case UNSET_MOUSEDOWN:
      return {
        ...state,
        mousedown: false
      }
      case SET_COORDINATE:
        return{
          ...state,
          coordinate:coordinate
        }
        case UNSET_COORDINATE:
            return{
              ...state,
              coordinate:{x:0,y:0}
            }
      case SET_GOALS:
        return{
          ...state,
          goalsAdresses
        }
        case UNSET_GOALS:
        return{
          ...state,
          goalsAdresses:null
        }
        case SET_SIZE:
        return{
          ...state,
              size
        }
        case UNSET_SIZE:
        return{
          ...state,
              size:{w:0,h:0}
        }
    default:
      return state
  }
}
