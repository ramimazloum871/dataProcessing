const app = document.getElementById('root')




const container = document.createElement('div')
container.setAttribute('class', 'container')


app.appendChild(container)

var request = new XMLHttpRequest()
request.open('GET', 'http://10.232.39.49:3000/movie/budget', true)
var labels = [], data=[];
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      const card = document.createElement('div') // create div to put the information in it 
      card.setAttribute('class', 'card')
      const h1 = document.createElement('h1') // create a title for the card
      h1.textContent = movie.movie_title
      const p = document.createElement('p') // create a paragraph and put the value from Json in it
      movie.genres = movie.genres
      p.textContent = 'genres: '+`${movie.genres}`
      const p1 = document.createElement('p')
      movie.character_name = movie.character_name
      p1.textContent = 'character_name: '+`${movie.character_name}`
      const p2 = document.createElement('p')
      movie.actore_name = movie.actore_name
      p2.textContent = 'actore_name: '+`${movie.actore_name}`
      const p3 = document.createElement('p')
      movie.amount = movie.amount
      p3.textContent = 'amount: '+`${movie.amount}`
      const p4 = document.createElement('p')
      movie.original_Lang = movie.original_Lang
      p4.textContent = 'original_Lang: '+`${movie.original_Lang}`
      const p5 = document.createElement('p')
      movie.vote_avarage = movie.vote_avarage
      p5.textContent = 'vote_avarage: '+`${movie.vote_avarage}`
      const p6 = document.createElement('p')
      movie.vote_counte = movie.vote_counte
      p6.textContent = 'vote_counte:  '+`${movie.vote_counte}`

      container.appendChild(card) 
      card.appendChild(h1)
      card.appendChild(p)
      card.appendChild(p1)
      card.appendChild(p2)  
      card.appendChild(p3)
      card.appendChild(p4)
      card.appendChild(p5)
      card.appendChild(p6)
      
      labels.push(movie.movie_title);// put all the movie title from the json respond into the array 
      data.push(movie.amount);//    put all the budget amount from the json response into the array
    })
  } else {
    const errorMessage = document.createElement('marquee')// if I get an error
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }

  
  var myArr="<?xml version='1.0'?>\n<movie>\n    <movie>\n        <movie_title>Avatar</movie_title>\n        <genres>Action</genres>\n        <character_name>Jake Sully</character_name>\n        <actore_name>Sam Worthington</actore_name>\n        <amount>237000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>7</vote_avarage>\n        <vote_counte>11800</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Pirates of the Caribbean: At World's End</movie_title>\n        <genres>Adventure</genres>\n        <character_name>Captain Jack Sparrow</character_name>\n        <actore_name>Johnny Depp</actore_name>\n        <amount>300000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>7</vote_avarage>\n        <vote_counte>4500</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>The Dark Knight Rises</movie_title>\n        <genres>Action</genres>\n        <character_name>Bruce Wayne / Batman</character_name>\n        <actore_name>Christian Bale</actore_name>\n        <amount>250000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>8</vote_avarage>\n        <vote_counte>9106</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Spider-Man 3</movie_title>\n        <genres>Action</genres>\n        <character_name>Peter Parker / Spider-Man</character_name>\n        <actore_name>Tobey Maguire</actore_name>\n        <amount>258000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>6</vote_avarage>\n        <vote_counte>3576</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Avengers: Age of Ultron</movie_title>\n        <genres>Adventure</genres>\n        <character_name>Tony Stark / Iron Man</character_name>\n        <actore_name>Robert Downey Jr</actore_name>\n        <amount>280000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>7</vote_avarage>\n        <vote_counte>6767</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Harry Potter and the Half-Blood Prince</movie_title>\n        <genres>Fantasy</genres>\n        <character_name>Harry Potter</character_name>\n        <actore_name>Daniel Radcliffe</actore_name>\n        <amount>250000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>7</vote_avarage>\n        <vote_counte>5293</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Batman v Superman: Dawn of Justice</movie_title>\n        <genres>Fantasy</genres>\n        <character_name>Bruce Wayne / Batman</character_name>\n        <actore_name>Ben Affleck</actore_name>\n        <amount>250000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>6</vote_avarage>\n        <vote_counte>7004</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Superman Returns</movie_title>\n        <genres>Action</genres>\n        <character_name>Superman / Clark Kent</character_name>\n        <actore_name>Brandon Routh</actore_name>\n        <amount>270000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>5</vote_avarage>\n        <vote_counte>1400</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Pirates of the Caribbean: Dead Man's Chest</movie_title>\n        <genres>Adventure</genres>\n        <character_name>Captain Jack Sparrow</character_name>\n        <actore_name>Johnny Depp</actore_name>\n        <amount>200000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>7</vote_avarage>\n        <vote_counte>5246</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Man of Steel</movie_title>\n        <genres>Action</genres>\n        <character_name>Clark Kent / Kal-El</character_name>\n        <actore_name>Henry Cavill</actore_name>\n        <amount>225000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>7</vote_avarage>\n        <vote_counte>6359</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>Men in Black 3</movie_title>\n        <genres>Comedy</genres>\n        <character_name>Agent J</character_name>\n        <actore_name>Will Smith</actore_name>\n        <amount>225000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>6</vote_avarage>\n        <vote_counte>4160</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>The Hobbit: The Battle of the Five Armies</movie_title>\n        <genres>Action</genres>\n        <character_name>Bilbo Baggins</character_name>\n        <actore_name>Martin Freeman</actore_name>\n        <amount>250000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>7</vote_avarage>\n        <vote_counte>4760</vote_counte>\n    </movie>\n    <movie>\n        <movie_title>The Amazing Spider-Man</movie_title>\n        <genres>Action</genres>\n        <character_name>Peter Parker / Spider-Man</character_name>\n        <actore_name>Andrew Garfield</actore_name>\n        <amount>215000000</amount>\n        <original_Lang>en</original_Lang>\n        <vote_avarage>7</vote_avarage>\n        <vote_counte>6586</vote_counte>\n    </movie>\n</movie>";
  parser = new DOMParser();
  xmlDoc = parser.parseFromString(myArr,"text/xml");
  //console.log(xmlDoc);

  var index;
  var movie_title = xmlDoc.getElementsByTagName('movie_title');
  var amount = xmlDoc.getElementsByTagName('amount');
  var storemovie_title = [];
  var storeamount = [];
//  put all the movie title from the json respond into the array
  for (index = 0; index < movie_title.length; index++) {
      storemovie_title.push(movie_title[index].firstChild.data)
      //console.log(storemovie_title);
  }
  //put all the budget amount from the json response into the array
  for (index = 0; index < amount.length; index++) {
      storeamount.push(amount[index].firstChild.data)
    //  console.log(storeamount);
  }

// create bar chart from the information we get from json response

  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',
  
      // The data for our dataset
      data: {
          labels: labels,
          datasets: [{
              label: 'Movies dataset',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data:storeamount
              
          }]
      },
  
      // Configuration options go here
      options: {}
  });


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
              data:storeamount
              
          }]
      },
  
      // Configuration options go here
      options: {}
  });


}


request.send()