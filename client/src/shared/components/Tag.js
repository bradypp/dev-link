import styled from 'styled-components/macro';
import { CustomLink } from 'shared/components';
import { mixins } from 'shared/styles';

const Tag = styled(CustomLink).attrs({
    variant: 'no-styles',
})`
    color: ${({ theme }) => mixins.rgba(theme.colors.primaryDark, 0.9)};
    background-color: ${({ theme }) => mixins.rgba(theme.colors.primary, 0.12)};
    font-size: 1.3rem;
    font-weight: 500;
    height: 2.2rem;
    padding: 0 0.8rem;
    border-radius: 2rem;
    ${({ theme }) =>
        mixins.hoverEffect(mixins.rgba(theme.colors.primary, 0.2), theme.colors.primaryDark, 0.9)}
`;

export default Tag;
