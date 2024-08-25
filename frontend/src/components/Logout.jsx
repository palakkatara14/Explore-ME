
// export default Logout;
import React, { useState } from 'react';

const Logout = ({ email, password, onSetEmail, onSetPassword, onLogout }) => {
    const [showForm, setShowForm] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleEmailChange = (e) => {
        onSetEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        onSetPassword(e.target.value);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        setShowConfirm(true);
    };

    const handleConfirmLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.message === 'User has logged out') {
                alert('You have been successfully logged out');
                onLogout(); // Call the onLogout function passed as a prop
            } else {
                alert('Error logging out');
            }
        } catch (error) {
            console.error(error);
            alert('Error logging out');
        }
    };

    const handleCancelLogout = () => {
        setShowConfirm(false);
    };

    return (
        <div>
            <h2>Logout</h2>
            {showForm && (
                <form>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <br />
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <br />
                    <button onClick={handleLogout}>Logout</button>
                </form>
            )}
            {showConfirm && (
                <div>
                    <p>Are you sure you want to logout?</p>
                    <button onClick={handleConfirmLogout}>Yes</button>
                    <button onClick={handleCancelLogout}>No</button>
                </div>
            )}
        </div>
    );
};

export default Logout;