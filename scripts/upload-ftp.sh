#!/usr/bin/env bash
set -euo pipefail

# Upload static site to FTPS subfolder.
# Usage: FTP_PASSWORD='your-password' ./scripts/upload-ftp.sh

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT/out"
FTP_HOST="${FTP_HOST:-ftp.ideaswebbolivia.com}"
FTP_USER="${FTP_USER:-web@digitalpartners.lat}"
FTP_PORT="${FTP_PORT:-21}"
REMOTE_DIR="${REMOTE_DIR:-crypto-experience-summit}"

if [[ ! -d "$OUT_DIR" ]]; then
  echo "Missing out/ directory. Run:"
  echo "  NEXT_PUBLIC_BASE_PATH=/crypto-experience-summit npm run build"
  exit 1
fi

if [[ -z "${FTP_PASSWORD:-}" ]]; then
  echo "Set FTP_PASSWORD before running, e.g.:"
  echo "  FTP_PASSWORD='your-password' ./scripts/upload-ftp.sh"
  exit 1
fi

# Credentials are passed as quoted args to `user` (not embedded in a ftp://
# URL) so special chars like #, @, ! are handled correctly.
#
# Key fix for "max-retries exceeded" on the data channel:
#   ftp:ssl-protect-data false  -> many cPanel/Pure-FTPd servers reject a
#     TLS-encrypted DATA channel and drop the passive connection.
#   ftp:ignore-pasv-address yes -> use the control-connection IP for data,
#     avoiding unreachable internal IPs returned by PASV behind NAT.

# FTP_NO_TLS=1 disables TLS entirely (plain FTP) as a fallback if explicit
# FTPS keeps failing on the data channel.
if [[ "${FTP_NO_TLS:-0}" == "1" ]]; then
  SSL_LINES='set ftp:ssl-allow no'
else
  SSL_LINES='set ssl:verify-certificate no
set ftp:ssl-force true
set ftp:ssl-auth TLS
set ftp:ssl-protect-data false'
fi

lftp <<LFTP_EOF
$SSL_LINES
set ftp:passive-mode true
set ftp:ignore-pasv-address yes
set ftp:prefer-epsv false
set net:max-retries 3
set net:persist-retries 3
set net:timeout 25
set net:reconnect-interval-base 3
set net:reconnect-interval-multiplier 1
set mirror:parallel-transfer-count 1
open -p $FTP_PORT $FTP_HOST
user "$FTP_USER" "$FTP_PASSWORD"
pwd
mirror -R --delete --parallel=1 --verbose "$OUT_DIR" "$REMOTE_DIR"
bye
LFTP_EOF

echo "Upload complete -> https://digitalpartners.lat/$REMOTE_DIR/"
