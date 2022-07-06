<?php
require_once './db/database.php';
require_once './config/config.php';
require_once './security/jwt/jwt.php';
require_once './security/jwt/JwtUtils.php';
require_once './utils/Util.php';
require_once './controllers/BaseController.php';
require_once './models/BaseModel.php';

$controllerName = ucfirst(
    (isset($_REQUEST['controller']) ? strtolower($_REQUEST['controller']) : 'welcome') . 'Controller');
$actionName = $_REQUEST['action'] ?? 'index';

require_once './Controllers/' . $controllerName . '.php';

$controllerObject = new $controllerName;
$controllerObject->$actionName();