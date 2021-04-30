var _myArray = JSON.stringify(localStorage); //indentation in json format, human readable
    
var vLink = document.createElement('a'),
vBlob = new Blob([_myArray], {type: "octet/stream"}),
vName = 'storage.json',
vUrl = window.URL.createObjectURL(vBlob);
vLink.setAttribute('href', vUrl);
vLink.setAttribute('download', vName );
vLink.click();