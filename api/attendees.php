<?php

declare(strict_types=1);

require __DIR__ . '/helpers.php';
handle_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_error('Método no permitido.', 405);
}

require_auth();

$stmt = get_pdo()->query(
    'SELECT * FROM attendees
     WHERE is_visible = 1
       AND password_hash IS NOT NULL
       AND full_name IS NOT NULL
       AND TRIM(full_name) <> \'\'
     ORDER BY full_name ASC'
);
$rows = $stmt->fetchAll();

$attendees = array_map(static fn(array $row): array => attendee_public_row($row), $rows);

json_response(['attendees' => $attendees]);
