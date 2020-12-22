import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import PropTypes from 'prop-types'

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault()
        login({ email, password })

    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className="container">
            <div className="col-12" style={{ border: "0px", padding: "2em" }}>
                <form onSubmit={e => onSubmit(e)}>
                    <div class="form-group">
                        <label >Email address</label>
                        <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={e => onChange(e)} required />
                        {/* <small class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div class="form-group">
                        <label >Password</label>
                        <input type="password" class="form-control" aria-describedby="emailHelp" placeholder="Enter password" name="password" value={password} onChange={e => onChange(e)} required />
                        {/* <small class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

Login.propType = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)