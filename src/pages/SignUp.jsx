import React from 'react';
import styled from 'styled-components';

function SignUp() {
    return (
        <Container>
            <Title>회원가입</Title>
            <FormContainer>
                <Line>
                    <LineText>이메일</LineText>
                    <StyledInput data-testid='email-input' placeholder='abc@example.com' />
                </Line>
                <Line>
                    <LineText>비밀번호</LineText>
                    <StyledInput
                        data-testid='password-input'
                        placeholder='8자 이상 입력해주세요.'
                    />
                </Line>
                <ButtonWrapper>
                    <SubmitButton data-testid='signup-button'>가입하기</SubmitButton>
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
