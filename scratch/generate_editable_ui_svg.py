import os
import base64
import shutil

def generate_svgs():
    # Read base image
    img_path = 'public/images/Base_image_desktop.png'
    b64_img = ""
    if os.path.exists(img_path):
        with open(img_path, 'rb') as f:
            b64_img = base64.b64encode(f.read()).decode('utf-8')

    # Read mobile base image
    img_mobile_path = 'public/images/Base_image_mobile.png'
    b64_mobile_img = ""
    if os.path.exists(img_mobile_path):
        with open(img_mobile_path, 'rb') as f:
            b64_mobile_img = base64.b64encode(f.read()).decode('utf-8')

    # 1. Desktop Full SVG
    desktop_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;500;600;700&amp;family=Fragment+Mono:wght@400;500;600;700&amp;display=swap');
      .font-sans {{ font-family: 'Albert Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }}
      .font-mono {{ font-family: 'Fragment Mono', ui-monospace, SFMono-Regular, Menlo, monospace; }}
    </style>
    <filter id="soft-shadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#000000" flood-opacity="0.08" />
    </filter>
    <filter id="card-shadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="20" flood-color="#000000" flood-opacity="0.12" />
    </filter>
  </defs>

  <!-- ======================================================== -->
  <!-- LAYER 1: BACKGROUND & THEME COLOR                       -->
  <!-- ======================================================== -->
  <g id="layer-background" data-name="Layer 1: Background Base">
    <rect id="bg-canvas" width="1920" height="1080" fill="#edf5ff" />
  </g>

  <!-- ======================================================== -->
  <!-- LAYER 2: PORTRAIT ARTWORK (Base Image)                   -->
  <!-- ======================================================== -->
  <g id="layer-portrait-artwork" data-name="Layer 2: Portrait Artwork">
    {'<image id="portrait-image" width="1920" height="1080" preserveAspectRatio="xMidYMid slice" href="data:image/png;base64,' + b64_img + '" opacity="0.95" />' if b64_img else '<!-- No image found -->'}
  </g>

  <!-- ======================================================== -->
  <!-- LAYER 3: TECHNICAL BLUEPRINT GRID & GEOMETRIC CIRCLE    -->
  <!-- ======================================================== -->
  <g id="layer-blueprint-grid" data-name="Layer 3: Technical Blueprint Grid" opacity="0.75">
    <!-- Vertical Grid Lines (12 Columns) -->
    <g id="grid-columns" stroke="#a0b2ce" stroke-opacity="0.25" stroke-width="0.8">
      <line x1="0" y1="0" x2="0" y2="1080" />
      <line x1="160" y1="0" x2="160" y2="1080" />
      <line x1="320" y1="0" x2="320" y2="1080" />
      <line x1="480" y1="0" x2="480" y2="1080" />
      <line x1="640" y1="0" x2="640" y2="1080" />
      <line x1="800" y1="0" x2="800" y2="1080" />
      <line x1="960" y1="0" x2="960" y2="1080" />
      <line x1="1120" y1="0" x2="1120" y2="1080" />
      <line x1="1280" y1="0" x2="1280" y2="1080" />
      <line x1="1440" y1="0" x2="1440" y2="1080" />
      <line x1="1600" y1="0" x2="1600" y2="1080" />
      <line x1="1760" y1="0" x2="1760" y2="1080" />
      <line x1="1920" y1="0" x2="1920" y2="1080" />
    </g>
    <!-- Horizontal Grid Lines (4 Rows) -->
    <g id="grid-rows" stroke="#a0b2ce" stroke-opacity="0.25" stroke-width="0.8">
      <line x1="0" y1="0" x2="1920" y2="0" />
      <line x1="0" y1="270" x2="1920" y2="270" />
      <line x1="0" y1="540" x2="1920" y2="540" />
      <line x1="0" y1="810" x2="1920" y2="810" />
      <line x1="0" y1="1080" x2="1920" y2="1080" />
    </g>
    <!-- Large Decorative Geometry Circle -->
    <circle id="decorative-circle" cx="720" cy="180" r="570" fill="none" stroke="#a0b2ce" stroke-opacity="0.18" stroke-width="1.2" />
  </g>

  <!-- ======================================================== -->
  <!-- LAYER 4: TOP NAVIGATION & BRAND IDENTITY                -->
  <!-- ======================================================== -->
  <g id="layer-header-navigation" data-name="Layer 4: Header &amp; Brand">
    <!-- Brand Group (Monogram + Name + Intro Subtitle) -->
    <g id="brand-identity">
      <!-- Monogram 'A' SVG Symbol -->
      <g id="brand-monogram" transform="translate(108, 48)">
        <rect width="36" height="36" rx="8" fill="#ffffff" fill-opacity="0.4" stroke="#0a0e14" stroke-opacity="0.08" />
        <g transform="translate(2, 2)">
          <path d="M16 3L4 29h3.5L16 8.5 24.5 29H28L16 3Z" stroke="#0a0e14" stroke-width="1.6" fill="none" stroke-linejoin="round" />
          <line x1="9" y1="22" x2="23" y2="22" stroke="#0a0e14" stroke-width="1.6" />
        </g>
      </g>

      <!-- Brand Name -->
      <text id="brand-name" class="font-mono" x="156" y="72" font-size="13" font-weight="600" letter-spacing="2" fill="#0a0e14">ANURAG KUMAR</text>

      <!-- Intro Tagline under Name -->
      <text id="intro-subheadline" class="font-sans" x="108" y="112" font-size="15" font-weight="400" fill="#0a0e14" fill-opacity="0.6">Builder — crafting interfaces and systems that push what&apos;s next.</text>
    </g>

    <!-- Top Right Action Buttons -->
    <g id="header-cta-buttons" transform="translate(1640, 46)">
      <!-- Button 1: "Let's talk" -->
      <g id="btn-lets-talk" transform="translate(62, 0)">
        <rect id="btn-talk-bg" width="110" height="38" rx="19" fill="#ffffff" stroke="#000000" stroke-opacity="0.10" stroke-width="1" filter="url(#soft-shadow)" />
        <text class="font-sans" x="46" y="24" font-size="12" font-weight="600" text-anchor="middle" fill="#0a0e14">Let&apos;s talk</text>
        <circle cx="88" cy="19" r="9" fill="#0a0e14" />
        <path d="M85 19h6m-3-3l3 3-3 3" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      </g>

      <!-- Button 2: "Explore my work" -->
      <g id="btn-explore-work" transform="translate(12, 48)">
        <rect id="btn-explore-bg" width="160" height="38" rx="19" fill="#ffffff" stroke="#000000" stroke-opacity="0.10" stroke-width="1" filter="url(#soft-shadow)" />
        <text class="font-sans" x="70" y="24" font-size="12" font-weight="600" text-anchor="middle" fill="#0a0e14">Explore my work</text>
        <circle cx="138" cy="19" r="9" fill="#0a0e14" />
        <path d="M135 19h6m-3-3l3 3-3 3" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      </g>
    </g>
  </g>

  <!-- ======================================================== -->
  <!-- LAYER 5: HERO MAIN HEADLINE                             -->
  <!-- ======================================================== -->
  <g id="layer-main-headline" data-name="Layer 5: Main Headline">
    <!-- Positioned at top 27% (y ≈ 292px) on the left margin (x = 108px) -->
    <text id="headline-text" class="font-sans" x="108" y="292" font-weight="300" font-size="112" fill="#0a0e14" letter-spacing="-6">
      <tspan x="108" dy="90">Building</tspan>
      <tspan x="108" dy="96">Beyond</tspan>
      <tspan x="108" dy="96">Possible.</tspan>
    </text>
  </g>

  <!-- ======================================================== -->
  <!-- LAYER 6: BOTTOM RIGHT TAGLINE                           -->
  <!-- ======================================================== -->
  <g id="layer-bottom-tagline" data-name="Layer 6: Bottom Tagline">
    <text id="tagline-text" class="font-mono" x="1812" y="964" font-size="17" font-weight="700" letter-spacing="3.5" text-anchor="end" fill="#0a0e14" fill-opacity="0.45">
      <tspan x="1812" dy="0">THINK</tspan>
      <tspan x="1812" dy="26">BUILD</tspan>
      <tspan x="1812" dy="26">REPEAT</tspan>
    </text>
  </g>

  <!-- ======================================================== -->
  <!-- LAYER 7: DYNAMIC ACTION BAR (Collapsed Bottom-Left Pill)-->
  <!-- ======================================================== -->
  <g id="layer-dynamic-action-bar" data-name="Layer 7: Dynamic Action Bar" transform="translate(108, 988)">
    <!-- Pill Container -->
    <rect id="action-bar-pill" width="330" height="44" rx="14" fill="#ffffff" fill-opacity="0.88" stroke="#000000" stroke-opacity="0.12" stroke-width="1" filter="url(#soft-shadow)" />

    <!-- Tab 1: Apps (Active Tab Example) -->
    <g id="tab-apps" transform="translate(6, 6)">
      <rect id="tab-apps-active-pill" width="94" height="32" rx="8" fill="#0a0e14" />
      <!-- Grid 4-square icon -->
      <g transform="translate(14, 9)" stroke="#ffffff" stroke-width="1.6" fill="none">
        <rect x="0" y="0" width="5.5" height="5.5" rx="1" />
        <rect x="8" y="0" width="5.5" height="5.5" rx="1" />
        <rect x="0" y="8" width="5.5" height="5.5" rx="1" />
        <rect x="8" y="8" width="5.5" height="5.5" rx="1" />
      </g>
      <text class="font-sans" x="58" y="21" font-size="12" font-weight="600" text-anchor="middle" fill="#ffffff">Apps</text>
    </g>

    <!-- Tab 2: Components -->
    <g id="tab-components" transform="translate(104, 6)">
      <rect id="tab-components-hit" width="120" height="32" rx="8" fill="transparent" />
      <!-- Code bracket icon -->
      <g transform="translate(12, 10)" stroke="#27272a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M4 1l-3 4 3 4m8-8l3 4-3 4" />
      </g>
      <text class="font-sans" x="65" y="21" font-size="12" font-weight="600" text-anchor="middle" fill="#27272a">Components</text>
    </g>

    <!-- Tab 3: Notes -->
    <g id="tab-notes" transform="translate(228, 6)">
      <rect id="tab-notes-hit" width="94" height="32" rx="8" fill="transparent" />
      <!-- Book/Notes icon -->
      <g transform="translate(14, 9)" stroke="#27272a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M1 1h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1V1z" />
        <path d="M4 5h5M4 9h5" />
      </g>
      <text class="font-sans" x="56" y="21" font-size="12" font-weight="600" text-anchor="middle" fill="#27272a">Notes</text>
    </g>
  </g>

  <!-- ======================================================== -->
  <!-- LAYER 8: EXPANDED POPOVER CARD PREVIEW (Apps Panel)      -->
  <!-- ======================================================== -->
  <g id="layer-expanded-apps-panel" data-name="Layer 8: Expanded Apps Panel (Popout State)" transform="translate(108, 760)">
    <!-- Panel Backdrop Card -->
    <rect id="popover-bg" width="440" height="216" rx="20" fill="#ffffff" fill-opacity="0.95" stroke="#000000" stroke-opacity="0.10" stroke-width="1" filter="url(#card-shadow)" />

    <!-- App Item 1: Gather -->
    <g id="item-gather" transform="translate(18, 18)">
      <rect id="gather-hover-bg" width="404" height="74" rx="14" fill="#000000" fill-opacity="0.03" />
      <!-- App Icon Box -->
      <rect x="12" y="12" width="50" height="50" rx="14" fill="#dbeafe" />
      <g transform="translate(25, 25)" stroke="#2563eb" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <circle cx="8" cy="5" r="3.5" />
        <path d="M2 17a6 6 0 0 1 12 0" />
        <circle cx="16" cy="7" r="2.8" />
        <path d="M14 17a4.5 4.5 0 0 1 7 0" />
      </g>
      <text class="font-sans" x="74" y="34" font-size="15" font-weight="700" fill="#0a0e14">Gather</text>
      <text class="font-sans" x="74" y="53" font-size="13" font-weight="400" fill="#71717a">Virtual Office</text>
      <!-- Badge: Mac -->
      <g transform="translate(346, 26)">
        <rect width="46" height="24" rx="6" fill="#ffffff" stroke="#000000" stroke-opacity="0.25" stroke-width="0.8" />
        <text class="font-sans" x="23" y="16" font-size="11" font-weight="500" text-anchor="middle" fill="#52525b">Mac</text>
      </g>
    </g>

    <!-- App Item 2: Slack -->
    <g id="item-slack" transform="translate(18, 100)">
      <rect id="slack-hover-bg" width="404" height="74" rx="14" fill="#000000" fill-opacity="0.03" />
      <!-- App Icon Box -->
      <rect x="12" y="12" width="50" height="50" rx="14" fill="#f3e8ff" />
      <g transform="translate(27, 27)" stroke="#9333ea" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M17 10a5 5 0 0 0-5-5H6a5 5 0 0 0-5 5v2a5 5 0 0 0 5 5h1v4l4-4h6a5 5 0 0 0 5-5v-2z" />
      </g>
      <text class="font-sans" x="74" y="34" font-size="15" font-weight="700" fill="#0a0e14">Slack</text>
      <text class="font-sans" x="74" y="53" font-size="13" font-weight="400" fill="#71717a">Communication App</text>
      <!-- Badge: Windows -->
      <g transform="translate(320, 26)">
        <rect width="72" height="24" rx="6" fill="#ffffff" stroke="#000000" stroke-opacity="0.25" stroke-width="0.8" />
        <text class="font-sans" x="36" y="16" font-size="11" font-weight="500" text-anchor="middle" fill="#52525b">Windows</text>
      </g>
    </g>

    <!-- Divider Bar connecting to bottom buttons -->
    <line x1="24" y1="184" x2="416" y2="184" stroke="#000000" stroke-opacity="0.08" stroke-width="1.5" />
    <text class="font-sans" x="220" y="204" font-size="11" font-weight="600" text-anchor="middle" fill="#71717a">↑ Spring physics popout (Hovered state) ↑</text>
  </g>

</svg>'''

    # 2. Clean Vector-Only SVG (No 1.4MB image, instant load)
    clean_desktop_svg = desktop_svg.replace(
        '<g id="layer-portrait-artwork" data-name="Layer 2: Portrait Artwork">\n    ' + (f'<image id="portrait-image" width="1920" height="1080" preserveAspectRatio="xMidYMid slice" href="data:image/png;base64,{b64_img}" opacity="0.95" />' if b64_img else ''),
        '<g id="layer-portrait-artwork" data-name="Layer 2: Portrait Placeholder (Vector Guide)">\n    <rect x="780" y="100" width="1040" height="980" rx="30" fill="#a0b2ce" fill-opacity="0.07" stroke="#a0b2ce" stroke-dasharray="8 8" stroke-width="1.5" />\n    <text class="font-sans" x="1300" y="540" font-size="20" font-weight="500" text-anchor="middle" fill="#0a0e14" fill-opacity="0.3">[ Portrait / Interactive Glass Reveal Canvas Area ]</text>'
    )

    # 3. Mobile Artboard SVG (390 x 844)
    mobile_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 390 844" width="390" height="844">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;500;600;700&amp;family=Fragment+Mono:wght@400;500;600;700&amp;display=swap');
      .font-sans {{ font-family: 'Albert Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }}
      .font-mono {{ font-family: 'Fragment Mono', ui-monospace, SFMono-Regular, Menlo, monospace; }}
    </style>
    <filter id="m-soft-shadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#000000" flood-opacity="0.08" />
    </filter>
  </defs>

  <!-- Background -->
  <rect id="m-bg" width="390" height="844" fill="#edf5ff" />

  <!-- Mobile Blueprint Grid -->
  <g id="m-grid" stroke="#a0b2ce" stroke-opacity="0.18" stroke-width="0.6">
    <line x1="97" y1="0" x2="97" y2="844" />
    <line x1="195" y1="0" x2="195" y2="844" />
    <line x1="293" y1="0" x2="293" y2="844" />
    <line x1="0" y1="211" x2="390" y2="211" />
    <line x1="0" y1="422" x2="390" y2="422" />
    <line x1="0" y1="633" x2="390" y2="633" />
  </g>

  <!-- Mobile Artwork (Base Placeholder or Vector Box) -->
  <g id="m-layer-artwork">
    <rect x="180" y="240" width="190" height="420" rx="20" fill="#a0b2ce" fill-opacity="0.08" stroke="#a0b2ce" stroke-dasharray="4 4" />
    <text class="font-sans" x="275" y="450" font-size="12" text-anchor="middle" fill="#0a0e14" fill-opacity="0.3">[ Portrait Area ]</text>
  </g>

  <!-- Mobile Header -->
  <g id="m-header" transform="translate(20, 24)">
    <!-- Monogram + Brand -->
    <g id="m-brand">
      <path d="M12 2L3 22h2.6L12 6.5 18.5 22H21L12 2Z" stroke="#0a0e14" stroke-width="1.3" fill="none" stroke-linejoin="round" />
      <line x1="7" y1="17" x2="17" y2="17" stroke="#0a0e14" stroke-width="1.3" />
      <text class="font-mono" x="28" y="16" font-size="11" font-weight="600" letter-spacing="1.5" fill="#0a0e14">ANURAG KUMAR</text>
    </g>

    <!-- Intro text -->
    <text class="font-sans" x="0" y="46" font-size="12" fill="#0a0e14" fill-opacity="0.65">
      <tspan x="0" dy="0">Builder — crafting interfaces and</tspan>
      <tspan x="0" dy="16">systems that push what&apos;s next.</tspan>
    </text>

    <!-- Top Action Buttons (Stacked on mobile right) -->
    <g id="m-top-buttons" transform="translate(250, 0)">
      <!-- Let's talk -->
      <g id="m-btn-talk">
        <rect width="100" height="32" rx="16" fill="#ffffff" stroke="#000000" stroke-opacity="0.10" filter="url(#m-soft-shadow)" />
        <text class="font-sans" x="50" y="20" font-size="11" font-weight="600" text-anchor="middle" fill="#0a0e14">Let&apos;s talk</text>
      </g>
      <!-- Explore my work -->
      <g id="m-btn-explore" transform="translate(0, 38)">
        <rect width="100" height="32" rx="16" fill="#ffffff" stroke="#000000" stroke-opacity="0.10" filter="url(#m-soft-shadow)" />
        <text class="font-sans" x="50" y="20" font-size="10" font-weight="600" text-anchor="middle" fill="#0a0e14">Explore work</text>
      </g>
    </g>
  </g>

  <!-- Mobile Main Headline (left 58% width, top 19% ≈ 160px) -->
  <g id="m-headline" transform="translate(20, 170)">
    <text class="font-sans" x="0" y="0" font-weight="300" font-size="52" fill="#0a0e14" letter-spacing="-2.5">
      <tspan x="0" dy="48">Building</tspan>
      <tspan x="0" dy="48">Beyond</tspan>
      <tspan x="0" dy="48">Possible.</tspan>
    </text>
  </g>

  <!-- Mobile Tagline (Bottom Right above action bar) -->
  <g id="m-tagline" transform="translate(370, 715)">
    <text class="font-mono" x="0" y="0" font-size="12" font-weight="700" letter-spacing="2" text-anchor="end" fill="#0a0e14" fill-opacity="0.45">
      <tspan x="0" dy="0">THINK</tspan>
      <tspan x="0" dy="16">BUILD</tspan>
      <tspan x="0" dy="16">REPEAT</tspan>
    </text>
  </g>

  <!-- Mobile Dynamic Action Bar (Centered at bottom: x = 30, y = 750) -->
  <g id="m-action-bar" transform="translate(30, 760)">
    <rect width="330" height="44" rx="14" fill="#ffffff" fill-opacity="0.92" stroke="#000000" stroke-opacity="0.12" filter="url(#m-soft-shadow)" />
    <!-- Tabs -->
    <g transform="translate(6, 6)">
      <rect width="94" height="32" rx="8" fill="#0a0e14" />
      <text class="font-sans" x="47" y="21" font-size="12" font-weight="600" text-anchor="middle" fill="#ffffff">Apps</text>
    </g>
    <g transform="translate(104, 6)">
      <text class="font-sans" x="60" y="21" font-size="12" font-weight="600" text-anchor="middle" fill="#27272a">Components</text>
    </g>
    <g transform="translate(228, 6)">
      <text class="font-sans" x="47" y="21" font-size="12" font-weight="600" text-anchor="middle" fill="#27272a">Notes</text>
    </g>
  </g>
</svg>'''

    # Save to public/
    os.makedirs('public/editable-design', exist_ok=True)
    with open('public/editable-design/portfolio-design-desktop.svg', 'w', encoding='utf-8') as f:
        f.write(desktop_svg)

    with open('public/editable-design/portfolio-design-desktop-clean.svg', 'w', encoding='utf-8') as f:
        f.write(clean_desktop_svg)

    with open('public/editable-design/portfolio-design-mobile.svg', 'w', encoding='utf-8') as f:
        f.write(mobile_svg)

    # Also copy to root directory for easy 1-click access
    with open('portfolio-design-desktop.svg', 'w', encoding='utf-8') as f:
        f.write(desktop_svg)

    with open('portfolio-design-desktop-clean.svg', 'w', encoding='utf-8') as f:
        f.write(clean_desktop_svg)

    with open('portfolio-design-mobile.svg', 'w', encoding='utf-8') as f:
        f.write(mobile_svg)

    # Also write a copy to the parent folder c:\Users\anura\OneDrive\Desktop\AI workflow
    parent_dir = '..'
    if os.path.exists(parent_dir):
        with open(os.path.join(parent_dir, 'portfolio-design-desktop.svg'), 'w', encoding='utf-8') as f:
            f.write(desktop_svg)
        with open(os.path.join(parent_dir, 'portfolio-design-desktop-clean.svg'), 'w', encoding='utf-8') as f:
            f.write(clean_desktop_svg)
        with open(os.path.join(parent_dir, 'portfolio-design-mobile.svg'), 'w', encoding='utf-8') as f:
            f.write(mobile_svg)

    print("Generated and deployed all SVG design files successfully!")

if __name__ == '__main__':
    generate_svgs()
