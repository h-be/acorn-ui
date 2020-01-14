import dagre from 'dagre'
import { goalWidth, goalHeight } from './dimensions'

export default function layoutFormula(screenWidth, goals, edges) {
  // convert objects to arrays for iterating
  const goalsAddressesArray = Object.keys(goals)
  const goalsAsArray = goalsAddressesArray.map(address => goals[address])
  const edgeAddressesArray = Object.keys(edges)
  const edgesAsArray = edgeAddressesArray.map(address => edges[address])
  const coordinates = {}
  if (goalsAsArray.length) {
    const g = new dagre.graphlib.Graph()
      .setGraph({})
      .setDefaultEdgeLabel(function() {
        return {}
      })

    goalsAsArray.forEach(goal => {
      g.setNode(goal.address, {
        width: goalWidth,
        height: goalHeight,
      })
    })
    edgesAsArray.forEach(edge => {
      g.setEdge(edge.parent_address, edge.child_address)
    })
    dagre.layout(g)
    g.nodes().forEach(v => {
      coordinates[v] = {
        x: g.node(v).x,
        y: g.node(v).y,
      }
    })
  }
  return coordinates
}
