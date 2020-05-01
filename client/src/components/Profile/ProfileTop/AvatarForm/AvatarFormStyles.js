import styled from 'styled-components/macro';
import { ImageUpload, Modal, Form } from 'shared/components';

export const AvatarUpload = styled(ImageUpload)`
    height: ${({ theme }) => theme.layout.avatarWidth};
    width: ${({ theme }) => theme.layout.avatarWidth};
`;

export const ButtonsContainer = styled(Form.Buttons)`
    position: absolute;
    bottom: 0.8rem;
    left: 0.8rem;
`;

export const AvatarModal = styled(Modal)`
    padding: 0;
    max-width: 50rem;
    max-height: 50rem;
`;
