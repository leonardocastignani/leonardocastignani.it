// --- SHARED PAGE SCROLL LOCK (reference-counted) ---
// Multiple modals (cookie consent, service detail, ...) can each want the
// page scroll locked. Without a shared counter, closing one while another
// is still open/animating would double-toggle the compensation mid-transition.
//
// `html { scrollbar-gutter: stable }` (see Layout.astro) keeps the scrollbar's
// space reserved at all times — but browsers (Chrome included) still paint an
// inert scrollbar track in that reserved gutter even once `overflow: hidden`
// removes the actual thumb. That track is native browser chrome, not part of
// the page's DOM, so no CSS overlay/backdrop can ever dim or cover it — the
// only way to make it disappear is to drop the reservation itself (flip
// scrollbar-gutter to 'auto') for as long as the modal is open.
//
// Doing that changes the width the browser resolves percentages/`auto` against
// for anything sized off the viewport — in particular the fixed header, which
// is `left/right: 0` normally and `left: 50%; transform: translateX(-50%);
// width: calc(...)` once scrolled into its "pill" shape. Both recompute against
// that width, which would otherwise reflow or re-center the header the instant
// the gutter is dropped. So the header's exact on-screen box (left + width) is
// captured and pinned in raw pixels — with its transform cancelled, since the
// captured `left` already reflects the post-transform position — before the
// gutter is touched, and released again once the modal closes.
let lockCount = 0;
let frozenHeader = null;

export function lockPageScroll() {
    if (lockCount === 0) {
        const header = document.querySelector('header');
        if (header) {
            const rect = header.getBoundingClientRect();
            header.style.left = `${rect.left}px`;
            header.style.right = 'auto';
            header.style.width = `${rect.width}px`;
            header.style.transform = 'none';
            frozenHeader = header;
        }

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
        document.documentElement.style.scrollbarGutter = 'auto';
        document.documentElement.classList.add('modal-scroll-locked');
    }
    lockCount += 1;
}

export function unlockPageScroll() {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
        document.documentElement.classList.remove('modal-scroll-locked');
        document.documentElement.style.paddingRight = '';
        document.documentElement.style.scrollbarGutter = '';
        if (frozenHeader) {
            frozenHeader.style.left = '';
            frozenHeader.style.right = '';
            frozenHeader.style.width = '';
            frozenHeader.style.transform = '';
            frozenHeader = null;
        }
    }
}
