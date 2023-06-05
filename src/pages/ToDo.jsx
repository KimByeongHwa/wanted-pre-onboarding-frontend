import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ToDo() {
    const isLogin = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) navigate('/signin');
    }, [isLogin]);

    return <div>todo</div>;
}

export default ToDo;
