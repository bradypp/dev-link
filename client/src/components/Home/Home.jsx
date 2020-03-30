import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { Section, MainContainer, PrimaryLink, PrimaryButton } from 'shared/components';
import { useClearAlerts } from 'shared/hooks';
import { Heading, SearchContainer, InputContainer, StyledInput } from './HomeStyles';

// TODO: edit form
const Home = () => {
    useClearAlerts();

    return (
        <MainContainer>
            <Section>
                <Heading>Discover like-minded developers</Heading>
                <SearchContainer>
                    <form>
                        <InputContainer>
                            <IoIosSearch />
                            <StyledInput />
                        </InputContainer>
                        <PrimaryButton type="submit">Search</PrimaryButton>
                        <PrimaryLink color="greyLight1">Advanced Search</PrimaryLink>
                    </form>
                </SearchContainer>
                <img src="#" alt="#" />
            </Section>
        </MainContainer>
    );
};

export default Home;
