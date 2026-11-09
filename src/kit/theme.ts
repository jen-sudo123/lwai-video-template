import { colors } from '../tokens';

// Part of the LWAI demo kit — see src/kit/README.md.
// Mount <style>{KIT_CSS}</style> once at the top of a composition to use the kit- classes.

export const INK = colors.black;
export const MUTED = '#6B6B6B';
export const LINE = '#E4E4E4';
export const LIME = colors.lime500;
export const LIME_SOFT = colors.lime200;
export const GREEN = '#3F7A1F';
export const RED = '#C2410C';

export const KIT_CSS = `
  .kit-pad { width: 100%; height: 100%; padding: 80px 80px 150px; display: flex; flex-direction: column; justify-content: center; box-sizing: border-box; }
  .kit-label { display: flex; align-items: center; gap: 18px; font-family: 'Public Sans'; font-weight: 600; font-size: 22px; letter-spacing: .12em; text-transform: uppercase; color: ${MUTED}; margin: 0 0 26px; }
  .kit-label::before { content: ""; width: 44px; height: 5px; background: ${LIME}; }
  .kit-h1, .kit-h2, .kit-h3 { font-family: 'IBM Plex Serif'; font-weight: 400; letter-spacing: -0.035em; margin: 0; color: ${INK}; }
  .kit-h1 { font-size: 104px; line-height: 1.06; }
  .kit-h2 { font-size: 72px; line-height: 1.1; }
  .kit-h3 { font-size: 40px; line-height: 1.2; }
  .kit-body { font-family: 'Public Sans'; font-size: 34px; line-height: 1.45; color: ${INK}; margin: 0; }
  .kit-muted { color: ${MUTED}; }
  .kit-mark { background-image: linear-gradient(${LIME_SOFT}, ${LIME_SOFT}); background-repeat: no-repeat; background-position: 0 88%; background-size: 0% 38%; padding: 0 .06em; margin: 0 -.06em; }
  .kit-card { background: #fff; border: 2px solid ${LINE}; border-radius: 22px; box-sizing: border-box; }
  .kit-pill { display: inline-flex; align-items: center; gap: 12px; padding: 16px 28px; border: 2px solid ${LINE}; border-radius: 999px; font-family: 'Public Sans'; font-weight: 600; font-size: 30px; background: #fff; color: ${INK}; white-space: nowrap; }
  .kit-tag { display: inline-flex; align-items: center; padding: 6px 16px; border-radius: 999px; background: ${LIME_SOFT}; color: ${INK}; font-family: 'Public Sans'; font-weight: 600; font-size: 18px; letter-spacing: .1em; text-transform: uppercase; }
  .kit-mono { font-family: 'IBM Plex Mono', ui-monospace, Menlo, monospace; }
  .kit-row { display: flex; align-items: center; }
  .kit-ui { font-family: 'Public Sans'; color: ${INK}; }
`;
