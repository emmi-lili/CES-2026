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

if ($ticket === '') {
    json_error('Ingresa tu número de ticket.');
}

$passwordError = validate_password($password);
if ($passwordError !== null) {
    json_error($passwordError);
}

$attendee = fetch_attendee_by_ticket($ticket);
if ($attendee === null) {
    json_error('Número de ticket no válido.', 404);
}

if (!empty($attendee['password_hash'])) {
    json_error('Este ticket ya tiene contraseña. Inicia sesión.');
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = get_pdo()->prepare('UPDATE attendees SET password_hash = ? WHERE id = ?');
$stmt->execute([$hash, $attendee['id']]);

$updated = fetch_attendee_by_id((int) $attendee['id']);
$token = sign_token((int) $updated['id']);

json_response([
    'token' => $token,
    'profile' => attendee_public_row($updated),
]);
