import {createTheme} from '@mui/material';

/**
 * Theme and styles for the app
 *
 * @author mudit
 */

/**
 * Colors for the app
 * @type {{WHITE: string, PRIMARY: string}}
 */
export const COLORS = {
	BLACK: 'black',
	PRIMARY_LIGHT: '#51a2ff21',
	PRIMARY_DARK: '#5E81AB',
	PRIMARY_TRANSPARENT: 'rgba(71, 126, 189, 0.05)',
	PRIMARY_LIGHT_GREEN: 'rgba(193, 232, 214, 0.23)',
	PRIMARY: '#477EBD',
	PRIMARY_SCROLL: '#477EBD22',
	WHITESMOKE_LIGHT: 'rgba(242, 242, 242, 0.3)',
	WHITE: '#fff',
	LIGHT_GREY: '#F3F3F3',
	DARK_GREY: '#646464',
	GREY: '#c8c9c9',
	LIGHT_BLUE: '#C1E8EE',
	LIGHT_GREEN: '#C1E8D6',
	LIGHT_PURPLE: '#CCC1E8',
	LIGHT_RED: '#ffe0e0',
	LIGHT_YELLOW: '#fff5e0',
	CYAN: '#C1FFEE',
	GREEN: '#00e676',
	RED: '#fa375d',
	SUCCESS: '#2cba5c',
	WATERFALL: '#80f3a3',
	LIGHT_BG_TRANSPARENT: '#EBF0F300',
	LIGHT_BG: '#EBF0F977',
	GREY_BLACK: '#484964'
};

export const RANDOM_COLORS = [
	'#0278ee',
	'#96f5f3',
	'#FF6F00',
	'#80f3a3',
	'#bbe0ff',
	'#4DB6AC',
	'#d2c0fd',
	'#F4FF81',
	'#9575CD',
	'#66BB6A',
	'#D50000',
	'#AA00FF',
	'#F06292'
];

export const CHART_COLOR = '#23AFFA';

export const DOUGHNUT_COLOR = '#4BD4D8';

export const CARD_SHADOW = `2.8px 2.8px 2.2px rgba(0, 0, 0, 0.003),
6.7px 6.7px 5.3px rgba(0, 0, 0, 0.008),
12.5px 12.5px 10px rgba(0, 0, 0, 0.01),
22.3px 22.3px 17.9px rgba(0, 0, 0, 0.006),
41.8px 41.8px 33.4px rgba(0, 0, 0, 0.007),
100px 100px 80px rgba(0, 0, 0, 0.01)`;

export const GRID_SHADOW = `
0px 0px 2.2px rgba(0, 0, 0, 0.014),
0px 0px 5.3px rgba(0, 0, 0, 0.02),
0px 0px 10px rgba(0, 0, 0, 0.025),
0px 0px 17.9px rgba(0, 0, 0, 0.03),
0px 0px 33.4px rgba(0, 0, 0, 0.036),
0px 0px 80px rgba(0, 0, 0, 0.05)
`;

export const MAX_GRID_WIDTH = 940;
/**
 * Theme for the app
 * @type {Theme}
 */
export const Theme = createTheme({
	palette: {
		primary: {
			main: COLORS.PRIMARY
		}
	},
	typography: {
		fontSize: 12,
		fontFamily: 'Roboto'
	}
});
