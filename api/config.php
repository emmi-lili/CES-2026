<?php
/**
 * Local / production config — update credentials before deploying.
 */

return [
    'db_host' => 'localhost',
    'db_name' => 'your_database_name',
    'db_user' => 'your_database_user',
    'db_pass' => 'your_database_password',
    'app_secret' => 'change-this-to-a-long-random-string',
    'token_ttl' => 60 * 60 * 24 * 14,
    'upload_dir' => dirname(__DIR__) . '/uploads',
    'upload_url_prefix' => '/uploads/',
    'max_upload_bytes' => 2 * 1024 * 1024,
];
