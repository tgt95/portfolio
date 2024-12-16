'use strict';
let detectMobile = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
};

const _getHeight = el => {
    return parseFloat(getComputedStyle(el, null).height.replace("px", ""));
}

const _getWidth = el => {
    return parseFloat(getComputedStyle(el, null).width.replace("px", ""));
}

const trigger  = (el, eventType) => {
    if (typeof eventType === 'string' && typeof el[eventType] === 'function') {
    el[eventType]();
    } else {
    const event =
        typeof eventType === 'string'
        ? new Event(eventType, {bubbles: true})
        : eventType;
    el.dispatchEvent(event);
    }
}