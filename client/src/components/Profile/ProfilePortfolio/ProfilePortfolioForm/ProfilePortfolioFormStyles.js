import styled from 'styled-components/macro';
import { ImageUpload, Form } from 'shared/components';
import { mixins, media } from 'shared/styles';

export const ImageUploadContainer = styled(Form.Flex)`
    ${media.bp600`
        align-content:center;
        flex-direction:column;
    `}
`;
export const StyledImageUpload = styled(ImageUpload)`
    width: 35%;
    align-self: stretch;
    height: auto;
    min-height: 20rem;
    ${media.bp600`
    width: 100%;
    `}
`;

export const ImagesContainer = styled(Form.Grid)`
    width: 60%;
    margin-bottom: 0;
    align-self: flex-start;
    ${media.bp600`
        display:none;
    `}
`;

export const ImageContainer = styled.div`
    position: relative;
    background-image: ${({ url }) => `url(${url})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    height: 16rem;
    width: 100%;
`;

export const DeleteButton = styled(Form.DeleteButton).attrs({
    variant: 'no-styles',
    color: 'white1',
})`
    position: absolute;
    top: 5px;
    right: 5px;
`;
