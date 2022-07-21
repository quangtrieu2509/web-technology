<?php

const MODEL_FOLDER_VALUE = 'models';

class BaseController{
    private $account;

    protected function sendJson($data){
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    protected function loadModel($modelPath){
        return require (MODEL_FOLDER_VALUE . '/' . $modelPath . '.php');
    }

    protected function getTokenFromHeader($SERVER){
        if(!array_key_exists('HTTP_AUTHORIZATION',$SERVER))  return null;
        else return explode(' ', $SERVER['HTTP_AUTHORIZATION'])[1];
    }

    protected function checkTokenAndVerify($token, $checkedType, $userid = -1): bool
    {
        require_once './models/BaseModel.php';
        require_once './models/AccountModel.php';
        $this->account = new AccountModel();

        if(!$token) {
            $this->sendJson(NO_TOKEN_MESSAGE);
            return false;
        }

        $acc = JwtUtils::getUserDataFromToken($token);
        $stt = $this->account->findById($acc['id'], ['islock']);
        if($stt['islock'] == 1){
            $this->sendJson(LOCKED_ACCOUNT);
            return false;
        }

        $flag = true;
        switch ($checkedType){
            case VERIFY_ADMIN_TOKEN:
                if(!JwtUtils::verifyAdminToken($token)){
                    $this->sendJson(UNAUTHORIZED_MESSAGE);
                    $flag = false;
                }
                break;
            case VERIFY_USER_TOKEN:
                if(!JwtUtils::verifyUserToken($token)){
                    $this->sendJson(UNAUTHORIZED_MESSAGE);
                    $flag = false;
                }
                break;
            case VERIFY_OWNED_TOKEN:
                if(!JwtUtils::verifyOwnedToken($token, $userid)) {
                    $this->sendJson(UNAUTHORIZED_MESSAGE);
                    $flag = false;
                }
                break;
        }

        return $flag;

    }

    protected function checkToken($token): bool
    {
        $id = JwtUtils::verifyToken($token);
        if($id == null) return false;
        return true;
    }

    /** get data raw JSON from body */
    protected function getDataFromBody(): array
    {
        $contents = file_get_contents('php://input');
        $json = json_decode($contents);
        if(!$json) return [];
        else{
            // convert from stdObject to array
            $data = array();
            foreach ($json as $key=>$value)
                $data[$key] = $value;
            return $data;
        }
    }

    /** get request params */
    protected function getRequestParams(string $paramName, bool $required, $defaultValue = null) {
        if(!isset($_GET[$paramName])) {
            if($required){
                $this->sendJson(REQUIRE_PARAMS);
                return null;
            }
            else{
                if($defaultValue === null)
                    $this->sendJson(INVALID_VALUE);
                return $defaultValue;
            }
        }
        else return $_GET[$paramName];
    }

    /** pagination */
    public function paging(array $data, string $sortBy, int $sortD, int $pageSize, int $page){
        if($sortD == 1) usort($data, $this->asc_sorter($sortBy));
        else usort($data, $this->desc_sorter($sortBy));

        $start = ($page - 1) * $pageSize;
        $result = array_slice($data, $start, $pageSize);

        if(sizeof($data) % $pageSize == 0) $NoP = sizeof($data) / $pageSize;
        else $NoP = floor(sizeof($data) / $pageSize) + 1;

        return array('data' => $result, 'pages' => $NoP);
    }

    /** a callable asc-comparison function */
    function asc_sorter($key): Closure
    {
        return function ($a, $b) use ($key) {
            if ($a[$key]==$b[$key]) return 0;
            return ($a[$key]<$b[$key])?-1:1;
        };
    }
    /** a callable desc-comparison function */
    function desc_sorter($key): Closure
    {
        return function ($a, $b) use ($key) {
            if ($a[$key]==$b[$key]) return 0;
            return ($a[$key]>$b[$key])?-1:1;
        };
    }

    /** get pagination params */
    public function getPaginationParams($defSortBy, $defSortD, $defPageSize, $defPage): array
    {
        $pageable['sortBy'] = $this->getRequestParams('sortBy', false, $defSortBy);
        $pageable['sortD'] = $this->getRequestParams('sortD', false, $defSortD);
        $pageable['pageSize'] = $this->getRequestParams('pageSize', false, $defPageSize);
        $pageable['page'] = $this->getRequestParams('page', false, $defPage);
        return $pageable;
    }
}