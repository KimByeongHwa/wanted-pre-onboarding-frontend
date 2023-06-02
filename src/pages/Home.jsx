import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <Container>
            <MoveButton>
                <Link to='/signup'>👉 회원가입</Link>
            </MoveButton>
            <MoveButton>
                <Link to='/signin'>👉 로그인</Link>
            </MoveButton>
            <MoveButton>
                <Link to='/todo'>👉 To Do List</Link>
            </MoveButton>
        </Container>
    );
}

const Container = styled.div`
    width: fit-content;
    margin: 0 auto;
`;

const MoveButton = styled.div`
    font-size: 1.6rem;
    font-weight: 500;

    & + & {
        margin: 4rem auto;
    }
`;

export default Home;
