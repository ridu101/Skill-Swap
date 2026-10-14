import { Link } from "react-router-dom";
import { UserRound, Mail, BookOpen, CalendarDays, Pencil } from "lucide-react";
import toast from "react-hot-toast";

function Profile() {
    function handleEdit() {
        toast("Profile editing will be connected to your account later.");
    }

    return (
        <div className="page-bg">
            <section className="container-shell py-12 sm:py-16">
                <div className="mb-8">
                    <p className="mb-2 text-sm font-semibold text-blue-500">YOUR ACCOUNT</p>
                    <h1 className="section-title">My profile</h1>
                    <p className="section-description">
                        Manage your details and keep track of your learning journey.
                    </p>
                </div>

                <div className="grid items-start gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                    <div className="surface rounded-2xl p-6 sm:p-8">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                            <UserRound size={36} />
                        </div>

                        <h2 className="mt-5 text-2xl font-bold text-main">SkillSwap Member</h2>
                        <p className="mt-2 text-sm text-muted">Community learner</p>

                        <div className="my-6 border-t border-ui" />

                        <div className="flex items-center gap-3 text-sm text-muted">
                            <Mail size={17} />
                            <span>Email will appear after login is connected.</span>
                        </div>

                        <button onClick={handleEdit} className="btn-secondary-ui mt-6 w-full">
                            <Pencil size={16} /> Edit profile
                        </button>

                        <p className="mt-4 text-xs leading-5 text-muted">
                            This is a preview profile. Your real details will be loaded after
                            authentication is added.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="surface rounded-2xl p-5">
                                <BookOpen size={22} className="text-blue-500" />
                                <p className="mt-4 text-2xl font-bold text-main">0</p>
                                <p className="mt-1 text-sm text-muted">Skills learned</p>
                            </div>

                            <div className="surface rounded-2xl p-5">
                                <CalendarDays size={22} className="text-blue-500" />
                                <p className="mt-4 text-2xl font-bold text-main">0</p>
                                <p className="mt-1 text-sm text-muted">Sessions booked</p>
                            </div>
                        </div>

                        <div className="surface rounded-2xl p-6 sm:p-8">
                            <h2 className="text-xl font-bold text-main">Your learning journey</h2>
                            <p className="mt-3 text-sm leading-7 text-muted">
                                Once you book a session or share a skill, your activity will
                                appear here.
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