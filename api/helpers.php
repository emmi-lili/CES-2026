<?php

declare(strict_types=1);

function get_config(): array
{
    static $config = null;
    if ($config === null) {
        $path = __DIR__ . '/config.php';
        if (!is_file($path)) {
            http_response_code(500);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Server configuration missing.']);
            exit;
        }
        $config = require $path;
    }
    return $config;
}

function get_pdo(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $cfg = get_config();
        $dsn = sprintf(
            'mysql:host=%s;dbname=%s;charset=utf8mb4',
            $cfg['db_host'],
            $cfg['db_name']
        );
        $pdo = new PDO($dsn, $cfg['db_user'], $cfg['db_pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }
    return $pdo;
}

function json_response(array $data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function json_error(string $message, int $status = 400): void
{
    json_response(['error' => $message], $status);
}

function read_json_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function normalize_ticket(string $ticket): string
{
    return strtoupper(trim($ticket));
}

function sign_token(int $attendeeId): string
{
    $cfg = get_config();
    $exp = time() + (int) $cfg['token_ttl'];
    $payload = $attendeeId . '.' . $exp;
    $sig = hash_hmac('sha256', $payload, $cfg['app_secret']);
    return base64_encode($payload . '.' . $sig);
}

function verify_token(string $token): ?int
{
    $cfg = get_config();
    $decoded = base64_decode($token, true);
    if ($decoded === false) {
        return null;
    }

    $parts = explode('.', $decoded);
    if (count($parts) !== 3) {
        return null;
    }

    [$id, $exp, $sig] = $parts;
    if (!ctype_digit($id) || !ctype_digit($exp)) {
        return null;
    }

    if ((int) $exp < time()) {
        return null;
    }

    $payload = $id . '.' . $exp;
    $expected = hash_hmac('sha256', $payload, $cfg['app_secret']);
    if (!hash_equals($expected, $sig)) {
        return null;
    }

    return (int) $id;
}

function get_bearer_token(): ?string
{
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/Bearer\s+(\S+)/i', $header, $matches)) {
        return $matches[1];
    }
    return null;
}

function require_auth(): int
{
    $token = get_bearer_token();
    if ($token === null) {
        json_error('No autorizado.', 401);
    }

    $attendeeId = verify_token($token);
    if ($attendeeId === null) {
        json_error('Sesión inválida o expirada.', 401);
    }

    return $attendeeId;
}

function attendee_public_row(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'full_name' => $row['full_name'],
        'job_title' => $row['job_title'],
        'workplace' => $row['workplace'],
        'linkedin_url' => $row['linkedin_url'],
        'photo_url' => $row['photo_path'] ? $row['photo_path'] : null,
    ];
}

function fetch_attendee_by_id(int $id): ?array
{
    $stmt = get_pdo()->prepare('SELECT * FROM attendees WHERE id = ? LIMIT 1');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    return $row ?: null;
}

function fetch_attendee_by_ticket(string $ticket): ?array
{
    $stmt = get_pdo()->prepare('SELECT * FROM attendees WHERE ticket_number = ? LIMIT 1');
    $stmt->execute([normalize_ticket($ticket)]);
    $row = $stmt->fetch();
    return $row ?: null;
}

function validate_password(string $password): ?string
{
    if (strlen($password) < 8) {
        return 'La contraseña debe tener al menos 8 caracteres.';
    }
    return null;
}

function validate_linkedin_url(?string $url): ?string
{
    if ($url === null || trim($url) === '') {
        return null;
    }
    $url = trim($url);
    if (!filter_var($url, FILTER_VALIDATE_URL)) {
        return 'URL de LinkedIn inválida.';
    }
    if (stripos($url, 'linkedin.com') === false) {
        return 'La URL debe ser de LinkedIn.';
    }
    return null;
}

function handle_cors(): void
{
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}
