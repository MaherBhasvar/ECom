import { ORDER_PLACE_SUCCESS, ORDER_PLACE_FAIL, RAZORPAY_ORDER_SUCCESS, RAZORPAY_ORDER_FAIL, RAZORPAY_CAPTURE_SUCCESS, RAZORPAY_CAPTURE_FAIL } from './types'
import axios from 'axios'
import { setAlert } from './alert'

const RAZOR_PAY_KEY_ID = "rzp_live_eEShSHWq06n9De"


export const captureRazorpayOrder = ({ orderDetails, response, razorpayOrderId }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }

    const body = JSON.stringify({ orderId: orderDetails._id, orderAmount: orderDetails.amountPayable, razorpayOrderId, paymentId: response.razorpay_payment_id })

    try {
        const response = await axios.post('/api/payment/capture', body, config)
        dispatch({
            type: RAZORPAY_CAPTURE_SUCCESS,
            payload: response.data
        })
        dispatch(setAlert('Payment Success, Order Placed', 'success'))

    } catch (err) {
        dispatch({
            type: RAZORPAY_CAPTURE_FAIL
        })
        dispatch(setAlert('Payment capture fail', 'danger'))
    }
}


export const createRazorpayOrder = ({ orderDetails }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }

    const body = JSON.stringify({ orderId: orderDetails._id, orderAmount: orderDetails.amountPayable })

    try {
        const response = await axios.post('/api/payment/razorpayOrder', body, config)
        const { data } = response
        console.log(data)
        dispatch({
            type: RAZORPAY_ORDER_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        dispatch({
            type: RAZORPAY_ORDER_FAIL
        })
        // dispatch(setAlert('Razorpay order fail', 'danger'))
    }
}

export const paymentHandler = ({ orderDetails }) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }

    const body = JSON.stringify({ orderId: orderDetails._id, orderAmount: orderDetails.amountPayable })

    try {
        const response = await axios.post('/api/payment/order', body, config)
        const { data } = response
        console.log(data)

        const options = {
            key: RAZOR_PAY_KEY_ID,
            name: "Soft Scan Computer Consultants",
            description: "Some Description",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const paymentId = response.razorpay_payment_id;
                    // const url = `${API_URL}capture/${paymentId}`;
                    const captureResponse = await axios.post(`/api/payment/capture/${paymentId}`, body, config)
                    dispatch({
                        type: ORDER_PLACE_SUCCESS,
                        payload: captureResponse.data
                    })
                    dispatch(setAlert('Order successfully placed', 'success'))
                    console.log(captureResponse.data)
                } catch (err) {
                    console.log(err)
                    dispatch(setAlert('Order failed', 'danger'))
                    dispatch({
                        type: ORDER_PLACE_FAIL
                    })
                }
            },
            theme: {
                color: "#686CFD"
            }
        }
        const rzp1 = new window.Razorpay(options)
        rzp1.open()
    } catch (err) {
        console.log(err)
        dispatch(setAlert('Order failed', 'danger'))
    }


}