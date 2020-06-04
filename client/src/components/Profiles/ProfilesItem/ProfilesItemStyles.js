import styled from 'styled-components/macro';
import Image from 'react-image';
import { mixins, media } from 'shared/styles';

export const ProfilesItemContainer = styled.li`
    ${mixins.card}
    ${mixins.flexCenterLeft}
    ${mixins.clickable}
    margin: 0.6rem 0 0.8rem 0;
    
    ${media.bp600`
        ${mixins.flexCenter}
        flex-wrap: wrap;
    `}
    `;

export const ItemContainer = styled.div`
    ${mixins.flexCenterLeft}
    width:100%;
    ${media.bp600`
        ${mixins.flexCenter}
        margin:0;
        width:100%;
    `}

    h3,
    p {
        margin-bottom: 0.4rem;
    }

    h3 {
        font-weight: 400;
        font-size: 1.6rem;
    }
`;

export const NameRow = styled.div`
    display: flex;
    justify-content: space-between;
    wisth: 100%;
    h2 {
        margin-bottom: 0.4rem;
        font-size: 1.8rem;
        font-weight: 500;
    }
`;

export const ContentContainer = styled.div`
    width: 100%;
`;

export const SubContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    ${media.bp600`
        flex-direction:column;
    `}
`;

export const ContentLeft = styled.div`
    flex: 2;
    ${media.bp600`
       align-self:flex-start;
    `}
`;

export const ContentRight = styled.div`
    flex: 3;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    align-self: stretch;
    width: minmax(30%, 50%);
    & > * {
        margin: ${({ theme }) => `0 0 ${theme.layout.tagGap} ${theme.layout.tagGap}`};
    }
    ${media.bp600`
        align-self:flex-start;
        margin-left: -1rem;
    `}
`;

export const SkillsContainer = styled.div`
    ${mixins.flexCenterRight}
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap-reverse;

    ${media.bp600`
        ${mixins.flexCenterLeft}
        flex-wrap: wrap;
        margin:0;
        width:100%;
    `}

    & > * {
        margin: ${({ theme }) => `${theme.layout.tagGap} 0 0 ${theme.layout.tagGap}`};
    }
`;

export const AvatarContainer = styled.div`
    display: inline-block;
    margin-right: 2rem;
    height: 12rem;
    width: 12rem;
    min-width: 12rem;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.boxShadow.primary};
`;

export const Avatar = styled(Image)`
    height: 12rem;
    width: 12rem;
    min-width: 12rem;
    border-radius: 50%;
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
