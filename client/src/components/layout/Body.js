import React from 'react';
import Cards from './Cards';

const Body = () => {
    return (
        <div className="container">
            <div className="row">
                {/* <div className="col-3" style={{ backgroundColor: "red" }} /> */}
                <Cards />
                {/* <div className="col-3" style={{ backgroundColor: "red" }} /> */}
            </div>
        </div>
    );
}

export default Body;