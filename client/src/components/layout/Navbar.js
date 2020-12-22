import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'

const Navbar = ({ logout, auth }) => {
    const authLinks = (
        <ul className='nav justify-content-end' style={{ backgroundColor: "grey", marginBottom: "5em" }}>
            <li className='nav-item'>
                <Link onClick={logout} className="nav-link text-light " to='/'>Logout</Link>
            </li>
        </ul>
    )
    const guestLinks = (
        <ul className='nav justify-content-end' style={{ backgroundColor: "grey", marginBottom: "5em" }}>
            <li className='nav-item'>
                <Link className="nav-link text-light " to='/register'>Register</Link>
            </li>
            <li className='nav-item'>
                <Link className="nav-link text-light " to='/login'>Login</Link>
            </li>
        </ul>
    )

    return (
        <Fragment>
            {!auth.loading && auth.isAuthenticated ? authLinks : guestLinks}

        </Fragment>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);