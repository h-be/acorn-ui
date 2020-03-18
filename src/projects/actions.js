/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

// see https://github.com/holochain/hc-redux-middleware/blob/ed0177981644946fa15058cb4e6125fca0f3b897/src/lib/actionCreator.ts#L49
import { createHolochainAdminAsyncAction } from '@holochain/hc-redux-middleware'

/* action creator functions */

/* see
https://github.com/holochain/holoscape/blob/e0c94afa12e28387a37781394282ab12f391d96b/views/conductor_config.js#L65
https://github.com/holochain/holochain-rust/blob/9564458505299c668fbf7fb311eaad86a07c6551/crates/conductor_lib/src/conductor/admin.rs#L84
*/
const createProjectDna = {
  create: id =>
    createHolochainAdminAsyncAction('admin', 'dna', 'install_from_file').create(
      {
        id,
        copy: true,
        // can add a 'properties' key on here if we want
        path: './dist/acorn.dna.json',
        uuid: '128ykjasdhfas98a', // TODO: change this
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
      agent_id: 'hc-run-agent', // TODO: change this
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
  createProjectDna,
  createProjectInstance,
  fetchProjectsDnas,
  fetchProjectsInstances,
}
