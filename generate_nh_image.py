#!/usr/bin/env python3
"""
Generate a simple share image with wedding symbol for WhatsApp sharing.
Uses cashew/wedding colors - no text, just symbol.
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

# Draw wedding rings symbol (two interlocking rings)
center_x, center_y = width // 2, height // 2
ring_radius = 120
ring_thickness = 20
ring_spacing = 40  # Distance between ring centers

# Convert colors to RGB
ring_color = hex_to_rgb(CASHEW_PRIMARY)
ring_outline = hex_to_rgb(CASHEW_DARK)
gold_rgb = hex_to_rgb(GOLD)

# Left ring
left_ring_center_x = center_x - ring_spacing // 2
draw.ellipse([left_ring_center_x - ring_radius, center_y - ring_radius,
               left_ring_center_x + ring_radius, center_y + ring_radius],
              fill=None, outline=ring_outline, width=ring_thickness)

# Right ring (interlocking with left)
right_ring_center_x = center_x + ring_spacing // 2
draw.ellipse([right_ring_center_x - ring_radius, center_y - ring_radius,
               right_ring_center_x + ring_radius, center_y + ring_radius],
              fill=None, outline=ring_outline, width=ring_thickness)

# Fill the visible parts of rings with cashew color
# Left ring (top and bottom parts visible)
for angle in range(0, 180, 2):
    rad = math.radians(angle)
    x1 = left_ring_center_x + (ring_radius - ring_thickness//2) * math.cos(rad)
    y1 = center_y + (ring_radius - ring_thickness//2) * math.sin(rad)
    x2 = left_ring_center_x + (ring_radius + ring_thickness//2) * math.cos(rad)
    y2 = center_y + (ring_radius + ring_thickness//2) * math.sin(rad)
    draw.line([(x1, y1), (x2, y2)], fill=ring_color, width=3)

# Right ring (top and bottom parts visible)
for angle in range(0, 180, 2):
    rad = math.radians(angle)
    x1 = right_ring_center_x + (ring_radius - ring_thickness//2) * math.cos(rad)
    y1 = center_y + (ring_radius - ring_thickness//2) * math.sin(rad)
    x2 = right_ring_center_x + (ring_radius + ring_thickness//2) * math.cos(rad)
    y2 = center_y + (ring_radius + ring_thickness//2) * math.sin(rad)
    draw.line([(x1, y1), (x2, y2)], fill=ring_color, width=3)

# Add gold accents on the rings
for i, ring_x in enumerate([left_ring_center_x, right_ring_center_x]):
    # Top accent
    for angle in range(45, 135, 3):
        rad = math.radians(angle)
        x = ring_x + ring_radius * math.cos(rad)
        y = center_y - ring_radius * math.sin(rad)
        draw.ellipse([x-3, y-3, x+3, y+3], fill=gold_rgb)
    
    # Bottom accent
    for angle in range(225, 315, 3):
        rad = math.radians(angle)
        x = ring_x + ring_radius * math.cos(rad)
        y = center_y - ring_radius * math.sin(rad)
        draw.ellipse([x-3, y-3, x+3, y+3], fill=gold_rgb)

# Add subtle decorative elements (cashew-colored dots)
dot_rgb = hex_to_rgb(CASHEW_PRIMARY)
# Corner dots for elegance
draw.ellipse([150, 100, 160, 110], fill=dot_rgb)  # Top left
draw.ellipse([1040, 100, 1050, 110], fill=dot_rgb)  # Top right
draw.ellipse([150, 520, 160, 530], fill=dot_rgb)  # Bottom left
draw.ellipse([1040, 520, 1050, 530], fill=dot_rgb)  # Bottom right

# Save image
output_path = 'assets/share.jpg'
img.save(output_path, 'JPEG', quality=95, optimize=True)
print(f"✓ Generated {output_path} successfully!")
print(f"  Size: {width}x{height}px")
print(f"  Design: Wedding rings symbol with cashew colors")
print(f"  Ready for WhatsApp sharing!")
