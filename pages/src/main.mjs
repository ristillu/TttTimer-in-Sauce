import * as common from '/pages/src/common.mjs';

/* ===============================
   Configuration settings keys
   =============================== */
const OPACITY_KEY = 'panelOpacity';
const REFRESH_INTERVAL_KEY = 'refreshInterval';
const ZOOM_LEVEL_KEY = 'zoomLevel';
const HEADER_VISIBLE_KEY = 'headerVisible';

/* ===============================
   Global variables
   =============================== */
let panelOpacity = parseInt(common.settingsStore.get(OPACITY_KEY)) || 80;
let refreshInterval = parseInt(common.settingsStore.get(REFRESH_INTERVAL_KEY)) || 0;
let zoomLevel = parseInt(common.settingsStore.get(ZOOM_LEVEL_KEY)) || 100;
let headerVisible = common.settingsStore.get(HEADER_VISIBLE_KEY);
if (headerVisible === null || headerVisible === undefined) {
    headerVisible = true;
} else {
    headerVisible = headerVisible === "true";
}

let refreshIntervalId = null;

/* ===============================
   DOM references
   =============================== */
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const saveSettingsBtn = document.getElementById('save-settings-btn');
const settingsForm = document.getElementById('settings-form');

const opacitySlider = document.getElementById('opacity-slider');
const opacityValue = document.getElementById('opacity-value');
const refreshIntervalInput = document.getElementById('refresh-interval');
const zoomLevelInput = document.getElementById('zoom-level');
const headerVisibleCheckbox = document.getElementById('header-visible');

const container = document.querySelector('.container');
const mainframe = document.getElementById('mainframe');
const appHeader = document.getElementById('app-header');

/* ===============================
   Apply settings to UI
   =============================== */
function applySettings() {
    // Apply opacity
    if (container) {
        const bgOpacity = panelOpacity / 100;
        container.style.backgroundColor = `rgba(18, 18, 18, ${bgOpacity})`;
    }

    // Apply zoom level to iframe
    if (mainframe) {
        mainframe.style.zoom = `${zoomLevel}%`;
    }

    // Apply header visibility
    if (appHeader) {
        appHeader.style.display = headerVisible ? 'flex' : 'none';
    }

    // Setup auto-refresh
    if (refreshIntervalId) {
        clearInterval(refreshIntervalId);
        refreshIntervalId = null;
    }

    if (refreshInterval > 0 && mainframe) {
        refreshIntervalId = setInterval(() => {
            mainframe.src = mainframe.src;
        }, refreshInterval * 1000);
    }
}

/* ===============================
   Settings Panel Logic
   =============================== */
function initSettingsPanel() {
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            if (!settingsPanel) return;
            settingsPanel.classList.remove('hidden');

            // Populate form with current settings
            if (opacitySlider) {
                opacitySlider.value = panelOpacity;
            }
            if (opacityValue) {
                opacityValue.textContent = `${panelOpacity}%`;
            }
            if (refreshIntervalInput) {
                refreshIntervalInput.value = refreshInterval;
            }
            if (zoomLevelInput) {
                zoomLevelInput.value = zoomLevel;
            }
            if (headerVisibleCheckbox) {
                headerVisibleCheckbox.checked = headerVisible;
            }
        });
    }

    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', () => {
            if (settingsPanel) {
                settingsPanel.classList.add('hidden');
            }
        });
    }

    // Update opacity value display when slider moves
    if (opacitySlider && opacityValue) {
        opacitySlider.addEventListener('input', (e) => {
            opacityValue.textContent = `${e.target.value}%`;
        });
    }

    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!settingsForm) return;

            const formData = new FormData(settingsForm);

            // Save opacity
            const newOpacity = parseInt(formData.get('opacity-slider'));
            if (!isNaN(newOpacity)) {
                panelOpacity = newOpacity;
                common.settingsStore.set(OPACITY_KEY, panelOpacity.toString());
            }

            // Save refresh interval
            const newRefresh = parseInt(formData.get('refresh-interval'));
            if (!isNaN(newRefresh)) {
                refreshInterval = newRefresh;
                common.settingsStore.set(REFRESH_INTERVAL_KEY, refreshInterval.toString());
            }

            // Save zoom level
            const newZoom = parseInt(formData.get('zoom-level'));
            if (!isNaN(newZoom)) {
                zoomLevel = newZoom;
                common.settingsStore.set(ZOOM_LEVEL_KEY, zoomLevel.toString());
            }

            // Save header visibility
            if (headerVisibleCheckbox) {
                headerVisible = headerVisibleCheckbox.checked;
                common.settingsStore.set(HEADER_VISIBLE_KEY, headerVisible.toString());
            }

            // Apply settings immediately
            applySettings();

            // Close settings panel
            if (settingsPanel) {
                settingsPanel.classList.add('hidden');
            }

            console.log('Settings saved successfully');
        });
    }
}

/* ===============================
   Main initialization
   =============================== */
async function main() {
    console.log("Sauce Version:", await common.rpc.getVersion());
    
    // Initialize settings panel
    initSettingsPanel();
    
    // Apply saved settings on load
    applySettings();
}

// Start the application
main();
