import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signUpApi } from '../api/signup';

function SignUp() {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [isDisabled, setIsDisabled] = useState(true);

    const { email, password } = inputs;

    function handleInputs(e) {
        const { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value,
        });
    }

    function checkValidation() {
        const inputEmail = inputs.email;
        const inputPassword = inputs.password;
        // console.log(inputEmail, inputPassword);

        let isEmail = false;
        let isPassword = false;

        inputEmail.includes('@') ? (isEmail = true) : (isEmail = false);
        inputPassword.length >= 8 ? (isPassword = true) : (isPassword = false);

        // console.log(isEmail, isPassword);

        if (isEmail && isPassword) {
            setIsDisabled(false);
        } else setIsDisabled(true);
    }

    useEffect(() => {
        checkValidation();
    }, [inputs]);

    const navigate = useNavigate();

    function handleSignUp() {
        signUpApi(inputs.email, inputs.password)
            .then((res) => {
                // console.log(res);
                alert('회원가입에 성공하였습니다.');
                navigate('/signin');
            })
            .catch((err) => {
                // console.log(err);
                alert('error');
            });
    }

    function handleEnter(e) {
        if (e.key === 'Enter') {
            handleSignUp();
        }
    }

    return (
        <Container>
            <Title>회원가입</Title>
            <FormContainer>
                <Line>
                    <LineText>이메일</LineText>
                    <StyledInput
                        data-testid="email-input"
                        placeholder="abc@example.com"
                        onChange={handleInputs}
                        onKeyDown={handleEnter}
                        name="email"
                        value={email}
                    />
                </Line>
                <Line>
                    <LineText>비밀번호</LineText>
                    <StyledInput
                        data-testid="password-input"
                        placeholder="8자 이상 입력해주세요."
                        onChange={handleInputs}
                        onKeyDown={handleEnter}
                        name="password"
                        value={password}
                    />
                </Line>
                <ButtonWrapper>
                    <SubmitButton
                        data-testid="signup-button"
                        onClick={handleSignUp}
                        disabled={isDisabled}
                    >
                        가입하기
                    </SubmitButton>
                </ButtonWrapper>
            </FormContainer>
        </Container>
    );
}

const Container = styled.div`
    width: fit-content;
    margin: 0 auto;
`;

const Title = styled.div`
    text-align: center;
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 5rem;
`;

const FormContainer = styled.div`
    position: relative;
    left: 2rem;
`;

const Line = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    & + & {
        margin-top: 4rem;
    }
`;

const LineText = styled.div`
    font-size: 1.4rem;
    font-weight: 400;
    margin-right: 4rem;
`;

const StyledInput = styled.input`
    width: 14rem;
    padding: 0.6rem;
    font-size: 1rem;
`;

const ButtonWrapper = styled.div`
    margin: 5.4rem auto 0;
    position: relative;
    right: 1.4rem;
    width: fit-content;
`;

const SubmitButton = styled.button`
    font-size: 1.4rem;
    font-weight: 500;
    color: #fff;
    background-color: #275efe;
    padding: 0.6rem 1.6rem;
    border-radius: 4rem;

    :disabled {
        cursor: default;
        opacity: 0.2;
    }
`;

export default SignUp;
