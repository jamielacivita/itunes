function ItunesController(){
  var itunesService = new ItunesService()
  //Do Not Modify the getMusic function
  this.getMusic = function getMusic(e){
    e.preventDefault();
    var artist = e.target.artist.value;
    itunesService.getMusicByArtist(artist).then(drawSongs);
  }

  function getSongElement(songObject,element)
  //Given an song object and a key name returns the value for that key.
  {
      return songObject[element]
  }

   function createColElement(textToSpan)
    //creates a DOM span element with the provided id and returns same.
    {
        var colDiv = document.createElement("div");
        colDiv.setAttribute("class","col-xs-3");
        var songTitleSpan = document.createElement("span");  
        songTitleSpan.innerText = textToSpan
        colDiv.appendChild(songTitleSpan)
        return colDiv;
    }


    function createRowElement(a,b,c,d)
    //takes a id and an 
    //returns a row element that can be appended to bootstrap container.
    {
        var rowDiv = document.createElement("div");
        rowDiv.setAttribute("class","row");
        rowDiv.appendChild(a);
        rowDiv.appendChild(b);
        rowDiv.appendChild(c);
        rowDiv.appendChild(d);

        return rowDiv;
    }






function makeTable(songList)
{
    arr_masterTable = []
    for (song of songList)
    {
        var songTitle = getSongElement(song,"title")
        var songArtist = getSongElement(song,"artist")
        var songCollection = getSongElement(song,"collection")
        if (songCollection === undefined) {songCollection = ""}
        //console.warn(songCollection)
        var songPrice = getSongElement(song,"price")
        if (songPrice === undefined) {songPrice = 0}
        //get urls
        var songArt = getSongElement(song,"albumArt")
        if (songArt === undefined) {songPrice = "#"}
        var songPreview = getSongElement(song,"preview")
        if (songPrice == undefined) {songPreview = "#"}

        var arr_row = []
        arr_row.push(songArtist)
        arr_row.push(songCollection)
        arr_row.push(songTitle)
        arr_row.push(songPrice)
        arr_row.push(songArt)
        arr_row.push(songPreview)

        arr_masterTable.push(arr_row)

    }
        console.info("Length of the master table is: ",arr_masterTable.length)
        return arr_masterTable.sort();

}



function readMasterTable(arr_master)
{
    var template = ""
    for (var i = 1; i < arr_master.length; i++)
    {
        var artist = arr_master[i][0]
        
        if (i>1)
        {var prev_artist = arr_master[i-1][0]}
        else
        {var prev_artist = ""}

        var collect = arr_master[i][1]

        if (i>1)
        {var prev_collect = arr_master[i-1][1]}
        else
        {var prev_collect = ""}


        var title = arr_master[i][2]
        var price = arr_master[i][3]
        var songArt = arr_master[i][4]
        var songPreview = arr_master[i][5]


        if (artist != prev_artist)
        {
        //console.log("----New Artist---")
        //console.log("Artist: ", artist)
        //console.log("------------------")
        template += `<div class = "artist">${artist}</div>`
        }


        if (collect != prev_collect)
        {
        //console.log("Collection: ", collect)
        template += `<div class = "collect">
                <span class = "art">
                <img src ='${songArt}'>
                </span>
                ${collect}
        </div>`
        }

         console.log("songPreview",songPreview)

        //console.log("Title: ", title)
        template += `<div class = "title">
            <div id="songTitle">
                ${title} for ${price}
            </div>
        <audio controls name="media">
        <source src='${songPreview}' type = 'audio/mp4'>
        </audio>
        </div>`
        //console.log("Price: ", price)
        //console.log("--------------------")

    }
        return template;
    
}


  function drawSongs(songList)
  {
    //console.log("in drawSongs")
    //songList is an array of objects.

    //iterate over the array to work with each object
    for (song of songList)
    {
        //get the title, artest, colleciton, and price text.
        var songTitle = getSongElement(song,"title")
        var songArtist = getSongElement(song,"artist")
        var songCollection = getSongElement(song,"collection")
        var songPrice = getSongElement(song,"price")
        //console.log(songPrice)
        songPrice = songPrice.toFixed(2)
        songPrice = "$"+songPrice;
        var albumArtURL = getSongElement(song,"albumArt")
        //console.log(albumArtURL)
        // console.log(songTitle)
        // console.log(songArtist)
        //console.log(songCollection)
        // console.log(songPrice)
        // console.log("------")

        //create the col spans for these elements
    t = createColElement(songTitle)
    a = createColElement(songArtist)
    c = createColElement(songCollection)
    p = createColElement(songPrice)

    //addThese spans into a row element
    var topRowToAdd = createRowElement(a,t,c,p)

    //append this row to the DOM
    sb = document.getElementById("songBin")
    //sb.appendChild(topRowToAdd)


masterTable = makeTable(songList)
temp = readMasterTable(masterTable)
//console.log(temp)
var songsDiv = document.getElementById("songsDiv")
songsDiv.innerHTML = temp;


    }   //end of drawSongs


    console.log(songList);

    // console.log(getListOfCollections(songList, 'Echosmith'))
    //getListOfArtists(songList)
    // arr_old = [1,1,1,2,2,2,3,3,3]
    // arr_new = Array.from(new Set(arr_old))
    // console.log(arr_new)

  }


}

var itunesCtrl = new ItunesController()

//only can load one group on a reload?

//TODO
//Pretify with bootstrap - use 12 col // use two components
//Click on title - 30 secon preview
//Click on new title will start new 30 sec.
//Add titlebar with search area and itunes logo.

