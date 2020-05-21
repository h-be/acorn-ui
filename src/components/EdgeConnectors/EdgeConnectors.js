import React from 'react'
import { connect } from 'react-redux'
import './EdgeConnectors.css'
import layoutFormula from '../../drawing/layoutFormula'
import { Transition, TransitionGroup } from 'react-transition-group'
import { goalWidth, getGoalHeight } from '../../drawing/dimensions'
import {
  setEdgeConnectorFrom,
  RELATION_AS_CHILD,
  RELATION_AS_PARENT,
} from '../../edge-connector/actions'

const EdgeConnector = ({
  state,
  goal,
  address,
  goalCoordinates,
  canvas,
  setEdgeConnectorFrom,
}) => {
  const ctx = canvas.getContext('2d')
  const goalHeight = getGoalHeight(ctx, goal.content)

  const CONNECTOR_SPACING = 15
  const topConnectorLeft = goalCoordinates.x + goalWidth / 2
  const topConnectorTop = goalCoordinates.y - CONNECTOR_SPACING

  const bottomConnectorLeft = goalCoordinates.x + goalWidth / 2
  const bottomConnectorTop = goalCoordinates.y + goalHeight + CONNECTOR_SPACING
  return (
    <>
      {/* top connector */}
      <div
        className='edge-connector'
        style={{ top: `${topConnectorTop}px`, left: `${topConnectorLeft}px` }}
        onClick={() => setEdgeConnectorFrom(address, RELATION_AS_CHILD)}
      />
      {/* bottom connector */}
      <div
        className='edge-connector'
        style={{
          top: `${bottomConnectorTop}px`,
          left: `${bottomConnectorLeft}px`,
        }}
        onClick={() => setEdgeConnectorFrom(address, RELATION_AS_PARENT)}
      />
    </>
  )
}

const EdgeConnectors = ({
  goals,
  coordinates,
  connectorAddresses,
  canvas,
  setEdgeConnectorFrom,
}) => {
  return (
    <TransitionGroup>
      {connectorAddresses.map(connectorAddress => {
        const goalCoordinates = coordinates[connectorAddress]
        const goal = goals[connectorAddress]
        return (
          <Transition key={connectorAddress} timeout={1000}>
            {state => (
              <EdgeConnector
                state={state}
                goal={goal}
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
  const goals = state.projects.goals[activeProject]
  const coordinates = layoutFormula(state.ui.screensize.width, state)
  const selectedGoalAddresses = state.ui.selection.selectedGoals
  const hoveredGoalAddress = state.ui.hover.hoveredGoal
  return {
    coordinates,
    goals,
    connectorAddresses: hoveredGoalAddress
      ? selectedGoalAddresses
          .concat([hoveredGoalAddress])
          // deduplicate
          .filter((v, i, a) => a.indexOf(v) === i)
      : selectedGoalAddresses,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setEdgeConnectorFrom: (address, relation) => {
      return dispatch(setEdgeConnectorFrom(address, relation))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EdgeConnectors)
