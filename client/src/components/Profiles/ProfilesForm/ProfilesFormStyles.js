import styled from 'styled-components/macro';
import { Form } from 'shared/components';
import { mixins, media } from 'shared/styles';

export const ProfilesFormContainer = styled.div`
    ${mixins.flexCenterLeft}
    grid-column: 1 / -1;
    margin-bottom: 0.5rem 0;
`;

export const CheckboxContainer = styled.div`
    ${mixins.flexCenterLeft}
    width: 100%;

    & > *:first-child {
        margin-right: 2.8rem;
    }
`;

export const FormFieldContainer = styled(Form.Flex)`
    ${media.bp600`
        flex-direction: column;
        margin:0 !important;
        && > * {
            margin:0 0 1.6rem;
        }
    `}
`;

export const SortByLabel = styled(Form.FieldLabel)`
    margin: 0 !important;
`;

export const SortBy = styled(Form.Field.Select)`
    width: 20rem;
    * {
        font-size: 1.3rem;
    }
`;

export const SortByDivider = styled.div`
    border-top: solid 1px ${({ theme }) => theme.colors.border1};
    flex-grow: 1;
`;
