const APP = {
    keybase: 'JMB-Vinyl-',
    keys: [],
    init() {
      //start the app
      document.getElementById('btnSave').addEventListener('click', APP.saveAlbum);
      document.querySelector('header').addEventListener('click', APP.loadAlbum);
      APP.loadArtists();
    },
    saveAlbum(ev) {
      ev.preventDefault();
      let artist = document.getElementById('artist').value.trim();
      let album = document.getElementById('album').value.trim();
      let catalog = document.getElementById('catalog').value.trim();

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
      
      album=tmpalb.join(" ");

        albums.push(album);

        albums = Array.from(new Set(albums));
 
        albums.sort();
        console.log(albums);
        localStorage.setItem(key, JSON.stringify(albums));

        document.getElementById('artist').value = '';
        document.getElementById('album').value = '';
        document.getElementById('catalog').value = '';
  
        APP.loadArtists();
      }
    },
    loadArtists() {

      let num = localStorage.length;
      if (num) {
        APP.keys = []; //reset the keys array
        for (let i = 0; i < num; i++) {
          let key = localStorage.key(i);
          if (key.startsWith(APP.keybase)) {
            APP.keys.push(key);
          }
        }
        console.log(APP.keys);
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
        console.log(a,'78');
        a.className = 'artist';
        a.textContent =key.replace(APP.keybase, '');
        console.log(key,'81');
console.log(a,'82');
        df.append(a);
        console.log(a,'84');
      });
      nav.append(df);
    },
    loadAlbum(ev) {
      if (ev.target.tagName === 'A') {
        //put the artist name into the input field
        let artist = ev.target.textContent;
        // document.getElementById('artist').value = artist;
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
          console.log(albums);
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
        // console.log(albums,"albums-113");
// console.log(span,"span-114");
// span.textContent = album; 
foot.innerHTML = '<ul>' + albums.map(function (alb) {
	return '<li>' + alb + '</li>';
}).join('') + '</ul>'; 
// console.log(album,"116");
// // df.append(span);
// console.log(df,"118");
// console.log(span,"span-119");
      });
      // foot.append(df);
    },
  };

  document.addEventListener('DOMContentLoaded', APP.init);