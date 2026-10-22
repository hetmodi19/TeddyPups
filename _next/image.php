<?php
// Next.js Image Compatibility Handler for TeddyPups clone
$url = isset($_GET['url']) ? $_GET['url'] : '';

if (empty($url)) {
    http_response_code(404);
    exit('Image not specified');
}

$cleanUrl = rawurldecode($url);
$fileName = basename($cleanUrl);

$imgPath = __DIR__ . '/../assets/images/' . $fileName;

if ($cleanUrl === '/brand/logo.png' || $fileName === 'logo.png') {
    $imgPath = __DIR__ . '/../assets/images/logo.png';
}

if (!file_exists($imgPath)) {
    // Try finding by partial match
    $files = glob(__DIR__ . '/../assets/images/*' . pathinfo($fileName, PATHINFO_FILENAME) . '*');
    if (!empty($files)) {
        $imgPath = $files[0];
    }
}

if (!file_exists($imgPath)) {
    // Fallback to placeholder or logo
    $imgPath = __DIR__ . '/../assets/images/logo.png';
}

$ext = strtolower(pathinfo($imgPath, PATHINFO_EXTENSION));
$mimeMap = [
    'jpg'  => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'png'  => 'image/png',
    'webp' => 'image/webp',
    'avif' => 'image/avif',
    'svg'  => 'image/svg+xml'
];

$mime = isset($mimeMap[$ext]) ? $mimeMap[$ext] : 'application/octet-stream';

header('Content-Type: ' . $mime);
header('Cache-Control: public, max-age=31536000, immutable');
header('Content-Length: ' . filesize($imgPath));
readfile($imgPath);
exit;
