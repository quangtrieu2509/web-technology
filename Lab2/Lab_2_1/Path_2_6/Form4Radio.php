<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title> Receiving Input </title>
</head>
<body>
    <font size=5> Thank You: Got Your Input </font>
    <?php
        $email = $_POST["email"];
        $contact = $_POST["contact"];
        print "<br>Your email address is $email";
        print "<br> Contact preference is $contact";
    ?>
</body>
</html>
