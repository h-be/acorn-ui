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
const getHoloscapeDir = () => {
  const { app } = window.require('electron').remote
  // mirroring holoscape behaviours from
  // https://github.com/holochain/holoscape/blob/2a755b2ca16c9cbffba179c72c0d4132f2fc5a71/conductor.js#L7-L9
  const persona = process.env.HOLOSCAPE_PERSONA
    ? process.env.HOLOSCAPE_PERSONA
    : 'default'
  const rootConfigPath = path.join(
    app.getPath('appData'),
    'Holoscape-' + persona
  )
  return rootConfigPath
}

const PROJECTS_DNA_ADDRESS = 'QmSBCuE94MdSXXpMrvn8UA1CpNsXqfh37YhMU3SsiKMh46'
const getProjectsDnaPath = () => {
  let dna_path
  // just try getting holoscape config dir first, since it failing will get caught and
  // function normally within Acorn electron app
  try {
    const holoscapeDir = getHoloscapeDir()
    dna_path = path.join(
      holoscapeDir,
      'dna',
      `${PROJECTS_DNA_ADDRESS}.dna.json`
    )
  } catch (e) {
    dna_path = './dnas/projects/dist/projects.dna.json'
    console.log(
      'Not within an electron environment, falling back to default PROJECTS_DNA_PATH: ' +
        dna_path
    )
  }
  return dna_path
}

export const PROJECTS_DNA_PATH = getProjectsDnaPath()
