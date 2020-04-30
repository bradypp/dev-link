import styled, { css } from 'styled-components/macro';
import ButtonWrapper from './ButtonWrapper';

// TODO: share all styles with custom link button variants
const iconOnlyHeightWidth = '2.8rem';
export const StyledButton = styled(ButtonWrapper)`
    height: ${({ iconOnly }) => (iconOnly ? iconOnlyHeightWidth : '3.2rem')};
    width: ${({ iconOnly }) => (iconOnly ? iconOnlyHeightWidth : 'auto')};
    padding: 0 ${({ iconOnly }) => (iconOnly ? '0' : '1.2rem')};
    border-radius: 0.3rem;
    font-size: 1.45rem;
    color: ${({ theme }) => theme.colors.textPrimary1};

    svg {
        ${({ iconSize }) =>
            css`
                font-size: ${iconSize};
            `}
    }
`;

// const colored = css`
//   color: #fff;
//   background: ${props => color[props.variant]};
//   ${font.medium}
//   &:not(:disabled) {
//     &:hover {
//       background: ${props => mixin.lighten(color[props.variant], 0.15)};
//     }
//     &:active {
//       background: ${props => mixin.darken(color[props.variant], 0.1)};
//     }
//     ${props =>
//       props.isActive &&
//       css`
//         background: ${mixin.darken(color[props.variant], 0.1)} !important;
//       `}
//   }
// `;

// const secondaryAndEmptyShared = css`
//   color: ${color.textDark};
//   ${font.regular}
//   &:not(:disabled) {
//     &:hover {
//       background: ${color.backgroundLight};
//     }
//     &:active {
//       color: ${color.primary};
//       background: ${color.backgroundLightPrimary};
//     }
//     ${props =>
//       props.isActive &&
//       css`
//         color: ${color.primary};
//         background: ${color.backgroundLightPrimary} !important;
//       `}
//   }
// `;

// const buttonVariants = {
//   primary: colored,
//   success: colored,
//   danger: colored,
//   secondary: css`
//     background: ${color.secondary};
//     ${secondaryAndEmptyShared};
//   `,
//   empty: css`
//     background: #fff;
//     ${secondaryAndEmptyShared};
//   `,
// };
