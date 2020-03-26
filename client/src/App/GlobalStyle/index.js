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
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSize.medium};
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.greyDark1};
    line-height: 1.7;
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
  }

  h1, h2, h3 {
    font-weight: 900;
  }

  h4, h5, h6, strong {
    font-weight: 700;
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
    border-radius: 0;
    outline: 0;

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

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;
