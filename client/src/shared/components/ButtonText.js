import styled from 'styled-components/macro';

const ButtonText = styled.span`
    padding-left: ${({ withPadding }) => (withPadding ? 0.5 : 0)}rem;
`;

export default ButtonText;
