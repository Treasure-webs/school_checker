CRESTWOOD COLLEGE

Open index.html in your browser to view the website.
Keep index.html, style.css, script.js and the images folder together.

Features: responsive layout, accessible Courses dropdown, three course cards, and admission eligibility checker.
The checker follows the requested validation order and displays one result.
Verified with 11 admission logic tests, including invalid inputs, failing-rule priority, and boundary scores.

School name and contact details are fictional demonstration data.
Photos downloaded from Unsplash:
Campus: https://images.unsplash.com/photo-1562774053-701939374585
Computer Science: https://images.unsplash.com/photo-1516321318423-f06f85e504b3
Business: https://images.unsplash.com/photo-1521737711867-e3b97375f902
Communication: https://images.unsplash.com/photo-1590602847861-f357a9332bbc

Photos are stored locally. Optional Google Fonts require internet; system fonts are used as fallback.

CUSTOMIZING THE WEBSITE

index.html: edit school text, course cards, images, and contact details. Sections have comments.
style.css: numbered sections organize the layout. Edit :root at the top for colors and rounded corners.
  --hover-lift controls how far cards move on hover (default -8px).
  --image-zoom controls photo magnification (default 1.06).
  --motion-speed controls animation duration (default 280ms).
  --card-radius controls course card corners.
script.js: admission settings are at the top; form and dropdown behavior are commented.
  If you change eligibility requirements, also update the displayed requirements in index.html and result messages.

Course cards lift with a soft shadow while the photo zooms inside its frame. Keyboard focus also emphasizes cards. Reduced-motion settings disable this movement.

INTERACTIVE FEATURES
- Course card links select the corresponding course in the admission form.
- Form completion progress, first-failing-field highlight, and Clear details button.
- Result clears when details change to avoid showing an outdated answer.
- Active section navigation, back-to-top link, and expandable FAQs.
- All course choices use the same admission requirements. No details are sent to a server.

Verified in headless Chrome: 18 browser checks passed covering course selection, rule priority, boundary scores, form progress/reset, dropdown click/Escape, local photos, and mobile overflow.
