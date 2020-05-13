import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const AccountContainer = styled.div`
    ${mixins.card}
    grid-column: 4 / -4;
    width: 100%;

    h1 {
        display: flex;
        align-items: center;
        font-size: 2.2rem;
        font-weight: 400;
        margin-bottom: 1.6rem;

        &:after {
            flex: 1;
            margin-left: 1.6rem;
            width: 100%;
            border-bottom: 1px solid ${({ theme }) => theme.colors.border1};
            content: '';
        }
    }
`;

export const ButtonsContainer = styled.div`
    ${mixins.gridLayout(2, '1.6rem', '1fr')}
    width: 100%;
`;

export const Button = styled.div`
    ${mixins.flexCenterLeft}
    ${mixins.clickable}
    ${({ theme }) => mixins.darkenEffect(theme.colors.background1, null, theme.colors.border1)}
    height: 10rem;
    padding: 1.6rem;
    width: 100%;
    text-align: left;
    white-space: normal;
    border: 1px solid ${({ theme }) => theme.colors.border1};
`;

export const ButtonIcon = styled.div`
    text-align: center;
    svg {
        font-size: 4rem;
    }
`;

export const ButtonText = styled.span`
    margin-left: 1.6rem;

    strong {
        display: block;
    }

    p {
        font-size: 1.3rem;
        color: ${({ theme }) => theme.colors.textPrimary2};
        margin: 0rem;
    }
`;

export const FlexContainer = styled.div`
    display: flex;
    padding-top: 0.8rem;

    & > :first-child {
        margin-right: 1.6rem;
    }
`;
