import Link from "next/link";
import Image from "next/image";

interface CardProps {
    title: string;
    description: string;
    imageUrl?: string;
    date?: string;
    category?: string;
    href?: string;
}

const Card = ({ title, description, imageUrl, date, category, href }: CardProps) => {
    const content = (
        <div className="card-academic h-full overflow-hidden group cursor-pointer">
            {imageUrl && (
                <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}
            <div className="p-6">
                {category && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-700 bg-primary-50 rounded-full mb-3">
                        {category}
                    </span>
                )}
                <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                    {description}
                </p>
                {date && (
                    <div className="flex items-center text-xs text-neutral-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {date}
                    </div>
                )}
            </div>
        </div>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return content;
};

export default Card;
