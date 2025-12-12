# Content Migration Guide

## Instructions for Repository Owner

The Vite migration structure is complete. To finish the migration, you need to copy the full content from the original `index.html` file into `src/index.html`.

### Steps:

1. Open the original `index.html` (in the root directory)
2. Open `src/index.html` (the new Vite entry point)
   - Find the corresponding section in the original `index.html`
   - Copy the complete content
   - Paste it into the placeholder location in `src/index.html`

### Sections to Copy:

- **Hero Section** (`#home`): Copy stats and CTA buttons
- **About Section** (`#about`): Copy full content including image and text
- **Skills Section** (`#skills`): Copy all skill cards with progress bars
- **Projects Section** (`#projects`): Copy all project cards
- **Experience Section** (`#experience`): Copy timeline items
- **Certifications Section** (`#certifications`): Copy certification items

### Important Notes:

1. **Image Paths**: Ensure all image paths use `/assets/` instead of `./assets/` or `assets/`
   - Example: `<img src="/assets/img/photo.jpg" />`

2. **External Links**: All external links with `target="_blank"` should include `rel="noopener noreferrer"`
   - Example: `<a href="https://example.com" target="_blank" rel="noopener noreferrer">`

3. **Analytics**: The analytics will only load if the user grants consent via localStorage

### Testing After Migration:

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

### Reference Files:

- `src/partials/header.html` - Header/navigation component reference
- `src/partials/main.html` - Main content sections reference (with full placeholders)
- `src/partials/footer.html` - Footer component reference

These partial files are kept for documentation purposes and show the structure of each component.
