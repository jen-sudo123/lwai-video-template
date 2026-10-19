#!/usr/bin/env python3
"""List the public/ assets a composition references.

    python3 scripts/list-assets.py ClaudeInstructions

Looks up the composition in src/Root.tsx, finds the data/composition files it
imports, and prints one line per asset (paths relative to public/):

    file<TAB>video/foo/foo.mp4
    dir<TAB>images/foo/          (dynamic staticFile(`images/foo/${name}`) prefixes)
"""
import os, re, sys

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
comp = sys.argv[1] if len(sys.argv) > 1 else sys.exit('Usage: list-assets.py <CompositionId>')

root = open('src/Root.tsx').read()
imports = {}
for m in re.finditer(r"import\s*\{([^}]*)\}\s*from\s*'\./([^']+)'", root):
    for name in m.group(1).split(','):
        if name.strip(): imports[name.strip()] = m.group(2)
block = next((b.split('/>')[0] for b in root.split('<Composition')[1:]
              if re.search(r'id="%s"' % re.escape(comp), b)), None)
if block is None:
    sys.exit(f'Composition "{comp}" not found in src/Root.tsx')
mods = [imports[n] for n in imports if re.search(r'\b%s\b' % re.escape(n), block)]

files, dirs = set(), set()
for mod in mods:
    for ext in ('.ts', '.tsx'):
        f = f'src/{mod}{ext}'
        if os.path.exists(f):
            text = open(f).read()
            files |= set(re.findall(r"['\"`]([^'\"`$]+\.(?:mp4|webm|mov|mp3|wav|m4a|png|jpe?g|webp|svgz?|gif))['\"`]", text))
            dirs |= set(re.findall(r"`([^`$]+/)\$\{", text))

for p in sorted(files): print(f'file\t{p}')
for d in sorted(dirs): print(f'dir\t{d}')
