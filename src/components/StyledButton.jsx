import React from 'react';
import styled, { css } from 'styled-components';

function StyledButton({ children, onClick, disabled, small }) {
    return (
        <Button onClick={onClick} disabled={disabled} small={small}>
            {children}
        </Button>
    );
}

const smallSize = css`
    ${(props) =>
        props.small &&
        css`
            font-size: 1rem;
            padding: 0.2rem 0.6rem;
            margin-left: 2rem;

            & + & {
                margin-left: 0.4rem;
            }
        `}
`;

const Button = styled.button`
    font-size: 1.4rem;
    font-weight: 500;
    color: #fff;
    background-color: #275efe;
    padding: 0.4rem 1.4rem;
    border-radius: 4rem;
    margin-left: 2rem;

    ${smallSize}

    :disabled {
        cursor: default;
        opacity: 0.2;
    }
`;

export default StyledButton;
