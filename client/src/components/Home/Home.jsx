import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { Main, CustomLink, Button } from 'shared/components';
import { useClearAlerts } from 'shared/hooks';
import { Heading, SearchContainer, StyledInput } from './HomeStyles';

// TODO: make form and advanced search link/button
const Home = () => {
    useClearAlerts();

    return (
        <Main>
            <Heading>Discover and link-up with like-minded developers</Heading>
            <SearchContainer>
                <form>
                    <StyledInput Icon={IoIosSearch} />
                    <Button type="submit">Search</Button>
                    <CustomLink to="/#" backgroundColor="white2">
                        Advanced Search
                    </CustomLink>
                </form>
            </SearchContainer>
        </Main>
    );
};

export default Home;
