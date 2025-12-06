#!/usr/bin/env python3
"""
Script to resize and optimize hero background image for web and mobile
"""

from PIL import Image
import os
import sys

def resize_hero_image(input_path, output_path='assets/hero-background.jpg'):
    """
    Resize and optimize image for hero background
    Creates optimized versions for web use
    """
    try:
        # Open the image
        print(f"Opening image: {input_path}")
        img = Image.open(input_path)
        
        # Get original dimensions
        original_width, original_height = img.size
        print(f"Original size: {original_width}x{original_height}px")
        
        # Convert to RGB if necessary (for JPEG)
        if img.mode in ('RGBA', 'LA', 'P'):
            # Create white background for transparent images
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Calculate optimal size for web
        # Desktop: 1920x1080 (Full HD) or larger
        # Mobile: 1200x800 (good for mobile)
        # We'll create a size that works well for both
        
        # Target size: 1920x1080 for desktop, will scale down for mobile
        target_width = 1920
        target_height = 1080
        
        # Maintain aspect ratio
        aspect_ratio = original_width / original_height
        target_aspect = target_width / target_height
        
        if aspect_ratio > target_aspect:
            # Image is wider - fit to width
            new_width = target_width
            new_height = int(target_width / aspect_ratio)
        else:
            # Image is taller - fit to height
            new_height = target_height
            new_width = int(target_height * aspect_ratio)
        
        # Resize with high-quality resampling
        print(f"Resizing to: {new_width}x{new_height}px")
        resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Ensure output directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Save optimized JPEG
        # Quality 85 is a good balance between file size and quality
        resized_img.save(
            output_path,
            'JPEG',
            quality=85,
            optimize=True,
            progressive=True
        )
        
        # Get file size
        file_size = os.path.getsize(output_path) / (1024 * 1024)  # MB
        print(f"✓ Successfully created {output_path}")
        print(f"  Size: {new_width}x{new_height}px")
        print(f"  File size: {file_size:.2f} MB")
        print(f"  Ready for web use!")
        
        return True
        
    except FileNotFoundError:
        print(f"Error: Image file not found: {input_path}")
        return False
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python resize_hero_image.py <input_image_path>")
        print("Example: python resize_hero_image.py photo.jpg")
        print("\nThe script will create assets/hero-background.jpg")
        sys.exit(1)
    
    input_image = sys.argv[1]
    resize_hero_image(input_image)

