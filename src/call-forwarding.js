function delay(fn, ms) {
    return function() {
        const context = this;
        const args = [...arguments];
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(fn.apply(context, args));
            }, ms);
        });
    };
}


function showTree(height) {
    for (let i = 1; i <= height; i++) {
        const halfPattern = 'x'.repeat(i);
        console.log(halfPattern.padStart(height).concat(halfPattern));
    }
    return (1 + height) * height;
}



function debounce(fn, ms) {
    let scheduledCall = null;
    let resolveRef = null;
    let pr = null;
    return function() {
        const context = this;
        const args = [...arguments];
        if (scheduledCall) {
            clearTimeout(scheduledCall);
        }
        scheduledCall = setTimeout(() => {
            resolveRef(fn.apply(context, args));
            scheduledCall = null;
            pr = null;
        }, ms);
        if (!pr) {
            pr = new Promise(resolve => {resolveRef = resolve});
        }
        return pr;
    }; 
}


function throttle(fn, ms) {
    let context = null;
    let args = null;
    let callBan = null;

    function output() {
        if (args) {
            fn.apply(context, args);
            context = null;
            args = null;
            callBan = setTimeout(output, ms);
        } else {
            callBan = null;
        }
    }

    return function() {
        if (callBan) {
            context = this;
            args = [...arguments];
        } else {
            fn.apply(this, arguments);
            callBan = setTimeout(output, ms);
        }
    };
}
