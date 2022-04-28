<!doctype html>
<html lang="en">
<head>
    <title> Exercise </title>
</head>
<body>
    <?php
        $name = $_POST["name"];
        $class = $_POST["class"];
        $university = $_POST["university"];

        $hobbies = array();
        $tmp = $_POST["cat"];
        if ($tmp == "Yes") $hobbies[] = "Cat";

        $tmp = $_POST["cooking"];
        if ($tmp == "Yes") $hobbies[] = "Cooking";

        $tmp = $_POST["football"];
        if ($tmp == "Yes") $hobbies[] = "Football";

        $tmp = $_POST["math"];
        if ($tmp == "Yes") $hobbies[] = "Math";

        $tmp = $_POST["web"];
        if ($tmp == "Yes") $hobbies[] = "Web";

        $tmp = $_POST["facebook"];
        if ($tmp == "Yes") $hobbies[] = "Facebook";

        $tmp = $_POST["youtube"];
        if ($tmp == "Yes") $hobbies[] = "Youtube";

        print "Hello, $name";
        print "<br>You are studying at $class, $university";
        print "<br>Your hobby is";
        foreach ($hobbies as $key=>$value) {
            $i = $key + 1;
            print "<br>$i. $value";
        }
    ?>
</body>
</html>
