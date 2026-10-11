# Tiger QR Studio

Tiger QR Studio is a browser-based QR code builder built with React and Vite. It helps people create, customize, save, download, and organize QR codes for personal use and small businesses.

## Features

- **QR code builder:** create QR codes for personal profiles, phone numbers, WhatsApp, websites, social profiles, email, Wi-Fi, locations, contact cards, plain text, restaurant menus, and payment details.
- **Live preview and customization:** preview generated codes and adjust foreground/background colors, image size, margin, and error-correction level.
- **PNG export and sharing:** download QR codes as PNG images and use the browser's native share feature where supported.
- **Saved QR library:** browse saved codes, search by name, filter by type, preview, download, and delete them.
- **Template starters:** choose a QR format by category and launch the builder with that type selected.
- **Local analytics:** view saved-code creation totals, date trends, and QR-type breakdowns.
- **Backup and restore:** export the saved library to JSON and import a previous backup.
- **Responsive interface:** desktop navigation and mobile-friendly layouts.

## Tech stack

- React
- Vite
- React Router
- \`qrcode.react\` for QR rendering
- \`libphonenumber-js\` for phone-number helpers
- Lucide React icons
- CSS

## Requirements

- Node.js compatible with the installed Vite version
- npm

## Run locally

Clone the repository and install dependencies:

\`\`\`bash
git clone https://github.com/Bentiger255/tiger-qr-studio.git
cd tiger-qr-studio
npm install
npm run dev
\`\`\`

Vite prints a local development URL in the terminal. Open that URL in your browser.

## Available scripts

| Command | Purpose |
| --- | --- |
| \`npm run dev\` | Start the development server |
| \`npm run build\` | Build the production bundle in \`dist/\` |
| \`npm run preview\` | Preview the production build locally |
| \`npm run lint\` | Run ESLint checks |

Before publishing a change, run:

\`\`\`bash
npm run lint
npm run build
\`\`\`

## How data is stored

The current version saves QR entries in the browser's \`localStorage\` under \`tigerQRs\`. Preferences are stored locally under \`tigerQRSettings\`. Data is specific to the browser and device where it was created. It is not synced to a server or user account.

Use **Settings → Export library** to download a backup before clearing site data or moving to another device. Import a previously exported JSON backup from the same page.

## Analytics limitations

Analytics currently describes QR codes saved in the local browser library. The app does **not** currently record scan counts, unique visitors, link visits, conversions, or cross-device activity. A QR code that points to a normal URL cannot report scans by itself; scan analytics would require a trackable redirect or another measurement service.

## Current limitations

- No account system or cloud synchronization.
- No shared team workspace.
- No scan or destination-visit analytics.
- QR templates are starting configurations, not remotely saved template records.
- Saved QR codes and preferences can be lost if browser site data is cleared without a backup.

## Project structure

\`\`\`text
src/
  components/   Reusable layout, form, QR and UI components
  data/         QR type definitions
  pages/        Dashboard, builder, library, templates, analytics and settings
  styles/       Styles for the workspace pages
  utils/        QR payload generation helpers
public/         Static public assets
\`\`\`

## Contributing

1. Create a branch for your change.
2. Keep UI states responsive and accessible.
3. Run \`npm run lint\` and \`npm run build\`.
4. Describe the behavior changed in your pull request.

## License

No license has been specified yet. Unless a license is added, the repository's contents remain under the default copyright rules; do not assume they are open for reuse.
