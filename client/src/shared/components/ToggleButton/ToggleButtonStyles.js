import styled, { css } from 'styled-components/macro';
import { Button } from 'shared/components';
import { mixins } from 'shared/styles';

export const ToggleButtonsContainer = styled.div`
    ${mixins.flexCenterRight}
    margin-bottom:auto;

    button {
        margin-left: 1.6rem;
    }
`;

const sharedToggleButtonStyles = css`
    font-size: 1.2rem;
    font-weight: 500;
    height: 3rem;
    padding: 0 0.8rem;
    border: 1px solid ${({ theme }) => theme.colors.border2};
`;

export const ToggleButton = styled(Button).attrs({ variant: 'no-styles' })`
    ${sharedToggleButtonStyles};
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
    background-image: ${({ theme }) =>
        `linear-gradient(-180deg, ${mixins.darken(theme.colors.white1, 0.01)}, ${mixins.darken(
            theme.colors.white2,
            0.02,
            4,
        )} 90%)`};

    &:hover {
        border: 1px solid ${({ theme }) => mixins.darken(theme.colors.border2, 0.03)};
        background-image: ${({ theme }) =>
            `linear-gradient(-180deg, ${mixins.darken(theme.colors.white1, 0.03)}, ${mixins.darken(
                theme.colors.white2,
                0.05,
            )} 90%)`};
    }

    svg {
        font-size: 1.6em;
    }
`;

export const CountContainer = styled.div`
    ${mixins.inlineFlexCenter};
    ${sharedToggleButtonStyles};
    border-left: none;
    font-size: 1.2rem;

    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
`;
