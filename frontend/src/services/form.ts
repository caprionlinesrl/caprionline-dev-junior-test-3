import { FormPropsInterface } from "./interface/formPropsInterface";

const getFormProps = (event: React.FormEvent<HTMLFormElement>):FormPropsInterface|null => {
    try {
        event.preventDefault();
        event.stopPropagation();        
        const formData = new FormData(event.currentTarget);

        // @ts-ignore
        const formProps = Object.fromEntries(formData.entries());
        return formProps;
        
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { getFormProps };