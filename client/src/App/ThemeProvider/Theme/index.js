import animation from './animation';
import colors from './colors';
import typography from './typography';
import utils from './utils';

const theme = theme => ({
    colors: colors(theme),
    animation,
    ...typography,
    ...utils,
});

export default theme;
