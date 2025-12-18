interface AddProps {
    className: string;
}


export default function CloseIcon({ className }: AddProps) {
    return (
        <svg className={`${className}`} viewBox="0 -960 960 960">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
    );
}


