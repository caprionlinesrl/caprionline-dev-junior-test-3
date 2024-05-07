const getFormProps = async (event) => {
    try {
        event.preventDefault();
        event.stopPropagation();

        // Crea un'istanza di FormData dal form event.target
        const formData = new FormData(event.target);

        // Crea un oggetto semplice dai dati del FormData
        const formProps = Object.fromEntries(formData.entries());
        return formProps;
        
    } catch (error) {
        return false;
    }
};

export {getFormProps};