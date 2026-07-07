<?php

declare(strict_types=1);

require __DIR__ . '/helpers.php';
handle_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Método no permitido.', 405);
}

$attendeeId = require_auth();
$body = read_json_body();

$fullName = trim((string) ($body['full_name'] ?? ''));
$jobTitle = trim((string) ($body['job_title'] ?? ''));
$workplace = trim((string) ($body['workplace'] ?? ''));
$linkedinUrl = trim((string) ($body['linkedin_url'] ?? ''));

if ($fullName === '') {
    json_error('Ingresa tu nombre completo.');
}

$linkedinError = validate_linkedin_url($linkedinUrl !== '' ? $linkedinUrl : null);
if ($linkedinError !== null) {
    json_error($linkedinError);
}

$stmt = get_pdo()->prepare(
    'UPDATE attendees SET full_name = ?, job_title = ?, workplace = ?, linkedin_url = ? WHERE id = ?'
);
$stmt->execute([
    $fullName,
    $jobTitle !== '' ? $jobTitle : null,
    $workplace !== '' ? $workplace : null,
    $linkedinUrl !== '' ? $linkedinUrl : null,
    $attendeeId,
]);

$updated = fetch_attendee_by_id($attendeeId);
json_response(['profile' => attendee_public_row($updated)]);
