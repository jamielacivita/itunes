function ItunesController() {
    var itunesService = new ItunesService()
    //Do Not Modify the getMusic function
    this.getMusic = function getMusic(e) {
        e.preventDefault();
        var artist = e.target.artist.value;
        itunesService.getMusicByArtist(artist).then(drawSongs);
    }
    // --Do not modify above this line -- //

    this.playSong = function (URL) 
    {
        var songURL = URL
        if (typeof (x) != 'undefined') // Check is playing or not.
        {
            if (songURL == x.src) //Has user selected the same URL a second time (if so stop playing.)
            {
                x.pause()
                return false //returning here to exit function so song will not replay
            }
            else
            { x.load() }
        }
        x = document.createElement("AUDIO");
        x.src = songURL
        x.play()
    }


    function getSongElement(songObject, element)
    //Given an song object and a key name returns the value for that key.
    {return songObject[element]}


    function makeTable(songList) {
        arr_masterTable = []
        for (song of songList) {
            var songTitle = getSongElement(song, "title")
            var songArtist = getSongElement(song, "artist")
            var songCollection = getSongElement(song, "collection")
            if (songCollection === undefined) { songCollection = "" }
            var songPrice = getSongElement(song, "price")
            if (songPrice === undefined) { songPrice = 0 }
            var songArt = getSongElement(song, "albumArt")
            if (songArt === undefined) { songPrice = "#" }
            var songPreview = getSongElement(song, "preview")
            if (songPrice == undefined) { songPreview = "#" }

            var arr_row = []
            arr_row.push(songArtist)
            arr_row.push(songCollection)
            arr_row.push(songTitle)
            arr_row.push(songPrice)
            arr_row.push(songArt)
            arr_row.push(songPreview)

            arr_masterTable.push(arr_row)

        }
        return arr_masterTable.sort();

    }

    function readMasterTable(arr_master) {
        var template = ""
        for (var i = 1; i < arr_master.length; i++) {
            var artist = arr_master[i][0]

            if (i > 1)
            { var prev_artist = arr_master[i - 1][0] }
            else
            { var prev_artist = "" }

            var collect = arr_master[i][1]

            if (i > 1)
            { var prev_collect = arr_master[i - 1][1] }
            else
            { var prev_collect = "" }


            var title = arr_master[i][2]
            var price = arr_master[i][3]
            var songArt = arr_master[i][4]
            var songPreview = arr_master[i][5]


            if (artist != prev_artist) {
                template += `<div class="row artist">`
                template += `<div class="col-md-1"></div>`
                template += `<div class="col-md-11 h1">${artist}</div>`
                template += `</div>`
            }

            if (collect != prev_collect) {
                template += `<div class="row collection">`
                template += `<div class="col-md-1 h2"></div>`
                template += `<div class="col-md-1"><img src="${songArt}"></div>`
                template += `<div class="col-xs-10 col-md-6 h2">${collect}</div>`
                template += `<div class="col-xs-2 col-md-2 h2">$${price}</div>`
                template += `</div>`
            }

            template += `<div class="row track">`
            template += `<div class="col-md-2"></div>`
            template += `<div class="col-md-8 h3" onclick="itunesCtrl.playSong('${songPreview}')">${title}</div>`
            template += `<div class="col-md-2 h3">`
            template += `</div>`
            template += `</div>`
            template += `</div>`
        }
        return template;

    }


    function drawSongs(songList) {
        //console.log("in drawSongs")
        //songList is an array of objects.

        //iterate over the array to work with each object
        for (song of songList) {
            //get the title, artest, colleciton, and price text.
            var songTitle = getSongElement(song, "title")
            var songArtist = getSongElement(song, "artist")
            var songCollection = getSongElement(song, "collection")
            var songPrice = getSongElement(song, "price")
            songPrice = songPrice.toFixed(2)
            songPrice = "$" + songPrice;
            var albumArtURL = getSongElement(song, "albumArt")

            masterTable = makeTable(songList)
            temp = readMasterTable(masterTable)


            var songsDiv = document.getElementById("songBin")
            songsDiv.innerHTML = temp;
        }   //end of drawSongs
    }
}


var itunesCtrl = new ItunesController()