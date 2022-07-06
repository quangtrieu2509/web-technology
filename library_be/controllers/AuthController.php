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
            $category = $this->authModel->signIn($_POST);
            $this->sendJson($category);
        }
    }

    public function signUp(){
        $request_method=$_SERVER["REQUEST_METHOD"];
        if($request_method == "POST"){
            $category = $this->authModel->signUp($_POST);
            $this->sendJson($category);
        }
    }
}
