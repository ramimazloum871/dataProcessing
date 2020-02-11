<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Ghibli App</title>

    <link href="https://fonts.googleapis.com/css?family=Dosis:400,700" rel="stylesheet" />
    <link href="style.css" rel="stylesheet" />
  </head>

  <body>



     <div id="root"><canvas id="myChart" width="900" height="500"></canvas></div>

   <div id="root"><canvas id="myChart2" width="900" height="500"></canvas></div>

  <!-- I 'm using php to vaidate  -->
   <?php
require_once 'vendor/autoload.php';
use JsonSchema\Constraints\Constraint;
use JsonSchema\Validator;
//we get the json value and put it in config variable
$config = json_decode(file_get_contents('http://127.0.0.1:3000/movie/json'));
$validator = new Validator; //to use the library to validate the json value
$validator->validate(
    $config,
    (object) ['$ref' => 'file://' . realpath('schema.json')],
    Constraint::CHECK_MODE_APPLY_DEFAULTS
);

if ($validator->isValid()) { // if the json schema is correct will echo the value
    echo "<script src='scripts.js'></script>";
} else {
    echo "JSON validation errors:\n";
    foreach ($validator->getErrors() as $error) {
        print_r($error);
    }
}
//print "\nResulting config:\n";
//print_r($config);

$xml = new DOMDocument();
$xml->load("http://127.0.0.1:3000/movie/xml"); // Or load if filename required
if (!$xml->schemaValidate("movie.xsd")) // Or schemaValidateSource if string used.
{
    echo "validation errors";
} else { // if the xml   schema is correct will echo the value
    echo "<script src='xml.js'></script>";
}
?>

    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"> </script>


  </body>
</html>