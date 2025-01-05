function Header({ onDownload }) {
    return (
        <header className="bg-white shadow-sm p-4" data-name="header">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-900" data-name="logo">Lovable</h1>
                <button 
                    className="btn-primary"
                    data-name="export-button"
                    onClick={() => {
                        try {
                            onDownload();
                        } catch (error) {
                            reportError(error);
                        }
                    }}
                >
                    Download Design
                </button>
            </div>
        </header>
    );
}
