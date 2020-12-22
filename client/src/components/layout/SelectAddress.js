import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { paymentHandler, createRazorpayOrder, captureRazorpayOrder } from '../../actions/payment'
import { Redirect } from 'react-router-dom'

const SelectAddress = ({ paymentHandler, createRazorpayOrder, captureRazorpayOrder, order, payment }) => {

    const { orderDetails } = order
    const { razorpayOrder, razorpayCapture } = payment

    if (orderDetails === null) {
        return <Redirect to='/' />
    }

    if (razorpayCapture !== null) {
        return <Redirect to='/' />
    }

    const amount = orderDetails.amountPayable

    const onClick = e => {
        e.preventDefault()
        createRazorpayOrder({ orderDetails })
    }

    if (razorpayOrder != null) {
        const options = {
            key: process.env.RAZOR_PAY_TEST_KEY,
            name: "Your App Name",
            description: "Some Description",
            order_id: razorpayOrder.id,
            handler: async (response) => captureRazorpayOrder({ orderDetails, response, razorpayOrderId: razorpayOrder.id }),
            theme: {
                color: '#686CFD'
            }
        }
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    return (
        <div className="container">
            <div className="row">
                <h1>Order Detials</h1>
            </div>
            <div>
                <button onClick={(e) => onClick(e)}>Proceed to Pay &#8377;{amount} </button>
            </div>
        </div>
    )
}

SelectAddress.propTypes = {
    paymentHandler: PropTypes.func.isRequired,
    createRazorpayOrder: PropTypes.func.isRequired,
    captureRazorpayOrder: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    order: state.order,
    payment: state.payment
})

export default connect(mapStateToProps, { paymentHandler, createRazorpayOrder, captureRazorpayOrder })(SelectAddress)