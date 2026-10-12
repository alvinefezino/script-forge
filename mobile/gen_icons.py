from PIL import Image, ImageDraw

import os
MOBILE = "C:/Users/HP/script-forge/mobile"
ASSETS = os.path.join(MOBILE, "assets")
ACCENT = "#F59E0B"
BG = "#000000"

def hex_to_rgb(h):
    h=h.lstrip("#")
    return tuple(int(h[i:i+2],16) for i in (0,2,4))

accent = hex_to_rgb(ACCENT)
bg = hex_to_rgb(BG)

def draw_logomark(img_size, square_size, corner_r):
    img = Image.new("RGBA", (img_size, img_size), bg+(255,))
    draw = ImageDraw.Draw(img)
    cx, cy = img_size//2, img_size//2
    s = square_size
    x0, y0 = cx - s//2, cy - s//2
    x1, y1 = cx + s//2, cy + s//2
    draw.rounded_rectangle((x0,y0,x1,y1), radius=corner_r, fill=accent+(255,))
    scale = s / 180
    stroke = max(6, int(12*scale*0.6))
    def to_px(x,y): return (x0 + (x/18)*s, y0+(y/18)*s)
    p1 = to_px(6.2, 3.2); p2 = to_px(2.8, 9); p3 = to_px(6.2, 14.8)
    for pA,pB in [(p1,p2),(p2,p3)]: draw.line([pA,pB], fill=(0,0,0,255), width=stroke, joint="round")
    p1 = to_px(11.8, 3.2); p2 = to_px(15.2, 9); p3 = to_px(11.8, 14.8)
    for pA,pB in [(p1,p2),(p2,p3)]: draw.line([pA,pB], fill=(0,0,0,255), width=stroke, joint="round")
    p1 = to_px(11.2, 3); p2 = to_px(6.8, 15)
    draw.line([p1,p2], fill=(0,0,0,255), width=max(5,int(stroke*0.85)), joint="round")
    return img

icon = draw_logomark(1024, 620, 128)
icon.save(os.path.join(ASSETS, "icon.png"), "PNG")
print("icon.png", icon.size)

# adaptive foreground - transparent bg, centered orange square
fg = Image.new("RGBA", (1024,1024), (0,0,0,0))
draw = ImageDraw.Draw(fg)
s=640; cx,cy=512,512; x0,y0=cx-s//2,cy-s//2; x1,y1=cx+s//2,cy+s//2
draw.rounded_rectangle((x0,y0,x1,y1), radius=132, fill=accent+(255,))
def to_px2(x,y): return (x0 + (x/18)*s, y0+(y/18)*s)
stroke=max(7,int(14*0.6))
draw.line([to_px2(6.2,3.2),to_px2(2.8,9)], fill=(0,0,0,255), width=stroke, joint="round")
draw.line([to_px2(2.8,9),to_px2(6.2,14.8)], fill=(0,0,0,255), width=stroke, joint="round")
draw.line([to_px2(11.8,3.2),to_px2(15.2,9)], fill=(0,0,0,255), width=stroke, joint="round")
draw.line([to_px2(15.2,9),to_px2(11.8,14.8)], fill=(0,0,0,255), width=stroke, joint="round")
draw.line([to_px2(11.2,3),to_px2(6.8,15)], fill=(0,0,0,255), width=max(6,int(stroke*0.85)), joint="round")
fg.save(os.path.join(ASSETS, "android-icon-foreground.png"), "PNG")
print("fg ok")
bg_img = Image.new("RGBA", (1024,1024), bg+(255,))
bg_img.save(os.path.join(ASSETS, "android-icon-background.png"), "PNG")
print("bg ok")
mono = Image.new("RGBA", (1024,1024), (0,0,0,0))
ImageDraw.Draw(mono).rounded_rectangle((x0,y0,x1,y1), radius=132, fill=(255,255,255,255))
mono.save(os.path.join(ASSETS, "android-icon-monochrome.png"), "PNG")
print("mono ok")
splash_icon = draw_logomark(1024, 380, 78)
splash_icon.save(os.path.join(ASSETS, "splash-icon.png"), "PNG")
print("splash-icon.png", splash_icon.size)
# full splash 1284x2778 black bg with centered logo
W,H=1284,2778
full = Image.new("RGBA", (W,H), bg+(255,))
logo = draw_logomark(420, 320, 66)
lx,ly = (W-420)//2, (H-420)//2 - 120
full.paste(logo, (lx,ly), logo)
full.save(os.path.join(ASSETS, "splash.png"), "PNG")
print("splash.png", full.size)
icon.resize((48,48), Image.LANCZOS).save(os.path.join(ASSETS, "favicon.png"), "PNG")
print("favicon.png done")
print("ALL DONE")
