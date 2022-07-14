<?php

class CartController extends BaseController{
    private $cartModel, $token;

    public function __construct(){
        $this->loadModel('CartModel');
        $this->cartModel = new CartModel();
        $this->token = $this->getTokenFromHeader($_SERVER);
    }

    /** ?controller=cart & action=findById & id={id} */
    public function findById(){
        $request_method=$_SERVER["REQUEST_METHOD"];
        if($request_method == "GET"){
            $id = $this->getRequestParams('id', true);
            if($id == null) return;
            $result = $this->cartModel->findById($id);
            $this->sendJson($result);
        }
    }

    public function addToCart(){
        $request_method = $_SERVER["REQUEST_METHOD"];
        if ($request_method == "POST") {
            $id = $this->getRequestParams('id', true);
            if ($id == null) return;
            if (!$this->checkTokenAndVerify($this->token, VERIFY_OWNER_TOKEN, $id)) return;
            $data = $this->getDataFromBody();
            $result = $this->cartModel->addToCart($data);
            $this->sendJson($result);
        }
    }

    /** ?controller=cart & action=delete & id={id} */
    public function deleteFromCart(){
        $request_method = $_SERVER["REQUEST_METHOD"];
        if ($request_method == "GET") {
            $id = $this->getRequestParams('id', true);
            if ($id == null) return;
            if (!$this->checkTokenAndVerify($this->token, VERIFY_OWNER_TOKEN, $id)) return;
            $result = $this->cartModel->deleteFromCart($id);
            $this->sendJson($result);
        }
    }
}
