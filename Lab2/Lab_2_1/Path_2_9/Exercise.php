<!doctype html>
<html lang="vi">
<head>
    <title> Exercise </title>
</head>
<body>
    <?php
        $name = $_POST["name"];
        $class = $_POST["class"];
        $university = $_POST["university"];

        print "Hello, $name";
        print "<br>You are studying at $class, $university";
        print "<br>Your hobby is";
    ?>
    <ol>
        <?php
            if (array_key_exists("hobby", $_POST)) {
                $hobby = $_POST["hobby"];
                foreach ($hobby as $i) {
                    print "<li>$i</li>";
                }
            }
        ?>
    </ol>
</body>
</html>
