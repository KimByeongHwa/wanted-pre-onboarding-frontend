import React from 'react';
import { Reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ToDo from './pages/ToDo';

function App() {
    return (
        <>
            <Reset />
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/todo' element={<ToDo />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

const GlobalStyle = createGlobalStyle`
    html{
        width: 100%;
        height: 100%;
    }

    body{
        font-family: 'Noto Sans KR', 'Roboto', sans-serif;
        color: #333;
        width: 1200px;
        margin: 0 auto;
        padding-top: 5%;
    }

    a{
        font-family: 'Noto Sans KR', 'Roboto', sans-serif;
        color: #333;
        text-decoration: none;
    }

    button{
        font-family: 'Noto Sans KR', 'Roboto', sans-serif;
        color: #333;
        padding: 0;
        margin: 0;        
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    input{
        font-family: 'Noto Sans KR', 'Roboto', sans-serif;
        color: #333;
    }
`;

export default App;
