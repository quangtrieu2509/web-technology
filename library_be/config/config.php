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

/** error messages */
const REQUIRE_PARAMS = 'Require params';
const INVALID_VALUE = 'Invalid value';

/** checkedType */
const VERIFY_ADMIN_TOKEN = 1;
const VERIFY_USER_TOKEN = 2;
const VERIFY_OWNER_TOKEN = 0;

/** signs */
const SEPARATING_DELIMITER = ';'; // use for string of array of data