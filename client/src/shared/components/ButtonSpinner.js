import styled from 'styled-components/macro';
import { Spinner } from 'shared/components';

const ButtonSpinner = styled(Spinner).attrs({
    renderOverlay: false,
    variant: 'button',
    size: '1.8rem',
})``;

export default ButtonSpinner;
