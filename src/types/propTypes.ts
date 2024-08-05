export interface NavLinkProps {
    route: string;
    children: React.ReactNode;
    color?: string;
    large?: boolean;
    onClick?: React.MouseEventHandler<Element>;
}

export interface InputProps {
    label?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    type?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

export interface SelectOption {
    value: string; // El valor que se envía cuando se selecciona esta opción
    label: string; // La etiqueta que se muestra en el select
}

// Definir el tipo para las propiedades del SelectField
export interface SelectProps {
    label: string; // La etiqueta del campo
    value: string; // El valor seleccionado actualmente
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Función llamada cuando el valor cambia
    options: SelectOption[]; // Lista de opciones para el select
    error?: string; // Mensaje de error opcional
}

export interface ButtonProps {
    title: string;
    type: 'submit' | 'button' | 'reset';
}