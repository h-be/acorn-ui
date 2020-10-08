import { cellIdToString } from 'connoropolous-hc-redux-middleware/build/main/lib/actionCreator'
import { getAppWs } from './hcWebsockets'

const PROJECT_APP_IDS_KEY = 'acorn-project-app-ids'

let appDirectory

// Persist as an object to avoid duplicate entries

export function getProjectAppIds(asObj) {
  const obj = JSON.parse(localStorage.getItem(PROJECT_APP_IDS_KEY) || "{}")
  if (asObj) return obj
  else return Object.keys(obj)
}

export function addProjectAppId(projectAppId) {
  localStorage.setItem(
    PROJECT_APP_IDS_KEY,
    JSON.stringify({
      ...getProjectAppIds(true),
      [projectAppId]: projectAppId,
    })
  )
}

export async function getAllApps() {
  if (appDirectory) {
    return appDirectory
  } else {
    const appWs = await getAppWs()
    appDirectory = _.keyBy(
      await Promise.all(
        getProjectAppIds().map(async app_id => {
          const appInfo = await appWs.appInfo({ app_id })
          return {
            ...appInfo,
            cellIdString: cellIdToString(appInfo.cell_data[0][0])
          }
        })
      ),
      'app_id'
    )
    return appDirectory
  }
}

export function addApp(appInfo) {
  if (!appDirectory) {
    throw new Error(
      "can't add app while appDirectory hasn't been initialized. call getAllApps first"
    )
  }
  appDirectory[appInfo.app_id] = {
    ...appInfo,
    cellIdString: cellIdToString(appInfo.cell_data[0][0])
  }
  return appDirectory[appInfo.app_id]
}
