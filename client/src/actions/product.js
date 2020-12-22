import axios from 'axios'
import { ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAIL, GET_PRODUCT_LIST, LOAD_BUY_NOW_PRODUCT_DETAILS, REMOVE_BUY_NOW_PRODUCT_DETAILS, BUY_NOW_ORDER_DETAILS, CHANGE_PRODUCT_QUANTITY } from './types'
import { setAlert } from './alert'


export const buyNowOrderDetails = ({ id }) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

        const res = await axios.get(`/api/order/product/${id}`, config)

        dispatch({
            type: BUY_NOW_ORDER_DETAILS,
            payload: res.data
        })
    } catch (err) {

    }
}

export const changeProductQuantity = ({ index, id, value }) => async dispatch => {
    dispatch({
        type: CHANGE_PRODUCT_QUANTITY,
        payload: { index, id, value }
    })
}

export const removeBuyNowProductDetails = () => async dispatch => {
    dispatch({
        type: REMOVE_BUY_NOW_PRODUCT_DETAILS,
    })
}

export const loadBuyNowProductDetails = ({ _id }) => async dispatch => {
    dispatch({
        type: LOAD_BUY_NOW_PRODUCT_DETAILS,
        payload: _id
    })
}

export const getProduct = () => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

        const res = await axios.get('/api/products/getTop10', config)

        dispatch({
            type: GET_PRODUCT_LIST,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        // console.log(err.response.data)
    }
}

export const addProduct = ({ productID, name, description, price, discount, displayPrice }) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }
    const body = JSON.stringify({ productID, name, description, price, discount, displayPrice })

    try {
        const res = await axios.post('/api/products/add', body, config)

        // console.log(res.data)
        dispatch({
            type: ADD_PRODUCT_SUCCESS,
            payload: res.data
        })

        dispatch(setAlert('Product added successfully', 'success'))

    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        // console.log(err.response.data)
        dispatch({
            type: ADD_PRODUCT_FAIL
        })
    }
}