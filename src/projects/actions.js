/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

// see https://github.com/holochain/hc-redux-middleware/blob/ed0177981644946fa15058cb4e6125fca0f3b897/src/lib/actionCreator.ts#L49
import { createHolochainAdminAsyncAction } from 'connoropolous-hc-redux-middleware'

const INTERFACE_ID = 'websocket-interface'

/* action creator functions */

/* see
https://github.com/holochain/holoscape/blob/e0c94afa12e28387a37781394282ab12f391d96b/views/conductor_config.js#L65
https://github.com/holochain/holochain-rust/blob/9564458505299c668fbf7fb311eaad86a07c6551/crates/conductor_lib/src/conductor/admin.rs#L84
*/
const createProjectDna = {
  create: (id, uuid) =>
    createHolochainAdminAsyncAction('admin', 'dna', 'install_from_file').create(
      {
        id,
        copy: true,
        // can add a 'properties' key on here if we want
        path: './dnas/projects/dist/projects.dna.json',
        uuid,
      }
    ),
}

/* see
https://github.com/holochain/holoscape/blob/e0c94afa12e28387a37781394282ab12f391d96b/views/conductor_config.js#L82
https://github.com/holochain/holochain-rust/blob/9564458505299c668fbf7fb311eaad86a07c6551/crates/conductor_lib/src/conductor/admin.rs#L193
*/
const createProjectInstance = {
  create: (id, dna) =>
    createHolochainAdminAsyncAction('admin', 'instance', 'add').create({
      id,
      dna_id: dna,
      agent_id: 'development-agent', // TODO: change this
    }),
}

/* see
https://github.com/holochain/holoscape/blob/cfc1f2d8969dba02c4fbeb0ec62bfa7819d0ed21/views/install_bundle_view.js#L489
*/
const startInstance = {
  create: instanceId =>
    createHolochainAdminAsyncAction('admin', 'instance', 'start').create({
      id: instanceId,
    }),
}

/* see
https://github.com/holochain/holoscape/blob/e0c94afa12e28387a37781394282ab12f391d96b/views/conductor_config.js#L112
*/
const addInstanceToInterface = {
  create: instanceId =>
    createHolochainAdminAsyncAction(
      'admin',
      'interface',
      'add_instance'
    ).create({
      interface_id: INTERFACE_ID,
      instance_id: instanceId,
    }),
}

const fetchProjectsDnas = createHolochainAdminAsyncAction(
  'admin',
  'dna',
  'list'
)

const fetchProjectsInstances = createHolochainAdminAsyncAction(
  'admin',
  'instance',
  'list'
)

export {
  startInstance,
  addInstanceToInterface,
  createProjectDna,
  createProjectInstance,
  fetchProjectsDnas,
  fetchProjectsInstances,
}
