import { ReactNode } from "react";

interface HeroProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    children?: ReactNode;
    height?: "normal" | "tall" | "full";
    variant?: "default" | "gradient";
}

const Hero = ({ title, subtitle, backgroundImage, children, height = "normal", variant = "default" }: HeroProps) => {
    const heightClasses = {
        normal: "h-[400px]",
        tall: "h-[500px]",
        full: "h-screen",
    };

    const bgImage = backgroundImage || "/assets/kegiatan/placeholder-1.svg";
    const useGradient = variant === "gradient" || !backgroundImage;

    return (
        <div className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}>
            {/* Background - Either Image or Gradient */}
            {useGradient ? (
                <>
                    {/* UPI Red Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-upi" />
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl -mr-48 -mt-48" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl -ml-48 -mb-48" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-10 bg-pattern-academic" />
                </>
            ) : (
                <>
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
                        style={{
                            backgroundImage: `url('${bgImage}')`
                        }}
                    />
                    {/* Overlay Gradient - Red tinted for brand consistency */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-800/60 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-black/30" />
                </>
            )}

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
