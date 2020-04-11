import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { Main, CustomLink, Button } from 'shared/components';
import { useClearAlerts } from 'shared/hooks';
import { Heading, SearchContainer, InputContainer, StyledInput } from './HomeStyles';

// TODO: make form and advanced search link/button
const Home = () => {
    useClearAlerts();

    return (
        <Main>
            <Heading>Discover like-minded developers</Heading>
            <SearchContainer>
                <form>
                    <InputContainer>
                        <StyledInput Icon={IoIosSearch} />
                    </InputContainer>
                    <Button type="submit">Search</Button>
                    <CustomLink to="/#" backgroundColor="white2">
                        Advanced Search
                    </CustomLink>
                </form>
            </SearchContainer>
            <img src="#" alt="#" />
        </Main>
    );
};

export default Home;
