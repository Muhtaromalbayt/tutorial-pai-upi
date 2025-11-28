import Hero from "@/components/Hero";

const ProgramPengurusTemplate = ({ title, description, objectives }: {
    title: string;
    description: string;
    objectives: string[];
}) => {
    return (
        <div>
            <Hero title={title} subtitle={`Program Kabinet AL-FATH`} height="normal" />
            <section className="section-academic">
                <div className="container-upi max-w-4xl">
                    <div className="card-academic p-12">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-6">{title}</h2>
                        <p className="text-lg text-neutral-600 leading-relaxed mb-8">{description}</p>
                        <h3 className="text-xl font-semibold text-neutral-900 mb-4">Tujuan Program</h3>
                        <ul className="space-y-3">
                            {objectives.map((obj, i) => (
                                <li key={i} className="flex items-start text-neutral-700">
                                    <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span>{obj}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default function KajianRutinPage() {
    return (
        <ProgramPengurusTemplate
            title="Kajian Rutin"
            description="Program kajian rutin yang diselenggarakan secara berkala untuk meningkatkan pemahaman keislaman mahasiswa melalui pembelajaran yang sistematis dan terstruktur dengan topik-topik yang relevan dan kontekstual."
            objectives={[
                "Meningkatkan pemahaman mahasiswa tentang ajaran Islam",
                "Memberikan ruang pembelajaran yang terstruktur dan berkelanjutan",
                "Memfasilitasi diskusi dan tanya jawab seputar isu keislaman",
                "Membangun kultur belajar yang konsisten di kalangan mahasiswa"
            ]}
        />
    );
}
