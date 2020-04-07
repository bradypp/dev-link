import { createGlobalStyle } from 'styled-components/macro';
import { media } from 'shared/styles';
import fontStyles from './fontStyles';

const GlobalStyle = createGlobalStyle`
  ${fontStyles}

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
  body {
    width: 100%;
    max-width: 100%;
  }

  body {
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 ${({ theme }) => theme.layout.pagePadding};
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 1.6rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.textPrimary1};
    background: ${({ theme }) => theme.colors.background2};
    min-height: 100vh;
  }

  p {
    margin: 0 0 10px;
  }

  ol, ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.link};
    transition: ${({ theme }) => theme.animation.transition};
    cursor: pointer;
  }

  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  svg {
    fill: currentColor;
    vertical-align: middle;
  }

  input {
    &::placeholder {
      opacity: 0.7;
    }

    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  [role="button"], button {
    cursor: pointer;
    background: none;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 1.6rem;
  }

   [role="button"], button, input, select, textarea {
    outline: none;
    border: 0;
    border-radius: 0;
    color: ${({ theme }) => theme.colors.textPrimary1};
    transition: ${({ theme }) => theme.animation.transition};

    &:focus,
    &:active {
      outline: none;
    }

    &:disabled {
      opacity: 0.7;
    }
  }

  [role="button"], button, input, textarea {
    appearance: none;
  }
`;

export default GlobalStyle;
