import React from 'react';
import {Loader} from '../Loader';
import ViewExcel from './ViewExcel';
import ViewExcelOpenXml from './ViewExcelOpenXml';
import ViewJpeg from './ViewJpeg';
import ViewPdf from './ViewPdf';
import ViewPng from './ViewPng';

function FileViewer({base64Data, contentType, setFileOpen}) {
	if (contentType === 'application/pdf') {
		return <ViewPdf base64Pdf={base64Data} setPdfOpen={setFileOpen} />;
	} else if (contentType === 'image/jpeg') {
		return <ViewJpeg base64Data={base64Data} setJpgOpen={setFileOpen} />;
	} else if (contentType === 'image/png') {
		return <ViewPng base64Data={base64Data} setPngOpen={setFileOpen} />;
	} else if (contentType === 'application/vnd.ms-excel') {
		return <ViewExcel base64Data={base64Data} setExcelOpen={setFileOpen} />;
	} else if (contentType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
		return <ViewExcelOpenXml base64Data={base64Data} setExcelOpen={setFileOpen} />;
	}
	return <>{base64Data === null ? <Loader /> : ''}</>;
}

export default FileViewer;
