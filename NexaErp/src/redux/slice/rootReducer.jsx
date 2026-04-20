import { combineReducers } from '@reduxjs/toolkit'
import tenantReducer from './tenantSlice'
import userReducer from './userSlice'
import uiReducer from './sidebarSlice'
import branchReducer from './branchSlice'
import roleReducer from './roleSlice'
import companyReducer from './companySlice'

const rootReducer = combineReducers({
  tenants: tenantReducer,
  users: userReducer,
  ui: uiReducer,
  branches: branchReducer,
  roles: roleReducer,
  companies: companyReducer,
})

export default rootReducer
