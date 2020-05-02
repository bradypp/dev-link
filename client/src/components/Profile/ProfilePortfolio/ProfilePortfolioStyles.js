import styled from 'styled-components/macro';

export const SkillsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 0.8rem 0;

    a {
        margin-right: 1.6rem;
        font-size: 1.3rem;
    }
`;

export const LinksContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    a {
        margin-right: 1.6rem;
    }
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-self: stretch;

    p {
        margin-bottom: auto;
    }
`;

export const CarouselContainer = styled.div`
    flex: 1;
`;
