import styled from 'styled-components/macro';

export const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
`;

export const HiddenCheckbox = styled.input.attrs({
    type: 'checkbox',
})`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
    /* visibility: hidden; */
`;

export const StyledCheckbox = styled.div`
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
    background-color: ${({ theme, value }) => (value ? theme.colors.primary : theme.colors.white1)};
    border-radius: 0.3rem;
    transition: all 0.1s;

    input + & {
        focus {
            box-shadow: 0 0 0 0.01rem blue;
        }
    }

    svg {
        fill: none;
        stroke: white;
        stroke-width: 0.2rem;
        visibility: ${({ value }) => (value ? 'visible' : 'hidden')};
    }
`;
