import path from 'path'

// defined in conductor-config.json and bundle.toml (for holoscape)
export const INTERFACE_ID = 'Acorn-interface'
export const PROFILES_INSTANCE_NAME = 'acorn-profiles-instance'
export const PROFILES_ZOME_NAME = 'acorn_profiles'
export const PROJECTS_ZOME_NAME = 'acorn_projects'
export const DEFAULT_HOLOCHAIN_HOST = 'localhost'

export const AGENT_ID = 'acorn-profiles-instance-agent'

export const cell_id = [
  {
    hash: Buffer.from([
      0x54,
      0x6c,
      0x93,
      0x85,
      0x9e,
      0x32,
      0xa6,
      0xa3,
      0x1f,
      0xb4,
      0x0d,
      0x4c,
      0x75,
      0x8d,
      0x5e,
      0xcd,
      0x26,
      0xdf,
      0x72,
      0xd3,
      0xe2,
      0xd8,
      0x87,
      0xde,
      0x14,
      0xe9,
      0x79,
      0x78,
      0x49,
      0x20,
      0x95,
      0x36,
      0x64,
      0x3f,
      0x6b,
      0xc2,
    ]),
    hash_type: Buffer.from([0x84, 0x2d, 0x24]),
  },
  // AgentPubKey
  {
    hash: Buffer.from([
      0xec,
      0xbb,
      0x43,
      0x93,
      0xb9,
      0x00,
      0xae,
      0x42,
      0x76,
      0x7e,
      0x48,
      0xcc,
      0x44,
      0x26,
      0x7a,
      0xc0,
      0xc4,
      0x02,
      0xb3,
      0x0d,
      0x80,
      0x33,
      0x16,
      0x8a,
      0xc4,
      0xff,
      0x1e,
      0xb1,
      0xa3,
      0x57,
      0x38,
      0x4e,
      0xa7,
      0x48,
      0x2f,
      0x88,
    ]),
    hash_type: Buffer.from([0x84, 0x20, 0x24]),
  },
]

// this will error if not in a nodejs/electron runtime
// which is the desired behaviour
const getAppDataDir = () => {
  const { app } = window.require('electron').remote

  // only enable default persona... relates to holoscape behaviours from
  // https://github.com/holochain/holoscape/blob/2a755b2ca16c9cbffba179c72c0d4132f2fc5a71/conductor.js#L7-L9
  const holoscapeOrStandalone =
    app.name === 'holoscape' ? 'Holoscape-default' : 'Acorn'
  const rootConfigPath = path.join(
    app.getPath('appData'),
    holoscapeOrStandalone
  )
  return rootConfigPath
}

const getProjectsDnaPath = () => {
  let dna_path
  try {
    // getAppDataDir will throw error if we're not in Electron
    // as is the case during development
    const appDataDir = getAppDataDir()
    // replaced by webpack based on build environment variables
    const PROJECTS_DNA_ADDRESS = __PROJECTS_DNA_ADDRESS__
    // this is based on the behaviour of Holoscape
    // and then mirrored as behaviour within standalone
    dna_path = path.join(appDataDir, 'dna', `${PROJECTS_DNA_ADDRESS}.dna.json`)
  } catch (e) {
    // associated with acorn-hc and a development
    // environment
    dna_path = './dnas/projects/dist/projects.dna.json'
    console.log(
      'Not within an electron environment, falling back to default PROJECTS_DNA_PATH: ' +
        dna_path
    )
  }
  return dna_path
}

export const PROJECTS_DNA_PATH = getProjectsDnaPath()
