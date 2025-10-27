# Sigrid TTT Timer - Sauce for Zwift Mod

A Sauce for Zwift mod that embeds the Sigrid TTT Timer (https://sigrid.ttt-timer.com) as an overlay panel in Zwift.

![Sigrid TTT Timer Panel](https://via.placeholder.com/600x400?text=Sigrid+TTT+Timer+Panel)

## Features

- **Overlay Panel**: Embeds the Sigrid TTT Timer website directly in Zwift
- **Draggable Header**: Click and drag the header to reposition the panel
- **Resizable**: Drag the bottom-right corner to resize the panel
- **Configurable Settings**: Right-click or use the settings button to customize:
  - Panel opacity (transparency)
  - Auto-refresh interval
  - Zoom level for the embedded page
  - Header visibility toggle
- **Persistent Settings**: Your preferences are saved between sessions

## Installation

A Sauce for Zwift "Mod" is a directory placed in `~/Documents/SauceMods`.

**NOTE**: "Documents" may be called "My Documents" on some platforms.

### Steps:

1. Create a `SauceMods` folder in your Documents directory (if it doesn't exist)
2. Extract this mod into a subfolder within `SauceMods`

Your folder structure should look like:
```
Documents
└── SauceMods
    └── sigrid-ttt-timer
        ├── manifest.json
        ├── pages
        │   ├── main.html
        │   ├── css
        │   │   └── main.css
        │   └── src
        │       ├── main.mjs
        │       └── window-controls.js
        └── README.md
```

3. Restart Sauce for Zwift
4. The "Sigrid TTT Timer" panel should now be available in your Sauce windows

## Usage

### Opening the Panel
- Open Sauce for Zwift
- The panel will appear as an overlay window

### Moving the Panel
- Click and drag the header bar to reposition

### Resizing the Panel
- Drag the bottom-right corner handle to resize

### Accessing Settings
- Click the gear (⚙) icon in the header
- OR right-click anywhere on the panel

### Available Settings

**Panel Opacity**: Adjust the transparency of the panel background (0-100%)

**Auto-Refresh Interval**: Automatically reload the page every X seconds
- Set to 0 to disable auto-refresh
- Useful for keeping the timer data current

**Zoom Level**: Scale the embedded webpage (50-200%)
- Adjust if text is too small or too large

**Show Header**: Toggle the visibility of the header bar
- Hide the header for a cleaner look
- Note: You'll need to reopen settings to show it again

### Closing the Panel
- Click the × button in the header

## Requirements

- [Sauce for Zwift](https://www.sauce.llc/) installed and running
- Active internet connection to load https://sigrid.ttt-timer.com

## Troubleshooting

**Panel doesn't appear**
- Ensure the mod is in the correct `Documents/SauceMods/` directory
- Restart Sauce for Zwift completely
- Check the Sauce for Zwift console for any error messages

**Website doesn't load**
- Check your internet connection
- Ensure https://sigrid.ttt-timer.com is accessible in your browser
- Try using the auto-refresh setting to reload

**Settings don't save**
- Make sure you click the "Save Settings" button
- Check that Sauce for Zwift has permission to write to your Documents folder

## Development

### Project Structure
```
sigrid-ttt-timer/
├── manifest.json           # Mod definition and window configuration
├── pages/
│   ├── main.html          # Main panel HTML
│   ├── css/
│   │   └── main.css       # Styling for panel and settings
│   └── src/
│       ├── main.mjs       # Main application logic and settings
│       └── window-controls.js  # Window resize and close handlers
└── README.md
```

### Customization

To point to a different URL:
1. Edit `pages/main.html`
2. Change the iframe `src` attribute:
   ```html
   <iframe class="mainframe" id="mainframe" src="YOUR_URL_HERE"></iframe>
   ```

To modify default settings:
1. Edit `pages/src/main.mjs`
2. Update the default values at the top of the file

## Credits

- Built for [Sauce for Zwift](https://www.sauce.llc/)
- Embeds [Sigrid TTT Timer](https://sigrid.ttt-timer.com)
- Inspired by the TTT Panel and Omnicator mods

## License

MIT License - See LICENSE file for details

## Version History

### 1.0.0 (2025-10-27)
- Initial release
- Basic panel with iframe embedding
- Settings panel with opacity, refresh, zoom, and header visibility controls
- Draggable and resizable window
- Persistent settings storage

## Support

For issues or feature requests, please visit the project repository or contact the mod author.
