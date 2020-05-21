import { RELATION_AS_PARENT, resetEdgeConnector } from './actions'
import { createEdge } from '../projects/edges/actions'

export default function handleEdgeConnectMouseUp(store) {
  const state = store.getState()
  const { fromAddress, relation, toAddress } = state.ui.edgeConnector
  const { activeProject } = state.ui
  if (fromAddress && toAddress) {
    const fromAsParent = relation === RELATION_AS_PARENT
    const createEdgeAction = createEdge(activeProject).create({
      edge: {
        parent_address: fromAsParent ? fromAddress : toAddress,
        child_address: fromAsParent ? toAddress : fromAddress,
      },
    })
    store.dispatch(createEdgeAction)
  }
  store.dispatch(resetEdgeConnector())
}
