import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineHome } from 'react-icons/ai';

function HomeButton() {
    return (
        <GoHomeButton>
            <Link to='/'>
                <AiOutlineHome />
            </Link>
        </GoHomeButton>
    );
}

const GoHomeButton = styled.div`
    font-size: 2rem;
    flex: none;
    border: 2px solid #333;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;

    :hover {
        border-color: #275efe;
        a {
            color: #275efe;
        }
    }
`;

export default HomeButton;
