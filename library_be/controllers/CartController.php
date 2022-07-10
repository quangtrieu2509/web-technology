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
            $category = $this->cartModel->findById($id);
            $this->sendJson($category);
        }
    }

    /** ?controller=cart & action=delete & id={id} */
    public function deleteFromCart(){
        if(!$this->checkTokenAndVerify($this->token, VERIFY_OWNER_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $id = $this->getRequestParams('id', true);
                if($id == null) return;
                $category = $this->cartModel->deleteFromCart($id);
                $this->sendJson($category);
            }
        }
    }
}
