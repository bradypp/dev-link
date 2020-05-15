import styled from 'styled-components/macro';
import { CustomLink } from 'shared/components';
import { media } from 'shared/styles';

export const SkillsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 0.5rem;

    a {
        margin: ${({ theme }) => `${theme.layout.tagGap} ${theme.layout.tagGap} 0 0`};
        font-size: 1.3rem;
    }
`;

export const LinksContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    a {
        margin: ${({ theme }) => `2rem ${theme.layout.buttonGap} 0 0`};
    }
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 5;
    align-self: stretch;

    p {
        margin-bottom: auto;
    }
`;

export const CarouselContainer = styled.div`
    flex: 4;
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
    ${media.bp600`
        margin-top:2rem;
    `}
`;

export const StyledCustomLink = styled(CustomLink)`
    height: 2.8rem;
    padding: 0 0.8rem;
`;
