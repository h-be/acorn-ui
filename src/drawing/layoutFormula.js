import { goalWidth, goalHeight, cornerRadius } from './dimensions'


function findAParent(edges, address) {
  // highly oversimplified
  const edge = edges.find(e => e.child_address === address)
  return edge ? edge.parent_address : null
}
function findChilds(edges, address) {
  // highly oversimplified
  const childs = edges.filter(e => e.parent_address === address)
  return childs 
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
  var parent=findAParent(edges, goal.address)

  return {
    hierarchy,
    goal,
    parent
  }
}
function maxHierarchi(withHierarchies){
    let max = 0
    withHierarchies.forEach(value=>{
      if(value.hierarchy>max)max=value.hierarchy
    })
    return max 
}
function checkConflict(coordinates,withHierarchies){
  const horizontalSpacing = 20
  let bool=false
  let totalWidth=goalWidth+horizontalSpacing
  const max =maxHierarchi(withHierarchies)
  for (let index = 1; index <=max ; index++) {
    
  const  sameTier=withHierarchies.filter((wH) => wH.hierarchy ===index)
  sameTier.forEach( valueBefore=>{
    const addressBefore=valueBefore.goal.address
    const xAux=coordinates[addressBefore].x
    const yAux=coordinates[addressBefore].y

  sameTier.forEach(
    value=>{  
      const {address}=value.goal
      const x=coordinates[address].x
      const y=coordinates[address].y
      if(addressBefore===address){
        
      }else{
        if(yAux===y){
          if(xAux<x&&x<xAux+totalWidth||x===xAux){
            coordinates[addressBefore]={
              x:xAux-totalWidth/4,
              y:yAux
            }
            console.log(address)
            coordinates[address]={
              x:x+totalWidth/4,
              y:yAux
            }
            bool=true
          }
        }
       
      }
    })})
  }
  return bool?checkConflict(coordinates,withHierarchies):coordinates
}

function mapHierarchyToPosition({ goal, hierarchy,parent }, withHierarchies, screenWidth,coordinates) {
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
  let x=0
  if(hierarchy===1) {x= horizontalHalfScreen + (indexInTier * totalWidth) - ((sameTier.length - 1) * totalWidth) / 2 - halfGoalWidth}
  else {x= coordinates[parent].x + (indexInTierBrother * totalWidth) - ((sameTierBrother.length-1)*totalWidth)/2}
  
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
    const { address, coordinate } = mapHierarchyToPosition(wH, withHierarchies, screenWidth,coordinates)
    coordinates[address] = coordinate
    
  })
  coordinates=checkConflict(coordinates,withHierarchies)
  return coordinates
}
