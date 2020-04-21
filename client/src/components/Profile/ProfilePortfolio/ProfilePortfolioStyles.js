import styled from 'styled-components/macro';

export const PortfolioItemContainer = styled.div`
    display: flex;
`;

export const ItemInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 66.6666%;

    a {
        margin-right: 1.6rem;
    }
`;

export const SkillsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 0.8rem;
    margin-top: auto;

    a {
        font-size: 1.3rem;
    }
`;

export const LinksContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
`;

export const ItemImagesContainer = styled.div`
    width: 33.3333%;
`;
