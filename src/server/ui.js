export const onOpen = () => {
  const menu = SpreadsheetApp.getUi()
    .createMenu('Bulk upload') // edit me!
    .addItem('Image Upload', 'openDialog')
    .addItem('Image Upload (Remove Background)', 'openDialogBootstrap');

  menu.addToUi();
};

export const openDialog = () => {
  const html = HtmlService.createHtmlOutputFromFile('Bulk-Img-Upload')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Image Upload');
};

export const openDialogBootstrap = () => {
  const html = HtmlService.createHtmlOutputFromFile('Bulk-Img-Upload-Remove-Bg')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Image Upload (Remove Background)');
};

