import FileSaver from 'file-saver';

function ViewExcel({base64Data, setExcelOpen}) {
	setTimeout(() => {
		FileSaver.saveAs(`data:application/vnd.ms-excel;base64,${base64Data}`, 'Transaction.xls');
		setExcelOpen(false);
	}, 1300);
	return;
}

export default ViewExcel;
