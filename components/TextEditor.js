function TextEditor({ onAddText, selectedText, onUpdateText }) {
    return (
        <div className="text-editor-panel" data-name="text-editor">
            <div className="flex justify-between items-center mb-4" data-name="editor-header">
                <h2 className="text-lg font-semibold">Text Editor</h2>
                <button 
                    className="btn-primary"
                    onClick={() => {
                        try {
                            onAddText();
                        } catch (error) {
                            reportError(error);
                        }
                    }}
                    data-name="add-text-button"
                >
                    Add Text
                </button>
            </div>
            {selectedText && (
                <TextControls 
                    text={selectedText}
                    onUpdate={onUpdateText}
                />
            )}
        </div>
    );
}
