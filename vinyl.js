const APP = {
  keybase: 'JMB-Vinyl-',
  keys: [],
  init() {
    //start the app
    let catNum ="";
    document.getElementById('btnSave').addEventListener('click', APP.saveAlbum);
    document.querySelector('header').addEventListener('click', APP.loadAlbum);
    APP.loadArtists();
  },
  saveAlbum(ev) {
    ev.preventDefault();
    let artist = document.getElementById('artist').value.trim();
    artist = artist.toLowerCase();

    let album = document.getElementById('album').value.trim();
    album = album.toLowerCase();

    let catalog = document.getElementById('catalog').value.trim();
    catalog = catalog.toUpperCase();


    if (artist && album && catalog) {
      let key = APP.keybase + artist;
      let storage = localStorage.getItem(key);
      let albums = [];
      if (storage) {
        albums = JSON.parse(storage);
      }

      const tmpalb = album.split(" ");

      for (let i = 0; i < tmpalb.length; i++) {
        tmpalb[i] = tmpalb[i][0].toUpperCase() + tmpalb[i].substr(1);
      }
      album = tmpalb.join(" ");

      alb2=album+" ( "+catalog+" )";

      albums.push(alb2);
      // albums.push(album);
      albums = Array.from(new Set(albums));
      albums.sort();
      localStorage.setItem(key, JSON.stringify(albums));
      document.getElementById('artist').value = '';
      document.getElementById('album').value = '';
      document.getElementById('catalog').value = '';

      var _myArray = JSON.stringify(localStorage); //indentation in json format, human readable
    
var vLink = document.createElement('a'),
vBlob = new Blob([_myArray], {type: "octet/stream"}),
vName = 'storage.json',
vUrl = window.URL.createObjectURL(vBlob);
vLink.setAttribute('href', vUrl);
vLink.setAttribute('download', vName );
vLink.click();
console.log(vName);
      
      APP.loadArtists();
    }
  },
  loadArtists() {
    
    let num = localStorage.length;
    if (num) {
      APP.keys = []; //reset the keys array
      console.log(APP.keys);
      console.log(localStorage);
      for (let i = 0; i < num; i++) {
        let key = localStorage.key(i);
        console.log(key);
        if (key.startsWith(APP.keybase)) {
          APP.keys.push(key);
        }
      }
      
      APP.keys.sort();
      APP.buildNav();
    }
    

  },
  buildNav() {

    let nav = document.querySelector('header');
    nav.innerHTML = '';
    let foot = document.querySelector('footer');
    foot.innerHTML = '';
    let df = document.createDocumentFragment();
    APP.keys.forEach((key) => {
      //create a new anchor in the header for each artist
      let a = document.createElement('a');

      a.className = 'artist';
      a.textContent = key.replace(APP.keybase, '');

      df.append(a);

    });
    nav.append(df);
  },
  loadAlbum(ev) {

    if (ev.target.tagName === 'A') {
      let artist = ev.target.textContent;
      //put the artist name into the input field
      document.getElementById('artist').value = artist;
      //remove old active artist class
      //set current active class
      let oldactive = document.querySelector('header a.active');
      if (oldactive) {
        oldactive.classList.remove('active');
      }
      ev.target.classList.add('active');
      let key = APP.keybase + artist;
      let storage = localStorage.getItem(key);
      if (storage) {
        let albums = JSON.parse(storage);

        APP.buildAlbums(albums);

      }
    }
  },
  buildAlbums(albums) {

    let foot = document.querySelector('footer');
    foot.innerHTML = '';
    // let df = document.createDocumentFragment();
    albums.forEach((album) => {
      let span = document.createElement('span');
      span.className = 'album';
      foot.innerHTML = '<ol>' + albums.map(function (alb) {
        return '<li>' + alb + '</li>';
      }).join('') + '</ol>';
    });
  },
};

  
  


document.addEventListener('DOMContentLoaded', APP.init);