import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { Section, Container } from 'shared/components';
import { Heading, SearchContainer, InputContainer, StyledInput } from './HomeStyles';

// TODO: edit form
const Home = () => {
    return (
        <Container>
            <Section>
                <Heading>Discover like-minded developers</Heading>
                <SearchContainer>
                    <form>
                        <InputContainer>
                            <IoIosSearch />
                            <StyledInput />
                        </InputContainer>
                        <button>Search</button>
                    </form>
                    <a>Advanced Options</a>
                </SearchContainer>
                <img src="#" alt="#" />
            </Section>
            <Section>
                <p></p>
            </Section>
        </Container>
    );
};

export default Home;
