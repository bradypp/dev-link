import styled from 'styled-components/macro';
import { ImageUpload, Form } from 'shared/components';

export const StyledImageUpload = styled(ImageUpload)`
    width: 35%;
    align-self: stretch;
    height: auto;
    min-height: 20rem;
`;

export const ImagesContainer = styled(Form.Grid)`
    width: 60%;
    margin-bottom: 0;
    align-self: flex-start;
`;

export const ImageContainer = styled.div`
    position: relative;
    background-image: ${({ url }) => `url(${url})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    height: 16rem;
`;

export const DeleteButton = styled(Form.DeleteButton).attrs({
    variant: 'text-darken',
    color: 'white1',
})`
    position: absolute;
    top: 5px;
    right: 5px;
`;
