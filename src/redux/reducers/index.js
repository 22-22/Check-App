import  {combineReducers} from 'redux'

import statesAccount from './authentication';
import tasks from './tasks';
import scores from './scores';
import reviewRequest from './reviewRequest';


const appReducer = combineReducers({
  statesAccount,
  tasks,
  scores,
  reviewRequest,
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer