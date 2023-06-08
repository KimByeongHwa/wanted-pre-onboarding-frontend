import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StyledButton from '../components/StyledButton';
import { getToDos, createToDo } from '../api/todo';

function ToDo() {
    const isLogin = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) navigate('/signin');
    }, [isLogin]);

    const [addInput, setAddInput] = useState('');
    const [toDoList, setToDoList] = useState([]);

    async function getToDoList() {
        const list = await getToDos();
        // console.log(list);
        setToDoList(list);
    }

    useEffect(() => {
        getToDoList();
    }, []);

    function handleAddInput(e) {
        setAddInput(e.target.value);
        // console.log(addInput);
    }

    async function addToDoList() {
        const addResult = await createToDo(addInput);
        setToDoList([...toDoList, addResult]);
        setAddInput('');
        // console.log('현재 리스트', toDoList);
    }

    function handleEnter(e) {
        if (e.key === 'Enter') {
            addToDoList();
        }
    }

    // useEffect(() => {
    //     console.log('리스트 변화 감지', toDoList);
    // }, [toDoList]);

    // console.log(toDoList);

    return (
        <Container>
            <Title>To Do List</Title>
            <InputContainer>
                <StyledInput
                    data-testid='new-todo-input'
                    onChange={handleAddInput}
                    onKeyDown={handleEnter}
                    value={addInput}
                />
                <StyledButton data-testid='new-todo-add-button' onClick={addToDoList}>
                    추가
                </StyledButton>
            </InputContainer>
            <ListContainer>
                {toDoList.map((e) => {
                    return (
                        <ListLi key={e.id} isCompleted={e.isCompleted} userId={e.userId}>
                            <label>
                                <StyledCheckBox type='checkbox' />
                                <TextToDo>{e.todo}</TextToDo>
                                <StyledButton data-testid='modify-button' small>
                                    수정
                                </StyledButton>
                                <StyledButton data-testid='delete-button' small>
                                    삭제
                                </StyledButton>
                            </label>
                        </ListLi>
                    );
                })}
                {/* <List>
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
                </List> */}
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
    margin-top: 4rem;
    height: 40vh;
    overflow: auto;
    padding: 1rem;
`;

const ListLi = styled.li`
    width: 100%;
    margin: 0 auto;
    font-size: 1.4rem;
    font-weight: 500;
    list-style: none;

    & + & {
        /* margin-bottom: 1rem; */
    }
`;

const StyledCheckBox = styled.input`
    transform: scale(1.5);
    margin-right: 2rem;
`;

const TextToDo = styled.div`
    display: inline-block;
    width: 65%;
`;

export default ToDo;
