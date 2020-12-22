import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import product from './product'
import order from './order'
import payment from './payment'

export default combineReducers({ alert, auth, product, order, payment })