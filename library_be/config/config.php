<?php

const SECRET_KEY = 'trieudeptrai';

/** database */
const DB_HOST = 'localhost';
const DB_USERNAME = 'root';
const DB_PASSWORD = '';
const DB_NAME = 'library_management';

/** response messages */
const NO_TOKEN_MESSAGE = 'Không tìm thấy token';
const INVALID_TOKEN_MESSAGE = 'Token không hợp lệ';
const UNAUTHORIZED_MESSAGE = 'Bạn không được cấp quyền';
const INSERT_SUCCESSFULLY = "Thêm thành công";
const INSERT_FAILED = "Thêm thất bại";
const DELETE_SUCCESSFULLY = "Xóa thành công";
const DELETE_FAILED = "Xóa thất bại";
const UPDATE_SUCCESSFULLY = "Cập nhật thành công";
const UPDATE_FAILED = "Cập nhật thất bại";
const LOCKED_ACCOUNT = "Tài khoản của bạn đã bị khóa";
const EXISTED_EMAIL = 'Email đã tồn tại';
const UN_PW_INVALID = 'Tài khoản hoặc mật khẩu không hợp lệ';
const EXISTED_USERNAME = 'Tài khoản đã tồn tại';
const NULL_BOOK_TITLE_ID = 'booktitleid không tồn tại';
const NULL_BOOK = 'Sách không tồn tại';
const NULL_TRANSACTION = 'Transaction không tồn tại';
const NOT_ALLOWED_DELETE_BOOK = 'Sách không được phép xóa';
const NOT_ALLOWED_DELETION = 'Không được phép xóa';
const DLT_BOOKS_OF_BOOKTITLE_FAILED = 'Xóa sách khỏi tiêu đề sách thất bại';
const ALREADY_ADDED_BOOK = 'Bạn đã thêm sách này rồi';
const UNAVAILABLE_BOOK = 'Không sách nào đang có sẵn';

/** error messages */
const REQUIRE_PARAMS = 'Yêu cầu tham số';
const INVALID_VALUE = 'Giá trị không hợp lệ';
const INVALID_PROPERTY = 'Thuộc tính không hợp lệ';


/** checkedType */
const VERIFY_ADMIN_TOKEN = 1;
const VERIFY_USER_TOKEN = 2;
const VERIFY_OWNED_TOKEN = 0;

/** signs */
const SEPARATING_DELIMITER = ';'; // use for string of array of data
const INCREASE = '+';
const DECREASE = '-';
const MALE = 0;
const FEMALE = 1;
const OTHER = 2;

/** status values */
const AVAILABLE = 0;
const UNAVAILABLE = 1;
const BROKEN_OR_LOST = 2;
const RETURNED = 0;
const NOT_RETURNED = 1;