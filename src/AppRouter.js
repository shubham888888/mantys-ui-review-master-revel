import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import ErrorPage from './commons/components/Error/ErrorPage';
import {PAGE_LINKS} from './commons/constants';
import Dashboard from './components/home/body/dashboards/Dashboard';
import Models from './components/home/body/models/Models';
import HomePlaceholder from './components/home/body/placeholder/HomePlaceholder';
import Reports from './components/home/body/reports/Reports';
import Currency from './components/settings/currency/Currency';
import Settings from './components/settings/Settings';
import Home from './components/home/Home';
import FileImport from './components/import/FileImport';
import NewImport from './components/import/NewImport';
import PrevUploads from './components/import/PrevUploads/PrevUploads';
import Login from './components/login/Login';
import ResetPassword from './components/login/ResetPassword/ResetPassword';
import Planning from './components/Planning';

/**
 * Application router
 */

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path={PAGE_LINKS.HOME} errorElement={<ErrorPage error={{msg: 'Page Not Found'}}></ErrorPage>}>
			<Route path={''} exact element={<Home />}>
				<Route index={true} exact element={<HomePlaceholder />} />
				<Route path={PAGE_LINKS.PLANNING} exact element={<Planning />} />
				<Route path={PAGE_LINKS.DASHBOARDS + '/:id'} exact element={<Dashboard />} />
				<Route path={PAGE_LINKS.REPORTS + '/:id'} exact element={<Reports />} />
				<Route path={PAGE_LINKS.MODELS + '/:id'} exact element={<Models />} />
			</Route>
			<Route path={PAGE_LINKS.LOGIN} exact>
				<Route index={true} exact element={<Login />} />
				<Route path={PAGE_LINKS.RESET_PASSWORD} exact element={<ResetPassword />} />
			</Route>
			<Route path={PAGE_LINKS.IMPORT} exact element={<FileImport />}>
				<Route index={true} exact element={<NewImport />} />
				<Route path={PAGE_LINKS.IMPORT_STATUS + '/:id'} exact element={<PrevUploads />} />
			</Route>
			<Route path={PAGE_LINKS.CURRENCY} exact element={<Settings />}>
				<Route index={true} exact element={<Currency />} />
			</Route>
		</Route>
	)
);
