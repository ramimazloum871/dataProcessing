const app = document.getElementById('root')
var option = "";
const container = document.createElement('div')
container.setAttribute('class', 'container')
app.appendChild(container)

var dynamicColors = function () {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};

var data3 = []

var request = new XMLHttpRequest()
request.open('GET', 'http://127.0.0.1:3000/movie/json', true)

request.onload = function () {
  var movieTitle = [], data2 = [], avgVote = [];
  // Begin accessing JSON data here
  var data = []
  var data = JSON.parse(this.response)
  var ctx = document.getElementById('myChart');
  var sites = [];
  if (request.status >= 200 && request.status < 400) {
    data.Movies.forEach(movie => {
      avgVote.push(movie.vote_avarage)
      movieTitle.push(movie.movie_title);// put all the movie title from the json respond into the array 
      data2.push(movie.amount);//    put all the budget amount from the json response into the array
      // console.log(movie);
      var site = {
        label: movie.movie_title.toString(),
        backgroundColor: dynamicColors(),
        borderColor: "rgb(69,70,72)",
        borderWidth: 1,
        hoverBorderWidth: 2,
        hoverRadius: 5,
        radius:10,
        data: [
            {
                x: Number(movie.vote_avarage),
                y: Number(movie.amount),
            }
        ]
    };
    sites.push(site);
    })
  } else {
    const errorMessage = document.createElement('marquee')// if I get an error
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }

  // create bar chart from the information we get from json response

  var data = { labels: ["Movies"], datasets: sites };
        var options = {
            title: { display: true, text: 'Movies' },
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
   


  //var myArr = "<?xml version='1.0'?>\n<movie>\n    <movie>\n        <movie_title>Avatar</movie_title>\n        <genres>Action</genres>\n        <character_name>Jake Sully</character_name>\n        <actore_name>Sam Worthington</actore_name>\n        <amount>237000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>7</vote_avarage>\n        <vote_counte>11800</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Pirates of the Caribbean: At World's End</movie_title>\n        <genres>Adventure</genres>\n        <character_name>Captain Jack Sparrow</character_name>\n        <actore_name>Johnny Depp</actore_name>\n        <amount>300000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>7</vote_avarage>\n        <vote_counte>4500</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>The Dark Knight Rises</movie_title>\n        <genres>Action</genres>\n        <character_name>Bruce Wayne / Batman</character_name>\n        <actore_name>Christian Bale</actore_name>\n        <amount>250000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>8</vote_avarage>\n        <vote_counte>9106</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Spider-Man 3</movie_title>\n        <genres>Action</genres>\n        <character_name>Peter Parker / Spider-Man</character_name>\n        <actore_name>Tobey Maguire</actore_name>\n        <amount>258000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>6</vote_avarage>\n        <vote_counte>3576</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Avengers: Age of Ultron</movie_title>\n        <genres>Adventure</genres>\n        <character_name>Tony Stark / Iron Man</character_name>\n        <actore_name>Robert Downey Jr</actore_name>\n        <amount>280000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>7</vote_avarage>\n        <vote_counte>6767</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Harry Potter and the Half-Blood Prince</movie_title>\n        <genres>Fantasy</genres>\n        <character_name>Harry Potter</character_name>\n        <actore_name>Daniel Radcliffe</actore_name>\n        <amount>250000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>7</vote_avarage>\n        <vote_counte>5293</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Batman v Superman: Dawn of Justice</movie_title>\n        <genres>Fantasy</genres>\n        <character_name>Bruce Wayne / Batman</character_name>\n        <actore_name>Ben Affleck</actore_name>\n        <amount>250000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>6</vote_avarage>\n        <vote_counte>7004</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Superman Returns</movie_title>\n        <genres>Action</genres>\n        <character_name>Superman / Clark Kent</character_name>\n        <actore_name>Brandon Routh</actore_name>\n        <amount>270000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>5</vote_avarage>\n        <vote_counte>1400</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Pirates of the Caribbean: Dead Man's Chest</movie_title>\n        <genres>Adventure</genres>\n        <character_name>Captain Jack Sparrow</character_name>\n        <actore_name>Johnny Depp</actore_name>\n        <amount>200000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>7</vote_avarage>\n        <vote_counte>5246</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Man of Steel</movie_title>\n        <genres>Action</genres>\n        <character_name>Clark Kent / Kal-El</character_name>\n        <actore_name>Henry Cavill</actore_name>\n        <amount>225000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>7</vote_avarage>\n        <vote_counte>6359</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Men in Black 3</movie_title>\n        <genres>Comedy</genres>\n        <character_name>Agent J</character_name>\n        <actore_name>Will Smith</actore_name>\n        <amount>225000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>6</vote_avarage>\n        <vote_counte>4160</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>The Hobbit: The Battle of the Five Armies</movie_title>\n        <genres>Action</genres>\n        <character_name>Bilbo Baggins</character_name>\n        <actore_name>Martin Freeman</actore_name>\n        <amount>250000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>7</vote_avarage>\n        <vote_counte>4760</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>The Amazing Spider-Man</movie_title>\n        <genres>Action</genres>\n        <character_name>Peter Parker / Spider-Man</character_name>\n        <actore_name>Andrew Garfield</actore_name>\n        <amount>215000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>7</vote_avarage>\n        <vote_counte>6586</vote_counte>\n    </movie>\n</movie>";
  //parser = new DOMParser();
  //xmlDoc = parser.parseFromString(myArr, "text/xml");
  //console.log(xmlDoc);

  //var index;
  // var movie_title = xmlDoc.getElementsByTagName('movie_title');
  //var amount = xmlDoc.getElementsByTagName('amount');
  // var storemovie_title = [];
  ///var storeamount = [];
  //  put all the movie title from the json respond into the array
  // for (index = 0; index < movie_title.length; index++) {
  //  storemovie_title.push(movie_title[index].firstChild.data)
  //console.log(storemovie_title);
  // }
  //put all the budget amount from the json response into the array
  // for (index = 0; index < amount.length; index++) {
  //  storeamount.push(amount[index].firstChild.data)
  //  console.log(storeamount);
  //}






}


request.send()