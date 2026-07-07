<?php

declare(strict_types=1);

require __DIR__ . '/helpers.php';
handle_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Método no permitido.', 405);
}

$attendeeId = require_auth();
$cfg = get_config();

if (!isset($_FILES['photo']) || !is_array($_FILES['photo'])) {
    json_error('No se recibió ninguna imagen.');
}

$file = $_FILES['photo'];
if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    json_error('Error al subir la imagen.');
}

if (($file['size'] ?? 0) > (int) $cfg['max_upload_bytes']) {
    json_error('La imagen supera el tamaño máximo permitido (2 MB).');
}

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($file['tmp_name']);
$allowed = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
];

if (!isset($allowed[$mime])) {
    json_error('Formato no permitido. Usa JPG, PNG o WebP.');
}

$uploadDir = $cfg['upload_dir'];
if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true)) {
    json_error('No se pudo crear la carpeta de subidas.', 500);
}

$filename = sprintf('attendee-%d-%s.%s', $attendeeId, bin2hex(random_bytes(8)), $allowed[$mime]);
$destination = rtrim($uploadDir, '/\\') . DIRECTORY_SEPARATOR . $filename;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
    json_error('No se pudo guardar la imagen.', 500);
}

$photoPath = rtrim($cfg['upload_url_prefix'], '/') . '/' . $filename;
$stmt = get_pdo()->prepare('UPDATE attendees SET photo_path = ? WHERE id = ?');
$stmt->execute([$photoPath, $attendeeId]);

$updated = fetch_attendee_by_id($attendeeId);
json_response(['profile' => attendee_public_row($updated)]);
