import React from 'react';
import Cards from './Cards';
import PayButton from './PayButton';

const Body = () => {
    return (
        <div className="container">
            <div className="row">
                {/* <div className="col-3" style={{ backgroundColor: "red" }} /> */}
                <PayButton />
                <Cards />
                {/* <div className="col-3" style={{ backgroundColor: "red" }} /> */}
            </div>
        </div>
    );
}

export default Body;