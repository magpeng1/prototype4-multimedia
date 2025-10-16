# Journl - Multimedia Journaling App

A beautiful, mobile-first journaling application that supports multimedia entry capture including text, images, links, and documents.

## Features

- **Text Journaling**: Clean, distraction-free text input
- **Image Upload**: Support for multiple image uploads with thumbnails
- **Link Previews**: Add links with automatic title and favicon extraction
- **Document Storage**: Upload and store PDF and DOCX files locally
- **Mobile-First Design**: Optimized for mobile devices with responsive layout
- **Local Storage**: All media stored locally using localStorage (no backend required)
- **Clean UI**: Soft shadows, rounded cards, and calm color palette

## Tech Stack

- React 18
- Tailwind CSS
- Lucide React (icons)
- Local Storage for data persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment to Vercel

### Fixed Deployment Issues ✅

The app has been updated to fix Vercel deployment errors:
- Removed custom Tailwind color classes that caused build failures
- Replaced `@apply` directives with standard CSS
- Simplified Tailwind configuration
- Used inline styles for custom colors to ensure compatibility

### Deploy Steps

1. Build the project locally to test:
```bash
npm install
npm run build
```

2. Deploy to Vercel:
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect it's a React app
   - Framework Preset: **Create React App**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Deploy!

Alternatively, use Vercel CLI:
```bash
npx vercel --prod
```

## Project Structure

```
src/
├── App.js          # Main application component
├── index.js        # React entry point
├── index.css       # Global styles and Tailwind imports
public/
├── index.html      # HTML template
package.json        # Dependencies and scripts
tailwind.config.js  # Tailwind configuration
```

## Design Philosophy

The app follows a "creative notebook" aesthetic with:
- Soft, cream-colored background (#fefdf8)
- Sage green accents (#5f7a5f)
- Rounded corners and soft shadows
- Mobile-first responsive design
- Clean typography using Inter font

## Media Storage

All uploaded media is stored locally using:
- **Images**: Base64 encoded in localStorage
- **Documents**: Base64 encoded in localStorage  
- **Links**: Metadata stored as JSON in localStorage

Note: This is a demo implementation. For production use, consider implementing proper file storage and link preview services.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

MIT License
