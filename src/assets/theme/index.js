import { createTheme } from '@mui/material/styles';
import colors from './_themes-vars.module.scss';
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';



export const theme = () => {
    const color = colors;

    const themeOption = {
        colors: color,
        heading: "#ffae00",
        paper: "#000000",
        backgroundDefault: "rgb(3,6,20)",
        background: "rgba(21,24,35,0.66)",
        darkTextPrimary: "#ffffff",
        darkTextSecondary: "#e75316",
        textDark: "#fcd90b",
        menuSelected: "#fac900",
        menuSelectedBack: "rgba(248,160,31,0.26)",
        divider: "rgb(0,1,2)",

    };

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography(themeOption)
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default theme;
