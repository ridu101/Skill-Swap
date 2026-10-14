import { Link } from "react-router-dom";
import { ArrowUpRight, Star, Clock } from "lucide-react";

function SkillCard({ skill }) {
    return (
        <article className="card-ui flex flex-col">
            <Link
                to={`/skill/${skill.skillId}`}
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
                        <Star size={15} className="fill-amber-400 text-amber-400" />
                        {skill.rating}
                    </span>
                </div>

                <Link to={`/skill/${skill.skillId}`}>
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
                            {Number(skill.price) === 0 ? "Free" : `৳${skill.price}`}
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
                        to={`/skill/${skill.skillId}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-blue-500 hover:text-blue-600"
                    >
                        View details <ArrowUpRight size={16} />
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default SkillCard;