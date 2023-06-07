import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StyledButton from '../components/StyledButton';
import { getTodos, createTodo } from '../api/todo';

function ToDo() {
    const isLogin = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) navigate('/signin');
    }, [isLogin]);

    const [addInput, setAddInput] = useState('');
    const [toDoList, setToDoList] = useState([]);

    useEffect(() => {
        getTodos();
    }, []);

    function handleAddInput(e) {
        setAddInput(e.target.value);
    }

    async function addToDoList() {
        const result = await createTodo(addInput);
        console.log(result);
    }

    function handleEnter(e) {
        if (e.key === 'Enter') {
            createTodo(addInput);
        }
    }

    return (
        <Container>
            <Title>To Do List</Title>
            <InputContainer>
                <StyledInput
                    data-testid='new-todo-input'
                    onChange={handleAddInput}
                    onKeyDown={handleEnter}
                />
                <StyledButton data-testid='new-todo-add-button' onClick={addToDoList}>
                    추가
                </StyledButton>
            </InputContainer>
            <ListContainer>
                <List>
                    <label>
                        <StyledCheckBox type='checkbox' />
                        <span>TODO 1</span>
                        <StyledButton data-testid='modify-button' small>
                            수정
                        </StyledButton>
                        <StyledButton data-testid='delete-button' small>
                            삭제
                        </StyledButton>
                    </label>
                </List>
            </ListContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 50%;
    margin: 0 auto;
`;

const Title = styled.div`
    text-align: center;
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 5rem;
`;

const InputContainer = styled.div`
    display: felex;
    align-items: center;
    justify-content: center;
`;

const StyledInput = styled.input`
    width: 16rem;
    padding: 0.6rem;
    font-size: 1rem;
`;

const ListContainer = styled.div`
    margin-top: 5rem;
    height: 40vh;
    overflow: auto;
`;

const List = styled.li`
    width: fit-content;
    margin: 0 auto;
    font-size: 1.2rem;
    list-style: none;
`;

const StyledCheckBox = styled.input`
    transform: scale(1.5);
    margin-right: 2rem;
`;

export default ToDo;
