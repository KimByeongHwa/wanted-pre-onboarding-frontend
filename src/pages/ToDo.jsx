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
    const [updateInput, setUpdateInput] = useState(''); // 수정 Input
    const [isDisabledUpdate, setIsDisabledUpdate] = useState(true); // 수정 input 공백 검사를 위해 사용

    function handleAddInput(e) {
        setAddInput(e.target.value);
        // console.log(addInput);
    }

    function handleUpdateInput(e) {
        setUpdateInput(e.target.value);
        // console.log(updateInput);
    }

    // input 공백 검사
    function checkInputValidation() {
        const addInputArr = addInput.split('');
        const updateInputArr = updateInput.split('');

        if (addInputArr.length > 0) setIsDisAbledAdd(false);
        else setIsDisAbledAdd(true);

        if (updateInputArr.length > 0) setIsDisabledUpdate(false);
        else setIsDisabledUpdate(true);
    }

    useEffect(() => {
        checkInputValidation();
    }, [addInput, updateInput]);

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
        const addResult = await createToDo(addInput);
        setToDoList([...toDoList, addResult]);
        setAddInput('');
        // console.log('현재 리스트', toDoList);
    }

    // To Do List 수정
    async function updateToDoList(id, todo, updatedIsCompleted) {
        await updateToDo(id, todo, updatedIsCompleted);
        getToDoList();
    }

    // TODO
    async function handleCheckBox(id, todo, isCompleted) {
        await updateToDo(id, todo, isCompleted);
        getToDoList();
    }

    function toggleUpdateForm(id) {
        const updatedList = toDoList.map((e) => {
            if (e.id === id) {
                console.log(e);
                setUpdateInput(e.todo);
                return { ...e, isUpdateMode: !e.isUpdateMode };
            }
            return e;
        });
        setToDoList(updatedList);
    }

    // To Do List 삭제
    async function deleteToDoList(id) {
        await deleteToDo(id);
        getToDoList();
    }

    function EnterAdd(e) {
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
                    data-testid="new-todo-input"
                    onChange={handleAddInput}
                    onKeyDown={EnterAdd}
                    value={addInput}
                />
                <StyledButton
                    data-testid="new-todo-add-button"
                    onClick={addToDoList}
                    disabled={isDisabledAdd}
                >
                    추가
                </StyledButton>
            </InputContainer>
            <ListContainer>
                {toDoList.map((e) => {
                    return (
                        <ListLi
                            key={e.id}
                            isCompleted={e.isCompleted}
                            userId={e.userId}
                            isUpdateMode={e.isUpdateMode}
                        >
                            <StyledLabel>
                                <StyledCheckBox
                                    type="checkbox"
                                    checked={e.isCompleted}
                                    onChange={() => handleCheckBox(e.id, e.todo, !e.isCompleted)}
                                />

                                {!e.isUpdateMode ? (
                                    <>
                                        <ContentWrapper>
                                            <TextToDo>{e.todo}</TextToDo>
                                        </ContentWrapper>
                                        <Buttons>
                                            <StyledButton
                                                data-testid="modify-button"
                                                small
                                                onClick={() => toggleUpdateForm(e.id)}
                                            >
                                                수정
                                            </StyledButton>
                                            <StyledButton
                                                data-testid="delete-button"
                                                small
                                                onClick={() => deleteToDoList(e.id)}
                                            >
                                                삭제
                                            </StyledButton>
                                        </Buttons>
                                    </>
                                ) : (
                                    <>
                                        <ContentWrapper>
                                            <UpdateInput
                                                data-testid="modify-input"
                                                onChange={handleUpdateInput}
                                                value={updateInput}
                                            />
                                        </ContentWrapper>
                                        <Buttons>
                                            <StyledButton
                                                data-testid="submit-button"
                                                small
                                                onClick={() =>
                                                    updateToDoList(e.id, updateInput, e.isCompleted)
                                                }
                                                disabled={isDisabledUpdate}
                                            >
                                                제출
                                            </StyledButton>
                                            <StyledButton
                                                data-testid="cancel-button"
                                                small
                                                onClick={() => toggleUpdateForm(e.id)}
                                            >
                                                취소
                                            </StyledButton>
                                        </Buttons>
                                    </>
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
    margin-bottom: 4rem;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AddInput = styled.input`
    width: 20rem;
    padding: 0 0.2rem;
    font-size: 1.4rem;
    font-weight: 500;
`;

const ListContainer = styled.div`
    margin-top: 4rem;
    height: 45vh;
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
