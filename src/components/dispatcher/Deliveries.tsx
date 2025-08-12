import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Truck, Calendar, CheckCircle, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Booking {
    _id: string;
    pickupAddress: string;
    deliveryAddress: string;
    distance: number;
    weight: number;
    modeOfTransport: string;
    fare: number;
    status: string;
    customer: {
        name: string;
        email: string;
    };
    createdAt: string;
    scheduledDate?: string;
    estimatedDelivery?: string;
    notes?: string;
}

const Deliveries: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState<'createdAt' | 'fare'>('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [search, setSearch] = useState('');
    const { token, user } = useAuth();
    const socketRef = useRef<Socket | null>(null);

    const fetchDeliveries = async () => {
        setLoading(true);
        setError('');
        try {
            const params = new URLSearchParams();
            if (statusFilter && statusFilter !== 'all') params.append('status', statusFilter);
            const response = await fetch(`http://localhost:5000/api/dispatcher/assigned-bookings?${params.toString()}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const result = await response.json();
            if (result.success) {
                setBookings(result.bookings || []);
            } else {
                setError(result.message || 'Failed to fetch deliveries');
            }
        } catch (err) {
            setError('Failed to fetch deliveries');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeliveries();

        // Setup Socket.IO connection for real-time updates
        if (!socketRef.current) {
            socketRef.current = io('http://localhost:5000');
        }
        const socket = socketRef.current;

        // Authenticate socket with user ID
        if (user?._id) {
            socket.emit('authenticate', user._id);
        }

        // Listen for booking assignment or update events
        socket.on('bookingAssigned', (data) => {
            if (data.dispatcherId === user?._id) {
                fetchDeliveries();
            }
        });
        socket.on('bookingUpdated', (data) => {
            if (data.dispatcherId === user?._id) {
                fetchDeliveries();
            }
        });

        return () => {
            socket.off('bookingAssigned');
            socket.off('bookingUpdated');
        };
        // eslint-disable-next-line
    }, [user?._id, statusFilter]);

    // Derived filtered, searched, and sorted bookings
    const filteredBookings = bookings
        .filter(b => {
            if (search.trim() === '') return true;
            const s = search.toLowerCase();
            return (
                b.pickupAddress.toLowerCase().includes(s) ||
                b.deliveryAddress.toLowerCase().includes(s) ||
                b.customer?.name?.toLowerCase().includes(s) ||
                b.customer?.email?.toLowerCase().includes(s)
            );
        })
        .sort((a, b) => {
            let cmp = 0;
            if (sortBy === 'createdAt') {
                cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            } else if (sortBy === 'fare') {
                cmp = a.fare - b.fare;
            }
            return sortOrder === 'asc' ? cmp : -cmp;
        });

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Truck className="mr-2 h-5 w-5" />
                        My Deliveries
                    </CardTitle>
                    <CardDescription>
                        All bookings assigned to you as dispatcher
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
                        <div>
                            <label className="text-sm font-medium mr-2">Status:</label>
                            <select
                                className="border rounded px-2 py-1"
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="Pending">Pending</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="In Transit">In Transit</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium mr-2">Sort by:</label>
                            <select
                                className="border rounded px-2 py-1"
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value as 'createdAt' | 'fare')}
                            >
                                <option value="createdAt">Date</option>
                                <option value="fare">Fare</option>
                            </select>
                            <button
                                className="ml-2 px-2 py-1 border rounded"
                                onClick={() => setSortOrder(o => (o === 'asc' ? 'desc' : 'asc'))}
                                title="Toggle sort order"
                            >
                                {sortOrder === 'asc' ? '↑' : '↓'}
                            </button>
                        </div>
                        <div className="flex-1 w-full md:w-auto">
                            <input
                                type="text"
                                className="border rounded px-2 py-1 w-full"
                                placeholder="Search address or customer..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-center py-4">{error}</div>
                    ) : filteredBookings.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No deliveries assigned to you.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredBookings.map((booking) => (
                                <Card key={booking._id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold text-lg">Booking #{booking._id.slice(-6)}</h3>
                                                    <span className="px-3 py-1 rounded-full text-xs font-medium border bg-blue-100 text-blue-800 border-blue-200">
                                                        {booking.status}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-gray-600"><strong>Pickup:</strong> {booking.pickupAddress}</p>
                                                        <p className="text-gray-600"><strong>Delivery:</strong> {booking.deliveryAddress}</p>
                                                        <p className="text-gray-600"><strong>Distance:</strong> {booking.distance?.toFixed(2) || 'N/A'} km</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-600"><strong>Weight:</strong> {booking.weight || 'N/A'} kg</p>
                                                        <p className="text-gray-600"><strong>Transport:</strong> {booking.modeOfTransport}</p>
                                                        <p className="text-gray-600"><strong>Fare:</strong> ${booking.fare?.toFixed(2) || 'N/A'}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        <span>Customer: {booking.customer?.name || 'Unknown'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        <span>Created: {new Date(booking.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                    {booking.scheduledDate && (
                                                        <div className="flex items-center gap-1">
                                                            <CheckCircle className="h-3 w-3" />
                                                            <span>Scheduled: {new Date(booking.scheduledDate).toLocaleDateString()}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                {booking.notes && (
                                                    <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                                                        <strong>Notes:</strong> {booking.notes}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Deliveries;
