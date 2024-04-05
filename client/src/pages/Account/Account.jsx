import { useState, useEffect } from 'react';
import axios from 'axios';

function Account() {
    const [userData, setUserData] = useState({
        name: '',
        password: '',
        profileImage: ''
    });

    async function fetchData() {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/user/profile');
            setUserData(response.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2>Profile</h2>
            <p>Name: {userData.name}</p>
            <p>Password: {userData.password}</p>
            {userData.profileImage && (
                <img src={userData.profileImage} alt="Profile" style={{ maxWidth: '200px', maxHeight: '200px' }} />
            )}
        </div>
    );
}

export default Account;
