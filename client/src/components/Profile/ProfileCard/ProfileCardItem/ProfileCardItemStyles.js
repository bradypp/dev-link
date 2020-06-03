import styled from 'styled-components/macro';

export const ProfileCardItemContainer = styled.div`
    & > *:not(:last-child) {
        margin-bottom: 1.6rem;
    }
`;

export const ItemHeading = styled.h3`
    margin: 0;
`;

export const ItemSubtitle = styled.p`
    font-size: 1.4rem;
    font-style: italic;
    font-weight: 400;
    margin: 0;
    color: ${({ theme }) => theme.colors.textPrimary2};
`;
