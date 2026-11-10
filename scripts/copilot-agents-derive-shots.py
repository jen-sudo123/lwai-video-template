#!/usr/bin/env python3
"""Build the in-between screenshot states for the CopilotAgents composition.

The 21 source screenshots only show the start and end of some steps (e.g. every knowledge source on,
then every source off with the starter prompt already filled in). The VO walks through those steps one
at a time, so this pastes regions between screenshots taken at the same scroll position to get each
intermediate state. Run from the repo root after pulling public/copilot-agents/images.
"""
from PIL import Image

D = 'public/copilot-agents/images/'
o = lambda n: Image.open(D + n).convert('RGB')
s05 = o('05-knowledge-default-sources.png')
s07 = o('07-knowledge-focused-and-starter-prompt.png')
s06 = o('06-knowledge-settings.png')


def paste(dst, src, box):
    dst = dst.copy()
    dst.paste(src.crop(box), box[:2])
    return dst


def save(im, name):
    im.save(D + name, 'JPEG', quality=92)  # the source ".png" files are JPEGs too


work_off = paste(s05, s07, (930, 295, 1700, 500))          # work sources off, web search still on
save(work_off, '05b-work-sources-off.png')
all_off = paste(work_off, s07, (930, 530, 1700, 582))      # web search off too, prompts still empty
save(all_off, '05c-all-sources-off.png')
title = paste(all_off, s07, (938, 795, 1130, 833))         # starter prompt title typed
save(title, '07a-prompt-title.png')
save(paste(title, s07, (1132, 795, 1614, 833)), '07b-prompt-message.png')  # ...and its message

# Knowledge settings with "Create images" switched off: reuse the (off) People data switch, 156px above.
img_off = s06.copy()
img_off.paste(s06.crop((1266, 327, 1326, 359)), (1266, 483))
save(img_off, '06b-knowledge-settings-images-off.png')
