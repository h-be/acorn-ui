import { goalWidth, getGoalHeight, goalHeight } from './dimensions'
import layoutFormula from './layoutFormula'
import { coordsPageToCanvas } from './coordinateSystems'

export function checkForGoalAtCoordinates(
  ctx,
  translate,
  scale,
  width,
  goals,
  edges,
  clickX,
  clickY
) {
  // get coordinates of all goals
  const coordinates = layoutFormula(width, goals, edges)
  // convert the coordinates of the click to canvas space
  const convertedClick = coordsPageToCanvas(
    {
      x: clickX,
      y: clickY,
    },
    translate,
    scale
  )

  // keep track of whether a goal was selected
  let clickedAddress
  Object.keys(goals)
    .map(address => goals[address])
    .forEach(goal => {
      // convert the topLeft and bottomRight points of the goal to canvas
      const coords = coordinates[goal.address]
      const bottomRight = {
        x: coords.x + goalWidth,
        y: coords.y + getGoalHeight(ctx, goal.content),
      }

      // if click occurred within the box of a Goal
      if (
        convertedClick.x >= coords.x &&
        (convertedClick.x <= bottomRight.x) & (convertedClick.y >= coords.y) &&
        convertedClick.y <= bottomRight.y
      ) {
        clickedAddress = goal.address
      }
    })
  return clickedAddress
}
export function checkForGoalAtCoordinatesInBox(
  width,
  goals,
  edges,
  convertedClick,
  convertedIni
) {
  // get coordinates of all goals
  const coordinates = layoutFormula(width, goals, edges)
  // convert the coordinates of the click to canvas space
  // keep track of whether a goal was selected
  let clickedAddresses = {}
  Object.keys(goals)
    .map(address => goals[address])
    .forEach(goal => {
      // convert the topLeft and bottomRight points of the goal to canvas
      const coords = coordinates[goal.address]
      const bottomRight = {
        x: coords.x + goalWidth,
        y: coords.y + goalHeight,
      }

      // if click occurred within the box of a Goal
      if (
        (convertedIni.x < coords.x &&
          bottomRight.x < convertedClick.x &&
          convertedIni.y < coords.y &&
          bottomRight.y < convertedClick.y) ||
        (convertedIni.x > bottomRight.x &&
          coords.x > convertedClick.x &&
          convertedIni.y > bottomRight.y &&
          coords.y > convertedClick.y) ||
        (convertedIni.x > bottomRight.x &&
          coords.x > convertedClick.x &&
          convertedIni.y < coords.y &&
          bottomRight.y < convertedClick.y) ||
        (convertedIni.x < coords.x &&
          bottomRight.x < convertedClick.x &&
          convertedIni.y > bottomRight.y &&
          coords.y > convertedClick.y)
      ) {
        clickedAddresses[goal.address] = 1
      }
    })
  return Object.keys(clickedAddresses)
}
