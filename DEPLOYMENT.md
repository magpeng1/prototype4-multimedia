# Deployment Guide for Journl

## Prerequisites for Development

Since Node.js wasn't detected on your system, you'll need to install it first:

1. **Install Node.js**:
   - Visit [nodejs.org](https://nodejs.org/)
   - Download and install the LTS version
   - Verify installation: `node --version` and `npm --version`

## Local Development

Once Node.js is installed:

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at `http://localhost:3000`

## Vercel Deployment

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Journl multimedia journaling app"
   git branch -M main
   git remote add origin https://github.com/yourusername/journl.git
   git push -u origin main
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect React settings:
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`
     - **Install Command**: `npm install`
   - Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 3: Manual Build Upload

```bash
# Build the project
npm run build

# Upload the 'build' folder to Vercel manually
```

## Environment Configuration

No environment variables are needed for this app since it uses localStorage for data persistence.

## Build Verification

Before deploying, ensure the build works locally:

```bash
npm run build
npx serve -s build
```

## Post-Deployment

After deployment:
1. Test all functionality on mobile devices
2. Verify media uploads work correctly
3. Check localStorage persistence across sessions
4. Test responsive design on various screen sizes

## Troubleshooting

**Common Issues**:

1. **Build fails**: Check that all dependencies are installed
2. **Blank page**: Ensure `homepage` field in package.json is correct for your domain
3. **Media uploads not working**: Verify file size limits and browser compatibility

**Performance Tips**:
- Images are stored as base64 in localStorage (has size limits)
- Consider implementing proper file storage for production use
- Monitor localStorage usage to prevent quota exceeded errors

## Production Considerations

For a production app, consider:
- Implementing proper file storage (AWS S3, Cloudinary)
- Adding user authentication
- Database for persistent storage
- Real link preview API
- File compression for images
- Progressive Web App (PWA) features
