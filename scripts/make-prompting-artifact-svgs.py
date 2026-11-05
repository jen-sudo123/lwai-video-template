#!/usr/bin/env python3
"""Generate the SVG illustrations for the PromptingArtifactChatGPT composition.
Writes to public/prompting-artifact-chatgpt/images/. Canvas 1020x580 = label-title-body image column."""
import os
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'prompting-artifact-chatgpt', 'images')
os.makedirs(OUT, exist_ok=True)
W, H = 1020, 580
LIME, LIME_L, INK, GREY, LINE, PANEL = '#66C61C', '#D0F8AB', '#1A1A1A', '#888888', '#DCE1D6', '#F5F7F2'
FONT = "font-family=\"'Public Sans', Arial, Helvetica, sans-serif\""

def svg(body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">{body}</svg>'

def save(name, body):
    open(os.path.join(OUT, name), 'w').write(svg(body))

def label(x, y, text, color=INK, size=26, weight=600, anchor='middle'):
    return f'<text x="{x}" y="{y}" {FONT} font-size="{size}" font-weight="{weight}" fill="{color}" text-anchor="{anchor}">{text}</text>'

# ---------- tiles
def photo(x, y, w=240, h=200):
    return (f'<g><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="18" fill="{PANEL}" stroke="{LINE}" stroke-width="3"/>'
            f'<circle cx="{x+w*0.72}" cy="{y+h*0.3}" r="{h*0.1}" fill="{LIME}"/>'
            f'<path d="M{x+16} {y+h-16} L{x+w*0.38} {y+h*0.42} L{x+w*0.58} {y+h*0.68} L{x+w*0.7} {y+h*0.55} L{x+w-16} {y+h-16} Z" fill="{INK}" opacity="0.85"/></g>')

def screenshot(x, y, w=240, h=200):
    dots = ''.join(f'<circle cx="{x+22+i*18}" cy="{y+20}" r="5" fill="{c}"/>' for i, c in enumerate([GREY, GREY, LIME]))
    lines = ''.join(f'<rect x="{x+20}" y="{y+56+i*30}" width="{w*(0.75 if i%2 else 0.55)}" height="12" rx="6" fill="{LINE}"/>' for i in range(4))
    return (f'<g><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="18" fill="#FFFFFF" stroke="{LINE}" stroke-width="3"/>'
            f'<line x1="{x}" y1="{y+40}" x2="{x+w}" y2="{y+40}" stroke="{LINE}" stroke-width="3"/>{dots}{lines}'
            f'<rect x="{x+w-78}" y="{y+h-46}" width="58" height="26" rx="13" fill="{LIME}"/></g>')

def document(x, y, w=200, h=240, tag='PDF'):
    f = 44
    lines = ''.join(f'<rect x="{x+24}" y="{y+70+i*28}" width="{(w-48)*(0.6 if i==3 else 1)}" height="11" rx="5" fill="{LINE}"/>' for i in range(5))
    return (f'<g><path d="M{x} {y+18} Q{x} {y} {x+18} {y} L{x+w-f} {y} L{x+w} {y+f} L{x+w} {y+h-18} Q{x+w} {y+h} {x+w-18} {y+h} L{x+18} {y+h} Q{x} {y+h} {x} {y+h-18} Z" fill="#FFFFFF" stroke="{LINE}" stroke-width="3"/>'
            f'<path d="M{x+w-f} {y} L{x+w-f} {y+f} L{x+w} {y+f}" fill="none" stroke="{LINE}" stroke-width="3"/>'
            f'<rect x="{x+24}" y="{y+26}" width="62" height="28" rx="6" fill="{INK}"/>{label(x+55, y+47, tag, "#FFFFFF", 17, 700)}{lines}</g>')

def slot(x, y, w, h, doc=False):
    # Dashed outline matching the tile that later covers it (swaps layer on top of earlier images).
    if doc:
        f = 44
        return (f'<path d="M{x} {y+18} Q{x} {y} {x+18} {y} L{x+w-f} {y} L{x+w} {y+f} L{x+w} {y+h-18} Q{x+w} {y+h} {x+w-18} {y+h} L{x+18} {y+h} Q{x} {y+h} {x} {y+h-18} Z" '
                f'fill="none" stroke="{LINE}" stroke-width="3" stroke-dasharray="12 10"/>')
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="18" fill="none" stroke="{LINE}" stroke-width="3" stroke-dasharray="12 10"/>'

# ---------- 1. Beyond text
def bubble(x, y):
    lines = ''.join(f'<rect x="{x+40}" y="{y+52+i*34}" width="{[220,180,240][i]}" height="14" rx="7" fill="{LINE}"/>' for i in range(3))
    return (f'<g><path d="M{x+24} {y} H{x+296} Q{x+320} {y} {x+320} {y+24} V{x*0+y+176} Q{x+320} {y+200} {x+296} {y+200} H{x+90} L{x+44} {y+240} L{x+54} {y+200} H{x+24} Q{x} {y+200} {x} {y+176} V{y+24} Q{x} {y} {x+24} {y} Z" fill="{PANEL}" stroke="{LINE}" stroke-width="3"/>'
            f'{label(x+40, y+38, "Aa", INK, 22, 700, "start")}{lines}</g>')

b = bubble(40, 150) + label(200, 470, 'Text only', GREY, 26, 600)
save('beyond-text-1.svg', b)
arrow = (f'<path d="M392 270 H470" stroke="{LIME}" stroke-width="8" stroke-linecap="round"/>'
         f'<path d="M458 248 L488 270 L458 292" fill="none" stroke="{LIME}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>')
media = photo(530, 60, 220, 180) + screenshot(770, 60, 220, 180) + document(560, 270, 170, 200) + \
        (f'<g><rect x="770" y="270" width="220" height="200" rx="18" fill="{PANEL}" stroke="{LINE}" stroke-width="3"/>'
         + ''.join(f'<rect x="{800+i*44}" y="{440-hh}" width="28" height="{hh}" rx="5" fill="{LIME if i==3 else INK}"/>' for i, hh in enumerate([60, 100, 80, 140])) + '</g>')
save('beyond-text-2.svg', b + arrow + media + label(760, 530, 'Text, images, files', INK, 26, 600))

# ---------- 2. Artifact tiles (progressive)
xs = [30, 370, 710]
tiles = [lambda: photo(30, 140, 280, 230), lambda: screenshot(370, 140, 280, 230), lambda: document(760, 125, 200, 260)]
names = ['Photos', 'Screenshots', 'Documents']
for n in range(4):
    body = ''
    for i in range(3):
        if i < n:
            body += tiles[i]() + label(xs[i] + 140, 440, names[i], INK, 30, 600)
        elif i == 2:
            body += slot(760, 125, 200, 260, doc=True)
        else:
            body += slot(xs[i], 140, 280, 230)
    save(f'artifacts-{n}.svg', body)

# ---------- 3. PDF caveat
def pdf_page(state):
    x, y, w, h = 300, 30, 420, 520
    page = (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="18" fill="#FFFFFF" stroke="{LINE}" stroke-width="3"/>'
            f'<rect x="{x+30}" y="{y+28}" width="70" height="30" rx="6" fill="{INK}"/>{label(x+65, y+50, "PDF", "#FFFFFF", 18, 700)}')
    hl = LIME_L if state >= 2 else 'none'
    page += f'<rect x="{x+18}" y="{y+76}" width="{w-36}" height="128" rx="10" fill="{hl}"/>'
    page += ''.join(f'<rect x="{x+30}" y="{y+90+i*28}" width="{(w-60)*(0.7 if i==3 else 1)}" height="12" rx="6" fill="{GREY if state>=2 else LINE}"/>' for i in range(4))
    chart_op = '0.25' if state >= 2 else '1'
    cx, cy = x + 30, y + 230
    chart = (f'<g opacity="{chart_op}"><rect x="{cx}" y="{cy}" width="{w-60}" height="200" rx="12" fill="{PANEL}" stroke="{LINE}" stroke-width="3"/>'
             + ''.join(f'<rect x="{cx+40+i*80}" y="{cy+170-hh}" width="44" height="{hh}" rx="6" fill="{LIME if i==2 else INK}"/>' for i, hh in enumerate([70, 110, 150, 90])) + '</g>')
    page += chart
    page += ''.join(f'<rect x="{x+30}" y="{y+452+i*26}" width="{(w-60)*(0.5 if i else 1)}" height="12" rx="6" fill="{GREY if state>=2 else LINE}"/>' for i in range(2))
    if state >= 2:
        # read badge (text) and skipped badge (chart)
        page += (f'<g><rect x="{x+w+24}" y="{y+112}" width="190" height="56" rx="28" fill="{LIME}"/>'
                 f'<path d="M{x+w+48} {y+140} l12 12 l22 -24" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'
                 f'{label(x+w+150, y+150, "Text read", "#FFFFFF", 22, 700)}</g>')
        if state == 2:
            page += (f'<g><rect x="{x+w+24}" y="{y+302}" width="210" height="56" rx="28" fill="#FFFFFF" stroke="{GREY}" stroke-width="3"/>'
                     f'<circle cx="{x+w+56}" cy="{y+330}" r="12" fill="none" stroke="{GREY}" stroke-width="4"/><line x1="{x+w+44}" y1="{y+342}" x2="{x+w+68}" y2="{y+318}" stroke="{GREY}" stroke-width="4"/>'
                     f'{label(x+w+150, y+340, "Chart missed", GREY, 22, 700)}</g>')
    return page

save('pdf-1.svg', pdf_page(1))
save('pdf-2.svg', pdf_page(2))
# 3: chart lifted out as its own image with an upload arrow
p3 = pdf_page(3)
ux, uy = 760, 290
p3 += f'<rect x="730" y="318" width="290" height="84" fill="#FFFFFF"/>'  # cover pdf-2's "Chart missed" badge underneath
p3 += (f'<g><rect x="{ux}" y="{uy}" width="230" height="170" rx="14" fill="{PANEL}" stroke="{LIME}" stroke-width="4"/>'
       + ''.join(f'<rect x="{ux+30+i*48}" y="{uy+140-hh}" width="30" height="{hh}" rx="5" fill="{LIME if i==2 else INK}"/>' for i, hh in enumerate([50, 80, 110, 66]))
       + f'<circle cx="{ux+230}" cy="{uy}" r="26" fill="{LIME}"/>'
       + f'<path d="M{ux+230} {uy+12} V{uy-12}" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>'
       + f'<path d="M{ux+220} {uy-3} L{ux+230} {uy-13} L{ux+240} {uy-3}" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'
       + label(ux + 115, uy + 210, 'Upload as an image', INK, 22, 700) + '</g>')
save('pdf-3.svg', p3)
print('wrote', sorted(os.listdir(OUT)))
