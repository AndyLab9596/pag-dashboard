import styled from '@emotion/styled';

export const GlobalStyle = styled.div`
  @font-face {
    font-family: 'Heebo';
    font-style: normal;
    font-weight: 400;
    src: url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap') format('ttf');
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }
  body {
    font-family: 'Heebo', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  #root {
    min-height: 100%;
    min-width: 100%;
  }
  p,
  label {
    font-family: 'Heebo', Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  input,
  select {
    font-family: inherit;
    font-size: inherit;
  }
`;
