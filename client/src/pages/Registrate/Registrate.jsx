import { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import style from './registrate.module.scss'

function Registrate() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        birthday: '',
        gender: '',
        profileImage: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profileImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/v1/user/registrate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={style.wrapper}>
            <TextField fullWidth type="text" name="name" label="Enter Name..." value={formData.name} onChange={handleInputChange} required />
            <TextField fullWidth type="email" name="email" label="Enter Email..." value={formData.email} onChange={handleInputChange} required />
            <TextField fullWidth type="password" name="password" label="Enter Password..." value={formData.password} onChange={handleInputChange} required />
            <TextField fullWidth type="date" name="birthday" value={formData.birthday} onChange={handleInputChange} required />

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Gender</InputLabel>
                <Select
                    name="gender"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.gender}
                    label="Age"
                    onChange={handleInputChange}
                    required
                >
                    <MenuItem value='male'>Male</MenuItem>
                    <MenuItem value='female'>Female</MenuItem>
                    <MenuItem value='other'>Other</MenuItem>
                </Select>
            </FormControl>

            <input type="file" name="profileImage" onChange={handleFileChange} required />

            <Button variant="contained" type="submit">Register</Button>
        </form>
    );
}

export default Registrate;