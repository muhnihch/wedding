# Hero Background Image Setup

## Quick Setup

1. **Place your image** in the project root (or any location)
2. **Run the resize script**:
   ```bash
   python3 resize_hero_image.py your-image.jpg
   ```
   
   This will automatically:
   - Resize to optimal web size (1920x1080 or maintains aspect ratio)
   - Optimize for web (JPEG quality 85)
   - Save to `assets/hero-background.jpg`

## Image Requirements

- **Format**: JPG, PNG, or JPEG
- **Recommended size**: 1920x1080px or larger
- **Aspect ratio**: Any (will be maintained)
- **File size**: Will be optimized automatically

## Manual Setup

If you prefer to do it manually:

1. Resize your image to approximately 1920x1080px (or maintain aspect ratio)
2. Optimize it (reduce file size while maintaining quality)
3. Save as `assets/hero-background.jpg`
4. The CSS will automatically handle responsive sizing

## Responsive Behavior

The image will:
- **Desktop**: Cover full viewport, fixed attachment (parallax effect)
- **Tablet**: Cover with scroll attachment (better performance)
- **Mobile**: Optimized positioning (center 40-50%) for best subject visibility
- **Landscape mobile**: Adjusted height and positioning

## Current CSS Features

- ✅ Automatic responsive sizing
- ✅ Optimized positioning for different screen sizes
- ✅ Smooth overlay for text readability
- ✅ Performance optimized (scroll attachment on mobile)

## Troubleshooting

If the image doesn't appear:
1. Check file path: `assets/hero-background.jpg`
2. Verify file exists and is readable
3. Check browser console for 404 errors
4. Ensure image format is JPG/JPEG/PNG

