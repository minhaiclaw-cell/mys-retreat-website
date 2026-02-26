# Video Optimization Guide

## Current Implementation: YouTube (Optimized)
- Quality: `vq=small` (240-360p) - much lighter than HD
- Hero height: 65vh (smaller = less perceived weight)
- Lazy loading enabled
- Fade-in effect for smoother experience
- Static image fallback before video loads

## For Even Better Performance: Self-Host Video

### Steps to Self-Host:

1. **Download the video:**
   ```bash
   yt-dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]" https://www.youtube.com/watch?v=haAsGQUNvFE -o hero-video.mp4
   ```

2. **Compress heavily using FFmpeg:**
   ```bash
   # Option 1: 720p at low bitrate (recommended)
   ffmpeg -i hero-video.mp4 -vf scale=1280:720 -c:v libx264 -preset slow -crf 28 -c:a aac -b:a 96k hero-compressed.mp4
   
   # Option 2: 480p even lighter
   ffmpeg -i hero-video.mp4 -vf scale=854:480 -c:v libx264 -preset slow -crf 30 -c:a aac -b:a 64k hero-compressed-480p.mp4
   ```

3. **Upload to images/ folder**

4. **Update index.html:**
   Replace the iframe with:
   ```html
   <video 
       autoplay 
       muted 
       loop 
       playsinline 
       class="hero-video"
       poster="images/hero-bg.jpg">
       <source src="images/hero-compressed.mp4" type="video/mp4">
   </video>
   ```

### Benefits of Self-Hosting:
- ✅ No YouTube iframe overhead
- ✅ No external API calls
- ✅ Better compression control
- ✅ Faster initial load
- ✅ Autoplay works more reliably
- ✅ ~2-5MB file vs YouTube's full quality stream

### Current YouTube Optimizations Applied:
- `vq=small` - Forces lowest quality (240-360p)
- `loading=lazy` - Defers loading
- Smaller hero (65vh vs 100vh)
- Static image fallback
- Fade-in transition

**Estimated file sizes:**
- YouTube stream (even at low quality): ~10-20MB over time
- Self-hosted 720p compressed: ~3-5MB one-time load
- Self-hosted 480p compressed: ~1-2MB one-time load

**Recommendation:** If you want maximum performance, self-host at 480p with the above FFmpeg settings.
