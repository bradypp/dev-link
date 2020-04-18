import styled from 'styled-components/macro';
import { Card } from 'shared/components';
import { mixins } from 'shared/styles';

const ProfileCard = styled(Card)`
    grid-column: 1 / 11;

    header {
        ${mixins.flexCenterBetween}

        h2 {
            font-size: 2.2rem;
            font-weight: 400;
        }

        h3 {
            font-size: 1.8rem;
        }
    }
`;

export default ProfileCard;
