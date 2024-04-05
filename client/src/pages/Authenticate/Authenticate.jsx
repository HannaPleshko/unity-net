import { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import style from './authenticate.module.scss'

function Authenticate() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/v1/user/authenticate', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Authenticate failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={style.wrapper}>
            <TextField type="email" name="email" label="Enter Email..." value={formData.email} onChange={handleInputChange} required />
            <TextField type="password" name="password" label="Enter Password..." value={formData.password} onChange={handleInputChange} required />
            <Button variant="contained" type="submit">Authenticate</Button>
        </form>
    );
}

export default Authenticate