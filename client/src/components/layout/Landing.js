import React, { useEffect } from 'react'
import Cards from './Cards';
import PayButton from './PayButton';
import { getProduct } from '../../actions/product'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Card from './Card'
import { Redirect } from 'react-router-dom';


const Landing = ({ getProduct, productList, buyNowProduct }) => {

    if (buyNowProduct !== null) {
        return <Redirect to='/orderDetails' />
    }

    return (
        <div className="container">
            {/* <div className="col-3" style={{ backgroundColor: "red" }} /> */}
            {/* <PayButton /> */}
            <div className="row" style={{ margin: "auto" }}>
                {productList !== null && productList.map(product => (<Card key={product._id} {...product} />))}
            </div>
            {/* <Cards /> */}
            {/* <div className="col-3" style={{ backgroundColor: "red" }} /> */}
        </div>

    )
}

Landing.propTypes = {
    getProduct: PropTypes.func.isRequired,
    productList: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    productList: state.product.productList,
    buyNowProduct: state.product.buyNowProduct
})
export default connect(mapStateToProps, { getProduct })(Landing);