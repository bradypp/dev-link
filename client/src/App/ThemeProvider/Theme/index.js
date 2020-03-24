import animation from './animation';
import colors from './colors';
import typography from './typography';
import utils from './utils';

const theme = {
    colors,
    animation,
    ...typography,
    ...utils,
};

export default theme;
