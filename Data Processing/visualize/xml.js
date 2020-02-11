
var x = new XMLHttpRequest();
x.open("GET", "http://127.0.0.1:3000/movie/xml", true);
var ctx = document.getElementById('myChart2')
var dynamicColors = function () {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};

x.onreadystatechange = function () {
  if (x.readyState == 4 && x.status == 200) {
    parser = new DOMParser();
    var xmlDoc = parser.parseFromString(x.responseText, "text/xml");;
    var movie_title = xmlDoc.getElementsByTagName('movie_title');
    var amount = xmlDoc.getElementsByTagName('amount');
    var avgVote = xmlDoc.getElementsByTagName('vote_avarage');

    var sites = [];
    for (index = 0; index < movie_title.length; index++) {
    var site = {
      label:movie_title[index].firstChild.data.toString(),
      backgroundColor: dynamicColors(),
      borderColor: "rgb(69,70,72)",
      borderWidth: 1,
      hoverBorderWidth: 2,
      hoverRadius: 5,
      radius:10,
      data: [
          {
              x: Number(avgVote[index].firstChild.data),
              y: Number( amount[index].firstChild.data),
          }
      ]
  };
  sites.push(site);
}
  var data = { labels: ["Movies"], datasets: sites };
  var options = {
      title: { display: true, text: 'Movies from xml' },
      scales: {
          yAxes:
              [
                  {
                      scaleLabel: { display: true, labelString: "Budget of the movie" },
                      ticks: { beginAtZero: true }
                  }
              ],
          xAxes:
              [
                  {
                      scaleLabel: { display: true, labelString: "the average vote" },
                      ticks: { beginAtZero: true }
                  }
              ]
      }
  };
  new Chart(ctx, { type: "bubble", data: data, options: options });

  }
};
x.send(null);