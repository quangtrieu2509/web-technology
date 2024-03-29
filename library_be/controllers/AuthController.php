<?php

class AuthController extends BaseController{
    private $authModel;

    public function __construct(){
        $this->loadModel('AuthModel');
        $this->authModel = new AuthModel();
    }

    public function signIn(){
        $request_method=$_SERVER["REQUEST_METHOD"];
        if($request_method == "POST"){
            $data = $this->getDataFromBody();
            $result = $this->authModel->signIn($data);
            $this->sendJson($result);
        }
    }

    public function signUp(){
        $request_method=$_SERVER["REQUEST_METHOD"];
        if($request_method == "POST"){
            $data = $this->getDataFromBody();
            $result = $this->authModel->signUp($data);
            $this->sendJson($result);
        }
    }
}
