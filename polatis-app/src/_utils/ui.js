
const ports = {
    /**
     * open/close left hand pane
     */
    openCloseLeftPanel: function () {
        // change class close to open
        let leftContainer =  document.querySelector('.container__left');
        let rightContainer =  document.querySelector('.container__right');
        let arrow = document.querySelector('.search-detail__arrow');
        let tabsContainer = document.querySelector('.js-detail-tabs');

        ui.toggle(leftContainer, 'panel--close', 'panel--open');
        ui.toggle(rightContainer, 'panel--close', 'panel--open');
        ui.toggle(arrow, 'arrow--open', 'arrow--close');
        ui.toggle(tabsContainer, 'invisible', 'show');
    },
};

const global = {
    /**
     * open/close header pane
     */
    openCloseHeaderPanel: function() {
        let header = document.querySelector('.header');
        ui.toggle(header, 'header--close', 'header--open');
    }
};

export const ui = {
    /**
     * returns two properties containing the window height and width
     * @returns {{height: number, width: number}}
     */
    getWindowWidthHeight: function () {

        let w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

        return {
            height: height || 0,
            width: width || 0
        }
    },
    /**
     * resizes the content height to fit a size minus the height of elements passed in the array
     * @param assignToElement
     * @param takeFromElementArray
     */
    resizeContentHeight: function (assignToElement, takeFromElementArray = []) {
        let remainder = 0;
        if (takeFromElementArray.length > 0) {
            takeFromElementArray.map((item, i) => {
                let element = document.querySelector("." + item);
                if (element) {
                    if (element.offsetHeight > 0) remainder += element.offsetHeight;
                }
            })
        }

        let content = document.querySelector('.' + assignToElement);
        let header = document.querySelector('.header');
        let footer = document.querySelector('.footer');

        if (header && footer) {
            let top = header.offsetHeight;
            let bottom = footer.offsetHeight;
            let height = ui.getWindowWidthHeight().height;

            content.style.height = height - (top + bottom + remainder) + 'px';
            content.style.overflowX = 'auto';
        }
    },
    /**
     * toggle classes on DOM element
     * @param element
     * @param classNameOne
     * @param classNameTwo
     */
    toggle: function (element, classNameOne, classNameTwo) {
        let classList = element.classList;

        if (classNameTwo && classNameTwo.length > 0) {

            classList.contains(classNameTwo) || (!classList.contains(classNameOne) && !classList.contains(classNameTwo)) ? (function () {
                    classList.remove(classNameTwo);
                    classList.add(classNameOne);
                })()
                : (function () {
                    classList.add(classNameTwo);
                    classList.remove(classNameOne);
                })()
        } else {
            classList.remove(classNameOne);
        }
    },

    /**
     * gets the closest element in the DOM tree passed in element and selector
     * @param elem - DOM element
     * @param selector - selector to match
     * @returns {*}
     */
    getClosest: function (elem, selector) {
        for ( ; elem && elem !== document; elem = elem.parentNode ) {
            if ( elem.matches( selector ) ) return elem;
        }
        return null;
    },
    addClass: function () {},
    hasClass: function () {},
    removeClass: function () {},
    ports,
    global
};