import * as React from 'react';
export default () => {
    if (typeof window !== 'undefined') {
        window.location.href = 'https://www.envoyproxy.io';
    }
    return null;
};
