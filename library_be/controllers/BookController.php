<?php

class BookController extends BaseController{
    private $bookModel, $token;

    public function __construct(){
        $this->loadModel('BookModel');
        $this->bookModel = new BookModel();
        $this->token = $this->getTokenFromHeader($_SERVER);
    }

    public function index(){
        if(!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $books = $this->bookModel->getAll();
                $this->sendJson($books);
            }
        }
    }

    /** ?controller=book & action=findById & id={id} */
    public function findById(){
        if(!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $id = $this->getRequestParams('id', true);
                if ($id == null) return;
                $result = $this->bookModel->findById($id);
                $this->sendJson($result);
            }
        }
    }

    /** ?controller=book & action=create */
    public function create(){
        if(!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "POST") {
                $data = $this->getDataFromBody();
                $result = $this->bookModel->create($data);
                $this->sendJson($result);
            }
        }
    }

    /** ?controller=book & action=update & id={id} */
    public function update(){
        if(!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "POST") {
                $id = $this->getRequestParams('id', true);
                if($id == null) return;
                $data = $this->getDataFromBody();
                unset($data['bookid']);
                $result = $this->bookModel->update($id, $data);
                $this->sendJson($result);
            }
        }
    }

    /** ?controller=book & action=delete & id={id} */
    public function delete(){
        if(!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $id = $this->getRequestParams('id', true);
                if($id == null) return;
                $result = $this->bookModel->delete($id);
                $this->sendJson($result);
            }
        }
    }

    public function search() {
        $request_method = $_SERVER["REQUEST_METHOD"];
        if ($request_method == "GET") {
            $bookid = $this->getRequestParams('bookId', false, '%%');

            $book = $this->bookModel->search($bookid);
            $pg = $this->getPaginationParams('bookid', 2, 10, 1);
            $result = $this->paging($book, $pg['sortBy'], $pg['sortD'], $pg['pageSize'], $pg['page']);
            $this->sendJson($result);
        }
    }
}
