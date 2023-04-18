/**
 * Global constants
 *
 * @author mudit
 */

/**
 * Page URLs
 * @type {{views: string, models: string, dashboards: string, home: string}}
 */
export const PAGE_LINKS = {
	HOME: '/',
	DASHBOARDS: 'dashboard',
	REPORTS: 'report',
	MODELS: 'model',
	LOGIN: 'login',
	IMPORT: 'import',
	IMPORT_STATUS: 'status',
	RESET_PASSWORD: 'reset/password',
	PLANNING: 'planning',
	CURRENCY: 'currency'
};

// Default name of the sheet to be exported
export const EXPORT_SHEET_DEFAULT_NAME = 'Sheet1';

// Default name of the book to be exported
export const EXPORT_BOOK_DEFAULT_NAME = 'Mantys Workbook.xlsx';

// Mail configurations
// TODO update and verify the mail config
export const MAIL_CONFIG = {
	HELP: {
		RECIPIENT: 'help@mantys.io',
		SUBJECT: 'Help'
	},
	NEW_VIEW: {
		RECIPIENT: 'help@mantys.io',
		SUBJECT: 'Request for a new view'
	}
};

export const REQUEST_STATUS = {
	SUCCESS: 'SUCCESS',
	LOADING: 'LOADING',
	FAILED: 'FAILED'
};
