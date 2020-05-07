import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const ProfileCardContainer = styled.section`
    ${mixins.card}

    * {
        margin: 0;
    }

    & > *:not(header):not(:last-child) {
        border-bottom: solid 1px ${({ theme }) => theme.colors.border1};
        padding: ${({ theme }) => theme.layout.itemGap} 0;
    }

    & > *:not(header):last-child {
        padding: ${({ theme }) => theme.layout.itemGap} 0 0;
    }
`;

export const Header = styled.header`
    ${mixins.flexCenterBetween}
`;

export const Heading = styled.h2`
    font-weight: 400;
    margin: 0;
`;

export const Subtitle = styled.p`
    font-style: italic;
    font-weight: 400;
    margin: 0;
    color: ${({ theme }) => theme.colors.textPrimary2};
`;

export const ButtonsContainer = styled.div`
    ${mixins.flexCenterRight}
    & > *:not(:first-child) {
        margin-left: ${({ theme }) => theme.layout.buttonGap};
    }
`;
