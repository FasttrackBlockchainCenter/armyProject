import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: '#2a4eff',
    main: '#364b8b',
    light: '#536be2',
  },
  secondary: {
    contrastText: white,
    darker: '#191b27',
    dark: '#1f2231',
    main: '#242939',
    light: colors.blue['A400']
  },
  navbarText: {
    primary: '#FFF',
    secondary: '#989eb3',
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  background: {
    default: '#f2f3f8',
    paper: white
  },
  icon: '#434d6b',
  iconActive: '#5d78ff',
};