import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import axios from 'axios'
import PropTypes from 'prop-types'
import { register } from '../../actions/auth'

const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async (e) => {
        e.preventDefault()
        if (password !== password2) {
            console.log("Password do not match")
            setAlert('Password do not match', 'danger')
        } else {

            register({ name, email, password })
            // console.log("Password match")
            // setAlert('Password match', 'success')
            // const newUser = {
            //     name,
            //     email,
            //     password
            // }

            // try {
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'Access-Control-Allow-Origin': '*'
            //         }
            //     }

            //     const body = JSON.stringify(newUser)

            //     const res = await axios.post('/api/users/register', body, config)

            //     console.log(res.data)

            // } catch (err) {
            //     console.log(err.response.data)
            // }
        }
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className="container">
            <div className="col-12" style={{ border: "0px", padding: "2em" }}>
                <form onSubmit={e => onSubmit(e)}>
                    <div class="form-group">
                        <label >Name</label>
                        <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter name" name="name" value={name} onChange={e => onChange(e)} />
                        {/* <small class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div class="form-group">
                        <label >Email address</label>
                        <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={e => onChange(e)} />
                        {/* <small class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div class="form-group">
                        <label >Password</label>
                        <input type="password" class="form-control" aria-describedby="emailHelp" placeholder="Enter password" name="password" value={password} onChange={e => onChange(e)} />
                        {/* <small class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div class="form-group">
                        <label >Confirm Password</label>
                        <input type="password" class="form-control" aria-describedby="emailHelp" placeholder="Confirm password" name="password2" value={password2} onChange={e => onChange(e)} />
                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)