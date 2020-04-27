import { createGlobalStyle, css } from 'styled-components/macro';
import { media, mixins } from 'shared/styles';
import './fontStyles.css';

const GlobalStyles = createGlobalStyle`
  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%; 
    touch-action: manipulation;

    ${media.bp1200`
        font-size: 56.25%; 
    `}

    ${media.bp800`
        font-size: 50%; 
    `}
  }

  html,
  body, 
  #root {
    width: 100%;
    max-width: 100%;
  }

  body {
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.textPrimary1};
    background: ${({ theme }) => theme.colors.background1};
    min-height: 100vh;
  }

  #root {
    ${mixins.flexColumnCenter}
  }

  h1, h2, h3, h4, h5, h6, p {
    margin-top: 0;
    margin-bottom: 0.8rem;
  }

  ol, ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  a {
    cursor: pointer;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.textLink};
  }

  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  svg {
    fill: currentColor;
    vertical-align: middle;

    &:before{
        speak: none;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
  }

  input, textarea {
    &::placeholder {
      opacity: 0.7;
      font-style: italic;
      font-size: 0.8em;
    }

    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }

    ${({ isActive }) =>
        isActive &&
        css`
            &::placeholder {
                opacity: 0.5;
            }
        `}
  }
  
  [role="button"], button {
    ${mixins.button}
  }
  
  [role="button"], button,a {
    ${mixins.clickable}
  }

  [role="button"], button, a, input, select, textarea {
    outline: none;
    border: 0;
    border-radius: 0;
    transition: all 0.1s ease;

    &:focus,
    &:active {
      outline: none;
    }

    &:disabled {
      opacity: 0.7;
      cursor: default;
    }

    ${({ isActive }) =>
        isActive &&
        css`
            outline: none;
        `}
  }
`;

export default GlobalStyles;
