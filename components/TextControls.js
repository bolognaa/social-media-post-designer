function TextControls({ text, onUpdate }) {
    return (
        <div className="text-controls" data-name="text-controls">
            <div className="control-group" data-name="font-control">
                <label className="block text-sm font-medium text-gray-700 mb-1">Font</label>
                <select 
                    className="font-selector"
                    value={text.fontFamily}
                    onChange={(e) => {
                        try {
                            onUpdate({ ...text, fontFamily: e.target.value });
                        } catch (error) {
                            reportError(error);
                        }
                    }}
                    data-name="font-selector"
                >
                    {fonts.map(font => (
                        <option key={font.value} value={font.value}>
                            {font.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="control-group" data-name="size-control">
                <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                <input 
                    type="range"
                    min="8"
                    max="72"
                    value={text.fontSize}
                    onChange={(e) => {
                        try {
                            onUpdate({ ...text, fontSize: e.target.value });
                        } catch (error) {
                            reportError(error);
                        }
                    }}
                    className="size-slider"
                    data-name="size-slider"
                />
                <span className="text-sm text-gray-500">{text.fontSize}px</span>
            </div>

            <div className="control-group" data-name="color-control">
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <input 
                    type="color"
                    value={text.color}
                    onChange={(e) => {
                        try {
                            onUpdate({ ...text, color: e.target.value });
                        } catch (error) {
                            reportError(error);
                        }
                    }}
                    className="color-picker"
                    data-name="color-picker"
                />
            </div>
        </div>
    );
}
