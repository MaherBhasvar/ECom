/* eslint-disable import/no-anonymous-default-export */
import { ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAIL, GET_PRODUCT_LIST, LOAD_BUY_NOW_PRODUCT_DETAILS, REMOVE_BUY_NOW_PRODUCT_DETAILS, CHANGE_PRODUCT_QUANTITY, RAZORPAY_CAPTURE_SUCCESS } from '../actions/types'

const initialState = {
    productList: null,
    buyNowProduct: null,
    shippingCharges: null
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case CHANGE_PRODUCT_QUANTITY:
            // let product = state.buyNowProduct.find(eachProduct => eachProduct.id === payload.id)
            // product = { ...product, quantity: payload.value }
            // let newBuyNowProduct = state.buyNowProduct
            // newBuyNowProduct[payload.index] = { ...product }
            return {
                ...state,
                buyNowProduct: state.buyNowProduct.map(eachProduct => eachProduct._id === payload.id ? { ...eachProduct, quantity: payload.value } : { ...eachProduct })
            }
        case LOAD_BUY_NOW_PRODUCT_DETAILS:
            return {
                ...state,
                buyNowProduct: [state.productList.find((eachProduct) => eachProduct._id === payload), state.shippingCharges]
            }
        case RAZORPAY_CAPTURE_SUCCESS:
        case REMOVE_BUY_NOW_PRODUCT_DETAILS:
            return {
                ...state,
                buyNowProduct: null
            }
        case GET_PRODUCT_LIST:
            return {
                ...state,
                productList: payload.filter(product => product.name !== "Shipping Charges").map(product => ({ ...product, quantity: 1 })),
                shippingCharges: { ...payload.find(product => product.name === "Shipping Charges"), quantity: 1 }
            }
        case ADD_PRODUCT_SUCCESS:
        case ADD_PRODUCT_FAIL:
        default:
            return {
                ...state
            }
    }
}