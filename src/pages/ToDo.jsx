import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StyledButton from '../components/StyledButton';
import { getToDos, createToDo, updateToDo, deleteToDo } from '../api/todo';

function ToDo() {
    // 로그인 체크
    const isLogin = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) navigate('/signin');
    }, [isLogin]);

    const [addInput, setAddInput] = useState(''); // 사용자가 input에 입력한 text를 담는다.
    const [toDoList, setToDoList] = useState([]); // To Do List를 담는다.
    const [isDisabledAdd, setIsDisAbledAdd] = useState(true); // 추가 input 공백 검사를 위해 사용
    const [isUpdateMode, setIsUpdateMode] = useState(false); // 수정 모드 on/off
    const [updateInput, setUpdateInput] = useState(''); // 수정 Input
    const [isDisabledUpdate, setIsDisabledUpdate] = useState(false); // 수정 input 공백 검사를 위해 사용

    function handleAddInput(e) {
        setAddInput(e.target.value);
        // console.log(addInput);
    }

    // input 공백 검사
    function checkInputValidation() {
        const addInputArr = addInput.split('');

        if (addInputArr.length > 0) setIsDisAbledAdd(false);
        else setIsDisAbledAdd(true);
    }

    useEffect(() => {
        checkInputValidation();
    }, [addInput]);

    // To Do List 조회
    async function getToDoList() {
        const list = await getToDos();
        // console.log(list);
        setToDoList(list);
    }

    useEffect(() => {
        getToDoList();
    }, []);

    // To Do List 추가
    async function addToDoList() {
        if (isDisabledAdd === false) {
            const addResult = await createToDo(addInput);
            setToDoList([...toDoList, addResult]);
            setAddInput('');
            // console.log('현재 리스트', toDoList);
        } else alert('추가할 할 일을 입력해주세요.');
    }

    // To Do List 수정
    async function updateToDoList(todo, isCompleted) {
        setIsUpdateMode(true);
        console.log(todo, isCompleted);
        // const updateResult = updateToDo(todo, isCompleted);
        // console.log(updateResult);
    }

    function toggleUpdate() {
        setIsUpdateMode((prev) => !prev);
    }

    // To Do List 삭제
    async function deleteToDoList() {}

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
                <AddInput
                    data-testid='new-todo-input'
                    onChange={handleAddInput}
                    onKeyDown={handleEnter}
                    value={addInput}
                />
                <StyledButton
                    data-testid='new-todo-add-button'
                    onClick={addToDoList}
                    disabled={isDisabledAdd}
                >
                    추가
                </StyledButton>
            </InputContainer>
            <ListContainer>
                {toDoList.map((e) => {
                    return (
                        <ListLi key={e.id} isCompleted={e.isCompleted} userId={e.userId}>
                            <StyledLabel>
                                <StyledCheckBox type='checkbox' />
                                <ContentWrapper>
                                    {isUpdateMode ? (
                                        <UpdateInput data-testid='modify-input' />
                                    ) : (
                                        <TextToDo>{e.todo}</TextToDo>
                                    )}
                                </ContentWrapper>

                                {isUpdateMode ? (
                                    <Buttons>
                                        <StyledButton data-testid='submit-button' small>
                                            제출
                                        </StyledButton>
                                        <StyledButton
                                            data-testid='cancel-button'
                                            small
                                            onClick={toggleUpdate}
                                        >
                                            취소
                                        </StyledButton>
                                    </Buttons>
                                ) : (
                                    <Buttons>
                                        <StyledButton
                                            data-testid='modify-button'
                                            small
                                            onClick={toggleUpdate}
                                        >
                                            수정
                                        </StyledButton>
                                        <StyledButton data-testid='delete-button' small>
                                            삭제
                                        </StyledButton>
                                    </Buttons>
                                )}
                            </StyledLabel>
                        </ListLi>
                    );
                })}
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
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AddInput = styled.input`
    width: 16rem;
    padding: 0 0.2rem;
    font-size: 1.4rem;
    font-weight: 500;
`;

const ListContainer = styled.div`
    margin-top: 4rem;
    height: 40vh;
    overflow: auto;
    padding: 1rem;
`;

const ListLi = styled.li`
    margin: 0 auto;
    font-size: 1.4rem;
    font-weight: 500;
    list-style: none;
    margin-bottom: 1.4rem;

    :last-child {
        margin-bottom: 0;
    }
`;

const StyledLabel = styled.label`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledCheckBox = styled.input`
    transform: scale(1.8);
    margin-right: 2rem;
`;

const ContentWrapper = styled.div`
    width: 55%;
`;

const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TextToDo = styled.div`
    display: inline-block;
    width: 100%;
`;

const UpdateInput = styled.input`
    display: inline-block;
    width: 92%;
    height: 1.4rem;
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0 0.4rem;
`;

export default ToDo;
