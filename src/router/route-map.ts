import { asyncRoutes } from "./routes"
import { AppRouteRecordRaw } from "./types"


const newRoutes = {}
const generateRouteMap = (routes: AppRouteRecordRaw[]) => {
  return routes.map((item) => {
    if (item.children && item.children.length > 0) {
      generateRouteMap(item.children)
    }
    newRoutes[item.name] = item.component
  })
}

generateRouteMap(asyncRoutes)

export const ROUTE_MAP = newRoutes