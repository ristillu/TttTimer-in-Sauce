import * as common from '/pages/src/common.mjs';

const doc = document.documentElement;
//const L = sauce.locale;
//const H = L.human;
//const num = H.number;

//const page = location.pathname.split('/').at(-1).split('.')[0];

//const defaultPullPowerThreshold = 0;
//const defaultMinDuration = 7;
//const defaultShowAccumulatedStatistics = false;
//const defaultShowWkg = false;
//const defaultHideUnit = false;



common.settingsStore.setDefault({
    overlayMode: false,
    solidBackground: false,
    backgroundColor: '#00ff00',
    TttTimerUrl: 'https://sigrid.ttt-timer.com'
    //minDuration: defaultMinDuration,
    //pullPowerThreshold: defaultPullPowerThreshold,
    //showAccumulatedStatistics: defaultShowAccumulatedStatistics,
    //showWkg: defaultShowWkg,
    //hideUnit: defaultHideUnit
});

let overlayMode;
if (window.isElectron) {
    overlayMode = !!window.electron.context.spec.overlay;
    doc.classList.toggle('overlay-mode', overlayMode);
    document.querySelector('#titlebar').classList.toggle('always-visible', overlayMode !== true);
    if (common.settingsStore.get('overlayMode') !== overlayMode) {
        // Sync settings to our actual window state, not going to risk updating the window now
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
        render();
    });

    setBackground();
    render();
    
    //const resetBtn = document.querySelector('.button.reset');
    //resetBtn.addEventListener('click', reset);
}

export async function settingsMain() {
    common.initInteractionListeners();
    //await common.initSettingsForm('form#general')();
}

