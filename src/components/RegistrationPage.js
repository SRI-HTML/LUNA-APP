// frontend/src/components/RegistrationPage.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests
import PasswordStrengthMeter from './PasswordStrengthMeter';

const RegistrationPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    // This function will now be 'async' because we are making a network request
    const onSubmit = async (data) => {
        try {
            // We've REPLACED the localStorage logic with this API call
            const response = await axios.post('/api/users/register', data);
            
            // If the request is successful, the backend sends a success message
            console.log(response.data.message);
            alert('Registration successful! Please log in.');
            navigate('/login');

        } catch (error) {
            // If the backend returns an error (e.g., user already exists), axios will throw an error
            // We can display the error message from the backend to the user.
            console.error('Registration failed:', error.response ? error.response.data.message : error.message);
            
            // VVVVV THIS IS THE CORRECTED LINE VVVVV
            alert(`Registration failed: ${error.response ? error.response.data.message : error.message}`);
            // ^^^^^ THE INCORRECT BACKSLASH IS NOW REMOVED ^^^^^
        }
    };

    return (
        <section className="auth-section">
            <h2>Create Your Luna Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                {/* ... The form inputs for name, email, and password remain exactly the same ... */}
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" {...register('name', { required: 'Name is required' })} />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" {...register('email', { required: 'Email is required' })} />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>

                <div className="form-group">.
                    <label>Password</label>
                    <input
                        type="password"
                        {...register('password', { required: 'Name is required' })}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <PasswordStrengthMeter password={password} />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>
                
                <button type="submit" className="primary-btn">Register</button>
            </form>
        </section>
    );
};

export default RegistrationPage;