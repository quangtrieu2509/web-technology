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

    /** ?controller=booktitle & action=getById & id={id} */
    public function getById(){
        $request_method=$_SERVER["REQUEST_METHOD"];
        if($request_method == "GET"){
            $id = $this->getRequestParams('id', true);
            if($id == null) return;
            $result = $this->bookTitleModel->getById($id);
            $this->sendJson($result);
        }
    }

    /** ?controller=booktitle & action=findById & id={id} */
    public function findById(){
        if(!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $id = $this->getRequestParams('id', true);
                if ($id == null) return;
                $result = $this->bookTitleModel->findById($id);
                $this->sendJson($result);
            }
        }
    }

    /** ?controller=booktitle & action=create */
    public function create(){
        if(!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "POST") {
                $data = $this->getDataFromBody();
                $result = $this->bookTitleModel->create($data);
                $this->sendJson($result);
            }
        }
    }

    /** ?controller=booktitle & action=update & id={id} */
    public function update(){
        if(!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "POST") {
                $id = $this->getRequestParams('id', true);
                if($id == null) return;
                $data = $this->getDataFromBody();
                unset($data['booktitleid'], $data['trend']);
                $result = $this->bookTitleModel->update($id, $data);
                $this->sendJson($result);
            }
        }
    }

    /** ?controller=booktitle & action=delete & id={id} */
    public function delete(){
        if(!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $id = $this->getRequestParams('id', true);
                if($id == null) return;
                $result = $this->bookTitleModel->delete($id);
                $this->sendJson($result);
            }
        }
    }

    public function search() {
        $request_method = $_SERVER["REQUEST_METHOD"];
        if ($request_method == "GET") {
            $bookname = $this->getRequestParams('bookName', false, '');
            $pages['min'] = $this->getRequestParams('pageMin', false, -1);
            $pages['max'] = $this->getRequestParams('pageMax', false, 5000);
            $publishyear['min'] = $this->getRequestParams('yearMin', false, -1);
            $publishyear['max'] = $this->getRequestParams('yearMax', false, 4000);
            $author = $this->getRequestParams('author', false, '');
            $category = $this->getRequestParams('category', false, '');

            $booktitles = $this->bookTitleModel->search($bookname, $pages, $publishyear, $author, $category);
            $this->sendJson($booktitles);
        }
    }
}
