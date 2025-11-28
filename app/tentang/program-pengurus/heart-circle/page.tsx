import Hero from "@/components/Hero";

export default function HeartCirclePage() {
    return (
        <div>
            <Hero title="Heart Circle" subtitle="Program Kabinet AL-FATH" height="normal" />
            <section className="section-academic">
                <div className="container-upi max-w-4xl">
                    <div className="card-academic p-12">
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            Program sharing dan konseling teman sebaya untuk membantu mahasiswa mengatasi permasalahan pribadi, emosional, dan spiritual dengan pendekatan Islami yang hangat dan supportif.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
