import axios from 'axios'
import { CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, GET_ORDER_LIST_SUCCESS, GET_ORDER_LIST_FAIL } from './types'
import { setAlert } from './alert'


export const getOrderList = () => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

        const res = await axios.get('/api/orders/orderList', config)

        dispatch({
            type: GET_ORDER_LIST_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        // console.log(err.response.data)
        dispatch({
            type: GET_ORDER_LIST_FAIL
        })
    }
}

export const createOrder = ({ buyNowProduct, totalAmount }) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

        const buyNowProductList = buyNowProduct.map(eachProduct => eachProduct.quantity && eachProduct.quantity >= 1 ? { _id: eachProduct._id, productId: eachProduct.productID, quantity: eachProduct.quantity } : dispatch(setAlert('Cannot Proceed, Quantity Not Available', 'danger')))


        const body = JSON.stringify({ buyNowProductList, totalAmount })

        const res = await axios.post('/api/orders/createOrder', body, config)

        dispatch(setAlert('Order Created', 'success'))
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        // console.log(err.response.data)
        dispatch({
            type: CREATE_ORDER_FAIL
        })
    }

}