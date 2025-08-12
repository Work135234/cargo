import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';

interface TrainSchedule {
    _id: string;
    trainNumber: string;
    departure: string;
    arrival: string;
    route: string;
    status: string;
    createdAt: string;
}

const TrainSchedules: React.FC = () => {
    const [schedules, setSchedules] = useState<TrainSchedule[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { token } = useAuth();

    const fetchSchedules = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:5000/api/admin/train-schedules', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const result = await response.json();
            if (result.success) {
                setSchedules(result.schedules || []);
            } else {
                setError(result.message || 'Failed to fetch train schedules');
            }
        } catch (err) {
            setError('Failed to fetch train schedules');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchSchedules(); }, []);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Train Schedules</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : schedules.length === 0 ? (
                        <div>No train schedules found.</div>
                    ) : (
                        <div className="space-y-4">
                            {schedules.map(schedule => (
                                <Card key={schedule._id} className="p-4">
                                    <div className="font-semibold">Train #{schedule.trainNumber}</div>
                                    <div>Route: {schedule.route}</div>
                                    <div>Departure: {new Date(schedule.departure).toLocaleString()}</div>
                                    <div>Arrival: {new Date(schedule.arrival).toLocaleString()}</div>
                                    <div>Status: {schedule.status}</div>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
            <Button onClick={fetchSchedules}>Refresh</Button>
        </div>
    );
};

export default TrainSchedules;
