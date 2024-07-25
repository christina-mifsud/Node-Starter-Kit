const express = require("express");
const app = express();
app.use(express.json()); // before our routes definition

app.get("/", function (request, response) {
  response.send("Yay Node!");
});

app.get("/chocolate", function (request, response) {
  const amount = request.query.amount || 0; // access the amount parameter from the query string
  response.send(`Here's your ${amount} chocolate(s)! 🍫`); // return the desired amount of chocolate
});

app.get("/multiply", function (request, response) {
  const value1 = parseFloat(request.query.value1) || 0; // access the value1 and value2 parameters from the query string
  const value2 = parseFloat(request.query.value2) || 0;
  const result = value1 * value2; // multiply both values

  response.send(
    `The result of multiplying ${value1} and ${value2} is ${result}.` // return result
  );
});

const albumsData = [
  {
    albumId: "10",
    artistName: "Beyoncé",
    collectionName: "Lemonade",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    releaseDate: "2016-04-25T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
  },
  {
    albumId: "11",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
  },
  {
    anotherItem: "another",
    another: "other",
  },
];

app.get("/albums", function (request, response) {
  response.status(200).send(albumsData);
});

app.get("/albums/:albumId", function (request, response) {
  const albumIdSearch = parseInt(request.params.albumId);
  console.log(request.params.albumId);
  const foundAlbum = albumsData.find(
    (album) => album.albumId === albumIdSearch
  );
  response.send(foundAlbum);
});

// notice .post (not .get)
app.post("/albums", function (request, response) {
  let newAlbum = request.body;
  albumsData.push({
    albumId: newAlbum.albumId,
    artistName: newAlbum.artistName,
    collectionName: newAlbum.collectionName,
    artworkUrl100: newAlbum.artworkUrl100,
    releaseDate: newAlbum.releaseDate,
    primaryGenreName: newAlbum.primaryGenreName,
    url: newAlbum.url,
  });
  response.status(201).send(newAlbum);
});

app.delete("/albums/:albumId", function (request, response) {
  const albumIdDelete = parseInt(request.params.albumId); // the id is taken from the url and is a string so it needs to be parsed to an integer for a strict comparison to work
  const itemIndex = albumsData.findIndex(
    ({ albumId }) => albumId === albumIdDelete
  );
  if (itemIndex >= 0) {
    albumsData.splice(itemIndex, 1);
    response.json(albumsData);
  } else {
    response.json({ message: "Album not found." });
  }
});

// option 2 - using .find instead of .findIndex and then using filter to create new array filtering out the albumIdDelete

// app.delete("/albums/:albumId", function (request, response) {
//   const albumIdDelete = parseInt(request.params.albumId);
//   const foundAlbum = albumsData.find(
//     ({ albumId }) => albumId === albumIdDelete
//   );

//   if (foundAlbum) {
//     albumsData = albumsData.filter(({ albumId }) => albumId !== albumIdDelete);
//     response.json(albumsData);
//   } else {
//     response.json({ message: "Album not found." });
//   }
// });

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
