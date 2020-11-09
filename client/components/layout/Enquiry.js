import React, { useState } from 'react';
import Card from './Card';
import axios from 'axios'

const Enquiry = () => {

    const [formData, setFormData] = useState({
        name: 'Maher',
        email: 'maher@gmail.com',
        phone: '123456789',
        description: 'Sample Description',
        alert: 'none'
    });

    const { name, email, phone, description, alert } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault()
        console.log(formData)
        const enquiryData = { name, email, phone, description }
        const config = { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        const body = JSON.stringify(enquiryData)
        try {
            const res = await axios.post('http://localhost:5000/api/enquiry/', enquiryData, config)
            console.log(res.data)
            setFormData({ ...formData, alert: true })
        } catch (err) {
            console.log(err)
            setFormData({ ...formData, alert: false })
        }
    }

    const alertTrue = (
        <div class="alert alert-success col-12" role="alert">
            This is success alert. Mail Received.
        </div>
    )
    const alertFalse = (
        <div class="alert alert-danger col-12" role="alert">
            This is failure alret. Try again after some time.
        </div>
    )

    return (
        <div className="container">
            <div className="row">
                {alert === true ? alertTrue : alert === false ? alertFalse : ""}
            </div>
            <div className="row">
                <Card />
                <div className="col-8" style={{ border: "0px", padding: "2em" }}>
                    <form onSubmit={e => onSubmit(e)}>
                        <div class="form-group">
                            <label >Name</label>
                            <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter name" name="name" value={name} onChange={e => onChange(e)} required />
                            {/* <small class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div class="form-group">
                            <label >Email address</label>
                            <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={e => onChange(e)} required />
                            {/* <small class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div class="form-group">
                            <label >Phone Number</label>
                            <input type="number" class="form-control" aria-describedby="emailHelp" placeholder="Enter phone" name="phone" value={phone} onChange={e => onChange(e)} required />
                            {/* <small class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div class="form-group">
                            <label >Description</label>
                            <textarea class="form-control" rows="3" placeholder="Enter description" name="description" value={description} onChange={e => onChange(e)} ></textarea>
                        </div>

                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Enquiry