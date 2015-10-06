var Spreadsheet = require('edit-google-spreadsheet');

Spreadsheet.load({
    debug: true,
    spreadsheetId: 'spreadsheet-id',
    worksheetName: 'Sheet 1',

    oauth : {
        email: 'google_account@developer.gserviceaccount.com',
        keyFile: 'NodeJS-469fe53a7611.pem'
    }

}, function sheetReady(err, spreadsheet) {

    if (err) {
        throw err;
    }

    spreadsheet.receive(function(err, rows, info) {
        if (err) {
            throw err;
        }

        console.dir(rows);
        console.dir(info);
    });

});