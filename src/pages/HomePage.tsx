import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth.ts';
import { useNavigate } from 'react-router';

const HomePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user){
            navigate('/forms');
        }
    }, [user]);

    return (
        <main>
            <h2>Page d'accueil</h2>
        </main>
    );
};

export default HomePage;
