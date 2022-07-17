<?php

class TransactionController extends BaseController {
    private $transactionModel, $token;

    public function __construct() {
        $this->loadModel('TransactionModel');
        $this->transactionModel = new TransactionModel();
        $this->token = $this->getTokenFromHeader($_SERVER);
    }

    public function index() {
        if (!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $transaction = $this->transactionModel->getAll();
                $this->sendJson($transaction);
            }
        }
    }

    public function getOwnerTransaction(){
        if (!$this->checkTokenAndVerify($this->token, VERIFY_USER_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $transaction = $this->transactionModel->getOwnerTransaction($this->token);
                $this->sendJson($transaction);
            }
        }
    }

    public function findById() {
        if (!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)
            && !$this->checkTokenAndVerify($this->token, VERIFY_USER_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $id = $_GET['id'];
                $result = $this->transactionModel->findById($id);
                $this->sendJson($result);
            }
        }
    }

//    public function findByUser() {
//        $request_method=$_SERVER["REQUEST_METHOD"];
//        if ($request_method == "GET") {
//            $user = $_GET['user'];
//            $result = $this->transactionModel->findByUser($user);
//            $this->sendJson($result);
//        }
//    }
//
//    public function findByBook() {
//        $request_method=$_SERVER["REQUEST_METHOD"];
//        if ($request_method == "GET") {
//            $book = $_GET['book'];
//            $result = $this->transactionModel->findByBook($book);
//            $this->sendJson($result);
//        }
//    }

    public function create() {
        if (!$this->checkTokenAndVerify($this->token, VERIFY_USER_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "POST") {
                $data = $this->getDataFromBody();
                $result = $this->transactionModel->create($data, $this->token);
                $this->sendJson($result);
            }
        }
    }

    public function update() {
        if (!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "POST") {
                $id = $this->getRequestParams('id', true);
                if($id == null) return;
                $data = $this->getDataFromBody();
                if($data['bookstatus'] == UNAVAILABLE){
                    $this->sendJson(INVALID_PROPERTY);
                    return;
                }
                $result = $this->transactionModel->update($id, $data);
                $this->sendJson($result);
            }
        }
    }

    public function search() {
        if (!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $transactionid = $this->getRequestParams('id', false, '%%');
                $username = $this->getRequestParams('username', false, '%%');
                $bookid = $this->getRequestParams('bookId', false, '%%');
                $date['min'] = $this->getRequestParams('dateMin', false, '2000-01-01');
                $date['max'] = $this->getRequestParams('dateMax', false, '3000-01-01');

                $trans = $this->transactionModel->search($transactionid, $username, $bookid, $date);
                $this->sendJson($trans);
            }
        }
    }
}