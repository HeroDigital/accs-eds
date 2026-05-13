/**
 * Promo bar — site-wide announcement strip rendered above the header.
 *
 * Authored at `/promo-bar` as a single-row block:
 *
 *   | promo-bar                                          |
 *   | Free shipping on orders over $50 [Shop now](/sale) |
 *
 * The whole bar becomes a link if exactly one `<a>` is present in the cell;
 * otherwise the message renders as inline content with any inline links.
 */
export default function decorate(block) {
  const cell = block.firstElementChild?.firstElementChild;
  if (!cell) return;

  const content = document.createElement('div');
  content.classList.add('promo-bar__content');
  content.append(...cell.childNodes);

  // If the cell contained exactly one link and nothing else meaningful,
  // promote the link so the whole bar is clickable.
  const links = content.querySelectorAll('a');
  const text = content.textContent.trim();
  if (links.length === 1 && links[0].textContent.trim() === text) {
    const a = links[0];
    a.classList.add('promo-bar__link');
    block.replaceChildren(a);
    return;
  }

  block.replaceChildren(content);
}
