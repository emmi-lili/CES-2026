<?php

declare(strict_types=1);

require __DIR__ . '/helpers.php';
handle_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Método no permitido.', 405);
}

$body = read_json_body();
$ticket = normalize_ticket((string) ($body['ticket_number'] ?? ''));
$password = (string) ($body['password'] ?? '');

if ($ticket === '' || $password === '') {
    json_error('Ingresa tu número de ticket y contraseña.');
}

$attendee = fetch_attendee_by_ticket($ticket);
if ($attendee === null || empty($attendee['password_hash'])) {
    json_error('Ticket o contraseña incorrectos.', 401);
}

if (!password_verify($password, $attendee['password_hash'])) {
    json_error('Ticket o contraseña incorrectos.', 401);
}

$token = sign_token((int) $attendee['id']);

json_response([
    'token' => $token,
    'profile' => attendee_public_row($attendee),
]);
