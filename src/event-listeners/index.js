import _ from 'lodash'

import { coordsPageToCanvas } from '../drawing/coordinateSystems'
import {
  checkForGoalAtCoordinates,
  checkForGoalAtCoordinatesInBox,
} from '../drawing/eventDetection'

import { selectGoal, unselectGoal, unselectAll } from '../selection/actions'
import { hoverGoal, unhoverGoal } from '../hover/actions'
import {
  setGKeyDown,
  unsetGKeyDown,
  setShiftKeyDown,
  unsetShiftKeyDown,
  setCtrlKeyDown,
  unsetCtrlKeyDown,
} from '../keyboard/actions'
import {
  setMousedown,
  unsetMousedown,
  setCoordinate,
  unsetCoordinate,
  unsetGoals,
  setGoals,
  setSize,
  unsetSize,
} from '../mouse/actions'
import {
  openGoalForm,
  closeGoalForm,
  updateContent,
} from '../goal-form/actions'
import { archiveGoal } from '../projects/goals/actions'
import { setScreenDimensions } from '../screensize/actions'
import { changeTranslate, changeScale } from '../viewport/actions'
import { openExpandedView } from '../expanded-view/actions'
import { MOUSE, TRACKPAD } from '../local-preferences/reducer'

import layoutFormula from '../drawing/layoutFormula'
import { setGoalClone } from '../goal-clone/actions'

import cloneGoals from './cloneGoals'

export default function setupEventListeners(store, canvas) {
  function windowResize(event) {
    // Get the device pixel ratio, falling back to 1.
    const dpr = window.devicePixelRatio || 1
    // Get the size of the canvas in CSS pixels.
    const rect = canvas.getBoundingClientRect()
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    store.dispatch(setScreenDimensions(rect.width * dpr, rect.height * dpr))
  }

  function bodyKeydown(event) {
    let state = store.getState()
    const {
      ui: { activeProject },
    } = state
    // there are event.code and event.key ...
    // event.key is keyboard layout independent, so works for Dvorak users
    switch (event.key) {
      case 'g':
        // only dispatch SET_G_KEYDOWN if it's not already down
        if (state.ui.keyboard.gKeyDown) {
          event.preventDefault()
        } else {
          store.dispatch(setGKeyDown())
        }
        break
      case 'e':
        if (
          state.ui.selection.selectedGoals.length === 1 &&
          !state.ui.goalForm.isOpen &&
          !state.ui.expandedView.isOpen
        ) {
          store.dispatch(openExpandedView(state.ui.selection.selectedGoals[0]))
        }
        break
      case 'Shift':
        store.dispatch(setShiftKeyDown())
        break
      case 'Escape':
        store.dispatch(closeGoalForm())
        store.dispatch(unselectAll())
        break
      case 'Backspace':
        // archives one goal for now FIXME: should be able to archive many goals
        let selection = state.ui.selection
        // only dispatch if something's selected and the createGoal window is
        // not open
        if (
          selection.selectedGoals.length > 0 &&
          !state.ui.goalForm.isOpen &&
          !state.ui.expandedView.isOpen
        ) {
          let firstOfSelection = selection.selectedGoals[0]
          store.dispatch(
            archiveGoal(activeProject).create({ address: firstOfSelection })
          )
          // if on firefox, and matched this case
          // prevent the browser from navigating back to the last page
          event.preventDefault()
        }
        break
      case 'Control':
        store.dispatch(setCtrlKeyDown())
        break
      case 'c':
        if (state.ui.keyboard.ctrlKeyDown) {
          if (state.ui.selection.selectedGoals.length) {
            // use first
            store.dispatch(setGoalClone(state.ui.selection.selectedGoals))
          }
        }
        break
      case 'v':
        if (state.ui.keyboard.ctrlKeyDown) {
          if (state.ui.goalClone.goals.length) {
            cloneGoals(store)
          }
        }
        break
      default:
        // console.log(event)
        break
    }
    // console.log(event)
  }

  function bodyKeyup(event) {
    // there are event.code and event.key ...
    // event.key is keyboard layout independent, so works for Dvorak users
    switch (event.key) {
      case 'g':
        store.dispatch(unsetGKeyDown())
        break
      case 'Shift':
        store.dispatch(unsetShiftKeyDown())
        break
      case 'Control':
        store.dispatch(unsetCtrlKeyDown())
        break
      default:
        // console.log(event)
        break
    }
  }

  function canvasMousemove(event) {
    const state = store.getState()
    let convertedMouse, goalAddressesToSelect
    const {
      ui: {
        viewport: { translate, scale },
        mouse: {
          coordinate: { x, y },
          goalsAddresses,
        },
        screensize: { width },
      },
    } = state
    if (state.ui.mouse.mousedown) {
      if (event.shiftKey) {
        convertedMouse = coordsPageToCanvas(
          {
            x: event.clientX,
            y: event.clientY,
          },
          translate,
          scale
        )

        if (!goalsAddresses) {
          store.dispatch(setCoordinate(convertedMouse))
        }
        store.dispatch(
          setSize({ w: convertedMouse.x - x, h: convertedMouse.y - y })
        )
        goalAddressesToSelect = checkForGoalAtCoordinatesInBox(
          width,
          state,
          convertedMouse,
          { x, y }
        )
        store.dispatch(setGoals(goalAddressesToSelect))
      } else {
        store.dispatch(changeTranslate(event.movementX, event.movementY))
      }
      return
    }
    const goalAddress = checkForGoalAtCoordinates(
      canvas.getContext('2d'),
      translate,
      scale,
      width,
      state,
      event.clientX,
      event.clientY
    )
    if (goalAddress && state.ui.hover.hoveredGoal !== goalAddress) {
      store.dispatch(hoverGoal(goalAddress))
    } else if (!goalAddress && state.ui.hover.hoveredGoal) {
      store.dispatch(unhoverGoal())
    }
  }

  // don't allow this function to be called more than every 200 milliseconds
  const debouncedWheelHandler = _.debounce(
    event => {
      const state = store.getState()
      const {
        ui: {
          localPreferences: { navigation },
        },
      } = state
      if (!state.ui.goalForm.isOpen) {
        // from https://medium.com/@auchenberg/detecting-multi-touch-trackpad-gestures-in-javascript-a2505babb10e
        // and https://stackoverflow.com/questions/2916081/zoom-in-on-a-point-using-scale-and-translate
        if (
          navigation === MOUSE ||
          (navigation === TRACKPAD && event.ctrlKey)
        ) {
          // Normalize wheel to +1 or -1.
          const wheel = event.deltaY < 0 ? 1 : -1
          const zoomIntensity = 0.05
          // Compute zoom factor.
          const zoom = Math.exp(wheel * zoomIntensity)
          const mouseX = event.clientX
          const mouseY = event.clientY
          store.dispatch(changeScale(zoom, mouseX, mouseY))
        } else {
          // invert the pattern so that it uses new mac style
          // of panning
          store.dispatch(changeTranslate(-1 * event.deltaX, -1 * event.deltaY))
        }
      }
    },
    2,
    { leading: true }
  )

  function canvasWheel(event) {
    debouncedWheelHandler(event)
    event.preventDefault()
  }

  function canvasClick(event) {
    const state = store.getState()
    // goalsAddresses are Goals to be selected
    const {
      ui: {
        mouse: { goalsAddresses },
      },
    } = state

    // if the GoalForm is open, any click on the
    // canvas should close it
    if (state.ui.goalForm.isOpen) {
      store.dispatch(closeGoalForm())
    }
    // opening the GoalForm is dependent on
    // holding down the `g` keyboard key modifier
    else if (state.ui.keyboard.gKeyDown) {
      let parentAddress
      if (state.ui.selection.selectedGoals.length) {
        // use first
        parentAddress = state.ui.selection.selectedGoals[0]
      }
      const calcedPoint = coordsPageToCanvas(
        {
          x: event.clientX,
          y: event.clientY,
        },
        state.ui.viewport.translate,
        state.ui.viewport.scale
      )
      store.dispatch(
        openGoalForm(calcedPoint.x, calcedPoint.y, null, parentAddress)
      )
    }
    // finishing a drag box selection action
    else if (goalsAddresses) {
      goalsAddresses.forEach(value => store.dispatch(selectGoal(value)))
    } else {
      // check for node in clicked area
      // select it if so
      const {
        ui: {
          viewport: { translate, scale },
          screensize: { width },
        },
      } = state
      const clickedAddress = checkForGoalAtCoordinates(
        canvas.getContext('2d'),
        translate,
        scale,
        width,
        state,
        event.clientX,
        event.clientY
      )
      if (clickedAddress) {
        // if the shift key is being use, do an 'additive' select
        // where you add the Goal to the list of selected
        if (!event.shiftKey) {
          store.dispatch(unselectAll())
        }
        // if using shift, and Goal is already selected, unselect it
        if (
          event.shiftKey &&
          state.ui.selection.selectedGoals.indexOf(clickedAddress) > -1
        ) {
          store.dispatch(unselectGoal(clickedAddress))
        } else {
          store.dispatch(selectGoal(clickedAddress))
        }
      } else {
        // If nothing was selected, that means empty
        // spaces was clicked: deselect everything
        store.dispatch(unselectAll())
      }
    }
    // clear box selection vars
    store.dispatch(unsetCoordinate())
    store.dispatch(unsetGoals())
    store.dispatch(unsetSize())
  }

  function canvasMousedown(event) {
    store.dispatch(setMousedown())
  }

  function canvasMouseup(event) {
    store.dispatch(unsetMousedown())
  }

  function canvasDblclick(event) {
    const state = store.getState()
    const {
      ui: {
        activeProject,
        viewport: { translate, scale },
        screensize: { width },
      },
    } = state
    const goals = state.projects.goals[activeProject] || {}
    const goalAddress = checkForGoalAtCoordinates(
      canvas.getContext('2d'),
      translate,
      scale,
      width,
      state,
      event.clientX,
      event.clientY
    )
    if (goalAddress) {
      let goalCoord = layoutFormula(width, state)[goalAddress]
      store.dispatch(unselectAll())
      store.dispatch(openGoalForm(goalCoord.x, goalCoord.y, goalAddress))
      store.dispatch(updateContent(goals[goalAddress].content))
    }
  }

  window.addEventListener('resize', windowResize)
  document.body.addEventListener('keydown', bodyKeydown)
  document.body.addEventListener('keyup', bodyKeyup)
  // TODO: debounce/throttle this so that it doesn't fire crazy frequently and
  // kill performance
  canvas.addEventListener('mousemove', canvasMousemove)
  canvas.addEventListener('wheel', canvasWheel)
  canvas.addEventListener('mousedown', canvasMousedown)
  canvas.addEventListener('mouseup', canvasMouseup)
  canvas.addEventListener('dblclick', canvasDblclick)
  // This listener is bound to the canvas only so clicks on other parts of
  // the UI like the GoalForm won't trigger it.
  canvas.addEventListener('click', canvasClick)

  return function cleanup() {
    window.removeEventListener('resize', windowResize)
    document.body.removeEventListener('keydown', bodyKeydown)
    document.body.removeEventListener('keyup', bodyKeyup)
    // TODO: debounce/throttle this so that it doesn't fire crazy frequently and
    // kill performance
    canvas.removeEventListener('mousemove', canvasMousemove)
    canvas.removeEventListener('wheel', canvasWheel)
    canvas.removeEventListener('mousedown', canvasMousedown)
    canvas.removeEventListener('mouseup', canvasMouseup)
    canvas.removeEventListener('dblclick', canvasDblclick)
    // This listener is bound to the canvas only so clicks on other parts of
    // the UI like the GoalForm won't trigger it.
    canvas.removeEventListener('click', canvasClick)
  }
}
