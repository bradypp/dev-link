import animation from './animation';
import colors from './colors';
import mixins from './mixins';
import media from './media';
import typography from './typography';
import utils from './utils';

const theme = {
    colors,
    mixins,
    media,
    animation,
    ...typography,
    ...utils,
};

export default theme;
