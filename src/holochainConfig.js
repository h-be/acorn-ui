import path from 'path'

// defined in conductor-config.json and bundle.toml (for holoscape)
export const INTERFACE_ID = 'Acorn-interface'
export const PROFILES_INSTANCE_NAME = 'acorn-profiles-instance'
export const PROFILES_ZOME_NAME = 'acorn_profiles'
export const PROJECTS_ZOME_NAME = 'acorn_projects'
export const DEFAULT_HOLOCHAIN_HOST = 'localhost'

export const AGENT_ID = 'acorn-profiles-instance-agent'

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

// replaced by webpack based on build environment variables
const PROJECTS_DNA_ADDRESS = __PROJECTS_DNA_ADDRESS__
const getProjectsDnaPath = () => {
  let dna_path
  try {
    // getAppDataDir will throw error if we're not in Electron
    // as is the case during development
    const appDataDir = getAppDataDir()
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
