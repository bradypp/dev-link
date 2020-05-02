import styled from 'styled-components/macro';

export const Container = styled.div`
    color: ${({ theme }) => theme.colors.textPrimary2};
    font-size: 1.5rem;
`;

export const Divider = styled.span`
    position: relative;
    top: 2px;
    margin: 0 10px;
    font-size: 1.8rem;
`;
