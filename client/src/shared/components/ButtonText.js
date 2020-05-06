import styled from 'styled-components/macro';

const ButtonText = styled.span`
    padding: ${({ withPadding, iconAlign }) =>
        withPadding ? (iconAlign === 'left' ? '0 0 0 0.5rem' : '0 0.5rem 0 0') : '0'};
`;

export default ButtonText;
