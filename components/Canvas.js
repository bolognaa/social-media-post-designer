function Canvas({ template, textElements, onSelectText, selectedTextId, onUpdateTextPosition, onUpdateText }) {
    const [dragState, setDragState] = React.useState(null);
    const [editingTextId, setEditingTextId] = React.useState(null);

    const handleMouseDown = (e, textId) => {
        try {
            if (editingTextId) return;
            const element = e.target;
            const rect = element.getBoundingClientRect();
            setDragState({
                textId,
                offsetX: e.clientX - rect.left,
                offsetY: e.clientY - rect.top
            });
            onSelectText(textId);
        } catch (error) {
            reportError(error);
        }
    };

    const handleMouseMove = (e) => {
        try {
            if (!dragState || editingTextId) return;

            const canvasRect = e.currentTarget.getBoundingClientRect();
            const newX = e.clientX - canvasRect.left - dragState.offsetX;
            const newY = e.clientY - canvasRect.top - dragState.offsetY;

            onUpdateTextPosition(dragState.textId, newX, newY);
        } catch (error) {
            reportError(error);
        }
    };

    const handleMouseUp = () => {
        setDragState(null);
    };

    const handleDoubleClick = (textId) => {
        try {
            setEditingTextId(textId);
        } catch (error) {
            reportError(error);
        }
    };

    const handleTextChange = (e, textId) => {
        try {
            const text = textElements.find(t => t.id === textId);
            if (text) {
                onUpdateText({ ...text, content: e.target.value });
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleBlur = () => {
        setEditingTextId(null);
    };

    return (
        <div className="canvas-area" data-name="canvas">
            <div 
                className="relative w-[600px] h-[600px]"
                data-name="canvas-container"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {template && (
                    <img 
                        src={template.image}
                        alt={template.title}
                        className="w-full h-full object-cover"
                        data-name="template-image"
                    />
                )}
                {textElements.map(text => (
                    <div
                        key={text.id}
                        className={`text-layer ${selectedTextId === text.id ? 'selected' : ''}`}
                        style={{
                            left: text.x,
                            top: text.y,
                            fontFamily: text.fontFamily,
                            fontSize: `${text.fontSize}px`,
                            color: text.color
                        }}
                        onMouseDown={(e) => handleMouseDown(e, text.id)}
                        onDoubleClick={() => handleDoubleClick(text.id)}
                        data-name={`text-element-${text.id}`}
                    >
                        {editingTextId === text.id ? (
                            <input
                                type="text"
                                value={text.content}
                                onChange={(e) => handleTextChange(e, text.id)}
                                onBlur={handleBlur}
                                autoFocus
                                className="bg-transparent border-none outline-none w-full"
                                style={{
                                    fontFamily: text.fontFamily,
                                    fontSize: `${text.fontSize}px`,
                                    color: text.color
                                }}
                                data-name={`text-input-${text.id}`}
                            />
                        ) : (
                            text.content
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
