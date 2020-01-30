
var x = new XMLHttpRequest();
x.open("GET", "http://127.0.0.1:3000/movie/xml2", true);
x.onreadystatechange = function () {
  if (x.readyState == 4 && x.status == 200) {
    parser = new DOMParser();
    var xmlDoc = parser.parseFromString(x.responseText, "text/xml");;
    var movie_title = xmlDoc.getElementsByTagName('movie_title');
    var amount = xmlDoc.getElementsByTagName('amount');
    var avgVote = xmlDoc.getElementsByTagName('vote_avarage');
    var storemovie_title = [];
    var storeamount = [];
    var storeVote = [];
    // console.log(movie_title);
    //  put all the movie title from the json respond into the array
    for (index = 0; index < movie_title.length; index++) {
      storemovie_title.push(movie_title[index].firstChild.data)
      //console.log(storemovie_title);
    }
    //put all the budget amount from the json response into the array
    for (index = 0; index < amount.length; index++) {
      storeamount.push(amount[index].firstChild.data)
      // console.log(storeamount);
    }
    //put all the budget amount from the json response into the array
    for (index = 0; index < avgVote.length; index++) {
      storeVote.push(avgVote[index].firstChild.data)
      // console.log(storeamount);
    }
    // create bar chart from the information we get from xml response

    var ctx = document.getElementById('myChart2').getContext('2d');

    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
        labels: storemovie_title,
        datasets: [{
          label: 'Movies XMLdataset',
          backgroundColor: 'rgb(52, 235, 174)',
          borderColor: 'rgb(255, 99, 132)',
          data: storeamount

        }]
      },

      // Configuration options go here
      options: {}
    });

    // …
  }
};
x.send(null);