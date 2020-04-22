import styled from 'styled-components';

const ProfileList = styled.ul`
    list-style: square;
    padding-left: ${({ theme }) => theme.layout.cardPadding};
`;

export default ProfileList;
