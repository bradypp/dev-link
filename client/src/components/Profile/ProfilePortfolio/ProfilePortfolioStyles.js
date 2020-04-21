import styled from 'styled-components/macro';
import { mixins, helpers } from 'shared/styles';

export const PortfolioContentContainer = styled.div`
    ${helpers.listElementPadding('1.6rem')}
    ${helpers.listElementSeparators()}
`;

export const PortfolioItemContainer = styled.div`
    ${mixins.flexCenterBetween};
`;

export const ItemInfoContainer = styled.div`
    width: 66%;
`;

const linkMargin = `1.6rem`;
export const SkillsContainer = styled.div`
    ${mixins.flexCenterLeft};
    flex-wrap: wrap;
    margin-bottom: 0.8rem;

    a {
        margin-right: ${linkMargin};
    }
`;

export const LinksContainer = styled.div`
    ${mixins.flexCenterLeft};
    flex-wrap: wrap;

    a {
        margin-right: ${linkMargin};
    }
`;

export const ItemImagesContainer = styled.div`
    width: 33%;
`;
