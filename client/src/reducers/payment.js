/* eslint-disable import/no-anonymous-default-export */
import { RAZORPAY_ORDER_SUCCESS, RAZORPAY_ORDER_FAIL, RAZORPAY_CAPTURE_SUCCESS, RAZORPAY_CAPTURE_FAIL } from '../actions/types'

const initialState = {
    razorpayOrder: null,
    razorpayCapture: null
}

export default function (state = initialState, action) {
    const { payload, type } = action

    switch (type) {
        case RAZORPAY_CAPTURE_SUCCESS:
            return {
                ...state,
                razorpayCapture: payload,
                razorpayOrder: null
            }
        case RAZORPAY_ORDER_SUCCESS:
            return {
                ...state,
                razorpayOrder: payload
            }
        case RAZORPAY_ORDER_FAIL:
        case RAZORPAY_CAPTURE_FAIL:
        default:
            return state
    }
}