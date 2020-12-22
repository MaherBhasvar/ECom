import React, { useState } from 'react'
import { addProduct } from '../../actions/product'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

const Product = ({ addProduct, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        productID: '123',
        name: 'P1',
        description: 'Something',
        price: 9,
        discount: 0,
        displayPrice: 10
    })

    const { productID, name, description, price, discount, displayPrice } = formData

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault()
        addProduct({ productID, name, description, price, discount, displayPrice })

    }

    if (isAuthenticated === false) {
        return <Redirect to='/' />
    }

    return (
        <div className="container">
            <form onSubmit={e => onSubmit(e)}>
                <div class="form-group">
                    <label >Product ID</label>
                    <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter product id" name="productID" value={productID} onChange={e => onChange(e)} required />
                    {/* <small class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div class="form-group">
                    <label >Product Name</label>
                    <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter product name" name="name" value={name} onChange={e => onChange(e)} required />
                    {/* <small class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div class="form-group">
                    <label >Display Price</label>
                    <input type="number" class="form-control" aria-describedby="emailHelp" placeholder="Enter product price" name="displayPrice" value={displayPrice} onChange={e => onChange(e)} required />
                    {/* <small class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

Product.propTypes = {
    addProduct: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addProduct })(Product)