import styled from 'styled-components/macro';
import { Form } from 'shared/components';
import { mixins, media } from 'shared/styles';

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
    ${media.bp800`
    ${mixins.gridLayout(1, '1.6rem', '1fr')}
    `}
`;

export const Button = styled.div`
    ${mixins.flexCenterLeft}
    ${mixins.clickable}
    ${({ theme }) => mixins.darkenEffect(theme.colors.background1, null, theme.colors.border1)}
    min-height: 12rem;
    padding: 2.4rem 1.6rem;
    width: 100%;
    text-align: left;
    white-space: normal;
    border: 1px solid ${({ theme }) => theme.colors.border1};
    transition: all 0.25s ease;
`;

export const ButtonIcon = styled.div`
    text-align: center;
    svg {
        font-size: 3.6rem;
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

export const StyledFormButtons = styled(Form.Buttons)`
    padding-top: 1.6rem;
`;
