import { createTheme, ThemeProvider } from '@mui/material/styles';
export const Theme = createTheme({
  palette: {
    primary: {
      main: '#73548b',
      contrastText: '#fff',
    },
    analogous: {
        main: '#FB2E86',
        contrastText: '#fff',
      },
  },
});