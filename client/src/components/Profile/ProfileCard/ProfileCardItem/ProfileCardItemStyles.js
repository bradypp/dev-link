import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const ProfileCardItemContainer = styled.div`
    & > *:not(:last-child) {
        margin-bottom: 0.8rem;
    }

    time {
        font-size: 1.4rem;
        font-style: italic;
        font-weight: 400;
    }
`;

export const ItemHeading = styled.h3`
    font-size: 1.7rem;
    margin: 0;
`;

export const ItemSubtitle = styled.p`
    font-size: 1.6rem;
    font-style: italic;
    font-weight: 400;
    margin: 0;
`;

export const ItemSecondarySubtitle = styled.p`
    font-size: 1.4rem;
    font-style: italic;
    font-weight: 400;
    margin: 0;
`;
