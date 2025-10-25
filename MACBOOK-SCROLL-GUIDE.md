# MacBook Scroll Component Guide

## What Was Added

A beautiful MacBook scroll animation that displays your website/dashboard on a realistic MacBook screen. As users scroll down, the MacBook animates from an angled view to face-on, creating an engaging visual experience.

## Files Created

1. **`components/ui/MacbookScroll.tsx`** - The main component with full MacBook keyboard, trackpad, and screen
2. **`public/images/dashboard-screenshot.svg`** - Placeholder screenshot (replace with your own!)
3. **`public/images/README.md`** - Guide for replacing the screenshot

## Where It Appears

The MacBook scroll is now on the **home page** (`app/page.tsx`), positioned between:
- Hero section (with 3D elements)
- Features section

## How It Works

### Scroll Animation Effects:
- **0% scroll**: MacBook tilted at -28° angle, small scale
- **10-30% scroll**: MacBook rotates to face you directly
- **Scale transformation**: Grows from 60% to 150% size
- **Title fade**: Text fades out as you scroll
- **Perspective**: 3D CSS perspective creates depth

### Components Shown:
- ✅ Realistic MacBook lid with screen
- ✅ Full QWERTY keyboard with all keys
- ✅ Trackpad
- ✅ Speaker grills
- ✅ Your screenshot on the screen

## Customization

### 1. Change the Title
Edit `app/page.tsx` (line 136-140):

```tsx
<MacbookScroll
  title={
    <span>
      Your custom text here <br />
      with <span className="text-gradient">gradients</span>
    </span>
  }
  src="/images/dashboard-screenshot.svg"
  showGradient={false}
/>
```

### 2. Replace the Screenshot

**Easy Way:**
1. Take a screenshot of your actual website
2. Save as `dashboard-screenshot.png` (1920x1080 recommended)
3. Put in `public/images/`
4. Update src to `src="/images/dashboard-screenshot.png"`

**Professional Way:**
1. Design in Figma with 1920x1080 canvas
2. Export as PNG
3. Use the same filename to replace

### 3. Add Gradient Overlay

Set `showGradient={true}` to add a dark gradient at the bottom of the MacBook base.

### 4. Adjust Scroll Behavior

In `MacbookScroll.tsx`, modify these values:

```tsx
// Line 32-37: Rotation range
const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);

// Line 38-39: Text fade timing
const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

// Line 29-31: Scale animation
const scaleX = useTransform(scrollYProgress, [0, 0.3], [1.2, 1.5]);
```

## Screenshot Recommendations

### Best Practices:
- **Size**: 1920x1080 (16:9 aspect ratio)
- **Format**: PNG for transparency, JPG for smaller size
- **Content**: Show your best features
- **Quality**: High resolution, sharp text
- **File Size**: Under 2MB

### What to Show:
- Your actual dashboard/app interface
- Key features highlighted
- Professional design
- Clear branding
- Good contrast

### Current Placeholder:
The SVG placeholder shows:
- Cubiclabs header
- "Welcome to the Future" hero text
- Three feature cards
- Gradient background with grid
- Your brand colors (cyber blue & pink)

## Styling

The MacBook uses these CSS techniques:
- `perspective: 800px` for 3D depth
- `transform: rotateX()` for tilt
- `transform-origin: bottom` for natural rotation
- Glassmorphism on base
- Gradient shadows

## Mobile Responsive

The component automatically scales down on mobile:
- Desktop: Full size with 3D effects
- Tablet: 50% scale
- Mobile: 35% scale

## Performance

- Total size: ~226 KB (very reasonable!)
- Lazy loaded: Only renders when in viewport
- Smooth 60fps scrolling
- Uses GPU-accelerated transforms

## Tips

1. **Test the scroll**: Scroll slowly to see the full animation
2. **Height matters**: The component needs ~200vh (2x viewport height) to work
3. **Replace soon**: The placeholder is nice but your real UI is better!
4. **Video alternative**: You could even use a video instead of static image

## Troubleshooting

### MacBook not showing?
- Check the file path in `src=`
- Ensure image is in `public/images/`
- Try hard refresh (Ctrl+Shift+R)

### Animation choppy?
- Reduce image file size
- Use JPG instead of PNG
- Optimize image (use TinyPNG)

### Title not showing?
- Check if scrolled past the fade point
- Adjust `textOpacity` range in component

## Future Enhancements

You could add:
- Badge in corner (set `badge={<YourComponent />}`)
- Video playing on screen
- Interactive demo
- Multiple screenshots with carousel
- Click to expand fullscreen

## Example with Badge

```tsx
<MacbookScroll
  title={<span>Your Title</span>}
  src="/images/dashboard-screenshot.png"
  showGradient={true}
  badge={
    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-pink">
      New Feature!
    </div>
  }
/>
```

---

**Enjoy your new MacBook scroll animation!** 🚀

Replace the screenshot and watch your website come to life!
