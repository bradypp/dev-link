import React from 'react';
import { CustomLink, Tooltip, Button } from 'shared/components';
import { FooterContainer, Separator } from './FooterStyles';

const Footer = () => (
    <FooterContainer>
        <CustomLink to="/">Home</CustomLink>
        <Separator>&middot;</Separator>
        <Tooltip
            width="30rem"
            placement="top"
            offset={{ top: -10 }}
            renderElement={props => (
                <Button variant="link" {...props}>
                    About
                </Button>
            )}
            renderContent={props => <h3 {...props}>About</h3>}
        />
        <Separator>&middot;</Separator>
        <CustomLink href="https://www.paulbrady.dev">My Website</CustomLink>
        <Separator>&middot;</Separator>
        <CustomLink href="https://www.github.com/bradypp/dev-link">GitHub Repo</CustomLink>
        <Separator>&middot;</Separator>
        <span>Built with</span>
        <Separator />
        <CustomLink href="https://reactjs.org/">ReactJS</CustomLink>
        <Separator>&middot;</Separator>
        <CustomLink href="https://redux.js.org/">Redux</CustomLink>
        <Separator>&middot;</Separator>
        <CustomLink href="https://nodejs.org/">NodeJS</CustomLink>
        <Separator>&middot;</Separator>
        <CustomLink href="https://expressjs.com/">ExpressJS</CustomLink>
        <Separator>&middot;</Separator>
        <CustomLink href="https://www.mongodb.com/">MongoDB</CustomLink>
        <Separator />
        <span>and more!</span>
    </FooterContainer>
);

export default Footer;
