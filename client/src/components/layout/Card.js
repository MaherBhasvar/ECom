import React from 'react'
import img1 from '../../img/img1.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadBuyNowProductDetails } from '../../actions/product'
import PropTypes from 'prop-types'

const Card = ({ _id, productID, name, price, displayPrice, loadBuyNowProductDetails }) => {
    return (
        <div className="card col-md-4" style={{ border: "0px", padding: "2em" }}>
            <img src={img1} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p>&#8377;{displayPrice} <span><sub><del>&#8377;{displayPrice}</del></sub></span></p>
                {/* <p>Quantity: 1</p> */}
                <button type="button" class="btn btn-warning">Add to Cart</button>
                <Link onClick={() => loadBuyNowProductDetails({ _id })} type="button" className="btn btn-success" to="/orderDetails">Buy Now</Link>
            </div>
        </div>
    );
}

Card.propTypes = {
    loadBuyNowProductDetails: PropTypes.func.isRequired
}

export default connect(null, { loadBuyNowProductDetails })(Card);