import React from 'react';
import { Main, CustomLink, Button } from 'shared/components';
import { Form } from 'shared/components';
import { IoIosSearch } from 'react-icons/io';
import * as S from './HomeStyles';

// TODO: make form
const Home = () => {
    return (
        <Main backgroundColor="background1">
            <S.Heading>Discover and link-up with like-minded developers</S.Heading>
            <S.SearchContainer>
                <Form
                    initialValues={{
                        search: '',
                    }}>
                    <Form.Element>
                        <S.StyledInput autoFocus icon={<IoIosSearch />} name="search" />
                        <Form.Buttons
                            submitText="Search"
                            customButtons={[<CustomLink to="/#">Advanced Search</CustomLink>]}
                        />
                    </Form.Element>
                </Form>
            </S.SearchContainer>
        </Main>
    );
};

export default Home;
