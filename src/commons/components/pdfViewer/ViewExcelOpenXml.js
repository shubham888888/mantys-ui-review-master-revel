import FileSaver from 'file-saver';

function ViewExcelOpenXml({base64Data, setExcelOpen}) {
	setTimeout(() => {
		FileSaver.saveAs(
			`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64Data}`,
			'Transaction.xls'
		);
		setExcelOpen(false);
	}, 1300);

	return;
}

export default ViewExcelOpenXml;
