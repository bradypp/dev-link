import React from 'react';
import { Main, CustomLink, Button } from 'shared/components';
import { useClearAlerts } from 'shared/hooks';
import { IoIosSearch } from 'react-icons/io';
import * as S from './HomeStyles';

// TODO: make form
const Home = () => {
    useClearAlerts();

    return (
        <Main backgroundColor="background1">
            <S.Heading>Discover and link-up with like-minded developers</S.Heading>
            <S.SearchContainer>
                <form>
                    <S.StyledInput icon={<IoIosSearch />} />
                    <Button type="submit">Search</Button>
                    <CustomLink to="/#">Advanced Search</CustomLink>
                </form>
            </S.SearchContainer>
        </Main>
    );
};

export default Home;
