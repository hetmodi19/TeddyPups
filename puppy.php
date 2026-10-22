<?php
require_once __DIR__ . '/includes/puppy_metadata.php';

$slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';
$slug = preg_replace('/[^a-zA-Z0-9\-_]/', '', $slug);

if (empty($slug) || !isset($puppy_meta[$slug])) {
    $slug = 'maltipoo-max-male';
}

$pageTitle = $puppy_meta[$slug]['title'] ?? 'Puppy Profile — TeddyPups U.A.E.';
$metaDesc = $puppy_meta[$slug]['desc'] ?? 'Ethical teacup and teddy bear puppies available in Dubai.';
$activeNav = 'puppies';

require_once __DIR__ . '/includes/header.php';
?>
<main id="main" tabindex="-1" class="relative pt-[var(--header-h)] outline-none">
  <div data-page="pup" class="tp-page">
    <?php
    $profile_file = __DIR__ . '/includes/puppy_profiles/' . $slug . '.html';
    if (file_exists($profile_file)) {
        include $profile_file;
    } else {
        include __DIR__ . '/includes/puppy_profiles/maltipoo-max-male.html';
    }
    ?>
  </div>
</main>
<?php
require_once __DIR__ . '/includes/footer.php';
?>
