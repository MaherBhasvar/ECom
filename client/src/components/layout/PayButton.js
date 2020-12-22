import React from 'react'
import axios from 'axios'

const PayButton = () => {

    //can be used as a prop in card where details come in as parameter
    //also to be added to car
    const paymentHandler = async (e) => {
        const API_URL = 'http://localhost:5000/api/payment/'
        e.preventDefault();
        const orderUrl = `${API_URL}razorpayOrder/`;
        const response = await axios.get(orderUrl);
        const { data } = response;
        console.log(data)
        const options = {
            key: process.env.RAZOR_PAY_TEST_KEY,
            name: "Your App Name",
            description: "Some Description",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const paymentId = response.razorpay_payment_id;
                    const url = `${API_URL}capture/${paymentId}`;
                    const captureResponse = await axios.post(url, {})
                    console.log(captureResponse.data);
                } catch (err) {
                    console.log(err);
                }
            }, theme: {
                color: "#686CFD",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <button onClick={paymentHandler}>Pay Now</button>
    )
}

export default PayButton