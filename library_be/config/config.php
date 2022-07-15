<?php

const SECRET_KEY = 'trieudeptrai';

/** database */
const DB_HOST = 'localhost';
const DB_USERNAME = 'root';
const DB_PASSWORD = '';
const DB_NAME = 'library_management';

/** response messages */
const NO_TOKEN_MESSAGE = 'There is no token';
const INVALID_TOKEN_MESSAGE = 'Token is not valid';
const UNAUTHORIZED_MESSAGE = 'You are not authorized';
const INSERT_SUCCESSFULLY = "Insert successfully";
const INSERT_FAILED = "Insert failed";
const DELETE_SUCCESSFULLY = "Delete successfully";
const DELETE_FAILED = "Delete failed";
const UPDATE_SUCCESSFULLY = "Update successfully";
const UPDATE_FAILED = "Update failed";

/** error messages */
const REQUIRE_PARAMS = 'Require params';
const INVALID_VALUE = 'Invalid value';
const INVALID_PROPERTY = 'Invalid property';

/** checkedType */
const VERIFY_ADMIN_TOKEN = 1;
const VERIFY_USER_TOKEN = 2;
const VERIFY_OWNER_TOKEN = 0;

/** signs */
const SEPARATING_DELIMITER = ';'; // use for string of array of data
const INCREASE = '+';
const DECREASE = '-';

/** status values */
const AVAILABLE = 0;
const UNAVAILABLE = 1;
const BROKEN_OR_LOST = 2;
const RETURNED = 0;
const NOT_RETURNED = 1;