import React from 'react';
import Media from 'react-media';
import { CustomLink, Tooltip } from 'shared/components';
import { FooterContainer, Separator, Text } from './FooterStyles';

const Footer = () => {
    const aboutContent = props => (
        <div {...props}>
            <h3>About</h3>
            <p>
                This site was built with the MERN stack and is a good example of a medium sized
                full-stack web-app.
            </p>
            <p>
                Please feel free to have a look through the{' '}
                <CustomLink href="https://www.github.com/bradypp/dev-link">repo</CustomLink> or get
                in touch via{' '}
                <CustomLink href="https://linkedin.com/in/bradypp">LinkedIn</CustomLink>,{' '}
                <CustomLink href="https://paulbrady.dev">my website</CustomLink> or{' '}
                <CustomLink href="https://www.twitter.com/bradypp">Twitter</CustomLink>.
            </p>
        </div>
    );

    return (
        <FooterContainer>
            <CustomLink to="/">Home</CustomLink>
            <Separator>&middot;</Separator>
            <Media
                query="(min-width: 801px)"
                render={() => (
                    <>
                        <Tooltip
                            width="30rem"
                            placement="top"
                            offset={{ top: -15 }}
                            renderElement={props => (
                                <CustomLink to="#" variant="link" {...props}>
                                    About
                                </CustomLink>
                            )}
                            renderContent={aboutContent}
                        />
                    </>
                )}
            />
            <Media
                query="(max-width: 800px)"
                render={() => (
                    <>
                        <Tooltip
                            width="30rem"
                            placement="top"
                            offset={{ top: -15, left: 50 }}
                            renderElement={props => (
                                <CustomLink to="#" variant="link" {...props}>
                                    About
                                </CustomLink>
                            )}
                            renderContent={aboutContent}
                        />
                    </>
                )}
            />
            <Separator>&middot;</Separator>
            <CustomLink href="https://www.paulbrady.dev">My Website</CustomLink>
            <Separator>&middot;</Separator>
            <CustomLink href="https://www.github.com/bradypp/dev-link">GitHub Repo</CustomLink>
            <Separator>&middot;</Separator>
            <Text>Built with</Text>
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
            <Text>and more!</Text>
        </FooterContainer>
    );
};

export default Footer;
