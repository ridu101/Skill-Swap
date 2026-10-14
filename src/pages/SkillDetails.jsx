import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Star, UserRound, CalendarDays } from "lucide-react";
import toast from "react-hot-toast";
import skills from "../data/skills.json";

function SkillDetails() {
    const { skillId } = useParams();
    const skill = skills.find((item) => String(item.skillId) === String(skillId));
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");

    if (!skill) {
        return (
            <div className="container-shell py-24 text-center">
                <h1 className="text-3xl font-bold text-main">Skill not found</h1>
                <p className="mt-3 text-muted">This skill may have been removed.</p>
                <Link to="/" className="btn-primary-ui mt-6">Back to home</Link>
            </div>
        );
    }

    function handleBooking(event) {
        event.preventDefault();
        toast("Booking is a demo — account and booking features will be connected later.");
    }

    return (
        <div className="page-bg">
            <section className="container-shell py-10 sm:py-14">
                <Link to="/" className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-blue-500">
                    <ArrowLeft size={17} /> Back to skills
                </Link>

                <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_0.85fr]">
                    <div>
                        <div className="overflow-hidden rounded-2xl border border-ui">
                            <img
                                src={skill.image}
                                alt={skill.skillName}
                                className="max-h-[430px] w-full object-cover"
                            />
                        </div>

                        <div className="mt-6">
                            <span className="tag-ui">{skill.category}</span>
                            <h1 className="mt-4 text-3xl font-bold tracking-tight text-main sm:text-4xl">
                                {skill.skillName}
                            </h1>

                            <div className="mt-4 flex flex-wrap gap-5 text-sm text-muted">
                                <span className="inline-flex items-center gap-1.5">
                                    <Star size={16} className="fill-amber-400 text-amber-400" />
                                    {skill.rating} rating
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <UserRound size={16} />
                                    {skill.providerName}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <Clock size={16} />
                                    {skill.slotsAvailable} slots available
                                </span>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-main">About this skill</h2>
                                <p className="mt-3 whitespace-pre-line leading-8 text-muted">
                                    {skill.description}
                                </p>
                            </div>

                            <div className="surface-soft mt-7 rounded-xl p-5">
                                <h3 className="font-semibold text-main">Skill provider</h3>
                                <p className="mt-2 text-muted">{skill.providerName}</p>
                                {skill.providerEmail && (
                                    <p className="mt-1 text-sm text-muted">{skill.providerEmail}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <aside className="surface rounded-2xl p-6 sm:p-7">
                        <p className="text-sm text-muted">Session price</p>
                        <p className="mt-1 text-3xl font-bold text-main">
                            {Number(skill.price) === 0 ? "Free" : `৳${skill.price}`}
                        </p>
                        <p className="mt-2 text-sm text-muted">Per learning session</p>

                        <div className="my-6 border-t border-ui" />

                        <h2 className="text-xl font-bold text-main">Request a session</h2>
                        <p className="mt-2 text-sm leading-6 text-muted">
                            Select a preferred date and tell the provider what you'd like to learn.
                        </p>

                        <form onSubmit={handleBooking} className="mt-5 space-y-4">
                            <div>
                                <label htmlFor="date" className="mb-2 block text-sm font-medium text-main">
                                    Preferred date
                                </label>
                                <div className="relative">
                                    <CalendarDays size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                                    <input
                                        id="date"
                                        type="date"
                                        min={new Date().toISOString().split("T")[0]}
                                        value={date}
                                        onChange={(event) => setDate(event.target.value)}
                                        required
                                        className="field-ui pl-10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="mb-2 block text-sm font-medium text-main">
                                    What would you like to learn?
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    placeholder="Tell the provider about your learning goals..."
                                    className="field-ui resize-y"
                                />
                            </div>

                            <button type="submit" className="btn-primary-ui w-full">
                                Request session
                            </button>
                        </form>

                        <p className="mt-4 text-center text-xs leading-5 text-muted">
                            Demo only. Booking requests will work after backend integration.
                        </p>
                    </aside>
                </div>
            </section>
        </div>
    );
}

export default SkillDetails;