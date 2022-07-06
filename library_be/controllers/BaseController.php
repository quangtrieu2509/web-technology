<?php

const MODEL_FOLDER_VALUE = 'models';

class BaseController{

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

    protected function checkTokenAndVerify($token, $checkedType, $username = ''): bool
    {
        if(!$token) {
            $this->sendJson(NO_TOKEN_MESSAGE);
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
            case VERIFY_OWNER_TOKEN:
                if(!JwtUtils::verifyOwnedToken($token, $username)){
                    $this->sendJson(UNAUTHORIZED_MESSAGE);
                    $flag = false;
                }
                break;
        }

        return $flag;

    }

}