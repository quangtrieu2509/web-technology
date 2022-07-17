<?php

class AccountController extends BaseController {
    private $accountModel, $token;

    public function __construct() {
        $this->loadModel('AccountModel');
        $this->accountModel = new AccountModel();
        $this->token = $this->getTokenFromHeader($_SERVER);
    }

    public function index() {
        if (!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $transaction = $this->accountModel->getAllUser();
                $this->sendJson($transaction);
            }
        }
    }

//    public function findByUsername() {
//        if (!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
//        else {
//            $request_method = $_SERVER["REQUEST_METHOD"];
//            if ($request_method == "GET") {
//                $user = $_GET['username'];
//                $result = $this->accountModel->findByUsername($user);
//                $this->sendJson($result);
//            }
//        }
//    }
//
//    public function findByFullname() {
//        if (!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
//        else {
//            $request_method = $_SERVER["REQUEST_METHOD"];
//            if ($request_method == "GET") {
//                $name = $_GET['fullname'];
//                $result = $this->accountModel->findByFullname($name);
//                $this->sendJson($result);
//            }
//        }
//    }
//
//    public function findByBarcode() {
//        if (!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
//        else {
//            $request_method = $_SERVER["REQUEST_METHOD"];
//            if ($request_method == "GET") {
//                $barcode = $_GET['barcode'];
//                $result = $this->accountModel->findByBarcode($barcode);
//                $this->sendJson($result);
//            }
//        }
//    }

    public function lockUser() {
        if (!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "POST") {
                $id = $this->getRequestParams('id', true);
                if ($id == null) return;

                // admin can only edit user's information
                $auth = $this->accountModel->checkAccountRole($id);
                if ($auth == null) {
                    $this->sendJson(INVALID_VALUE);
                    return;
                } else if ($auth == VERIFY_ADMIN_TOKEN) {
                    $this->sendJson(UNAUTHORIZED_MESSAGE);
                    return;
                }

                $data = $this->getDataFromBody();

                $result = $this->accountModel->update($id, $data);
                $this->sendJson($result);
            }
        }
    }

    public function updateOwner() {
        $request_method = $_SERVER["REQUEST_METHOD"];
        if ($request_method == "POST") {
            $id = $this->getRequestParams('id', true);
            if ($id == null) return;

            if (!$this->checkTokenAndVerify($this->token, VERIFY_OWNED_TOKEN, $id)) return;

            $data = $this->getDataFromBody();
            unset($data['password'], $data['id'], $data['islock'], $data['barcode'], $data['role'], $data['username']);
            $result = $this->accountModel->update($id, $data);
            $this->sendJson($result);
        }
    }

    public function search() {
        if (!$this->checkTokenAndVerify($this->token, VERIFY_ADMIN_TOKEN)) return;
        else {
            $request_method = $_SERVER["REQUEST_METHOD"];
            if ($request_method == "GET") {
                $username = $this->getRequestParams('username', false, '%%');
                $fullname = $this->getRequestParams('fullName', false, '');
                $barcode = $this->getRequestParams('barcode', false, '%%');

                $acc = $this->accountModel->search($username, $fullname, $barcode);
                $this->sendJson($acc);
            }
        }
    }
}