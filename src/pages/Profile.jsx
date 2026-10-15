
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Mail,
    BookOpen,
    CalendarDays,
    Pencil,
    UserRound,
    X,
    Save,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { getAuthErrorMessage } from "../utils/authErrors";

function Profile() {
    const { user, updateUserProfile } = useAuth();

    const displayName = user?.displayName || "SkillSwap Member";
    const email = user?.email || "Email not available";
    const photoURL = user?.photoURL;

    const [isEditing, setIsEditing] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        photoURL: "",
    });

    function handleEdit() {
        setFormData({
            name: user?.displayName || "",
            photoURL: user?.photoURL || "",
        });

        setIsEditing(true);
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (submitting) return;

        if (!formData.name.trim()) {
            toast.error("Please enter your name.");
            return;
        }

        setSubmitting(true);

        const toastId = toast.loading("Updating your profile...");

        try {
            await updateUserProfile(
                formData.name,
                formData.photoURL
            );

            toast.success("Profile updated successfully!", {
                id: toastId,
            });

            setIsEditing(false);
        } catch (error) {
            toast.error(getAuthErrorMessage(error), {
                id: toastId,
            });
        } finally {
            setSubmitting(false);
        }
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

                        {!isEditing ? (
                            <button
                                type="button"
                                onClick={handleEdit}
                                className="btn-secondary-ui mt-6 flex w-full items-center justify-center gap-2"
                            >
                                <Pencil size={16} />
                                Edit profile
                            </button>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="mt-6 space-y-4"
                            >
                                <div>
                                    <label
                                        htmlFor="profile-name"
                                        className="mb-2 block text-sm font-medium text-main"
                                    >
                                        Full name
                                    </label>

                                    <input
                                        id="profile-name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        maxLength={100}
                                        autoComplete="name"
                                        placeholder="Enter your name"
                                        className="field-ui w-full"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="profile-photo"
                                        className="mb-2 block text-sm font-medium text-main"
                                    >
                                        Profile photo URL
                                    </label>

                                    <input
                                        id="profile-photo"
                                        name="photoURL"
                                        type="url"
                                        value={formData.photoURL}
                                        onChange={handleChange}
                                        placeholder="https://example.com/photo.jpg"
                                        className="field-ui w-full"
                                    />

                                    <p className="mt-1 text-xs text-muted">
                                        Leave empty to remove your profile photo.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn-primary-ui flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Save size={16} />
                                    {submitting ? "Saving..." : "Save changes"}
                                </button>

                                <button
                                    type="button"
                                    disabled={submitting}
                                    onClick={() => setIsEditing(false)}
                                    className="btn-secondary-ui flex w-full items-center justify-center gap-2"
                                >
                                    <X size={16} />
                                    Cancel
                                </button>
                            </form>
                        )}

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
