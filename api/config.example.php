<?php
/**
 * Copy this file to config.php and fill in your hosting credentials.
 * config.php is blocked from direct web access via .htaccess.
 */

return [
    'db_host' => 'localhost',
    'db_name' => 'your_database_name',
    'db_user' => 'your_database_user',
    'db_pass' => 'your_database_password',
    'app_secret' => 'change-this-to-a-long-random-string',
    'token_ttl' => 60 * 60 * 24 * 14, // 14 days
    'upload_dir' => dirname(__DIR__) . '/uploads',
    'upload_url_prefix' => '/uploads/',
    'max_upload_bytes' => 2 * 1024 * 1024, // 2 MB
];
