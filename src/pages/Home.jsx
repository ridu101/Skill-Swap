import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Handshake, Search } from "lucide-react";
import SkillCard from "../components/SkillCard";
import skills from "../data/skills.json";

const steps = [
    {
        number: "01",
        title: "Find a skill",
        description: "Explore skills shared by people in your community.",
    },
    {
        number: "02",
        title: "Connect",
        description: "Choose a provider and find a time that works for you.",
    },
    {
        number: "03",
        title: "Learn and share",
        description: "Learn something new or help someone learn from you.",
    },
];

function Home() {
    const popularSkills = skills.slice(0, 6);

    return (
        <div className="page-bg">
            <section className="container-shell grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
                <div>
                    <span className="tag-ui mb-5">
                        A community built around sharing
                    </span>

                    <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-main sm:text-5xl lg:text-6xl">
                        Learn a skill.
                        <br />
                        <span className="text-blue-500">Share your own.</span>
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
                        SkillSwap helps you connect with people who want to teach what they
                        know and learn what you can offer. Simple, local, and community-driven.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href="#skills" className="btn-primary-ui">
                            Explore skills <ArrowRight size={17} />
                        </a>
                        <Link to="/signup" className="btn-secondary-ui">
                            Join the community
                        </Link>
                    </div>

                    <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
                        <span className="inline-flex items-center gap-2">
                            <Users size={17} className="text-blue-500" />
                            Learn from people
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <Handshake size={17} className="text-blue-500" />
                            Share what you know
                        </span>
                    </div>
                </div>

                <div className="relative">
                    <div className="overflow-hidden rounded-2xl border border-ui bg-[var(--surface-soft)]">
                        <img
                            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85"
                            alt="People learning and sharing ideas together"
                            className="h-[300px] w-full object-cover sm:h-[420px]"
                        />
                    </div>

                    <div className="surface absolute bottom-4 left-4 right-4 rounded-xl p-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs">
                        <div className="flex items-center gap-3">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                                <BookOpen size={21} />
                            </span>
                            <div>
                                <p className="font-semibold text-main">Knowledge goes both ways</p>
                                <p className="mt-1 text-sm text-muted">
                                    Everyone has something to teach.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-ui bg-[var(--surface)]">
                <div className="container-shell grid gap-5 py-6 sm:grid-cols-3">
                    <div className="flex items-center gap-3">
                        <Users className="text-blue-500" size={22} />
                        <div>
                            <p className="font-semibold text-main">Community first</p>
                            <p className="text-sm text-muted">Learn from real people</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <BookOpen className="text-blue-500" size={22} />
                        <div>
                            <p className="font-semibold text-main">Practical learning</p>
                            <p className="text-sm text-muted">Build useful skills</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Handshake className="text-blue-500" size={22} />
                        <div>
                            <p className="font-semibold text-main">Share your talent</p>
                            <p className="text-sm text-muted">Help others grow</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="skills" className="section-space">
                <div className="container-shell">
                    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="mb-3 text-sm font-semibold text-blue-500">
                                DISCOVER SOMETHING NEW
                            </p>
                            <h2 className="section-title">Popular skills</h2>
                            <p className="section-description">
                                Find a skill you want to learn from someone who enjoys sharing it.
                            </p>
                        </div>

                        <Link
                            to="/#skills"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500 hover:text-blue-600"
                        >
                            Explore all <ArrowRight size={17} />
                        </Link>
                    </div>

                    {popularSkills.length > 0 ? (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {popularSkills.map((skill) => (
                                <SkillCard key={skill.skillId} skill={skill} />
                            ))}
                        </div>
                    ) : (
                        <div className="surface rounded-2xl p-10 text-center">
                            <Search className="mx-auto mb-3 text-muted" size={28} />
                            <p className="font-medium text-main">No skills added yet</p>
                            <p className="mt-2 text-sm text-muted">
                                Add some sample skills to your skills.json file.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section id="how-it-works" className="section-space bg-[var(--surface-soft)]">
                <div className="container-shell">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <p className="mb-3 text-sm font-semibold text-blue-500">
                            HOW IT WORKS
                        </p>
                        <h2 className="section-title">Three steps to get started</h2>
                        <p className="section-description mx-auto">
                            No complicated process. Just find someone, connect, and start learning.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {steps.map((step) => (
                            <article key={step.number} className="surface rounded-2xl p-6">
                                <p className="mb-5 text-sm font-bold text-blue-500">
                                    {step.number}
                                </p>
                                <h3 className="text-xl font-bold text-main">{step.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-muted">
                                    {step.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-space">
                <div className="container-shell">
                    <div className="rounded-2xl bg-blue-600 px-6 py-10 text-white sm:px-10 sm:py-12">
                        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight">
                                    Have a skill worth sharing?
                                </h2>
                                <p className="mt-3 max-w-xl leading-7 text-blue-50">
                                    Join the community and help someone take their next step.
                                </p>
                            </div>
                            <Link
                                to="/signup"
                                className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
                            >
                                Get started <ArrowRight size={17} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;