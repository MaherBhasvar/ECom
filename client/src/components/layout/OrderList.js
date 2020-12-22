import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getOrderList } from '../../actions/order'

const OrderList = ({ orderList, getOrderList }) => {

    const currentOrders = orderList.filter(order => order.status === 'Pending Delivery')
    const pastOrders = orderList.filter(order => order.status === 'Delivered')
    return (
        <div>
            <h1>Current Orders</h1>
            {currentOrders && currentOrders.map(order => (
                <div>
                </div>
            ))}
            <h1>Past Orders</h1>
            {pastOrders && pastOrders.map(order => (
                <div>
                </div>
            ))}
        </div>

    )
}

OrderList.propTypes = {
    orderList: PropTypes.object.isRequired,
    getOrderList: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    orderList: state.order.orderList
})

export default connect(mapStateToProps, getOrderList)(OrderList)