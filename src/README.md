Folders:

- Redux
    - Holochain Actions/Reducers
        - agents
        - goals
        - edges
        - goal-members
        - who-am-i
    - UI only Actions/Reducers
        - goal-form
        - hover
        - keyboard
        - mouse
        - screensize
        - selection
        - viewport
- React
    - components
- HTML5 Canvas
    - drawing


Folders are, in general, organized according to “features”, which relates to slices of the redux state. Such as “keyboard”. 
Within the “keyboard” folder is “actions.js” which defines the action types, and “action creators” for those action types 
https://redux.js.org/basics/actions#action-creators
Also within “keyboard” is “reducer.js” which defines the reducer which acts as the primary handler for those actions.

Heavy use of “spread” (…) operators in reducers is used, to give immutability: https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#immutable-update-patterns

Installing redux dev-tools is highly recommended, to inspect the state and actions and see how the app behaves.
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

All the reducers from the different folders are combined in src/reducer.js

The aspects of redux which interact asynchronously with Holochain, use a library called “hc-redux-middleware”
https://www.npmjs.com/package/@holochain/hc-redux-middleware


This is a sample snapshot of the redux state

```
{

This entire part (agents, goals, edges, goalMembers, whoami) of the redux state is data from Holochain

Agents are essentially the “users”. More data needs to be fetched from Holochain and stored here

  agents: [
    'HcSciGpYDHTaa5dmw583AO7Jy9kHz9K3gu6MtTsB8Nwbfe3y3hD8rOb9aj5B8za'
  ],

“Goals” are the primary content type of the app. They’re fetched from Holochain and stored and updated here in the state

  goals: {
    QmacZTkPm6qNf7sHFuHa8HEg8EPVJ6kcBi4ZyHLr1JrVCN: {
      content: 'Rapid Sensemaking Framework is online and being used everyday',
      user_hash: 'HcSciGpYDHTaa5dmw583AO7Jy9kHz9K3gu6MtTsB8Nwbfe3y3hD8rOb9aj5B8za',
      unix_timestamp: 1571690582945,
      hierarchy: 'Branch',
      status: 'Uncertain',
      address: 'QmacZTkPm6qNf7sHFuHa8HEg8EPVJ6kcBi4ZyHLr1JrVCN'
    },
    QmcHbFkCauYVDBodKu2N1qWr7RNYAet9k7Vd9MC8YwYb4f: {
      content: 'Expression of interest for a grant is made',
      user_hash: 'HcSciGpYDHTaa5dmw583AO7Jy9kHz9K3gu6MtTsB8Nwbfe3y3hD8rOb9aj5B8za',
      unix_timestamp: 1571690614733,
      hierarchy: 'Branch',
      status: 'Uncertain',
      address: 'QmcHbFkCauYVDBodKu2N1qWr7RNYAet9k7Vd9MC8YwYb4f'
    }
  },

Edges are the links between goals, that define a hierarchy in the data

  edges: {
    QmPQCB3Ke58RGnGXRmQagLAtvh9AToa84zgDMM3QybY5mq: {
      parent_address: 'QmacZTkPm6qNf7sHFuHa8HEg8EPVJ6kcBi4ZyHLr1JrVCN',
      child_address: 'QmcHbFkCauYVDBodKu2N1qWr7RNYAet9k7Vd9MC8YwYb4f',
      address: 'QmPQCB3Ke58RGnGXRmQagLAtvh9AToa84zgDMM3QybY5mq'
    },
    QmdH3ZHPYMUsqzMQQzZfTD4NHjdnJfCbwjMoacRJzAB76q: {
      parent_address: 'QmcHbFkCauYVDBodKu2N1qWr7RNYAet9k7Vd9MC8YwYb4f',
      child_address: 'QmbqbF2dBdZBdzQkHaX8zneCfkMz9GU3i1hYgiDCnDmjbC',
      address: 'QmdH3ZHPYMUsqzMQQzZfTD4NHjdnJfCbwjMoacRJzAB76q'
    }
  },

Goal Members are associations between “agents” and “goals”, that relate to who has claimed/assigned to which Goals

  goalMembers: {},

Whoami is information about the local authenticated user

  whoami: {
    dna_address: 'QmTVA7eBGDZ3bg3PYDqDN9voJ267XH3aWwRh8jWy3eXtAe',
    dna_name: 'Acorn',
    agent_id: {
      nick: 'testAgent',
      pub_sign_key: 'HcSciGpYDHTaa5dmw583AO7Jy9kHz9K3gu6MtTsB8Nwbfe3y3hD8rOb9aj5B8za'
    },
    agent_address: 'HcSciGpYDHTaa5dmw583AO7Jy9kHz9K3gu6MtTsB8Nwbfe3y3hD8rOb9aj5B8za'
  },

This entire part of the state is client side only, it has no persistence or relation to Holochain

  ui: {

The UI element that allows users to create a new Goal

    goalForm: {
      editAddress: null,
      parentAddress: null,
      content: '',
      isOpen: false,
      xLoc: 0,
      yLoc: 0
    },

Which goals are currently selected

    selection: {
      selectedGoals: []
    },

Which goal is currently hovered over

    hover: {
      hoveredGoal: null
    },

Which relevant keyboard keys are pressed

    keyboard: {
      shiftKeyDown: false,
      gKeyDown: false
    },

What’s the size of the screen (needs to update on resize)

    screensize: {
      width: 914,
      height: 1906
    },

Relating to the HTML5 Canvas element, how has the “viewport” been “panned” (translated) and “zoomed” (scaled)

    viewport: {
      translate: {
        x: 475.2022418640423,
        y: 174.46835450717361
      },
      scale: 0.44932896411722334
    },

Is the mouse currently being pressed (left/dominant click)

    mouse: {
      mousedown: false
    }
  }
}
```
