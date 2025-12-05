#!/usr/bin/env python3
"""
Generate a celebrative share image with "Happy Wedding!" text and festive border.
Uses cashew/wedding colors - celebrative and elegant.
"""

from PIL import Image, ImageDraw, ImageFont
import math

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

# Wedding/cashew color scheme
CASHEW_LIGHT = '#f5f0e8'  # Light beige background
CASHEW_MEDIUM = '#fbf5e8'  # Medium beige
CASHEW_PRIMARY = '#d4b896'  # Primary cashew color
CASHEW_DARK = '#b8956f'  # Darker cashew
GOLD = '#D4AF37'  # Gold accent

# Create image (1200x630 for WhatsApp)
width, height = 1200, 630
img = Image.new('RGB', (width, height), color=CASHEW_LIGHT)

# Create gradient background (warm beige gradient)
draw = ImageDraw.Draw(img)
for y in range(height):
    ratio = y / height
    # Interpolate between light and medium cashew
    r1, g1, b1 = 245, 240, 232  # #f5f0e8
    r2, g2, b2 = 251, 245, 232  # #fbf5e8
    r = int(r1 + (r2 - r1) * ratio)
    g = int(g1 + (g2 - g1) * ratio)
    b = int(b1 + (b2 - b1) * ratio)
    draw.line([(0, y), (width, y)], fill=(r, g, b))

# Convert colors to RGB
text_color = hex_to_rgb(CASHEW_DARK)
accent_color = hex_to_rgb(GOLD)
frame_color = hex_to_rgb(CASHEW_PRIMARY)
frame_outline = hex_to_rgb(CASHEW_DARK)

# Draw celebrative wedding-themed border
border_margin = 70
border_thickness = 8

# Outer decorative border with pattern
draw.rectangle([border_margin, border_margin, 
                width - border_margin, height - border_margin],
               fill=None, outline=frame_outline, width=border_thickness)

# Middle decorative border
middle_border = border_margin + 15
draw.rectangle([middle_border, middle_border,
                width - middle_border, height - middle_border],
               fill=None, outline=accent_color, width=4)

# Inner border
inner_border = border_margin + 25
draw.rectangle([inner_border, inner_border,
                width - inner_border, height - inner_border],
               fill=None, outline=frame_color, width=3)

# Draw celebrative corner elements (elaborate floral patterns)
corner_size = 60

def draw_celebrative_corner(draw, x, y, size, rotation):
    """Draw elaborate celebrative corner decoration"""
    # Main decorative flower
    center_radius = size // 3
    for i in range(8):
        angle = math.radians(i * 45 + rotation)
        petal_x = x + center_radius * math.cos(angle)
        petal_y = y + center_radius * math.sin(angle)
        # Large petals
        draw.ellipse([petal_x - 6, petal_y - 6, petal_x + 6, petal_y + 6], fill=accent_color)
    
    # Outer decorative petals
    for i in range(12):
        angle = math.radians(i * 30 + rotation)
        petal_x = x + (size // 2) * math.cos(angle)
        petal_y = y + (size // 2) * math.sin(angle)
        draw.ellipse([petal_x - 4, petal_y - 4, petal_x + 4, petal_y + 4], fill=frame_color)
    
    # Center dot
    draw.ellipse([x - 5, y - 5, x + 5, y + 5], fill=frame_outline)
    
    # Small decorative dots around
    for i in range(6):
        angle = math.radians(i * 60 + rotation)
        dot_x = x + (size * 0.7) * math.cos(angle)
        dot_y = y + (size * 0.7) * math.sin(angle)
        draw.ellipse([dot_x - 3, dot_y - 3, dot_x + 3, dot_y + 3], fill=accent_color)

# Draw corners
draw_celebrative_corner(draw, border_margin, border_margin, corner_size, 0)
draw_celebrative_corner(draw, width - border_margin, border_margin, corner_size, 90)
draw_celebrative_corner(draw, width - border_margin, height - border_margin, corner_size, 180)
draw_celebrative_corner(draw, border_margin, height - border_margin, corner_size, 270)

# Draw celebrative side elements (hearts, flowers, decorative patterns)
decorative_spacing = 70

def draw_small_heart(draw, x, y, size):
    """Draw a small heart shape"""
    # Simple heart using two circles and a triangle
    # Left curve
    draw.ellipse([x - size, y - size//2, x, y + size//2], fill=accent_color, outline=None)
    # Right curve
    draw.ellipse([x, y - size//2, x + size, y + size//2], fill=accent_color, outline=None)
    # Bottom point
    points = [(x, y + size//2), (x - size//2, y + size), (x + size//2, y + size)]
    draw.polygon(points, fill=accent_color, outline=None)

def draw_small_flower(draw, x, y, size):
    """Draw a small decorative flower"""
    for i in range(5):
        angle = math.radians(i * 72 - 90)
        petal_x = x + size * math.cos(angle)
        petal_y = y + size * math.sin(angle)
        draw.ellipse([petal_x - 3, petal_y - 3, petal_x + 3, petal_y + 3], fill=frame_color)
    draw.ellipse([x - 2, y - 2, x + 2, y + 2], fill=accent_color)

# Top border - alternating hearts and flowers
for i in range(1, int((width - 2 * border_margin) / decorative_spacing)):
    x_pos = border_margin + i * decorative_spacing
    if i % 2 == 0:
        draw_small_heart(draw, x_pos, border_margin - 5, 8)
    else:
        draw_small_flower(draw, x_pos, border_margin - 5, 6)
    # Add decorative dot
    draw.ellipse([x_pos - 2, border_margin + 2, x_pos + 2, border_margin + 6], fill=accent_color)

# Bottom border - alternating hearts and flowers
for i in range(1, int((width - 2 * border_margin) / decorative_spacing)):
    x_pos = border_margin + i * decorative_spacing
    if i % 2 == 0:
        draw_small_heart(draw, x_pos, height - border_margin + 5, 8)
    else:
        draw_small_flower(draw, x_pos, height - border_margin + 5, 6)
    # Add decorative dot
    draw.ellipse([x_pos - 2, height - border_margin - 6, x_pos + 2, height - border_margin - 2], fill=accent_color)

# Left border - decorative elements
for i in range(1, int((height - 2 * border_margin) / decorative_spacing)):
    y_pos = border_margin + i * decorative_spacing
    if i % 2 == 0:
        draw_small_flower(draw, border_margin - 5, y_pos, 6)
    else:
        draw.ellipse([border_margin - 8, y_pos - 4, border_margin - 2, y_pos + 4], fill=accent_color)
    # Add decorative dot
    draw.ellipse([border_margin + 2, y_pos - 2, border_margin + 6, y_pos + 2], fill=accent_color)

# Right border - decorative elements
for i in range(1, int((height - 2 * border_margin) / decorative_spacing)):
    y_pos = border_margin + i * decorative_spacing
    if i % 2 == 0:
        draw_small_flower(draw, width - border_margin + 5, y_pos, 6)
    else:
        draw.ellipse([width - border_margin + 2, y_pos - 4, width - border_margin + 8, y_pos + 4], fill=accent_color)
    # Add decorative dot
    draw.ellipse([width - border_margin - 6, y_pos - 2, width - border_margin - 2, y_pos + 2], fill=accent_color)

# Center position for text (inside the border)
center_x = width // 2
center_y = height // 2

# Try to load elegant fonts
try:
    font_paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf",
        "/usr/share/fonts/truetype/noto/NotoSerif-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
    ]
    
    main_font = None
    font_size_main = 64  # 3/4 of previous size (85 * 0.75)
    
    for font_path in font_paths:
        try:
            main_font = ImageFont.truetype(font_path, font_size_main)
            break
        except:
            continue
    
    if main_font is None:
        main_font = ImageFont.load_default()
        font_size_main = 38  # 3/4 of fallback (50 * 0.75)
except:
    main_font = ImageFont.load_default()
    font_size_main = 38

# Text to display
text = "Happy Wedding!"

# Get text dimensions
bbox = draw.textbbox((0, 0), text, font=main_font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]

# Center the text (inside border)
text_x = center_x - text_width // 2
text_y = center_y - text_height // 2

# Draw elegant text with subtle shadow
shadow_offset = 5

# Text shadow (multiple layers for depth)
for offset in range(1, shadow_offset + 1):
    for dx in [-offset, 0, offset]:
        for dy in [-offset, 0, offset]:
            if dx != 0 or dy != 0:
                draw.text((text_x + dx, text_y + dy), text, fill=(220, 215, 200), font=main_font)

# Main text
draw.text((text_x, text_y), text, fill=text_color, font=main_font)

# Add small celebrative elements around text (smaller and closer to text)
for i in range(4):
    angle = math.radians(i * 90 - 45)
    element_x = center_x + 140 * math.cos(angle)  # Closer to text
    element_y = center_y + 70 * math.sin(angle)    # Closer to text
    if i % 2 == 0:
        draw_small_heart(draw, int(element_x), int(element_y), 8)  # Smaller
    else:
        draw_small_flower(draw, int(element_x), int(element_y), 6)   # Smaller

# Save image
output_path = 'assets/share.jpg'
img.save(output_path, 'JPEG', quality=95, optimize=True)
print(f"✓ Generated {output_path} successfully!")
print(f"  Size: {width}x{height}px")
print(f"  Design: Celebrative border with 'Happy Wedding!' text")
print(f"  Ready for WhatsApp sharing!")
