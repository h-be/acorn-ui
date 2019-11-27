/*
  There should be a reducer.js file in every feature folder.
  It should define and export a function which takes a state
  and an action, applies that action to the state, and return
  a new state.
*/

import {
    SET_IS_RENDER,
    UNSET_IS_RENDER,
  } from './actions'
  
  const defaultState = {
      render:false,
    hierarchies:[
        {
            name: 'Leaf',
            icon: 'leaf.svg',
            description: 'small goal'
        },
        {
            name: 'Branch',
            icon: 'branch-with-leaf.png',
            description: 'sub-goal'
        },
        {
            name: 'Trunk',
            icon: 'trunk.png',
            description: 'high-level goal'
        },
        {
            name: 'Root',
            icon: 'root.png',
            description: 'primary goal'
        },
        {
            name: 'No Hierarchy',
        }
    ]
  }
  
  export default function(state = defaultState, action) {
    const { type } = action
    switch (type) {
        case SET_IS_RENDER:
            return {
                ...state,
                render:true
            }
            case UNSET_IS_RENDER:
            return {
                ...state,
                render:false
            }
      default:
        return state
    }
  }