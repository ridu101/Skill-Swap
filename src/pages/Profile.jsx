import { Link } from "react-router-dom";
import {
    Mail,
    BookOpen,
    CalendarDays,
    Pencil,
    UserRound,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Profile() {
    const { user } = useAuth();

    const displayName = user?.displayName || "SkillSwap Member";
    const email = user?.email || "Email not available";
    const photoURL = user?.photoURL;

    function handleEdit() {
        toast("Profile editing will be connected later.");
    }

    return (
        <div className="page-bg">
            <section className="container-shell py-12 sm:py-16">
                <div className="mb-8">
                    <p className="mb-2 text-sm font-semibold text-blue-500">
                        YOUR ACCOUNT
                    </p>

                    <h1 className="section-title">My Profile</h1>

                    <p className="section-description">
                        Manage your details and keep track of your learning journey.
                    </p>
                </div>

                <div className="grid items-start gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                    {/* Profile information */}
                    <div className="surface rounded-2xl p-6 sm:p-8">
                        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-ui bg-blue-100 text-3xl font-bold text-blue-700">
                            {photoURL ? (
                                <img
                                    src={photoURL}
                                    alt={displayName}
                                    className="h-full w-full object-cover"
                                    referrerPolicy="no-referrer"
                                    onError={(event) => {
                                        event.currentTarget.style.display = "none";
                                    }}
                                />
                            ) : (
                                displayName.charAt(0).toUpperCase() || (
                                    <UserRound size={36} />
                                )
                            )}
                        </div>

                        <h2 className="mt-5 break-words text-2xl font-bold text-main">
                            {displayName}
                        </h2>

                        <p className="mt-2 text-sm text-muted">
                            Community learner
                        </p>

                        <div className="my-6 border-t border-ui" />

                        <div className="flex items-start gap-3 text-sm text-muted">
                            <Mail size={18} className="mt-0.5 shrink-0" />
                            <span className="break-all">{email}</span>
                        </div>

                        <button
                            type="button"
                            onClick={handleEdit}
                            className="btn-secondary-ui mt-6 flex w-full items-center justify-center gap-2"
                        >
                            <Pencil size={16} />
                            Edit profile
                        </button>

                        <p className="mt-4 text-xs leading-5 text-muted">
                            Your name, email and profile photo are loaded from your
                            signed-in Firebase account.
                        </p>
                    </div>

                    {/* Learning statistics */}
                    <div className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="surface rounded-2xl p-5">
                                <BookOpen size={22} className="text-blue-500" />
                                <p className="mt-4 text-2xl font-bold text-main">
                                    0
                                </p>
                                <p className="mt-1 text-sm text-muted">
                                    Skills learned
                                </p>
                            </div>

                            <div className="surface rounded-2xl p-5">
                                <CalendarDays
                                    size={22}
                                    className="text-blue-500"
                                />
                                <p className="mt-4 text-2xl font-bold text-main">
                                    0
                                </p>
                                <p className="mt-1 text-sm text-muted">
                                    Sessions booked
                                </p>
                            </div>
                        </div>

                        <div className="surface rounded-2xl p-6 sm:p-8">
                            <h2 className="text-xl font-bold text-main">
                                Your learning journey
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-muted">
                                Once you book a session or share a skill, your
                                activity will appear here.
                            </p>

                            <Link to="/" className="btn-primary-ui mt-5">
                                Explore skills
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Profile;