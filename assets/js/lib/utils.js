/**
 * Add show/hide classes to an element if user clicks outside of this element
 * @param {HTMLElement} element 
 * @param {string} hideClass 
 * @param {string} showClass 
 */
function hideOnClickOutside(element, hideClass, showClass = null) {
    const outsideClickListener = event => {
        if (!element.contains(event.target) && isVisible(element)) { // or use: event.target.closest(selector) === null
            if (showClass) {
                element.classList.remove(showClass);
            }

            if (hideClass) {
                element.classList.add(hideClass);
            }
        }
    }

    document.addEventListener('click', outsideClickListener);
}

/**
 * Returns true if given element is visible
 * @param {HTMLElement} elem 
 * @returns boolean
 */
const isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length); // 

/**
 * Returns a slug from a string
 * @param {String} str 
 * @returns 
 */
function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, '');

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    // Remove invalid chars
    str = str.replace(/[^a-z0-9 -]/g, '')
        // Collapse whitespace and replace by -
        .replace(/\s+/g, '-')
        // Collapse dashes
        .replace(/-+/g, '-');

    return str;
}

export { hideOnClickOutside, isVisible, slugify };