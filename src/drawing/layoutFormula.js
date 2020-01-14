import dagre from 'dagre'
import { goalWidth, goalHeight } from './dimensions'

export default function layoutFormula(screenWidth, goals, edges) {
  // convert objects to arrays for iterating
  const goalsAddressesArray = Object.keys(goals)
  const goalsAsArray = goalsAddressesArray.map(address => goals[address])
  const edgeAddressesArray = Object.keys(edges)
  const edgesAsArray = edgeAddressesArray.map(address => edges[address])
  // create a graph
  const graph = new dagre.graphlib.Graph()
    .setGraph({})
    .setDefaultEdgeLabel(function() {
      return {}
    })
  // add each Goal as a node in the graph
  goalsAsArray.forEach(goal => {
    graph.setNode(goal.address, {
      width: goalWidth,
      height: goalHeight,
    })
  })
  // add each edge as an edge in the graph
  edgesAsArray.forEach(edge => {
    graph.setEdge(edge.parent_address, edge.child_address)
  })
  // run the layout algorithm, which will set an x and y property onto
  // each node
  dagre.layout(graph)
  // create a coordinates object
  const coordinates = {}
  // update the coordinates object
  graph.nodes().forEach(address => {
    coordinates[address] = {
      x: graph.node(address).x,
      y: graph.node(address).y,
    }
  })
  return coordinates
}
