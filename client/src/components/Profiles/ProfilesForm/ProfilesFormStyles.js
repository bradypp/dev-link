import styled from 'styled-components/macro';
import { Form } from 'shared/components';
import { mixins } from 'shared/styles';

export const ProfilesFormContainer = styled.div`
    ${mixins.flexCenterLeft}
    grid-column: 1 / -1;
    margin-bottom: 0.5rem 0;
`;

export const SortByLabel = styled(Form.FieldLabel)`
    margin: 0 !important;
`;

export const SortBy = styled(Form.Field.Select)`
    width: 18rem;
`;

export const SortByDivider = styled.div`
    border-top: solid 1px ${({ theme }) => theme.colors.border1};
    flex-grow: 1;
`;
