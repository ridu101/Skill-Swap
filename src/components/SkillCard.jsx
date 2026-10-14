
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Star, Clock, LockKeyhole } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function SkillCard({ skill }) {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    function handleSkillClick(event) {
        event.preventDefault();

        if (loading) return;

        // Correct skill details URL
        const target = `/skill/${skill.skillId}`;

        if (!user) {
            toast.custom(
                () => (
                    <div className="flex w-full max-w-sm items-center gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3.5 shadow-xl shadow-slate-900/10">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <LockKeyhole size={20} />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-slate-900">
                                Login to view
                            </p>
                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                Please sign in to explore this skill.
                            </p>
                        </div>
                    </div>
                ),
                {
                    id: "login-to-view",
                    duration: 2200,
                    position: "top-center",
                }
            );

            navigate("/login", {
                state: {
                    from: {
                        pathname: target,
                    },
                },
            });

            return;
        }

        navigate(target);
    }

    return (
        <article className="card-ui flex flex-col">
            <Link
                to={`/ skill / ${ skill.skillId } `}
                onClick={handleSkillClick}
                className="block overflow-hidden bg-[var(--surface-soft)]"
            >
                <img
                    src={skill.image}
                    alt={skill.skillName}
                    loading="lazy"
                    className="h-48 w-full object-cover transition duration-300 hover:scale-[1.02]"
                />
            </Link>

            <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="tag-ui">{skill.category}</span>

                    <span className="inline-flex items-center gap-1 text-sm text-muted">
                        <Star
                            size={15}
                            className="fill-amber-400 text-amber-400"
                        />
                        {skill.rating}
                    </span>
                </div>

                <Link
                    to={`/ skill / ${ skill.skillId } `}
                    onClick={handleSkillClick}
                >
                    <h3 className="text-lg font-bold text-main transition hover:text-blue-500">
                        {skill.skillName}
                    </h3>
                </Link>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
                    {skill.description}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-ui pt-4">
                    <div>
                        <p className="text-xs text-muted">Shared by</p>
                        <p className="mt-1 text-sm font-medium text-main">
                            {skill.providerName}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-lg font-bold text-main">
                            {Number(skill.price) === 0
                                ? "Free"
                                : `৳${ skill.price } `}
                        </p>
                        <p className="text-xs text-muted">per session</p>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                        <Clock size={14} />
                        {skill.slotsAvailable} slots left
                    </span>

                    <Link
                        to={`/ skill / ${ skill.skillId } `}
                        onClick={handleSkillClick}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-blue-500 hover:text-blue-600"
                    >
                        View details
                        <ArrowUpRight size={16} />
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default SkillCard;
