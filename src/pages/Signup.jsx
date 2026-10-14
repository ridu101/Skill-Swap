
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { getAuthErrorMessage } from "../utils/authErrors";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        photoURL: "",
        password: "",
        confirmPassword: "",
    });

    const { signup } = useAuth();
    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        if (submitting) return;

        setSubmitting(true);
        const toastId = toast.loading("Creating your account...");

        try {
            await signup(
                formData.name.trim(),
                formData.email.trim(),
                formData.password,
                formData.photoURL
            );

            toast.success("Account created successfully!", { id: toastId });
            navigate("/profile", { replace: true });
        } catch (error) {
            toast.error(getAuthErrorMessage(error), { id: toastId });
        } finally {
            setSubmitting(false);
        }
    }

    const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
    const inputClass =
        "block h-11 w-full rounded-lg border border-slate-300 bg-white py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
    const iconClass =
        "pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-500";
    const eyeButtonClass =
        "absolute right-3 top-1/2 z-10 -translate-y-1/2 text-slate-500 hover:text-slate-900";

    function renderPasswordField({
        id,
        label,
        name,
        value,
        visible,
        toggle,
        placeholder,
    }) {
        return (
            <div>
                <label htmlFor={id} className={labelClass}>
                    {label}
                </label>
                <div className="relative">
                    <Lock size={18} className={iconClass} />
                    <input
                        id={id}
                        name={name}
                        type={visible ? "text" : "password"}
                        value={value}
                        onChange={handleChange}
                        required
                        minLength={6}
                        autoComplete="new-password"
                        placeholder={placeholder}
                        className={`${inputClass} pl-11! pr-11!`}
                    />
                    <button
                        type="button"
                        onClick={toggle}
                        aria-label={visible ? "Hide password" : "Show password"}
                        className={eyeButtonClass}
                    >
                        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white text-slate-900">
            <div className="mb-5">
                <p className="mb-1.5 text-xs font-bold tracking-wider text-blue-600">
                    JOIN THE COMMUNITY
                </p>
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                    Create account
                </h1>
                <p className="mt-2 text-sm leading-5 text-slate-600">
                    Create your SkillSwap account.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                    <label htmlFor="name" className={labelClass}>Full name</label>
                    <div className="relative">
                        <User size={18} className={iconClass} />
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            autoComplete="name"
                            placeholder="Your full name"
                            className={`${inputClass} pl-11! pr-3!`}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="signup-email" className={labelClass}>
                        Email address
                    </label>
                    <div className="relative">
                        <Mail size={18} className={iconClass} />
                        <input
                            id="signup-email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                            placeholder="you@example.com"
                            className={`${inputClass} pl-11! pr-3!`}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="photoURL" className={labelClass}>
                        Profile photo URL{" "}
                        <span className="font-normal text-slate-500">(optional)</span>
                    </label>
                    <input
                        id="photoURL"
                        name="photoURL"
                        type="url"
                        value={formData.photoURL}
                        onChange={handleChange}
                        placeholder="https://example.com/photo.jpg"
                        className={`${inputClass} px-3!`}
                    />
                </div>

                {renderPasswordField({
                    id: "signup-password",
                    label: "Password",
                    name: "password",
                    value: formData.password,
                    visible: showPassword,
                    toggle: () => setShowPassword((previous) => !previous),
                    placeholder: "At least 6 characters",
                })}

                {renderPasswordField({
                    id: "confirmPassword",
                    label: "Confirm password",
                    name: "confirmPassword",
                    value: formData.confirmPassword,
                    visible: showConfirmPassword,
                    toggle: () => setShowConfirmPassword((previous) => !previous),
                    placeholder: "Re-enter your password",
                })}

                <button
                    type="submit"
                    disabled={submitting}
                    className="mt-4! flex min-h-11 w-full items-center justify-center rounded-lg border border-blue-600 bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? "Creating account..." : "Create account"}
                </button>
            </form>

            <p className="mt-4 text-center text-sm leading-5 text-slate-600">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                    Log in
                </Link>
            </p>
        </div>
    );
}

export default Signup;
