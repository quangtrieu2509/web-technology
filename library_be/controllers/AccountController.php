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
            $transaction = $this->accountModel->getAllUser();
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

    public function update() {
        $request_method = $_SERVER["REQUEST_METHOD"];
        if ($request_method == "POST") {
            $id = $this->getRequestParams('id', true);
            if ($id == null) return;
            if (!$this->checkTokenAndVerify($this->token, VERIFY_OWNER_TOKEN, $id)) return;
            $data = $this->getDataFromBody();
            if ($data == null) {
                var_dump("Chưa thiết lập thay đổi");
                return;
            }
            $result = $this->accountModel->update($id, $data);
            $this->sendJson($result);
        }
    }
}