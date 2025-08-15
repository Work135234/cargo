import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface Dispatcher {
    _id: string;
    name: string;
    email: string;
}

export function useDispatchers(token: string | undefined) {
    const [dispatchers, setDispatchers] = useState<Dispatcher[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) return;
        setLoading(true);
        fetch('http://localhost:5000/api/dispatcher/public-dispatchers', {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) setDispatchers(result.users || []);
                else setError(result.message || 'Failed to fetch dispatchers');
            })
            .catch(() => setError('Failed to fetch dispatchers'))
            .finally(() => setLoading(false));
    }, [token]);

    return { dispatchers, loading, error };
}
