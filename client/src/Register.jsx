// src/Register.jsx
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    async function register(ev) {
        ev.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/register', { username, password });
            setSuccess('Registration successful!');
        } catch (error) {
            console.error('Error during registration:', error.response || error.message || error);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-blue-50 h-screen flex items-center">
            <form className="w-64 mx-auto mb-12" onSubmit={register}>
                <input 
                    value={username} 
                    onChange={ev => setUsername(ev.target.value)} 
                    type="text" 
                    placeholder="Username" 
                    className="block w-full rounded-sm p-2 mb-2 border" 
                />
                <input 
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)} 
                    type="password" 
                    placeholder="Password" 
                    className="block w-full rounded-sm p-2 mb-2 border" 
                />
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <button 
                    type="submit"
                    className="bg-blue-500 text-white block w-full rounded-sm p-2"
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}
