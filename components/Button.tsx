import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "link";
    className?: string;
}

const Button = ({ children, href, onClick, variant = "primary", className = "" }: ButtonProps) => {
    const variantClasses = {
        primary: "btn-primary",
        secondary: "btn-secondary",
        link: "btn-link",
    };

    const classes = `${variantClasses[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={classes}>
            {children}
        </button>
    );
};

export default Button;
