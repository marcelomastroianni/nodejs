var fs = require('fs');

var jsxml = require("node-jsxml");



var writeFile = function(fileName, texto){
     
    fs.writeFile(fileName, texto, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
    
}


var Namespace = jsxml.Namespace,
    QName = jsxml.QName,
    XML = jsxml.XML,
    XMLList = jsxml.XMLList;

fs.readFile('./config.xml', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }    
    //console.log(data);        
    var xml = new XML(data);            
            
    
    //var xml.child("list").getValue();
    
    
    //var listaItems = xml.child("config").child("item");
    
    var listaItems = xml.child("item");
    
    
    
    listaItems.each(function(item, index){
        
        //console.log(item);
        
        var attrNombre = item.attribute('nombre');
        var attrValue = item.attribute('valor');
        
        //console.log(attrNombre);
        //console.log(attrValue);
        
        
        if (attrNombre.getValue() == "ambiente")
        {
            attrValue.setValue("PROD");
            //console.log(attrValue.getValue());   
            //item.attribute
        }
        
        /*
        //item is an XML 
        console.log(item._attributes);    
        console.log("a");    

        var list2 = item.child("element");
        list2.each(function(item, index){
        //item is an XML 
            console.log("b");
        });
        */
    });
    
    
    writeFile("config_2.xml",xml.toString());
    //console.log(xml.toString());
    
    
    
});



