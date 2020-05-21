import { goalWidth, getGoalHeight } from './dimensions'

export function calculateEdgeCoordsByGoalCoords(
  childCoords,
  parentCoords,
  parentGoalText,
  ctx
) {
  const parentGoalHeight = getGoalHeight(ctx, parentGoalText)
  const childEdgeCoords = {
    x: childCoords.x + goalWidth / 2,
    y: childCoords.y,
  }
  const parentEdgeCoords = {
    x: parentCoords.x + goalWidth / 2,
    y: parentCoords.y + parentGoalHeight,
  }
  return [childEdgeCoords, parentEdgeCoords]
}

export default function render(edge1port, edge2port, ctx) {
  ctx.beginPath()
  ctx.strokeStyle = '#707070'
  ctx.moveTo(edge1port.x, edge1port.y)
  ctx.lineTo(edge2port.x, edge2port.y)
  ctx.stroke()

  // TODO: draw the arrow at the end of the edge
  // will require some trigonometry
}
