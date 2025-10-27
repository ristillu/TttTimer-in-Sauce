import * as common from '/pages/src/common.mjs';

const doc = document.documentElement;

//const defaultTttTimerUrl = 'https://sigrid.ttt-timer.com';

common.settingsStore.setDefault({
    overlayMode: false,
    solidBackground: false,
    backgroundColor: '#00ff00',
    //tttTimerUrl: defaultTttTimerUrl
});

let overlayMode;
if (window.isElectron) {
    overlayMode = !!window.electron.context.spec.overlay;
    doc.classList.toggle('overlay-mode', overlayMode);
    document.querySelector('#titlebar').classList.toggle('always-visible', overlayMode !== true);
    if (common.settingsStore.get('overlayMode') !== overlayMode) {
        common.settingsStore.set('overlayMode', overlayMode);
    }
}

function render() {
    doc.style.setProperty('--font-scale', common.settingsStore.get('fontScale') || 1);
}

function setBackground() {
    const {solidBackground, backgroundColor} = common.settingsStore.get();
    doc.classList.toggle('solid-background', !!solidBackground);
    if (solidBackground) {
        doc.style.setProperty('--background-color', backgroundColor);
    } else {
        doc.style.removeProperty('--background-color');
    }
}

function updateIframeUrl() {
    const iframe = document.getElementById('tttTimerFrame');
    if (iframe) {
        //const url = common.settingsStore.get('tttTimerUrl') || defaultTttTimerUrl;
        //iframe.src = url;
    }
}

export async function main() {
    common.initInteractionListeners();

    common.settingsStore.addEventListener('changed', async ev => {
        const changed = ev.data.changed;
        if (changed.has('solidBackground') || changed.has('backgroundColor')) {
            setBackground();
        }
        if (window.isElectron && changed.has('overlayMode')) {
            await common.rpc.updateWindow(window.electron.context.id,
                {overlay: changed.get('overlayMode')});
            await common.rpc.reopenWindow(window.electron.context.id);
        }
        if (changed.has('tttTimerUrl')) {
            updateIframeUrl();
        }
        render();
    });

    setBackground();
    render();
    updateIframeUrl();
}

export async function settingsMain() {
    common.initInteractionListeners();
    await common.initSettingsForm('form#general')();
}
