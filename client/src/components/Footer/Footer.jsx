import React from 'react';
import { CustomLink, Tooltip } from 'shared/components';
import { FooterContainer, Separator } from './FooterStyles';

const Footer = () => (
    <FooterContainer>
        <CustomLink to="/">Home</CustomLink>
        <Separator>&middot;</Separator>
        <Tooltip
            width="30rem"
            placement="top"
            offset={{ top: -15 }}
            renderElement={props => (
                <CustomLink to="#" variant="link" {...props}>
                    About
                </CustomLink>
            )}
            renderContent={props => (
                <div {...props}>
                    <h3>About</h3>
                    <p>
                        This site was built with the MERN stack with the intention of providing a
                        good example of a medium sized full-stack web-app.
                    </p>
                    <p>
                        Please feel free to have a look through the{' '}
                        <CustomLink href="https://www.github.com/bradypp/dev-link">repo</CustomLink>{' '}
                        or get in touch via{' '}
                        <CustomLink href="https://www.paulbrady.dev">my website</CustomLink> or{' '}
                        <CustomLink href="https://www.twitter.com">twitter</CustomLink>
                    </p>
                </div>
            )}
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
