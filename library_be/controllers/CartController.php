<?php

class CartController extends BaseController{
    private $cartModel, $token;

    public function __construct(){
        $this->loadModel('CartModel');
        $this->cartModel = new CartModel();
        $this->token = $this->getTokenFromHeader($_SERVER);
    }


    public function index() {
        if (!$this->checkTokenAndVerify($this->token, VERIFY_USER_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $books = $this->cartModel->getAllBookByUserId($this->token);
                $this->sendJson($books);
            }
        }
    }

    public function add(){
        if (!$this->checkTokenAndVerify($this->token, VERIFY_USER_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "POST") {
                $data = $this->getDataFromBody();
                $result = $this->cartModel->addToCart($data, $this->token);
                $this->sendJson($result);
            }
        }
    }

    /** ?controller=cart & action=delete & id={id} */
    public function delete(){
        if (!$this->checkTokenAndVerify($this->token, VERIFY_USER_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $booktitleid = $this->getRequestParams('booktitleid', true);
                if ($booktitleid == null) return;

                $result = $this->cartModel->deleteFromCart($booktitleid, $this->token);
                $this->sendJson($result);
            }
        }
    }
}
