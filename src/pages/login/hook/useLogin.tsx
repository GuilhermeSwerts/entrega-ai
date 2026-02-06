import { useEffect, useState } from 'react';
import { LoginCustomer } from '../../../services/Customer/CustomerService';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        LoginCustomer({
            email,
            password
        }, () => navigate('/dashboard'))
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        loading,
        handleLogin,
        scrolled
    };
};
