<?php
/**
 * TeddyPups U.A.E. — Brand Configuration
 * Premium boutique pet concierge in Downtown Dubai
 */

define('BRAND_NAME', 'TeddyPups U.A.E.');
define('BRAND_SHORT_NAME', 'TeddyPups');
define('BRAND_TAGLINE', 'every puppy is family');
define('BRAND_PHONE_RAW', '971541676733');
define('BRAND_PHONE_DISPLAY', '+971 54 167 6733');
define('BRAND_EMAIL', 'teddypupsadmin@gmail.com');
define('BRAND_ADDRESS', 'Downtown Dubai, United Arab Emirates');
define('BRAND_SHOWROOM_HOURS', 'Daily: 10:00 AM – 9:00 PM (By Appointment)');
define('SITE_URL', 'http://localhost/project');

// Dynamic base path detection for seamless asset resolution
$script_dir = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? ''));
$base_path = ($script_dir === '/' || $script_dir === '' || $script_dir === '.') ? '' : rtrim($script_dir, '/');
define('BASE_PATH', $base_path);

/**
 * Generate a WhatsApp deep-link with URL-encoded greeting and optional puppy name
 */
function wa_url($message = null, $puppy_name = null) {
    if (!$message) {
        if ($puppy_name) {
            $message = "Hi TeddyPups, I'm interested in adopting " . $puppy_name . "! Could you share video clips, pedigree details and arrange a viewing?";
        } else {
            $message = "Hi TeddyPups! I'd love to know more about your available puppies and showroom visit.";
        }
    }
    return 'https://wa.me/' . BRAND_PHONE_RAW . '?text=' . urlencode($message);
}

/**
 * Active navigation helper
 */
function is_nav_active($page, $current) {
    return ($page === $current) ? ' aria-current="page" data-active="true" class="active" ' : ' data-active="false" ';
}
