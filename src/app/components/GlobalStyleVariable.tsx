const black = '#3F536E';
const grey = '#8DABC4';

export const color = {
  //Red
  redColor1: '#CC0000',
  redColor2: '#F48184',
  redColor3: '#F7AAAA',
  redColor4: '#FBD3D3',

  //Asia Capital Blue
  blueColor0: '#000080',
  blueColor1: '#B1AED0',
  blueColor2: '#505398',
  blueColor3: '#7A7DB1',
  blueColor4: '#B1AED0',

  //Absolute Returns Blue
  ceruColor1: '#0067AC',
  ceruColor2: '#407EA7',
  ceruColor3: '#80A9C4',
  ceruColor4: '#B2CBDC',

  //Black
  blackColor1: '#000000',
  blackColor2: '#373535',
  blackColor3: '#A7A4A4',
  blackColor4: '#D7D7D7',

  //Gray
  grayColor1: '#797A7D',

  //Green
  greenColor1: '#00807F',
  greenColor2: '#5C9597',
  greenColor3: '#8CB0B1',
  greenColor4: '#C5D7D4',
};

export const activeColor = {
  red: `${color.redColor1}`,
  ceru: `${color.ceruColor1}`,
  blue: `${color.blueColor1}`,
  green: `${color.greenColor1}`,
};

export const shadesOfGray = {
  backgrounds: `${color.blackColor2}`,
  bodyBlackText: `${color.grayColor1}`,
  bodyGreyText: '#A8C6DF',
  bodyActive: '#A8C6DF',
  passiveIcons: '#D7D7D7',
};

export const body = {
  fontSize: {
    large: '17px',
    regular: '15px',
  },
  color: {
    black: `${black}`,
    grey: `${grey}`,
  },
};

export const caption = {
  fontSize: {
    small: '13px',
  },
};

export const tag = {
  fontSize: {
    small: '11px',
  },
  color: {
    grey: `${grey}`,
  },
};

export const button = {
  small: {
    fontSize: '13px',
    color: '#0093EE',
  },
  regular: {
    fontSize: '15px',
    color: '#0093EE',
  },
};
