import { goalWidth, goalHeight, cornerRadius } from './dimensions'
import { closeGoalForm } from '../goal-form/actions'

function findAParent(edges, address) {
  // highly oversimplified
  const edge = edges.find(e => e.child_address === address)
  return edge ? edge.parent_address : null
}
function findChilds(edges, address) {
  // highly oversimplified
  const childs = edges.filter(e => e.parent_address === address)
  return childs.length > 0 ? childs.map(e => { return e.child_address }) : null
}
function mapGoalToHierarchy(goal, edges) {
  // setup and run a recursive call to find depth/hierarchy in the graph
  // TODO: make this more resilient, highly oversimplified
  let hierarchy = 1

  function checkHierarchy(address) {
    const parent = findAParent(edges, address)

    if (parent) {
      // increment the hierarchy var each time an additional parent
      // is found
      hierarchy++
      checkHierarchy(parent)
    }
  }

  checkHierarchy(goal.address)
  // console.log(hierarchy)
  const parent = findAParent(edges, goal.address)
  const childs = findChilds(edges, goal.address)
  return {
    hierarchy,
    goal,
    parent,
    childs
  }
}


function checkConflict(coordinates, withHierarchies) {
  const horizontalSpacing = 20
  const totalWidth = goalWidth + horizontalSpacing

  const moveFamily = (address, delta, childs) => {
    coordinates[address].x += delta;
    if (childs) childs.forEach((value) => {
      moveFamily(value, delta, withHierarchies.find(value2 => { return value2.goal.address === value }).childs)

    })
  }
  const childsConflict = (childs) => {
    if (childs) {
      let bool = { bool: false, value: 1 }
      childs.forEach(
        address => {
          Object.keys(coordinates).forEach(
            value => {
              if (value !== address &&
                (coordinates[value].x === coordinates[address].x && coordinates[value].y === coordinates[address].y
                  || coordinates[value].x < coordinates[address].x && coordinates[address].x < coordinates[value].x + totalWidth && coordinates[value].y === coordinates[address].y)) {
                bool = { bool: true, value: 1 }
              } else if (coordinates[address].x < coordinates[value].x && coordinates[value].x < coordinates[address].x + totalWidth && coordinates[value].y === coordinates[address].y) {
                bool = { bool: true, value: -1 }
              }
            }
          )
        }
      )
      return bool
    } else {
      return { bool: false, value: 1 }
    }
  }
  const innerCheckConflict = () => {

    let bool
    do {
      bool = false
      const firstTier = withHierarchies.filter((wH) => wH.hierarchy === 1)
      firstTier.forEach(wH => {
        const aux = childsConflict(wH.childs)
        if (aux.bool === true) {

          moveFamily(wH.goal.address, aux.value * totalWidth / 2, wH.childs)
          bool = true

        }
      })
    } while (bool)
    return coordinates
  }
  return innerCheckConflict()
}



function mapHierarchyToPosition({ goal, hierarchy, parent }, withHierarchies, screenWidth, coordinates) {
  const verticalOffset = 10
  const verticalSpacing = 100
  const horizontalSpacing = 20
  // FIXME: this needs to be related to the display pixel ratio or something
  const RETINA_HACK_HALFSCREEN = 4
  const sameTier = withHierarchies.filter((wH) => wH.hierarchy === hierarchy)

  const sameTierBrother = withHierarchies.filter((wH) => wH.parent === parent)

  const indexInTierBrother = sameTierBrother.map((wH) => wH.goal.address).indexOf(goal.address)

  const indexInTier = sameTier.map((wH) => wH.goal.address).indexOf(goal.address)
  const horizontalHalfScreen = screenWidth / RETINA_HACK_HALFSCREEN
  const halfGoalWidth = goalWidth / 2
  const totalWidth = goalWidth + horizontalSpacing
  let x = 0
  if (hierarchy === 1) { x = horizontalHalfScreen + (indexInTier * totalWidth) - ((sameTier.length - 1) * totalWidth) / 2 - halfGoalWidth }
  else { x = coordinates[parent].x + (indexInTierBrother * totalWidth) - ((sameTierBrother.length - 1) * totalWidth) / 2 }

  // default position is a function of the hierarchical status of the goal
  const y = verticalOffset + hierarchy * (goalHeight + verticalSpacing)
  return {
    address: goal.address,
    coordinate: {
      x,
      y
    }
  }
}

export default function layoutFormula(screenWidth, goals, edges) {
  // convert objects to arrays for iterating
  const goalsAddressesArray = Object.keys(goals)
  const goalsAsArray = goalsAddressesArray.map(address => goals[address])
  const edgeAddressesArray = Object.keys(edges)
  const edgesAsArray = edgeAddressesArray.map(address => edges[address])

  // assign hierarchical statuses to things
  const withHierarchies = goalsAsArray.map(g => mapGoalToHierarchy(g, edgesAsArray))
  // use positions in the hierarchy to determine coordinates
  let coordinates = {}
  withHierarchies.forEach(wH => {
    const { address, coordinate } = mapHierarchyToPosition(wH, withHierarchies, screenWidth, coordinates)
    coordinates[address] = coordinate

  })
  coordinates = checkConflict(coordinates, withHierarchies)
  return coordinates
}
