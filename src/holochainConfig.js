import path from 'path'

// defined in conductor-config.json and bundle.toml
export const PROFILES_INSTANCE_NAME = 'acorn-profiles-instance'
export const PROFILES_ZOME_NAME = 'acorn_profiles'
export const PROJECTS_ZOME_NAME = 'acorn_projects'

export const PROFILES_DNA_NAME = 'profiles.dna.gz'

// THIS IS DEFINED IN holochain-run-dna
// lib in use by acorn-hc
export const TEST_APP_ID = 'test-app'

export const cell_id = [
 {
   hash: Buffer.from([0x50]),
   hash_type: Buffer.from([0x50])
 },
 {
   hash: Buffer.from([0x50]),
   hash_type: Buffer.from([0x50])
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
    dna_path = path.join(appDataDir, 'dna', `projects.dna.gz`)
  } catch (e) {
    // associated with acorn-hc and a development
    // environment
    dna_path = './dnas/projects/projects.dna.gz'
    console.log(
      'Not within an electron environment, falling back to default PROJECTS_DNA_PATH: ' +
        dna_path
    )
  }
  return dna_path
}

export const PROJECTS_DNA_PATH = getProjectsDnaPath()
