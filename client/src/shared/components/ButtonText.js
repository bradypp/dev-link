import styled from 'styled-components/macro';

const ButtonText = styled.span`
    padding: ${({ withPadding, iconLocation }) =>
        withPadding ? (iconLocation === 'left' ? '0 0 0 0.5rem' : '0 0.5rem 0 0') : '0'};
`;

export default ButtonText;
