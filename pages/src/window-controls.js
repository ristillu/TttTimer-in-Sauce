import * as common from '/pages/src/common.mjs';

/* ===============================
   Window Resize Handler
   =============================== */
function initResizer() {
    const handle = document.querySelector('.resize-handle');
    if (!handle) return;

    handle.addEventListener('mousedown', function(e) {
        e.preventDefault();

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = window.innerWidth;
        const startHeight = window.innerHeight;

        function doDrag(e) {
            const newWidth = startWidth + e.clientX - startX;
            const newHeight = startHeight + e.clientY - startY;
            
            // Minimum size constraints
            const minWidth = 300;
            const minHeight = 200;
            
            const finalWidth = Math.max(minWidth, Math.round(newWidth));
            const finalHeight = Math.max(minHeight, Math.round(newHeight));
            
            // Use the Sauce RPC to resize the window
            common.rpc.resizeWindow(finalWidth, finalHeight);
        }

        function stopDrag() {
            window.removeEventListener('mousemove', doDrag);
            window.removeEventListener('mouseup', stopDrag);
        }

        window.addEventListener('mousemove', doDrag);
        window.addEventListener('mouseup', stopDrag);
    });
}

/* ===============================
   Window Controls (Close button)
   =============================== */
function initWindowControls() {
    const closeButton = document.getElementById('close-btn');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            common.rpc.closeWindow();
        });
    }
}

/* ===============================
   Initialize all window controls
   =============================== */
function init() {
    initResizer();
    initWindowControls();
}

// Ensure the DOM is loaded before trying to find elements
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
