function App() {
    const [template, setTemplate] = React.useState(null);
    const [textElements, setTextElements] = React.useState([]);
    const [selectedTextId, setSelectedTextId] = React.useState(null);
    const [designs, setDesigns] = React.useState([]);

    const handleSelectTemplate = (template) => {
        try {
            setTemplate(template);
            setTextElements([]);
            setSelectedTextId(null);
        } catch (error) {
            reportError(error);
        }
    };

    const handleAddText = () => {
        try {
            const newText = {
                id: Date.now(),
                content: 'Double click to edit',
                x: 50,
                y: 50,
                fontFamily: fonts[0].value,
                fontSize: 24,
                color: '#000000'
            };
            setTextElements([...textElements, newText]);
            setSelectedTextId(newText.id);
        } catch (error) {
            reportError(error);
        }
    };

    const handleUpdateText = (updatedText) => {
        try {
            setTextElements(textElements.map(text => 
                text.id === updatedText.id ? updatedText : text
            ));
        } catch (error) {
            reportError(error);
        }
    };

    const handleRemoveText = (textId) => {
        try {
            setTextElements(textElements.filter(text => text.id !== textId));
            setSelectedTextId(null);
        } catch (error) {
            reportError(error);
        }
    };

    const handleUpdateTextPosition = (textId, x, y) => {
        try {
            setTextElements(textElements.map(text =>
                text.id === textId ? { ...text, x, y } : text
            ));
        } catch (error) {
            reportError(error);
        }
    };

    const handleSaveDesign = () => {
        try {
            if (!template) return;
            
            const newDesign = {
                id: Date.now(),
                template,
                textElements: [...textElements]
            };
            
            setDesigns([...designs, newDesign]);
            // Reset current design
            setTextElements([]);
            setSelectedTextId(null);
        } catch (error) {
            reportError(error);
        }
    };

    const handleRemoveDesign = (designId) => {
        try {
            setDesigns(designs.filter(design => design.id !== designId));
        } catch (error) {
            reportError(error);
        }
    };

    const handleDownload = async () => {
        try {
            if (!template) return;

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = 600;
            canvas.height = 600;

            const img = new Image();
            img.crossOrigin = "anonymous";
            
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = template.image;
            });

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            textElements.forEach(text => {
                ctx.font = `${text.fontSize}px ${text.fontFamily}`;
                ctx.fillStyle = text.color;
                ctx.fillText(text.content, text.x, text.y + parseInt(text.fontSize));
            });

            canvas.toBlob((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `design-${Date.now()}.png`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            });
        } catch (error) {
            reportError(error);
        }
    };

    const selectedText = textElements.find(text => text.id === selectedTextId);

    return (
        <div data-name="app">
            <Header onDownload={handleDownload} />
            <main className="app-container" data-name="main-content">
                <TemplateGallery 
                    onSelectTemplate={handleSelectTemplate}
                    templates={templates}
                />
                <div className="flex flex-col gap-4" data-name="canvas-container">
                    <Canvas 
                        template={template}
                        textElements={textElements}
                        onSelectText={setSelectedTextId}
                        selectedTextId={selectedTextId}
                        onUpdateTextPosition={handleUpdateTextPosition}
                        onUpdateText={handleUpdateText}
                    />
                    {template && (
                        <button 
                            className="btn-primary mx-auto"
                            onClick={handleSaveDesign}
                            data-name="save-design-button"
                        >
                            Save As New Design
                        </button>
                    )}
                    <div className="grid grid-cols-2 gap-4" data-name="saved-designs">
                        {designs.map(design => (
                            <div 
                                key={design.id}
                                className="relative group"
                                data-name={`saved-design-${design.id}`}
                            >
                                <img 
                                    src={design.template.image}
                                    alt="Saved design"
                                    className="w-full rounded-lg shadow-sm"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg">
                                    <div className="flex gap-2">
                                        <button 
                                            className="btn-primary"
                                            onClick={() => {
                                                try {
                                                    setTemplate(design.template);
                                                    setTextElements(design.textElements);
                                                } catch (error) {
                                                    reportError(error);
                                                }
                                            }}
                                            data-name={`edit-design-${design.id}`}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                            onClick={() => {
                                                try {
                                                    handleRemoveDesign(design.id);
                                                } catch (error) {
                                                    reportError(error);
                                                }
                                            }}
                                            data-name={`remove-design-${design.id}`}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <TextEditor 
                    onAddText={handleAddText}
                    selectedText={selectedText}
                    onUpdateText={handleUpdateText}
                    onRemoveText={handleRemoveText}
                />
            </main>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
