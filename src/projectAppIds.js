import { cellIdToString } from 'connoropolous-hc-redux-middleware/build/main/lib/actionCreator'
import { getAppWs, getAdminWs } from './hcWebsockets'
import { PROFILES_APP_ID } from './holochainConfig'

export async function getAllApps() {
  const adminWs = await getAdminWs()
  const appWs = await getAppWs()
  const appIds = await adminWs.listActiveAppIds()
  const appProjects = await Promise.all(
    appIds.map(async app_id => {
      const appInfo = await appWs.appInfo({ app_id })
      return {
        ...appInfo,
        cellIdString: cellIdToString(appInfo.cell_data[0][0])
      }
    })
  )
  return _.keyBy(appProjects,'app_id')
}

export async function getProjectCellIdStrings() {
  const allApps = await getAllApps()
  return Object
    .keys(allApps)
    // the PROFILES app is not a PROJECTS app so rule it out
    .filter(appId => appId !== PROFILES_APP_ID)
    .map(appId => allApps[appId].cellIdString)
}


