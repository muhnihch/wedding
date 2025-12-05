#!/usr/bin/env python3
"""
Generate a simple share image with 'NH' inside a heart for WhatsApp sharing.
"""

from PIL import Image, ImageDraw, ImageFont
import math

# Create image (1200x630 for WhatsApp)
width, height = 1200, 630
img = Image.new('RGB', (width, height), color='#fff5f5')

# Create gradient background
draw = ImageDraw.Draw(img)
for y in range(height):
    ratio = y / height
    r = int(255 - (255 - 224) * ratio)
    g = int(245 - (245 - 224) * ratio)
    b = int(245 - (245 - 224) * ratio)
    draw.line([(0, y), (width, y)], fill=(r, g, b))

# Draw heart shape using a better algorithm
def draw_heart(draw, center_x, center_y, size, fill_color, outline_color):
    """Draw a heart shape using a simple, recognizable heart path"""
    # Create heart shape using two circles and a triangle
    # This creates a more recognizable heart shape
    scale = size / 200.0
    
    # Left circle (top left of heart)
    left_circle_center_x = center_x - 50 * scale
    left_circle_center_y = center_y - 80 * scale
    left_radius = 60 * scale
    
    # Right circle (top right of heart)
    right_circle_center_x = center_x + 50 * scale
    right_circle_center_y = center_y - 80 * scale
    right_radius = 60 * scale
    
    # Bottom point of heart
    bottom_x = center_x
    bottom_y = center_y + 100 * scale
    
    # Draw using a polygon approximation
    points = []
    # Left arc
    for angle in range(180, 360, 5):
        rad = math.radians(angle)
        x = left_circle_center_x + left_radius * math.cos(rad)
        y = left_circle_center_y + left_radius * math.sin(rad)
        points.append((int(x), int(y)))
    
    # Right arc
    for angle in range(0, 180, 5):
        rad = math.radians(angle)
        x = right_circle_center_x + right_radius * math.cos(rad)
        y = right_circle_center_y + right_radius * math.sin(rad)
        points.append((int(x), int(y)))
    
    # Add bottom point
    points.append((int(bottom_x), int(bottom_y)))
    
    # Draw filled heart
    draw.polygon(points, fill=fill_color)
    
    # Draw outline
    points.append(points[0])  # Close the path
    draw.line(points, fill=outline_color, width=8)

# Draw heart at center
heart_size = 400
heart_x, heart_y = width // 2, height // 2
draw_heart(draw, heart_x, heart_y, heart_size, '#e91e63', '#c2185b')

# Draw "NH" text inside heart
try:
    # Try to use a bold system font
    font_size = 140
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf", font_size)
        except:
            # Fallback to default font
            font = ImageFont.load_default()
except:
    font = ImageFont.load_default()

# Get text dimensions for centering
text = "NH"
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]

# Draw text with shadow effect
text_x = heart_x - text_width // 2
text_y = heart_y - text_height // 2 + 30

# Shadow
draw.text((text_x + 3, text_y + 3), text, fill='rgba(0,0,0,100)', font=font)
# Main text
draw.text((text_x, text_y), text, fill='#ffffff', font=font)

# Add subtle decorative dots
dot_color = (233, 30, 99)  # #e91e63
draw.ellipse([197, 147, 203, 153], fill=dot_color + (76,))  # 30% opacity
draw.ellipse([997, 477, 1003, 483], fill=dot_color + (76,))
draw.ellipse([148, 498, 152, 502], fill=dot_color + (51,))  # 20% opacity
draw.ellipse([1048, 128, 1052, 132], fill=dot_color + (51,))

# Save image
output_path = 'assets/share.jpg'
img.save(output_path, 'JPEG', quality=95, optimize=True)
print(f"✓ Generated {output_path} successfully!")
print(f"  Size: {width}x{height}px")
print(f"  Ready for WhatsApp sharing!")

