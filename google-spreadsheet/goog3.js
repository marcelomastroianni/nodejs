var GoogleSpreadsheet = require("google-spreadsheet");
var my_sheet = new GoogleSpreadsheet('spredsheet-id');


// set auth to be able to edit/add/delete
my_sheet.setAuth('google_account@developer.gserviceaccount.com','notasecret', function(err){
 my_sheet.getInfo( function( err, sheet_info ){
 console.log( sheet_info.title + ' is loaded' );
 // use worksheet object if you want to forget about ids
 sheet_info.worksheets[0].getRows( function( err, rows ){
 rows[0].colname = 'new val';
 rows[0].save();
 rows[0].del();
 })
 })
 // column names are set by google based on the first row of your sheet
 my_sheet.addRow( 2, { colname: 'col value'} );
 my_sheet.getRows( 2, {
 start: 100, // start index
 num: 100 // number of rows to pull
 }, function(err, row_data){
 // do something...
 });
})