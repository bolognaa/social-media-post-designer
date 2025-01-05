function TemplateGallery({ onSelectTemplate, templates }) {
    return (
        <div className="templates-panel" data-name="template-gallery">
            <h2 className="text-lg font-semibold mb-4" data-name="gallery-title">Templates</h2>
            <div className="mb-4">
                <input 
                    type="file" 
                    accept="image/*" 
                    id="imageUpload"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                const imageUrl = event.target.result;
                                onSelectTemplate({
                                    id: 'uploaded-image',
                                    title: 'Uploaded Image',
                                    image: imageUrl
                                });
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                    data-name="image-upload-input"
                />
                <button 
                    onClick={() => document.getElementById('imageUpload').click()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    data-name="image-upload-button"
                >
                    Upload Template
                </button>
            </div>
            <div className="grid gap-4" data-name="template-grid">
                {templates.map(template => (
                    <div 
                        key={template.id}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => {
                            try {
                                onSelectTemplate(template);
                            } catch (error) {
                                reportError(error);
                            }
                        }}
                        data-name={`template-${template.id}`}
                    >
                        <img 
                            src={template.image} 
                            alt={template.title}
                            className="w-full rounded-lg shadow-sm"
                            data-name={`template-image-${template.id}`}
                        />
                        <p className="text-sm mt-2 text-gray-600" data-name={`template-title-${template.id}`}>
                            {template.title}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
