<?php
/**
 * Reusable Puppy Card Component
 * Requires $pup array
 */
if (!isset($pup)) return;

$wa_card_url = wa_url(null, $pup['name']);
$is_korea = ($pup['origin'] === 'korea');
$is_boy = (strtolower($pup['gender']) === 'boy');
$pup_json = htmlspecialchars(json_encode($pup), ENT_QUOTES, 'UTF-8');
?>
<article class="tp-card" 
         data-breed="<?php echo htmlspecialchars($pup['breed']); ?>"
         data-gender="<?php echo htmlspecialchars($pup['gender']); ?>"
         data-origin="<?php echo htmlspecialchars($pup['origin']); ?>"
         data-pup-json="<?php echo $pup_json; ?>">
  
  <!-- Media wrap -->
  <div class="tp-card__media-wrap">
    <img src="<?php echo htmlspecialchars($pup['image']); ?>" 
         alt="<?php echo htmlspecialchars($pup['name'] . ' - ' . $pup['breed']); ?>" 
         class="tp-card__img" 
         loading="lazy">

    <!-- Top Left Status Badges -->
    <div class="tp-badge-top-left">
      <span class="tp-badge tp-badge--available">
        <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#fff;margin-right:2px;"></span>
        Available
      </span>
      <?php if ($is_korea): ?>
        <span class="tp-badge tp-badge--korea">🇰🇷 Korean Teacup</span>
      <?php else: ?>
        <span class="tp-badge tp-badge--showroom">📍 Showroom Dubai</span>
      <?php endif; ?>
    </div>

    <!-- Video Badge if Available -->
    <?php if (!empty($pup['has_video'])): ?>
      <button type="button" class="tp-badge--video" 
              data-action="play-video" 
              data-video-url="<?php echo htmlspecialchars($pup['video_src'] ?? ''); ?>" 
              data-pup-name="<?php echo htmlspecialchars($pup['name']); ?>"
              aria-label="Watch video of <?php echo htmlspecialchars($pup['name']); ?>">
        <span>▶</span> video
      </button>
    <?php endif; ?>
  </div>

  <!-- Body -->
  <div class="tp-card__body">
    <div class="tp-card__header">
      <h3 class="tp-card__title font-plush"><?php echo htmlspecialchars($pup['name']); ?></h3>
      <span class="tp-card__gender-badge <?php echo $is_boy ? 'boy' : 'girl'; ?>">
        <?php echo $is_boy ? '♂ Boy' : '♀ Girl'; ?>
      </span>
    </div>

    <div class="tp-card__meta">
      <span class="tp-card__meta-item">
        <strong>Breed:</strong> <?php echo htmlspecialchars($pup['breed']); ?>
      </span>
      <span>•</span>
      <span class="tp-card__meta-item">
        <strong>Age:</strong> <?php echo htmlspecialchars($pup['age']); ?>
      </span>
    </div>

    <p class="tp-card__desc">
      <?php echo htmlspecialchars($pup['description']); ?>
    </p>

    <!-- Mini Verified Tags -->
    <?php if (!empty($pup['traits'])): ?>
      <div class="tp-card__tags">
        <?php foreach (array_slice($pup['traits'], 0, 3) as $trait): ?>
          <span class="tp-mini-tag"><?php echo htmlspecialchars($trait); ?></span>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>

    <!-- Card Action Buttons -->
    <div class="tp-card__footer">
      <button type="button" class="btn btn-ghost btn-sm tp-card__btn-view" data-action="view-pup">
        View Details
      </button>
      <a href="<?php echo $wa_card_url; ?>" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm tp-card__btn-wa">
        Adopt via WhatsApp
      </a>
    </div>
  </div>
</article>
