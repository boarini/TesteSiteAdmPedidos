import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://localhost:7152/api/Orders')
            .then(response => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching orders');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="border-b">
                        <th className="py-2 px-4 text-left">Order ID</th>
                        <th className="py-2 px-4 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id} className="border-b">
                            <td className="py-2 px-4">{order.id}</td>
                            <td className="py-2 px-4">{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
