var GoogleSpreadsheet = require("google-spreadsheet");

var fs = require('fs');

// spreadsheet key is the long id in the sheets URL 
var my_sheet = new GoogleSpreadsheet('spreadsheet-id');
 
var creds = {
  client_email: 'google_account@developer.gserviceaccount.com',
  private_key: '-----BEGIN PRIVATE KEY-----\n private key\n-----END PRIVATE KEY-----\n'
}
 
my_sheet.useServiceAccountAuth(creds, function(err){
             
    var timer = setInterval(function() { 
            
        my_sheet.getInfo( function( err, sheet_info ){
            console.log( sheet_info.title + ' is loaded ---r--' );
         
            var sheet1 = sheet_info.worksheets[0];
            sheet1.getRows( function( err, rows ){
           		
				rows.forEach(function(row){
				
				    var deploy = { marcatemporal : row['marcatemporal'],									
									comentarios : row['comentarios'],
									usuario : row['usuario'],
									idestado : row['idestado'],
									estado : row['estado']																	
									}
				
					if ((deploy.idestado == 1)
						||	(deploy.idestado == 6) 
						||	(deploy.idestado == 11) 
						)
					{						
						console.log(deploy);
						console.log('----------------------------------------------');
											
						var dir = './tmp_' + deploy.proyecto;

						if (!fs.existsSync(dir)){
							fs.mkdirSync(dir);
						} 										
					}								                     
				});     
            });                
        });                        
    }, (30000*1)); //1 minutos  
})