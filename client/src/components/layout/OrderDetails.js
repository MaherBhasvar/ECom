import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import ProductRow from './ProductRow'
import { removeBuyNowProductDetails, changeProductQuantity } from '../../actions/product'
import { createOrder } from '../../actions/order'
import product from '../../reducers/product'

const OrderDetails = ({ buyNowProduct, removeBuyNowProductDetails, changeProductQuantity, createOrder, isAuthenticated, orderDetails }) => {

    const onChange = (e, index, id) => {
        changeProductQuantity({ index, id, value: e.target.value })
    }

    if (buyNowProduct === null) {
        return <Redirect to='/' />
    }

    if (isAuthenticated === false) {
        return <Redirect to='/login' />
    }

    if (orderDetails !== null) {
        return <Redirect to='/selectAddress' />
    }


    // const shipping = 5
    console.log(buyNowProduct)
    // console.log(buyNowProductList)
    const totalAmount = buyNowProduct.map((eachProduct, index) => eachProduct.displayPrice * eachProduct.quantity).reduce((a, b) => a + b, 0)

    return (
        <div className="container">
            <div className="row">
                <h1>Order Details</h1>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {buyNowProduct && buyNowProduct.map(eachProduct => <ProductRow key={eachProduct.id} {...eachProduct} />)} */}
                        {buyNowProduct && buyNowProduct.map((eachProduct, index) => (
                            <tr key={eachProduct.id}>
                                <td>{eachProduct.name}</td>
                                <td>&#8377;{eachProduct.displayPrice}</td>
                                <td>{eachProduct.name === "Shipping Charges" ? 1 : <input type="number" name="quantity" value={eachProduct.quantity} onChange={e => onChange(e, index, eachProduct._id)} />}</td>
                                <td>&#8377;{eachProduct.displayPrice * eachProduct.quantity}</td>
                            </tr>
                        ))}
                        {/* <tr>
                            <td>Shipping Charges</td>
                            <td>&#8377;{shipping}</td>
                            <td></td>
                            <td>&#8377;{shipping}</td>
                        </tr> */}
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <th>Total: </th>
                            <th>&#8377; {totalAmount}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={() => removeBuyNowProductDetails()}>Cancel Order</button>
                <button onClick={() => createOrder({ buyNowProduct, totalAmount })} >Place Order</button>
            </div>
        </div>
    )
}

OrderDetails.propTypes = {
    buyNowProduct: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    orderDetails: PropTypes.object.isRequired,
    removeBuyNowProductDetails: PropTypes.func.isRequired,
    changeProductQuantity: PropTypes.func.isRequired,
    createOrder: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    buyNowProduct: state.product.buyNowProduct,
    isAuthenticated: state.auth.isAuthenticated,
    orderDetails: state.order.orderDetails
})
export default connect(mapStateToProps, { removeBuyNowProductDetails, changeProductQuantity, createOrder })(OrderDetails)