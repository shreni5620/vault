import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

// Backend configuration
const BACKEND_URL = 'http://localhost:3000';
const SOCKET_CONFIG = {
    path: '/socket.io',
    transports: ['polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    autoConnect: false,
    forceNew: true,
    query: {
        role: 'admin'
    }
};

const NotificationManager = () => {
    const [notification, setNotification] = useState({
        type: 'update',
        title: '',
        message: '',
        recipients: [],
        action: ''
    });
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        let socketInstance = null;

        const initSocket = () => {
            try {
                console.log('Initializing admin socket connection...');
                socketInstance = io(BACKEND_URL, SOCKET_CONFIG);
                setSocket(socketInstance);

                socketInstance.on('connect', () => {
                    console.log('Admin socket connected:', socketInstance.id);
                    setIsConnected(true);
                    setError(null);
                    setRetryCount(0);
                });

                socketInstance.on('connect_error', (err) => {
                    console.error('Socket connection error:', err.message);
                    setIsConnected(false);
                    setError(`Connection error: ${err.message}`);

                    setRetryCount(prev => {
                        const newCount = prev + 1;
                        if (newCount <= 5) {
                            const delay = Math.min(1000 * Math.pow(2, newCount), 10000);
                            setTimeout(() => {
                                if (socketInstance) socketInstance.connect();
                            }, delay);
                        } else {
                            setError('Failed to reconnect. Please refresh the page.');
                        }
                        return newCount;
                    });
                });

                socketInstance.on('error', (err) => {
                    console.error('Socket error:', err);
                    setError(`Socket error: ${typeof err === 'string' ? err : err.message}`);
                });

                socketInstance.on('disconnect', (reason) => {
                    console.log('Disconnected:', reason);
                    setIsConnected(false);
                    if (['io server disconnect', 'transport close'].includes(reason)) {
                        setTimeout(() => {
                            if (socketInstance) socketInstance.connect();
                        }, 1000);
                    }
                });

                socketInstance.connect();
            } catch (err) {
                console.error('Socket init failed:', err);
                setError('Failed to initialize socket connection');
            }
        };

        initSocket();

        return () => {
            if (socketInstance) {
                socketInstance.disconnect();
                socketInstance = null;
            }
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const notificationData = {
                ...notification,
                createdBy: 'admin',
                timestamp: new Date(),
                recipients: notification.recipients.length === 0 || 
                            notification.recipients.includes('all') ? 
                            ['all'] : notification.recipients
            };

            const response = await axios.post(`${BACKEND_URL}/notification`, notificationData, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000
            });

            if (response.data && !response.data.error) {
                if (socket && isConnected) {
                    socket.emit('adminNotification', response.data.notification, (ackError) => {
                        if (ackError) {
                            console.error('Emit error:', ackError);
                            setError('Notification sent to DB, but socket failed');
                        } else {
                            console.log('Notification emitted');
                        }
                    });
                } else {
                    setError('Saved to DB but not emitted. Socket not connected.');
                }

                setNotification({
                    type: 'update',
                    title: '',
                    message: '',
                    recipients: [],
                    action: ''
                });

                alert('Notification sent successfully!');
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Notification sending failed.';
            setError(message);
            alert(message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotification(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f3f4f6', padding: '2rem' }}>
            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                background: '#fff',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                    Send Notification
                </h2>

                {error && (
                    <div style={{
                        marginBottom: '1rem',
                        padding: '1rem',
                        backgroundColor: '#fdecea',
                        border: '1px solid #f5c2c7',
                        color: '#b71c1c',
                        borderRadius: '6px'
                    }}>
                        {error}
                    </div>
                )}

                {!isConnected && (
                    <div style={{
                        marginBottom: '1rem',
                        padding: '1rem',
                        backgroundColor: '#fff8e1',
                        border: '1px solid #ffecb3',
                        color: '#795548',
                        borderRadius: '6px'
                    }}>
                        Not connected to notification service. Notifications may be delayed.
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Type</label><br />
                        <select
                            name="type"
                            value={notification.type}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px' }}
                        >
                            <option value="update">Update</option>
                            <option value="offer">Offer</option>
                            <option value="news">News</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label>Title</label><br />
                        <input
                            type="text"
                            name="title"
                            value={notification.title}
                            onChange={handleChange}
                            placeholder="Enter notification title"
                            required
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label>Message</label><br />
                        <textarea
                            name="message"
                            value={notification.message}
                            onChange={handleChange}
                            placeholder="Enter notification message"
                            rows="4"
                            required
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label>Action (Optional)</label><br />
                        <input
                            type="text"
                            name="action"
                            value={notification.action}
                            onChange={handleChange}
                            placeholder="Enter call-to-action"
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label>Recipients</label><br />
                        <input
                            type="text"
                            name="recipients"
                            value={notification.recipients.join(', ')}
                            onChange={(e) => {
                                const recipients = e.target.value.split(',').map(id => id.trim()).filter(id => id);
                                setNotification(prev => ({ ...prev, recipients }));
                            }}
                            placeholder="Comma-separated IDs or 'all'"
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px' }}
                        />
                        <p style={{ fontSize: '0.85rem', color: '#555', marginTop: '0.5rem' }}>
                            Leave empty or enter 'all' to send to all users.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={!isConnected}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: isConnected ? '#1e88e5' : '#90caf9',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: isConnected ? 'pointer' : 'not-allowed'
                        }}
                    >
                        {isConnected ? 'Send Notification' : 'Waiting for connection...'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NotificationManager;
