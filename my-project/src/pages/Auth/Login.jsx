import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../redux/api/UsersApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

import React from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const search = useLocation().search;
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ userInfo: res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err?.error);
        }
    };

    return (
        <div>
            <section className='pl-[10rem] flex flex-wrap'>
                <div className='mr-[4rem] mt-[5rem]'>
                    <h1 className='text-[2rem] font-bold mb-4'>Login</h1>
                    <form onSubmit={handleSubmit} className='container w-[40rem]'>
                        <div className='my-[2rem]'>
                            <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='mt-1 p-2 border rounded-md w-full'
                                required
                            />
                        </div>
                        <div className='my-[2rem]'>
                            <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='mt-1 p-2 border rounded-md w-full'
                                required
                            />
                        </div>
                        <button disabled={isLoading} type='submit' className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md'>
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                        {isLoading && (
                            <div className='mt-4 flex items-center justify-center'>
                                <div className='spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-pink-500 border-b-transparent border-r-transparent border-l-transparent rounded-full' role='status'>
                                    <span className='visually-hidden'>Loading...</span>
                                </div>
                            </div>
                        )}
                    </form>
                    <div className='mt-4'>
                        <p>Don't have an account? <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'} className='text-pink-500 hover:text-pink-700'>Sign Up</Link></p>
                    </div>
                </div>
            </section>
        </div>
    );
}
