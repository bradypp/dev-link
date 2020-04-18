import styled, { css } from 'styled-components/macro';
import { helpers, mixins } from 'shared/styles';
import ProfileCard from '../ProfileCard';

const sharedToggleButtonStyles = css`
    font-size: 1.3rem;
    height: 3rem;
    padding: 0 0.8rem;
    border: 1px solid ${({ theme }) => theme.colors.border2};
`;

export const ProfileTopStyles = styled(ProfileCard)`
    padding: 0;
    flex-direction: column;

    .cover-image-container {
        height: 18rem;
        overflow: hidden;
    }

    .content {
        display: flex;
        justify-content: flex-between;
        align-items: flex-start;
        padding: 2.4rem;
        width: 100%;
        line-height: 1.3;

        .content-left {
            display: flex;
            flex-direction: column;
            align-items: 'flex-start';
            height: 100%;
            width: 100%;

            .avatar-container {
                height: 16rem;
                width: 16rem;
                box-shadow: ${({ theme }) => theme.boxShadow.primary};
                border-radius: 50%;
                border: 5px solid #fff;
                margin-top: -14rem;
                margin-bottom: 0.8rem;

                .avatar {
                    border-radius: 50%;
                }
            }

            .name {
                font-size: 2.4rem;
                font-weight: 400;
            }

            .headline {
                font-size: 1.8rem;
                font-weight: 400;
            }

            .subheading {
                font-size: 1.6rem;
                font-weight: 400;
            }

            ${'' /* TODO: link styles (make bolder & grey background on hover?), make global button variant? */}
            .info-buttons {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: max-content;

                & > * :not(:first-child) {
                    margin-left: 0.4rem;
                }

                & > * :not(:last-child) {
                    margin-right: 0.4rem;
                }
            }
        }

        .content-right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: 'flex-end';
            height: 100%;
            width: 100%;

            & > * :not(:last-child) {
                margin-bottom: 1rem;
            }

            .toggle-buttons {
                display: flex;
                justify-content: flex-end;

                & > button :not(:first-child) {
                    margin-left: 1.4rem;
                }

                ${'' /* TODO: Have a round icon only button that changes color/background color on hover & click? */}
                ${'' /* TODO: if keeping border, change outline color to match hover background color */}

                   .toggle-button {
                    ${sharedToggleButtonStyles};
                    border-top-right-radius: 0px;
                    border-bottom-right-radius: 0px;

                    &:hover {
                        border: 1px solid
                            ${({ theme }) => helpers.darken(theme.colors.border2, 0.1)};
                    }

                    svg {
                        font-size: 1.6em;
                    }
                }

                .count-container {
                    ${mixins.inlineFlexCenter};
                    ${sharedToggleButtonStyles};
                    border-left: none;
                    font-size: 1.4rem;
                    border-top-left-radius: 0px;
                    border-bottom-left-radius: 0px;
                }
            }

            .skills {
                display: flex;
                justify-content: right;
                flex-wrap: wrap;

                .skill {
                    border-radius: 50px;
                    font-size: 1.3rem;
                    padding: 0 1rem;
                    height: 2.8rem;
                    margin-top: 0.8rem;
                    margin-left: 0.8rem;
                }
            }
        }
    }
`;
