import { Link, Outlet } from "react-router-dom";
import { BookOpen, Users, Handshake } from "lucide-react";

function AuthLayout() {
    return (
        <div className="page-bg min-h-screen">
            <div className="container-shell flex min-h-screen flex-col py-5">
                <Link to="/" className="inline-flex w-fit items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <BookOpen size={21} />
                    </span>
                    <span className="text-xl font-bold text-main">
                        Skill<span className="text-blue-500">Swap</span>
                    </span>
                </Link>

                <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-2">
                    <div className="hidden lg:block">
                        <span className="tag-ui mb-5">Learn together, grow together</span>

                        <h1 className="max-w-lg text-5xl font-bold leading-tight tracking-tight text-main">
                            Your skills have value.{" "}
                            <span className="text-blue-500">Share them.</span>
                        </h1>

                        <p className="mt-5 max-w-lg leading-8 text-muted">
                            Meet people in your community, learn something new, and share
                            the skills you already have.
                        </p>

                        <div className="mt-8 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <span className="surface-soft flex h-11 w-11 items-center justify-center rounded-xl text-blue-500">
                                    <Users size={20} />
                                </span>
                                <div>
                                    <p className="font-semibold text-main">Meet your community</p>
                                    <p className="text-sm text-muted">Connect with local learners and teachers.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="surface-soft flex h-11 w-11 items-center justify-center rounded-xl text-blue-500">
                                    <Handshake size={20} />
                                </span>
                                <div>
                                    <p className="font-semibold text-main">Exchange real skills</p>
                                    <p className="text-sm text-muted">Make learning more accessible to everyone.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-md justify-self-center">
                        <div className="surface rounded-2xl p-6 sm:p-8">
                            <Outlet />
                        </div>

                        <p className="mt-5 text-center text-sm text-muted">
                            <Link to="/" className="hover:text-blue-500">
                                ← Back to SkillSwap
                            </Link>
                        </p>
                    </div>
                </div>

                <p className="py-4 text-center text-xs text-muted">
                    © {new Date().getFullYear()} SkillSwap
                </p>
            </div>
        </div>
    );
}

export default AuthLayout;