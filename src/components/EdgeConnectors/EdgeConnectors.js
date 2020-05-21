import React from 'react'
import { connect } from 'react-redux'
import './EdgeConnectors.css'
import layoutFormula from '../../drawing/layoutFormula'
import { Transition, TransitionGroup } from 'react-transition-group'
import {
  goalWidth,
  getGoalHeight,
  CONNECTOR_VERTICAL_SPACING,
} from '../../drawing/dimensions'
import {
  setEdgeConnectorFrom,
  RELATION_AS_CHILD,
  RELATION_AS_PARENT,
} from '../../edge-connector/actions'

// checks if 'checkAddress' is an ancestor of 'descendantAddress', by looking through 'edges'
// is relatively easy because each Goal only has ONE parent
// e.g. we can walk straight up the tree to the top
function isAncestor(descendantAddress, checkAddress, edges) {
  const edgeWithParent = edges.find(
    edge => edge.child_address === descendantAddress
  )
  if (edgeWithParent) {
    if (edgeWithParent.parent_address === checkAddress) {
      return true
    } else {
      return isAncestor(edgeWithParent.parent_address, checkAddress, edges)
    }
  } else {
    // if node has no ancestors, then checkAddress must not be an ancestor
    return false
  }
}

// as long as there are no cycles in the tree this will work wonderfully
function allDescendants(ancestorAddress, edges, accumulator = []) {
  const children = edges
    .filter(edge => edge.parent_address === ancestorAddress)
    .map(edge => edge.child_address)
  return accumulator
    .concat(children.map(address => allDescendants(address, edges, children)))
    .flat()
}

/*
validate edges that can be created:
relation as child, other node MUST
- not be itself
- not be a descendant of 'from' node, to prevent cycles in the tree
*/
function calculateValidParents(fromAddress, edges, goalAddresses) {
  const descendants = allDescendants(fromAddress, edges)
  return goalAddresses.filter(goalAddress => {
    return (
      // filter out self-address in the process
      goalAddress !== fromAddress &&
      // filter out any descendants
      !descendants.includes(goalAddress)
    )
  })
}

/*
validate edges that can be created:
relation as parent, other node MUST
- not be itself
- have no parent
- not be the root ancestor of 'from' node, to prevent cycles in the tree
*/
function calculateValidChildren(fromAddress, edges, goalAddresses) {
  return goalAddresses.filter(goalAddress => {
    return (
      // filter out self-address in the process
      goalAddress !== fromAddress &&
      // find the Goal objects without parent Goals
      // since they will sit at the top level
      !edges.find(edge => edge.child_address === goalAddress) &&
      !isAncestor(fromAddress, goalAddress, edges)
    )
  })
}

const EdgeConnector = ({
  state,
  goal,
  hasParent,
  relation,
  address,
  goalCoordinates,
  canvas,
  setEdgeConnectorFrom,
  edges,
  goalAddresses,
}) => {
  const ctx = canvas.getContext('2d')
  const goalHeight = getGoalHeight(ctx, goal.content)

  const topConnectorLeft = goalCoordinates.x + goalWidth / 2
  const topConnectorTop = goalCoordinates.y - CONNECTOR_VERTICAL_SPACING

  const bottomConnectorLeft = goalCoordinates.x + goalWidth / 2
  const bottomConnectorTop =
    goalCoordinates.y + goalHeight + CONNECTOR_VERTICAL_SPACING

  // should only show when the Goal has no parent, since it can only have one
  // a connection to this upper port would make this Goal a child of the current 'from' Goal of the edge connector
  // if there is one
  const canShowTopConnector =
    !hasParent && (!relation || relation === RELATION_AS_PARENT)

  // a connection to this lower port would make this Goal a parent of the current 'from' Goal of the edge connector
  // if there is one
  const canShowBottomConnector = !relation || relation === RELATION_AS_CHILD

  return (
    <>
      {/* top connector */}
      {canShowTopConnector && (
        <div
          className='edge-connector'
          style={{ top: `${topConnectorTop}px`, left: `${topConnectorLeft}px` }}
          onClick={() =>
            setEdgeConnectorFrom(
              address,
              RELATION_AS_CHILD,
              calculateValidParents(address, edges, goalAddresses)
            )
          }>
          <div className='edge-connector-blue-dot' />
        </div>
      )}

      {/* bottom connector */}
      {canShowBottomConnector && (
        <div
          className='edge-connector'
          style={{
            top: `${bottomConnectorTop}px`,
            left: `${bottomConnectorLeft}px`,
          }}
          onClick={() =>
            setEdgeConnectorFrom(
              address,
              RELATION_AS_PARENT,
              calculateValidChildren(address, edges, goalAddresses)
            )
          }>
          <div className='edge-connector-blue-dot' />
        </div>
      )}
    </>
  )
}

const EdgeConnectors = ({
  goals,
  edges,
  goalAddresses,
  coordinates,
  relation,
  connectorAddresses,
  canvas,
  setEdgeConnectorFrom,
}) => {
  return (
    <TransitionGroup>
      {connectorAddresses.map(connectorAddress => {
        const goalCoordinates = coordinates[connectorAddress]
        const goal = goals[connectorAddress]
        const hasParent = edges.find(
          edge => edge.child_address === connectorAddress
        )
        return (
          <Transition key={connectorAddress} timeout={1000}>
            {state => (
              <EdgeConnector
                state={state}
                goal={goal}
                edges={edges}
                goalAddresses={goalAddresses}
                relation={relation}
                hasParent={hasParent}
                address={connectorAddress}
                setEdgeConnectorFrom={setEdgeConnectorFrom}
                goalCoordinates={goalCoordinates}
                canvas={canvas}
              />
            )}
          </Transition>
        )
      })}
    </TransitionGroup>
  )
}

function mapStateToProps(state) {
  const {
    ui: { activeProject },
  } = state
  const goals = state.projects.goals[activeProject] || {}
  const edges = state.projects.edges[activeProject] || {}
  const coordinates = layoutFormula(state.ui.screensize.width, state)
  const selectedGoalAddresses = state.ui.selection.selectedGoals
  const hoveredGoalAddress = state.ui.hover.hoveredGoal
  const { fromAddress, relation } = state.ui.edgeConnector
  let validToAddresses
  // only set validToAddresses if we are actually utilizing the edge connector right now
  if (fromAddress) {
    validToAddresses = state.ui.edgeConnector.validToAddresses
  }
  return {
    coordinates,
    goals,
    edges: Object.values(edges), // convert from object to array
    goalAddresses: Object.keys(goals), // convert from object to array
    relation,
    connectorAddresses: validToAddresses
      ? validToAddresses
      : hoveredGoalAddress
      ? selectedGoalAddresses
          .concat([hoveredGoalAddress])
          // deduplicate
          .filter((v, i, a) => a.indexOf(v) === i)
      : selectedGoalAddresses,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setEdgeConnectorFrom: (address, relation, validToAddresses) => {
      return dispatch(setEdgeConnectorFrom(address, relation, validToAddresses))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EdgeConnectors)
