<?php

declare(strict_types=1);

require __DIR__ . '/helpers.php';
handle_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_error('Método no permitido.', 405);
}

$attendeeId = require_auth();
$attendee = fetch_attendee_by_id($attendeeId);

if ($attendee === null) {
    json_error('Asistente no encontrado.', 404);
}

json_response(['profile' => attendee_public_row($attendee)]);
