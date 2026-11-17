// ADMISSION SETTINGS: change these values to adjust the requirements.
const MINIMUM_AGE = 16;
const MINIMUM_ENGLISH_SCORE = 50;
const MINIMUM_MATHEMATICS_SCORE = 50;
const MAXIMUM_SCORE = 100;

// 1. Admission rules: the first failing rule wins.
// Keep result messages here so they are easy to find and edit.
function checkEligibility(ageValue, englishValue, mathematicsValue) {
  const entries = [ageValue, englishValue, mathematicsValue];
  const [age, english, mathematics] = entries.map(Number);
  if (
    entries.some((value) => String(value).trim() === '') ||
    ![age, english, mathematics].every(Number.isFinite) ||
    age < 0 ||
    english < 0 ||
    english > MAXIMUM_SCORE ||
    mathematics < 0 ||
    mathematics > MAXIMUM_SCORE
  ) {
    return 'Please enter valid details.';
  }
  if (age < MINIMUM_AGE) return 'You must be at least 16.';
  if (english < MINIMUM_ENGLISH_SCORE) return 'Your English score is too low.';
  if (mathematics < MINIMUM_MATHEMATICS_SCORE)
    return 'Your Mathematics score is too low.';
  return 'Congratulations! You qualify for admission.';
}

if (typeof document !== 'undefined') {
  // 2. Admission form: progress, result, and reset.
  const form = document.getElementById('admission-form');
  const result = document.getElementById('result');
  const inputs = ['age', 'english', 'mathematics'].map((id) =>
    document.getElementById(id),
  );
  const course = document.getElementById('course');
  const progress = document.getElementById('form-progress');
  const progressLabel = document.getElementById('progress-label');

  function clearResult() {
    result.textContent = '';
    result.className = 'result';
    inputs.forEach((input) => input.removeAttribute('aria-invalid'));
  }

  function updateProgress() {
    const completed = inputs.filter(
      (input) => input.value.trim() !== '' && input.validity.valid,
    ).length;
    progress.value = completed;
    progressLabel.textContent = completed + ' of 3 details completed';
  }

  form.addEventListener('input', () => {
    clearResult();
    updateProgress();
  });
  course.addEventListener('change', clearResult);
  form.addEventListener('reset', () => {
    clearResult();
    progress.value = 0;
    progressLabel.textContent = '0 of 3 details completed';
    inputs[0].focus();
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearResult();
    const values = inputs.map((input) => input.value);
    const message = checkEligibility(...values);
    const successful = message.startsWith('Congratulations!');
    result.textContent = message;
    result.className = 'result ' + (successful ? 'success' : 'error');
    if (!successful) {
      // Highlight the first failing field in the same order as the rules above.
      let failed = inputs.find(
        (input) => input.value.trim() === '' || !input.validity.valid,
      );
      if (!failed) {
        const [age, english] = values.map(Number);
        failed =
          age < MINIMUM_AGE
            ? inputs[0]
            : english < MINIMUM_ENGLISH_SCORE
              ? inputs[1]
              : inputs[2];
      }
      failed.setAttribute('aria-invalid', 'true');
      failed.focus();
    }
  });

  // 3. Selecting a course carries it into the admission form.
  const cards = document.querySelectorAll('.course-card');
  function highlightCourse() {
    cards.forEach((card) =>
      card.classList.toggle(
        'selected',
        card.querySelector('h3').textContent === course.value,
      ),
    );
  }
  cards.forEach((card) => {
    card.querySelector('a').addEventListener('click', () => {
      course.value = card.querySelector('h3').textContent;
      highlightCourse();
      clearResult();
    });
  });
  course.addEventListener('change', highlightCourse);
  form.addEventListener('reset', () =>
    cards.forEach((card) => card.classList.remove('selected')),
  );

  // 4. Accessible Courses dropdown: mouse hover, click, touch, and Escape.
  const dropdown = document.querySelector('.dropdown');
  const toggle = dropdown.querySelector('button');
  const menu = document.getElementById('course-menu');
  function setMenu(open) {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', () => setMenu(menu.hidden));
  dropdown.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') setMenu(true);
  });
  dropdown.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse') setMenu(false);
  });
  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) setMenu(false);
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      setMenu(false);
      toggle.focus();
    }
  });
  dropdown.addEventListener('focusout', (event) => {
    if (!dropdown.contains(event.relatedTarget)) setMenu(false);
  });

  // 5. Keep navigation aligned with the section in view.
  const sections = [...document.querySelectorAll('main > section[id]')].filter(
    (section) => section.id !== 'questions',
  );
  const navItems = [...document.querySelectorAll('.nav-links > li > a'), toggle];
  const backToTop = document.querySelector('.back-to-top');
  function updateNavigation() {
    const headerHeight = document.querySelector('.site-header').offsetHeight;
    let current = sections[0].id;
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= headerHeight + 100) current = section.id;
    });
    navItems.forEach((item) => {
      const active =
        item === toggle
          ? current === 'courses'
          : item.getAttribute('href') === '#' + current;
      item.classList.toggle('active', active);
      if (active) item.setAttribute('aria-current', 'location');
      else item.removeAttribute('aria-current');
    });
    backToTop.hidden = window.scrollY < 500;
  }
  let scrollPending = false;
  window.addEventListener(
    'scroll',
    () => {
      if (scrollPending) return;
      scrollPending = true;
      requestAnimationFrame(() => {
        updateNavigation();
        scrollPending = false;
      });
    },
    { passive: true },
  );
  window.addEventListener('resize', updateNavigation);
  updateNavigation();
  updateProgress();

  // 6. FAQ accordion: keep one answer open at a time.
  const questions = document.querySelectorAll('.faq details');
  questions.forEach((question) =>
    question.addEventListener('toggle', () => {
      if (question.open)
        questions.forEach((other) => {
          if (other !== question) other.open = false;
        });
    }),
  );
  document.getElementById('year').textContent = new Date().getFullYear();
}
if (typeof module !== 'undefined') module.exports = { checkEligibility };
