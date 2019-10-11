//把reducer拆成多个后用combineReducers合并
import { combineReducers } from 'redux'
import normal from './reducers/normal'
import other from './reducers/other'
import luckydraw from './reducers/luckydraw'

export default combineReducers({
    normal,
    other,
    luckydraw
})