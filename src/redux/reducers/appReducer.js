import {combineReducers} from 'redux';
import authReducer from './authReducer';
import {commonReducer} from './commonReducer';
import dashboardReducer from './dashboardReducer';
import fileImportReducer from './fileImportReducer';
import metadataReducer from './metadataReducer';
import modelsReducer from './modelsReducer';
import planningReducer from './planningReducer';
import prevUploadReducer from './prevUploadsReducer';
import reportsReducer from './reportsReducer';
import {viewsReducer} from './viewsReducer';

/**
 * App reducer
 *
 * @author mudit
 */

const appReducer = combineReducers({
	commonState: commonReducer,
	auth: authReducer,
	prevUploadsState: prevUploadReducer,
	fileImportState: fileImportReducer,
	viewsState: viewsReducer,
	dashboardState: dashboardReducer,
	reportsState: reportsReducer,
	modelsState: modelsReducer,
	planningState: planningReducer,
	metadataState: metadataReducer
});

export default appReducer;
