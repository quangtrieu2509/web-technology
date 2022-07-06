<?php

class BookTitleController extends BaseController{
    private $bookTitleModel, $token;

    public function __construct(){
        $this->loadModel('BookTitleModel');
        $this->bookTitleModel = new BookTitleModel();
        $this->token = $this->getTokenFromHeader($_SERVER);
    }

    public function index(){
        $request_method=$_SERVER["REQUEST_METHOD"];
        if($request_method == "GET"){
            $bookTitles = $this->bookTitleModel->getAll();
            $this->sendJson($bookTitles);
        }
    }

    /** ?controller=booktitle & action=findById & id={id} */
    public function findById(){
        $request_method=$_SERVER["REQUEST_METHOD"];
        if($request_method == "GET"){
            $id = $_GET['id'];
            $category = $this->bookTitleModel->findById($id);
            $this->sendJson($category);
        }
    }

    /** ?controller=booktitle & action=create */
    public function create(){
        if(!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "POST") {
                $category = $this->bookTitleModel->create($_POST);
                $this->sendJson($category);
            }
        }
    }

    /** ?controller=booktitle & action=update & id={id} */
    public function update(){
        if(!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "POST") {
                $id = $_GET['id'];
                $category = $this->bookTitleModel->update($id, $_POST);
                $this->sendJson($category);
            }
        }
    }

    /** ?controller=booktitle & action=delete & id={id} */
    public function delete(){
        if(!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $id = $_GET['id'];
                $category = $this->bookTitleModel->delete($id);
                $this->sendJson($category);
            }
        }
    }
}
