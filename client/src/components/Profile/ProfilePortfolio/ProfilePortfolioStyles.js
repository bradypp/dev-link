import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const PortfolioItemContainer = styled.div`
    h3,
    p {
        margin: 0 0 1.6rem;
    }

    .portfolio-images {
        flex: 1;
    }
`;

export const PortfolioItemContent = styled.div`
    ${mixins.flexCenter}
`;

export const ItemInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: stretch;
    flex: 1;

    a {
        margin-right: 1.6rem;
    }
`;

export const SkillsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 1.6rem;
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

export const ItemImagesContainer = styled.div``;
