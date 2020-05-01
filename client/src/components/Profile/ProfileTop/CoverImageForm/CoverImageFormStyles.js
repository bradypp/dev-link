import styled from 'styled-components/macro';
import { ImageUpload, Modal, Form } from 'shared/components';

export const CoverImageUpload = styled(ImageUpload)`
    height: 100%;
    width: 100%;
`;

export const ButtonsContainer = styled(Form.Buttons)`
    position: absolute;
    left: 50%;
    bottom: 0.8rem;
    transform: translateX(-50%);

    & > * {
        color: #fff;
    }
`;

export const CoverImageModal = styled(Modal)`
    padding: 0;
    height: auto;
    width: 96rem;
    overflow: hidden;
`;
