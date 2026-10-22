/**
 * TeddyPups U.A.E. — Authentic Client Interaction & Animation Engine
 * Reverse-engineered from live production site chunks
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Lenis Smooth Scroll Engine
  // ==========================================
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -80 });
          }
        }
      });
    });
  }

  // ==========================================
  // 2. Authentic Paw Trail Cursor Canvas (from live chunk 04u0_mknmf3rz)
  // ==========================================
  const canvas = document.getElementById('tp-canvas');
  if (canvas && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const ctx = canvas.getContext('2d');
    const pawD = "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";
    let pawPath = null;
    try {
      pawPath = new Path2D(pawD);
    } catch (e) {}

    let prints = [];
    let dpr = 1;
    let animId = 0;
    let running = false;
    let lastX = NaN, lastY = NaN, dist = 0, side = 1;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    }
    resize();
    window.addEventListener('resize', resize);

    function renderPawTrail(time) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = prints.length - 1; i >= 0; i--) {
        const p = prints[i];
        const age = time - p.born;
        if (age > 1000) {
          prints.splice(i, 1);
          continue;
        }

        const alpha = age < 600 ? 1 : 1 - (age - 600) / 400;
        ctx.globalAlpha = 0.42 * alpha * alpha;
        ctx.setTransform(0.27 * dpr, 0, 0, 0.27 * dpr, p.x * dpr, p.y * dpr);
        ctx.rotate(p.angle);
        ctx.translate(-32, -34);
        ctx.fillStyle = '#c2622b';
        if (pawPath) {
          ctx.fill(pawPath);
        }
      }

      if (prints.length) {
        animId = requestAnimationFrame(renderPawTrail);
      } else {
        running = false;
      }
    }

    window.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      if (Number.isNaN(lastX)) {
        lastX = e.clientX;
        lastY = e.clientY;
        return;
      }

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      dist += Math.hypot(dx, dy);

      if (dist >= 44) {
        dist = 0;
        const angle = Math.atan2(dy, dx) + Math.PI / 2;
        side = -side;
        const offset = 7 * side;

        prints.push({
          x: e.clientX + Math.cos(angle) * offset + 12,
          y: e.clientY + Math.sin(angle) * offset + 14,
          angle: angle,
          born: performance.now()
        });

        if (prints.length > 14) prints.shift();
        if (!running) {
          running = true;
          animId = requestAnimationFrame(renderPawTrail);
        }
      }

      lastX = e.clientX;
      lastY = e.clientY;
    }, { passive: true });
  }

  // ==========================================
  // 3. Running Puppy Curtain & Page Transitions
  // ==========================================
  const curtain = document.querySelector('.tp-curtain');
  if (curtain) {
    setTimeout(() => {
      curtain.setAttribute('data-state', 'idle');
      document.documentElement.removeAttribute('data-curtain');
    }, 1050);

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      const target = link.getAttribute('target');

      if (
        href &&
        !href.startsWith('#') &&
        !href.startsWith('mailto:') &&
        !href.startsWith('tel:') &&
        !href.startsWith('https://wa.me') &&
        target !== '_blank' &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey
      ) {
        try {
          const url = new URL(link.href, window.location.origin);
          if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
            e.preventDefault();
            curtain.setAttribute('data-state', 'covering');
            setTimeout(() => {
              window.location.href = href;
            }, 320);
          }
        } catch (err) {}
      }
    });

    window.addEventListener('pageshow', () => {
      curtain.setAttribute('data-state', 'idle');
    });
  }

  // ==========================================
  // 4. Sticky Header Dynamic Scroll States
  // ==========================================
  const header = document.getElementById('site-header');
  if (header) {
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          header.setAttribute('data-scrolled', currentY > 20 ? 'true' : 'false');

          if (currentY > 120 && currentY > lastScrollY + 12) {
            header.setAttribute('data-hidden', 'true');
          } else if (currentY < lastScrollY - 8 || currentY <= 30) {
            header.setAttribute('data-hidden', 'false');
          }

          lastScrollY = Math.max(0, currentY);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ==========================================
  // 5. Mobile Menu Dialog
  // ==========================================
  const burgerBtn = document.getElementById('tp-burger-btn');
  const closeMenuBtn = document.getElementById('tp-close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
      mobileMenu.showModal();
      burgerBtn.setAttribute('aria-expanded', 'true');
    });

    if (closeMenuBtn) {
      closeMenuBtn.addEventListener('click', () => {
        mobileMenu.close();
        burgerBtn.setAttribute('aria-expanded', 'false');
      });
    }

    mobileMenu.addEventListener('click', (e) => {
      const rect = mobileMenu.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width
      );
      if (!isInDialog || e.target === mobileMenu) {
        mobileMenu.close();
        burgerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    mobileMenu.addEventListener('close', () => {
      burgerBtn.setAttribute('aria-expanded', 'false');
    });
  }

  // ==========================================
  // 6. Signature Reveal & Stagger Animation Engine
  // ==========================================
  const revealSelectors = [
    '[data-reveal="true"]',
    '.tp-sketch',
    '.tp-sketchbook__title',
    '.tp-wall__item',
    '.tp-photowall li',
    '.tp-note',
    '.tp-tag',
    '.tp-ticket',
    '.tp-step'
  ];

  const revealItems = document.querySelectorAll(revealSelectors.join(', '));
  revealItems.forEach((item, i) => {
    if (!item.hasAttribute('data-revealed')) {
      item.setAttribute('data-armed', '');
      if (!item.style.getPropertyValue('--i')) {
        item.style.setProperty('--i', i % 8);
      }
    }
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.setAttribute('data-revealed', '');
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealItems.forEach(item => {
    revealObserver.observe(item);
  });

  // ==========================================
  // 7. Horizontal Conveyor Treadmill (.tp-meet)
  // Authentic production math from live bundle 1wa3jfz4v5w2v.js
  // ==========================================
  const meetSection = document.querySelector('.tp-meet');
  const meetTrack = document.querySelector('.tp-meet__track');
  const pinWrapper = document.querySelector('.tp-meet [data-pin-range="true"]');
  const meetHall = document.querySelector('.tp-meet__hall');
  const meetHead = document.querySelector('.tp-meet__head');
  const meetDoors = document.querySelectorAll('.tp-door');

  if (meetSection && meetTrack && pinWrapper && meetHall) {
    function calculateMeetDimensions() {
      const isDesktop = window.innerWidth >= 900;
      if (!isDesktop) {
        meetSection.removeAttribute('data-pinned');
        pinWrapper.style.removeProperty('height');
        meetHall.style.removeProperty('--door-w');
        meetDoors.forEach(d => {
          if (!d.classList.contains('tp-door--all')) d.setAttribute('data-open', 'true');
        });
        return;
      }

      meetSection.setAttribute('data-pinned', 'true');
      const stageParent = pinWrapper.parentElement;
      const headHeight = meetHead ? (meetHead.offsetTop + meetHead.offsetHeight) : 0;
      const floorEl = meetHall.querySelector('.tp-meet__floor');
      const floorHeight = floorEl ? floorEl.offsetHeight : 0;
      const plates = meetTrack.querySelectorAll('.tp-door__plate');
      const plateHeights = Array.from(plates).map(p => p.offsetHeight);
      const maxPlateH = Math.max(64, ...(plateHeights.length ? plateHeights : [64]));

      const calculatedDoorW = Math.max(128, Math.min(256, 0.15 * window.innerWidth, (stageParent.clientHeight - headHeight - floorHeight - maxPlateH - 40) / 1.3));
      meetHall.style.setProperty('--door-w', `${calculatedDoorW.toFixed(0)}px`);

      const scrollableWidth = Math.max(0, meetTrack.scrollWidth - window.innerWidth + 80);
      pinWrapper.style.height = `calc(100vh + ${Math.round(0.85 * scrollableWidth)}px)`;
      pinWrapper.style.setProperty('--pinned', '1');
    }

    calculateMeetDimensions();
    window.addEventListener('resize', calculateMeetDimensions);

    // Hover open/close
    meetDoors.forEach(door => {
      door.addEventListener('mouseenter', () => door.setAttribute('data-open', 'true'));
      door.addEventListener('mouseleave', () => {
        if (window.innerWidth < 900) return;
        const rect = pinWrapper.getBoundingClientRect();
        const scrollDist = pinWrapper.offsetHeight - window.innerHeight;
        const currentScroll = -rect.top;
        const progress = Math.max(0, Math.min(1, currentScroll / scrollDist));
        const scrollableWidth = Math.max(0, meetTrack.scrollWidth - window.innerWidth + 80);
        const t = -progress * scrollableWidth;
        const threshold = 0.36 * window.innerWidth;
        if (!door.classList.contains('tp-door--all') && (door.offsetLeft + t) >= threshold) {
          door.setAttribute('data-open', 'false');
        }
      });
    });

    function updateMeetScroll() {
      if (window.innerWidth < 900) return;
      const rect = pinWrapper.getBoundingClientRect();
      const scrollDist = pinWrapper.offsetHeight - window.innerHeight;
      const currentScroll = -rect.top;

      if (scrollDist > 0) {
        const progress = Math.max(0, Math.min(1, currentScroll / scrollDist));
        const scrollableWidth = Math.max(0, meetTrack.scrollWidth - window.innerWidth + 80);
        const t = -progress * scrollableWidth;

        meetTrack.style.transform = `translateX(${t.toFixed(1)}px)`;
        meetHall.style.setProperty('--floor-x', `${t.toFixed(1)}px`);

        const threshold = 0.36 * window.innerWidth;
        meetDoors.forEach(door => {
          if (door.classList.contains('tp-door--all')) {
            door.setAttribute('data-open', 'true');
            return;
          }
          const isPassed = (door.offsetLeft + t) < threshold;
          door.setAttribute('data-open', isPassed ? 'true' : 'false');
        });
      }
    }

    window.addEventListener('scroll', updateMeetScroll, { passive: true });
    updateMeetScroll();
  }

  // ==========================================
  // 8. Inline Video Play Button in Phone (.tp-clip__play)
  // ==========================================
  const clipPlayBtn = document.querySelector('.tp-clip__play');
  const clipVideo = document.querySelector('.tp-clip video');

  if (clipPlayBtn && clipVideo) {
    clipPlayBtn.addEventListener('click', () => {
      if (clipVideo.paused) {
        clipVideo.play().then(() => {
          clipPlayBtn.setAttribute('aria-pressed', 'true');
          clipPlayBtn.setAttribute('aria-label', 'Pause video');
          clipPlayBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M7 5h3v14H7zM14 5h3v14h-3z"></path></svg>';
        }).catch(() => {});
      } else {
        clipVideo.pause();
        clipPlayBtn.setAttribute('aria-pressed', 'false');
        clipPlayBtn.setAttribute('aria-label', 'Play video');
        clipPlayBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>';
      }
    });

    clipVideo.addEventListener('ended', () => {
      clipPlayBtn.setAttribute('aria-pressed', 'false');
      clipPlayBtn.setAttribute('aria-label', 'Play video');
      clipPlayBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>';
    });
  }

  // ==========================================
  // 9. Interactive WhatsApp Steps (.tp-chat) & PupBuddy Cues
  // ==========================================
  const chatSteps = document.querySelectorAll('.tp-chat__step');
  const phoneScreen = document.querySelector('.tp-phone__screen');
  const chatTeddy = document.querySelector('.tp-chat__teddy');
  const chatTeddyBubble = chatTeddy?.querySelector('.pup-bubble');

  if (chatSteps.length > 0) {
    let lastStep = -1;

    function updateChatSteps() {
      const vh = window.innerHeight;
      let activeIndex = 0;

      chatSteps.forEach((step, idx) => {
        const sRect = step.getBoundingClientRect();
        if (sRect.top < vh * 0.55 && sRect.bottom > vh * 0.25) {
          activeIndex = idx;
        }
      });

      chatSteps.forEach((step, idx) => {
        if (idx === activeIndex) {
          step.setAttribute('data-active', '');
          step.removeAttribute('data-done');
        } else if (idx < activeIndex) {
          step.removeAttribute('data-active');
          step.setAttribute('data-done', '');
        } else {
          step.removeAttribute('data-active');
          step.removeAttribute('data-done');
        }
      });

      if (phoneScreen) {
        const targetScroll = (activeIndex / (chatSteps.length - 1)) * (phoneScreen.scrollHeight - phoneScreen.clientHeight);
        phoneScreen.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }

      // Authentic live cuePup speech bubble
      if (activeIndex !== lastStep && chatTeddyBubble) {
        lastStep = activeIndex;
        const msg = activeIndex === 0 ? "say hello! 🐾" : activeIndex === 1 ? "ooh, photos! 📸" : "home soon! 🏡";
        chatTeddyBubble.textContent = msg;
        chatTeddyBubble.setAttribute('data-show', 'true');
        setTimeout(() => chatTeddyBubble.setAttribute('data-show', 'false'), 2200);
      }
    }

    window.addEventListener('scroll', updateChatSteps, { passive: true });
    updateChatSteps();
  }

  // ==========================================
  // 10. Showroom vs Overseas Import Switch (.tp-switch)
  // ==========================================
  const tpSwitch = document.querySelector('.tp-switch');
  const tabLocal = document.getElementById('tab-local');
  const tabImported = document.getElementById('tab-imported');
  const panelLocal = document.getElementById('panel-local');
  const panelImported = document.getElementById('panel-imported');

  if (tpSwitch && tabLocal && tabImported) {
    function setJourneyTab(tab) {
      if (tab === 'imported') {
        tpSwitch.style.setProperty('--at', '1');
        tabLocal.setAttribute('aria-selected', 'false');
        tabLocal.setAttribute('tabindex', '-1');
        tabImported.setAttribute('aria-selected', 'true');
        tabImported.setAttribute('tabindex', '0');

        if (panelLocal && panelImported) {
          panelLocal.setAttribute('hidden', '');
          panelImported.removeAttribute('hidden');
          panelImported.querySelectorAll('.tp-step').forEach((s) => {
            s.style.animation = 'none';
            s.offsetHeight;
            s.style.animation = '';
          });
        }
      } else {
        tpSwitch.style.setProperty('--at', '0');
        tabLocal.setAttribute('aria-selected', 'true');
        tabLocal.setAttribute('tabindex', '0');
        tabImported.setAttribute('aria-selected', 'false');
        tabImported.setAttribute('tabindex', '-1');

        if (panelLocal && panelImported) {
          panelLocal.removeAttribute('hidden');
          panelImported.setAttribute('hidden', '');
          panelLocal.querySelectorAll('.tp-step').forEach((s) => {
            s.style.animation = 'none';
            s.offsetHeight;
            s.style.animation = '';
          });
        }
      }
    }

    tabLocal.addEventListener('click', () => setJourneyTab('local'));
    tabImported.addEventListener('click', () => setJourneyTab('imported'));
  }

  // ==========================================
  // 11. Interactive FAQ Cork-Board Notes (.tp-note)
  // ==========================================
  const notesBoard = document.querySelector('.tp-notes');
  const notes = document.querySelectorAll('.tp-note');

  notes.forEach((note) => {
    const btn = note.querySelector('.tp-note__q button');
    const answer = note.querySelector('.tp-note__answer');

    if (btn && answer) {
      btn.addEventListener('click', () => {
        const isOpen = note.hasAttribute('data-unfolded');
        if (isOpen) {
          note.removeAttribute('data-unfolded');
          btn.setAttribute('aria-expanded', 'false');
          answer.setAttribute('inert', '');
        } else {
          note.setAttribute('data-unfolded', '');
          btn.setAttribute('aria-expanded', 'true');
          answer.removeAttribute('inert');
        }

        if (notesBoard) {
          const anyOpen = document.querySelector('.tp-note[data-unfolded]');
          if (anyOpen) {
            notesBoard.setAttribute('data-open', '');
          } else {
            notesBoard.removeAttribute('data-open');
          }
        }
      });
    }
  });

  const faqSearch = document.querySelector('.tp-notes__search input');
  const faqCount = document.querySelector('.tp-notes__count');

  if (faqSearch && notes.length > 0) {
    faqSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      let visible = 0;

      notes.forEach((note) => {
        const text = note.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          note.style.display = '';
          visible++;
        } else {
          note.style.display = 'none';
        }
      });

      if (faqCount) {
        faqCount.textContent = `${visible} question${visible === 1 ? '' : 's'}`;
      }
    });
  }

  // ==========================================
  // 12. Photo Viewer Modal with Swipe / Navigation
  // ==========================================
  const photoDialog = document.getElementById('photo-viewer-dialog');
  const pvImg = document.getElementById('pv-img');
  const pvCaption = document.getElementById('pv-caption');
  const pvCloseBtn = document.getElementById('pv-close-btn');

  const polaroidButtons = Array.from(document.querySelectorAll('.tp-photowall__print, .tp-polaroid, .tp-wall__item button'));
  let currentPhotoIdx = 0;

  function openPhoto(idx) {
    if (!polaroidButtons.length || idx < 0 || idx >= polaroidButtons.length) return;
    currentPhotoIdx = idx;
    const btn = polaroidButtons[idx];
    const img = btn.querySelector('img');
    const ariaLabel = btn.getAttribute('aria-label') || '';
    if (img && pvImg && photoDialog) {
      pvImg.src = img.src;
      if (pvCaption) {
        pvCaption.textContent = ariaLabel.replace(/Open photo \d+ of \d+:\s*/i, '') || 'TeddyPups Family Story';
      }
      photoDialog.showModal();
    }
  }

  polaroidButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => openPhoto(idx));
  });

  if (pvCloseBtn && photoDialog) {
    pvCloseBtn.addEventListener('click', () => photoDialog.close());
    photoDialog.addEventListener('click', (e) => {
      if (e.target === photoDialog) photoDialog.close();
    });

    // Keyboard Arrow Left/Right to flip photos
    document.addEventListener('keydown', (e) => {
      if (!photoDialog.open) return;
      if (e.key === 'ArrowRight') openPhoto((currentPhotoIdx + 1) % polaroidButtons.length);
      if (e.key === 'ArrowLeft') openPhoto((currentPhotoIdx - 1 + polaroidButtons.length) % polaroidButtons.length);
    });
  }

  // ==========================================
  // 13. Showroom Video Modal
  // ==========================================
  const videoDialog = document.getElementById('video-viewer-dialog');
  const vvVideo = document.getElementById('vv-video');
  const vvCloseBtn = document.getElementById('vv-close-btn');

  document.addEventListener('click', (e) => {
    const videoTrigger = e.target.closest('[data-video="true"], a[href$=".mp4"], [aria-label*="video" i]:not(.tp-clip__play)');
    if (videoTrigger && videoDialog && vvVideo) {
      e.preventDefault();
      videoDialog.showModal();
      vvVideo.currentTime = 0;
      vvVideo.play().catch(() => {});
    }
  });

  if (videoDialog && vvVideo) {
    if (vvCloseBtn) {
      vvCloseBtn.addEventListener('click', () => {
        vvVideo.pause();
        videoDialog.close();
      });
    }
    videoDialog.addEventListener('close', () => vvVideo.pause());
    videoDialog.addEventListener('click', (e) => {
      if (e.target === videoDialog) {
        vvVideo.pause();
        videoDialog.close();
      }
    });
  }

  // ==========================================
  // 14. Interactive PupBuddy Companion (Basket & Peeking Puppies)
  // ==========================================
  const allBuddies = document.querySelectorAll('.pup-buddy, .pup-root');
  allBuddies.forEach(buddy => {
    const eyes = buddy.querySelector('[data-p="eyes"], [data-p="open"]');
    const tail = buddy.querySelector('[data-p="tail"]');
    const earL = buddy.querySelector('[data-p="earL"], .tp-runner__ear');
    const earR = buddy.querySelector('[data-p="earR"]');
    const bubble = buddy.querySelector('.pup-bubble');

    // Natural random eye blink
    function naturalBlink() {
      if (eyes) {
        eyes.style.transform = 'scaleY(0.1)';
        eyes.style.transformOrigin = '50% 50%';
        eyes.style.transition = 'transform 0.08s ease';
        setTimeout(() => {
          eyes.style.transform = 'scaleY(1)';
        }, 120);
      }
      setTimeout(naturalBlink, 2400 + Math.random() * 3200);
    }
    setTimeout(naturalBlink, 1500 + Math.random() * 2000);

    // Interactive wag and reaction on hover/tap
    buddy.addEventListener('mouseenter', () => {
      if (tail) {
        tail.style.transform = 'rotate(24deg)';
        tail.style.transition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)';
        setTimeout(() => { tail.style.transform = 'rotate(-16deg)'; }, 140);
        setTimeout(() => { tail.style.transform = 'rotate(16deg)'; }, 280);
        setTimeout(() => { tail.style.transform = 'rotate(0deg)'; }, 420);
      }
    });

    buddy.addEventListener('click', () => {
      if (bubble) {
        const phrases = [
          'woof! welcome to Dubai 🐾',
          'every puppy is family! ❤️',
          'ready for cuddles? 🐶',
          'say hello on WhatsApp! 💬'
        ];
        bubble.textContent = phrases[Math.floor(Math.random() * phrases.length)];
        bubble.setAttribute('data-show', 'true');
        setTimeout(() => bubble.setAttribute('data-show', 'false'), 2800);
      }
    });
  });

  // ==========================================
  // 15. Puppies Page Tab Switching & Category Filters
  // ==========================================
  const urlParams = new URLSearchParams(window.location.search);
  const requestedTab = urlParams.get('tab');

  const tabButtons = document.querySelectorAll('[data-pup-tab]');
  const availableView = document.getElementById('pups-available-view');
  const goneHomeView = document.getElementById('pups-gone-view');

  function switchPupTab(tabName) {
    tabButtons.forEach(btn => {
      const active = btn.getAttribute('data-pup-tab') === tabName;
      btn.setAttribute('data-active', active ? 'true' : 'false');
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if (availableView && goneHomeView) {
      if (tabName === 'gone-home') {
        availableView.style.display = 'none';
        goneHomeView.style.display = '';
      } else {
        availableView.style.display = '';
        goneHomeView.style.display = 'none';
      }
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-pup-tab');
      switchPupTab(tab);
    });
  });

  if (requestedTab === 'gone-home') {
    switchPupTab('gone-home');
  }

  // ==========================================
  // 16. Storybook Puppy Profile Gallery & Ribbon
  // Authentic implementation from live bundle 1y11gwrsbuw85.js
  // ==========================================
  const ribbonBand = document.querySelector('.tp-ribbon__band');
  if (ribbonBand) {
    function updateStorybookRibbon() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(1, Math.max(0, scrollY / docHeight));
        ribbonBand.style.transform = `scaleY(${progress.toFixed(3)})`;
      }
    }
    window.addEventListener('scroll', updateStorybookRibbon, { passive: true });
    updateStorybookRibbon();
  }

  const storyPage = document.querySelector('.tp-storypage');
  if (storyPage) {
    const mainHeroBtn = storyPage.querySelector('button[aria-label*="photo"]');
    const heroImg = storyPage.querySelector('img');
    const prevBtn = storyPage.querySelector('button[aria-label="Previous photo"]');
    const nextBtn = storyPage.querySelector('button[aria-label="Next photo"]');
    const counterBadge = storyPage.querySelector('.tp-storypage span.self-center');
    const thumbList = document.querySelector('ul[aria-label*="All photos"]');
    const thumbBtns = thumbList ? Array.from(thumbList.querySelectorAll('button')) : [];

    let currentStoryIdx = 0;
    const totalPhotos = thumbBtns.length || 1;

    function setStoryPhoto(idx) {
      if (idx < 0) idx = totalPhotos - 1;
      if (idx >= totalPhotos) idx = 0;
      currentStoryIdx = idx;

      if (thumbBtns.length && thumbBtns[idx]) {
        const thumbImg = thumbBtns[idx].querySelector('img');
        if (thumbImg && heroImg) {
          heroImg.src = thumbImg.src;
        }
        thumbBtns.forEach((tb, i) => {
          tb.style.outline = i === idx ? '3px solid var(--color-honey, #d4893f)' : 'none';
          tb.style.outlineOffset = '2px';
        });
      }

      if (counterBadge) {
        counterBadge.textContent = `${idx + 1} of ${totalPhotos}`;
      }
      if (mainHeroBtn) {
        mainHeroBtn.setAttribute('aria-label', `Open photo ${idx + 1} of ${totalPhotos} full screen`);
      }
    }

    if (thumbBtns.length) {
      thumbBtns.forEach((tb, idx) => {
        tb.addEventListener('click', () => setStoryPhoto(idx));
      });
      setStoryPhoto(0);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setStoryPhoto(currentStoryIdx - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setStoryPhoto(currentStoryIdx + 1);
      });
    }

    if (mainHeroBtn) {
      mainHeroBtn.addEventListener('click', () => {
        const photoDialog = document.getElementById('photo-viewer-dialog');
        const pvImg = document.getElementById('pv-img');
        const pvCaption = document.getElementById('pv-caption');
        if (photoDialog && pvImg && heroImg) {
          pvImg.src = heroImg.src;
          const h1Name = document.querySelector('.tp-storybook h1')?.textContent || 'TeddyPups';
          if (pvCaption) pvCaption.textContent = `${h1Name} — Photo ${currentStoryIdx + 1} of ${totalPhotos}`;
          photoDialog.showModal();
        }
      });
    }
  }

  // ==========================================
  // 17. Storybook Enquiry Form to WhatsApp
  // ==========================================
  const enquireForm = document.querySelector('form[action*="enquire"], .tp-letter form');
  if (enquireForm) {
    enquireForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pupName = document.querySelector('.tp-storybook h1')?.textContent?.trim() || 'Puppy';
      const nameInput = enquireForm.querySelector('input[name="name"], input[placeholder*="name" i]');
      const phoneInput = enquireForm.querySelector('input[name="phone"], input[placeholder*="phone" i], input[type="tel"]');
      const msgInput = enquireForm.querySelector('textarea, input[name="message"]');

      const clientName = nameInput ? nameInput.value.trim() : '';
      const clientPhone = phoneInput ? phoneInput.value.trim() : '';
      const clientMsg = msgInput ? msgInput.value.trim() : '';

      let text = `Hi TeddyPups! I'm interested in ${pupName} (${window.location.href}).`;
      if (clientName) text += ` My name is ${clientName}.`;
      if (clientPhone) text += ` My phone is ${clientPhone}.`;
      if (clientMsg) text += ` Note: ${clientMsg}`;

      window.open(`https://wa.me/971541676733?text=${encodeURIComponent(text)}`, '_blank');
    });
  }
});
