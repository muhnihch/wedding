#!/usr/bin/env python3
"""
Generate a simple share image with two doves symbol for WhatsApp sharing.
Uses cashew/wedding colors.
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
dove_color = hex_to_rgb(CASHEW_PRIMARY)
dove_outline = hex_to_rgb(CASHEW_DARK)
gold_rgb = hex_to_rgb(GOLD)

# Center position
center_x, center_y = width // 2, height // 2
dove_size = 180  # Size of each dove

def draw_dove(draw, x, y, size, facing_right=True):
    """Draw a simple, elegant dove silhouette"""
    scale = size / 200.0
    
    if facing_right:
        # Dove facing right (left dove)
        # Body (oval)
        body_width = int(80 * scale)
        body_height = int(50 * scale)
        draw.ellipse([x - body_width//2, y - body_height//2,
                      x + body_width//2, y + body_height//2],
                     fill=dove_color, outline=dove_outline, width=int(3*scale))
        
        # Head
        head_radius = int(25 * scale)
        head_x = x + int(30 * scale)
        head_y = y - int(15 * scale)
        draw.ellipse([head_x - head_radius, head_y - head_radius,
                      head_x + head_radius, head_y + head_radius],
                     fill=dove_color, outline=dove_outline, width=int(3*scale))
        
        # Beak
        beak_points = [
            (head_x + head_radius, head_y),
            (head_x + int(15 * scale), head_y),
            (head_x + head_radius, head_y + int(8 * scale))
        ]
        draw.polygon(beak_points, fill=dove_outline)
        
        # Wings (left wing - top)
        wing1_points = [
            (x - int(40 * scale), y - int(20 * scale)),
            (x - int(60 * scale), y - int(40 * scale)),
            (x - int(30 * scale), y - int(35 * scale)),
            (x - int(10 * scale), y - int(25 * scale))
        ]
        draw.polygon(wing1_points, fill=dove_color, outline=dove_outline, width=int(2*scale))
        
        # Wings (right wing - bottom)
        wing2_points = [
            (x - int(20 * scale), y + int(15 * scale)),
            (x - int(50 * scale), y + int(30 * scale)),
            (x - int(15 * scale), y + int(25 * scale)),
            (x + int(5 * scale), y + int(20 * scale))
        ]
        draw.polygon(wing2_points, fill=dove_color, outline=dove_outline, width=int(2*scale))
        
        # Tail
        tail_points = [
            (x - int(40 * scale), y),
            (x - int(70 * scale), y - int(10 * scale)),
            (x - int(70 * scale), y + int(10 * scale)),
            (x - int(40 * scale), y + int(5 * scale))
        ]
        draw.polygon(tail_points, fill=dove_color, outline=dove_outline, width=int(2*scale))
        
    else:
        # Dove facing left (right dove) - mirrored
        # Body (oval)
        body_width = int(80 * scale)
        body_height = int(50 * scale)
        draw.ellipse([x - body_width//2, y - body_height//2,
                      x + body_width//2, y + body_height//2],
                     fill=dove_color, outline=dove_outline, width=int(3*scale))
        
        # Head
        head_radius = int(25 * scale)
        head_x = x - int(30 * scale)
        head_y = y - int(15 * scale)
        draw.ellipse([head_x - head_radius, head_y - head_radius,
                      head_x + head_radius, head_y + head_radius],
                     fill=dove_color, outline=dove_outline, width=int(3*scale))
        
        # Beak
        beak_points = [
            (head_x - head_radius, head_y),
            (head_x - int(15 * scale), head_y),
            (head_x - head_radius, head_y + int(8 * scale))
        ]
        draw.polygon(beak_points, fill=dove_outline)
        
        # Wings (right wing - top)
        wing1_points = [
            (x + int(40 * scale), y - int(20 * scale)),
            (x + int(60 * scale), y - int(40 * scale)),
            (x + int(30 * scale), y - int(35 * scale)),
            (x + int(10 * scale), y - int(25 * scale))
        ]
        draw.polygon(wing1_points, fill=dove_color, outline=dove_outline, width=int(2*scale))
        
        # Wings (left wing - bottom)
        wing2_points = [
            (x + int(20 * scale), y + int(15 * scale)),
            (x + int(50 * scale), y + int(30 * scale)),
            (x + int(15 * scale), y + int(25 * scale)),
            (x - int(5 * scale), y + int(20 * scale))
        ]
        draw.polygon(wing2_points, fill=dove_color, outline=dove_outline, width=int(2*scale))
        
        # Tail
        tail_points = [
            (x + int(40 * scale), y),
            (x + int(70 * scale), y - int(10 * scale)),
            (x + int(70 * scale), y + int(10 * scale)),
            (x + int(40 * scale), y + int(5 * scale))
        ]
        draw.polygon(tail_points, fill=dove_color, outline=dove_outline, width=int(2*scale))

# Draw two doves facing each other
dove_spacing = 100
left_dove_x = center_x - dove_spacing
right_dove_x = center_x + dove_spacing
dove_y = center_y

# Left dove (facing right)
draw_dove(draw, left_dove_x, dove_y, dove_size, facing_right=True)

# Right dove (facing left)
draw_dove(draw, right_dove_x, dove_y, dove_size, facing_right=False)

# Add a small decorative element between them (optional - a small heart or decorative line)
# Simple decorative line connecting them
decorative_y = dove_y - int(30)
draw.line([(left_dove_x + 50, decorative_y), (right_dove_x - 50, decorative_y)],
          fill=gold_rgb, width=2)

# Add small gold accents
for x_pos in [left_dove_x - 30, right_dove_x + 30]:
    draw.ellipse([x_pos - 3, decorative_y - 3, x_pos + 3, decorative_y + 3], fill=gold_rgb)

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
print(f"  Design: Two doves symbol with cashew colors")
print(f"  Ready for WhatsApp sharing!")
