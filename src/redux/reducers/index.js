import  {combineReducers} from 'redux'

import authentication from './authentication';


const appReducer = combineReducers({
  authentication,
})
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer