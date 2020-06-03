import styled from 'styled-components/macro';
import { ImageUpload, Form } from 'shared/components';
import { media } from 'shared/styles';

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
    height: 16rem;
    width: 100%;
`;

export const DeleteButton = styled(Form.DeleteButton).attrs({ backgroundColor: 'whiteTrans' })`
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 0;
    width: 2.4rem;
    height: 2.4rem;
    min-height: 2.2rem;
    min-width: 2.2rem;
`;
