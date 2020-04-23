import styled from 'styled-components';
import { mixins } from 'shared/styles';

export const TooltipContainer = styled.div`
    position: fixed;
    border-radius: 3px;
    width: ${({ width }) => width};
    z-index: ${({ theme }) => theme.zIndex.modal + 1};
    background: ${({ theme }) => theme.colors.background1};
    box-shadow: ${({ theme }) => theme.boxShadow.dropdown} ${mixins.hardwareAccelerate};
`;
