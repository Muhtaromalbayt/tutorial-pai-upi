import Hero from "@/components/Hero";

// Simple pages for remaining Program Pengurus
const pages = {
    "project-mini": {
        title: "Project Mini Tutorial",
        desc: "Program project-based learning untuk mengaplikasikan nilai-nilai Islam dalam bentuk karya nyata yang bermanfaat bagi masyarakat."
    },
    "brand-ambassador": {
        title: "Brand Ambassador",
        desc: "Program pembentukan duta Tutorial PAI yang bertugas mempromosikan dan memperluas jangkauan dakwah kampus."
    },
    "heart-circle": {
        title: "Heart Circle",
        desc: "Program sharing dan konseling teman sebaya untuk membantu mahasiswa mengatasi permasalahan pribadi dengan pendekatan Islami."
    }
};

export default function ProjectMiniPage() {
    return (
        <div>
            <Hero title={pages["project-mini"].title} subtitle="Program Kabinet AL-FATH" height="normal" />
            <section className="section-academic">
                <div className="container-upi max-w-4xl">
                    <div className="card-academic p-12">
                        <p className="text-lg text-neutral-600 leading-relaxed">{pages["project-mini"].desc}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
