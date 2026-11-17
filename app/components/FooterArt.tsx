/**
 * The footer's closing landscape.
 *
 * A Monet-style painting of a misty river at dawn
 * (`public/footer-monet.webp`, 1440x960, quality 70).
 * It fills the whole footer rather than a band at the bottom, and is masked so
 * its opacity ramps from nothing at the top to full at the bottom edge — the
 * sign-off and the columns sit where the painting has faded out, so the art
 * never competes with the text.
 *
 * The treatment is four stacked background layers (see `.footer-art` in
 * globals.css): a dimming pass that seats the text, the field's own teal laid
 * over the painting, an edge falloff so the rectangle never shows, and the
 * painting itself. Decorative — `aria-hidden`.
 */
export default function FooterArt() {
  return <div className="footer-art" aria-hidden="true" />;
}
