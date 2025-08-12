import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';

interface TrainSchedule {
    _id: string;
    trainNumber: string;
    departureTime: string;
    arrivalTime: string;
    from: string;
    to: string;
}

interface Booking {
    _id: string;
    pickupAddress: string;
    deliveryAddress: string;
    status: string;
}

const AssignTrainSchedule: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [schedules, setSchedules] = useState<TrainSchedule[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<string>('');
    const [selectedSchedule, setSelectedSchedule] = useState<string>('');
    const [message, setMessage] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        fetchBookings();
        fetchSchedules();
    }, []);

    const fetchBookings = async () => {
        const res = await fetch('http://localhost:5000/api/admin/bookings', {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await res.json();
        setBookings(data.bookings || []);
    };

    const fetchSchedules = async () => {
        const res = await fetch('http://localhost:5000/api/admin/train-schedules', {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await res.json();
        setSchedules(data.schedules || []);
    };

    const assignSchedule = async () => {
        if (!selectedBooking || !selectedSchedule) return;
        const res = await fetch('http://localhost:5000/api/admin/assign-train-schedule', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookingId: selectedBooking, trainScheduleId: selectedSchedule }),
        });
        const data = await res.json();
        if (data.success) {
            setMessage('Train schedule assigned successfully!');
            fetchBookings();
        } else {
            setMessage(data.message || 'Failed to assign train schedule');
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Assign Train Schedule to Booking</h2>
            <div>
                <label>Booking:</label>
                <select value={selectedBooking} onChange={e => setSelectedBooking(e.target.value)}>
                    <option value="">Select Booking</option>
                    {bookings.map(b => (
                        <option key={b._id} value={b._id}>
                            {b.pickupAddress} → {b.deliveryAddress} ({b.status})
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Train Schedule:</label>
                <select value={selectedSchedule} onChange={e => setSelectedSchedule(e.target.value)}>
                    <option value="">Select Train Schedule</option>
                    {schedules.map(s => (
                        <option key={s._id} value={s._id}>
                            #{s.trainNumber}: {s.from} → {s.to} ({new Date(s.departureTime).toLocaleString()} - {new Date(s.arrivalTime).toLocaleString()})
                        </option>
                    ))}
                </select>
            </div>
            <Button onClick={assignSchedule} disabled={!selectedBooking || !selectedSchedule}>
                Assign
            </Button>
            {message && <div className="text-green-600 mt-2">{message}</div>}
        </div>
    );
};

export default AssignTrainSchedule;
