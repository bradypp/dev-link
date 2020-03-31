import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { Section, MainContainer, PrimaryLink, PrimaryButton } from 'shared/components';
import { useClearAlerts } from 'shared/hooks';
import { Heading, SearchContainer, InputContainer, StyledInput } from './HomeStyles';

// TODO: make form and advanced search link/button
const Home = () => {
    useClearAlerts();

    return (
        <MainContainer>
            <Section>
                <Heading>Discover like-minded developers</Heading>
                <SearchContainer>
                    <form>
                        <InputContainer>
                            <StyledInput Icon={IoIosSearch} />
                        </InputContainer>
                        <PrimaryButton type="submit">Search</PrimaryButton>
                        <PrimaryLink to="/#" color="white1">
                            Advanced Search
                        </PrimaryLink>
                    </form>
                </SearchContainer>
                <img src="#" alt="#" />
            </Section>
        </MainContainer>
    );
};

export default Home;
