<?php

class AccountController extends BaseController {
    private $accountModel, $token;

    public function __construct() {
        $this->loadModel('AccountModel');
        $this->accountModel = new AccountModel();
        $this->token = $this->getTokenFromHeader($_SERVER);
    }

    public function index() {
        $request_method=$_SERVER["REQUEST_METHOD"];
        if ($request_method == "GET") {
            $transaction = $this->accountModel->getAll();
            $this->sendJson($transaction);
        }
    }

    public function findByUsername() {
        if (!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $user = $_GET['username'];
                $result = $this->accountModel->findByUsername($user);
                $this->sendJson($result);
            }
        }
    }

    public function findByFullname() {
        if (!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $name = $_GET['fullname'];
                $result = $this->accountModel->findByFullname($name);
                $this->sendJson($result);
            }
        }
    }

    public function findByBarcode() {
        if (!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $barcode = $_GET['barcode'];
                $result = $this->accountModel->findByBarcode($barcode);
                $this->sendJson($result);
            }
        }
    }

    public function create() {
        if ($this->checkTokenAndVerify($this->token, VERIFY_USER_TOKEN)) return;
        if ($this->checkTokenAndVerify($this->token, VERIFY_OWNER_TOKEN)) return;
        if ($this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        $request_method = $_SERVER["REQUEST_METHOD"];
        if ($request_method == "POST") {
            $data = $this->getDataFromBody();
            $result = $this->accountModel->create($data);
            $this->sendJson($result);
        }
    }

    public function update() {
        if (!$this->checkTokenAndVerify($this->token, VERIFY_OWNER_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "POST") {
                $id = $_GET['id'];
                $data = $this->getDataFromBody();
                $result = $this->accountModel->update($id, $data);
                $this->sendJson($result);
            }
        }
    }
}