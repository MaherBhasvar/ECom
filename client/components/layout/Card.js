import React from 'react'
import img1 from '../../img/img1.png'
import { Link } from 'react-router-dom'

const Card = () => {
    return (
        <div className="card col-sm-4" style={{ border: "0px", padding: "2em" }}>
            <img src={img1} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <Link to="/enquiry" className="btn btn-primary">Enquire Now</Link>
            </div>
        </div>
    );
}

export default Card;