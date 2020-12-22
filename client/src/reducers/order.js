/* eslint-disable import/no-anonymous-default-export */
import { CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, RAZORPAY_ORDER_SUCCESS, RAZORPAY_ORDER_FAIL, RAZORPAY_CAPTURE_SUCCESS, RAZORPAY_CAPTURE_FAIL } from '../actions/types'

const initialState = {
    orderList: null,
    orderDetails: null
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {

        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                orderDetails: payload
            }
        case RAZORPAY_CAPTURE_SUCCESS:
            return {
                ...state,
                orderDetails: null
            }
        case CREATE_ORDER_FAIL:
        default:
            return state
    }
}