<?php

class TransactionController extends BaseController {
    private $transactionModel, $token;

    public function __construct() {
        $this->loadModel('TransactionModel');
        $this->transactionModel = new TransactionModel();
        $this->token = $this->getTokenFromHeader($_SERVER);
    }

    public function index() {
        $request_method=$_SERVER["REQUEST_METHOD"];
        if ($request_method == "GET") {
            $transaction = $this->transactionModel->getAll();
            $this->sendJson($transaction);
        }
    }

    public function findById() {
        $request_method=$_SERVER["REQUEST_METHOD"];
        if ($request_method == "GET") {
            $id = $_GET['id'];
            $result = $this->transactionModel->findById($id);
            $this->sendJson($result);
        }
    }

    public function findByUser() {
        $request_method=$_SERVER["REQUEST_METHOD"];
        if ($request_method == "GET") {
            $user = $_GET['user'];
            $result = $this->transactionModel->findByUser($user);
            $this->sendJson($result);
        }
    }

    public function findByBook() {
        $request_method=$_SERVER["REQUEST_METHOD"];
        if ($request_method == "GET") {
            $book = $_GET['book'];
            $result = $this->transactionModel->findByBook($book);
            $this->sendJson($result);
        }
    }

    public function create() {
        if (!$this->checkTokenAndVerify($this->token, VERIFY_USER_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "POST") {
                $data = $this->getDataFromBody();
                $result = $this->transactionModel->create($data);
                $this->sendJson($result);
            }
        }
    }

    public function update() {
        if (!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "POST") {
                $id = $_GET['id'];
                $data = $this->getDataFromBody();
                $result = $this->transactionModel->update($id, $data);
                $this->sendJson($result);
            }
        }
    }
}