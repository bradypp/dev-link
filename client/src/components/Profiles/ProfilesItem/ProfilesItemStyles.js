import styled, { css } from 'styled-components/macro';
import { Tag } from 'shared/components';
import Image from 'react-image';
import { mixins } from 'shared/styles';

export const ProfilesItemContainer = styled.div`
    ${mixins.card}
    ${mixins.flexCenterLeft}
    ${mixins.clickable}
    margin: 0.6rem 0 0.8rem 0;

    `;

const avatarContainer = css`
    height: 12rem;
    width: 12rem;
    border-radius: 50%;
`;

export const ContentLeft = styled.div`
    margin: 0 auto 0 2rem;
    h2,
    h3,
    p {
        margin-bottom: 0.4rem;
    }

    h2 {
        font-size: 1.8rem;
        font-weight: 500;
    }

    h3 {
        font-weight: 400;
        font-size: 1.6rem;
    }
`;

export const ContentRight = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: column;
    flex-wrap: wrap;
    align-self: stretch;

    & > * {
        margin: ${({ theme }) => `0 0 ${theme.layout.tagGap} ${theme.layout.tagGap}`};
    }
`;

export const SkillsContainer = styled.div`
    ${mixins.flexCenterRight}
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap-reverse;
    & > * {
        margin: ${({ theme }) => `${theme.layout.tagGap} 0 0 ${theme.layout.tagGap}`};
    }
`;

export const AvatarContainer = styled.div`
    height: 12rem;
    width: 12rem;
    min-width: 12rem;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.boxShadow.primary};
`;

export const Avatar = styled(Image)`
    position: absolute;
    display: block;
    object-fit: cover;
`;

export const WatchersStarsContainer = styled.div`
    ${mixins.flexCenterRight}
    flex-wrap: wrap;
`;

export const WatchersStars = styled.div`
    ${mixins.flexCenter}
    margin-left: ${({ theme }) => theme.layout.tagGap};
    font-size: 1.3rem;

    svg {
        font-size: 2rem;
        margin-right: 0.4rem;
    }
`;
