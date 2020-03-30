import styled from 'styled-components/macro';

const MainContainer = styled.main`
    padding: 0 ${({ theme }) => theme.layout.pagePadding};
    width: 100%;
`;

export default MainContainer;
