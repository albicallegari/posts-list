export interface ButtonProps {
    color?: VariantButton,
    label?: string,
    children?: React.ReactNode,
    action?: () => void;
}

export enum VariantButton {
    ENABLE = 'enable',
    ERROR = 'error',
    DISABLE = 'disable',
    OUTLINE = 'outline',
    WITH_CHILDREN = 'withChildren'
}