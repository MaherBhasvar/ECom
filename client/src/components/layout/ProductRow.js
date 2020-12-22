import React, { useState } from 'react'

const ProductRow = ({ name, displayPrice }) => {

    const [formData, setFormData] = useState({
        quantity: 1
    })

    const { quantity } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    return (
        <tr>
            <td>{name}</td>
            <td>{displayPrice}</td>
            <td><input type="number" name="quantity" value={quantity} onChange={e => onChange(e)} /></td>
            <td>{displayPrice * quantity}</td>
        </tr>
    )
}

export default ProductRow