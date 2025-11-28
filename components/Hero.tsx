import { ReactNode } from "react";

interface HeroProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    children?: ReactNode;
    height?: "normal" | "tall" | "full";
}

const Hero = ({ title, subtitle, backgroundImage, children, height = "normal" }: HeroProps) => {
    const heightClasses = {
        normal: "h-[400px]",
        tall: "h-[500px]",
        full: "h-screen",
    };

    // Default placeholder if no background provided
    const bgImage = backgroundImage || "/assets/kegiatan/placeholder-1.svg";

    return (
        <div className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden bg-neutral-900`}>
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
                style={{
                    backgroundImage: `url('${bgImage}')`
                }}
            />

            {/* Overlay Gradient - Red tinted for brand consistency but showing image */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-800/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/30" />

            {/* Content */}
            <div className="relative z-10 container-upi text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance drop-shadow-lg">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto text-balance whitespace-pre-line drop-shadow-md text-neutral-100">
                        {subtitle}
                    </p>
                )}
                {children && (
                    <div className="mt-8 animate-fadeIn">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hero;
