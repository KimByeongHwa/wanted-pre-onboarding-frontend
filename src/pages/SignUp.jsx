import React, { useState } from 'react';
import styled from 'styled-components';
import { signUpApi } from '../api/auth';

function SignUp() {
    const [emailInput, setEmailInput] = useState('');
    const [pwInput, setPwInput] = useState('');

    function handleEmailInput(e) {
        let input = e.target.value;
        // console.log(input);
        setEmailInput(input);
    }

    function handlePwInput(e) {
        let input = e.target.value;
        // console.log(input);
        setPwInput(input);
    }

    function handleSignUp() {
        // console.log('email', emailInput);
        // console.log('pwInput', pwInput);
        signUpApi(emailInput, pwInput)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
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
                        data-testid='email-input'
                        placeholder='abc@example.com'
                        onChange={handleEmailInput}
                        onKeyDown={handleEnter}
                    />
                </Line>
                <Line>
                    <LineText>비밀번호</LineText>
                    <StyledInput
                        data-testid='password-input'
                        placeholder='8자 이상 입력해주세요.'
                        onChange={handlePwInput}
                        onKeyDown={handleEnter}
                    />
                </Line>
                <ButtonWrapper>
                    <SubmitButton data-testid='signup-button' onClick={handleSignUp}>
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
    background-color: #275efe;
    padding: 0.6rem 1.6rem;
    border-radius: 4rem;
`;

const SubmitButton = styled.button`
    font-size: 1.4rem;
    font-weight: 500;
    color: #fff;
`;

export default SignUp;
