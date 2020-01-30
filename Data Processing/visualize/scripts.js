const app = document.getElementById('root')
var option = "";
const container = document.createElement('div')
container.setAttribute('class', 'container')
app.appendChild(container)
const s = document.createElement('div')
s.id = "op"
var x = document.createElement("INPUT");
var label = document.createTextNode("Budget");;
//label.setAttribute('value','Amount')
x.setAttribute("type", "radio");
x.setAttribute("id", "check1");
x.setAttribute("name", "optin")
x.setAttribute("value", "amount")
x.setAttribute("checked", "true")
x.setAttribute("onclick", "check()")




//  x.addEventListener("onclick",check())

var f = document.createElement("INPUT");
var label2 = document.createTextNode("Vote");;
f.setAttribute("type", "radio");
f.setAttribute("name", "optin")
f.setAttribute("id", "check2");
f.setAttribute("value", "vote")
f.setAttribute("checked", "false")
f.setAttribute("onclick", "check()")
x.setAttribute("label", "Vote")
// f.addEventListener("onclick",check());



function check() {
  var element = document.getElementById("check1");
  var element2 = document.getElementById("check2");
  if (element.checked) {
    element2.checked = false
    option = element.value
    console.log(element.value)
    request.onload()
  } else if (element2.checked) {
    element.checked = false
    option = element2.value;
    console.log(element2.value)
    request.onload()
  }

};
container.appendChild(s);
s.appendChild(x);
s.appendChild(label);
s.appendChild(f);
s.appendChild(label2);



var data3 = []

var request = new XMLHttpRequest()
request.open('GET', 'http://127.0.0.1:3000/movie/budget', true)

request.onload = function () {
  var movieTitle = [], data2 = [], avgVote = [];
  // Begin accessing JSON data here
  var data = []
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    data.Movies.forEach(movie => {
      avgVote.push(movie.vote_avarage)
      movieTitle.push(movie.movie_title);// put all the movie title from the json respond into the array 
      data2.push(movie.amount);//    put all the budget amount from the json response into the array
      // console.log(movie);

    })
  } else {
    const errorMessage = document.createElement('marquee')// if I get an error
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }

  // create bar chart from the information we get from json response

  var ctx = document.getElementById('myChart').getContext('2d');
  if (option == 'amount') {
    //alert(option)
    data3 = []

    data3 = data2
  } else if (option = 'vote') {
    data3 = []

    // alert(option)
    data3 = avgVote

  }
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {

      labels: movieTitle,
      datasets: [{
        label: 'Movies dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: data3

      }]
    },

    // Configuration options go here
    options: {}
  });


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