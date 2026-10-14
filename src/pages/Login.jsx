
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import { getAuthErrorMessage } from "../utils/authErrors";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { login, googleLogin, facebookLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from;

    const redirectTo = from?.pathname
        ? `${from.pathname}${from.search || ""}${from.hash || ""}`
        : "/profile";

    async function handleSubmit(event) {
        event.preventDefault();
        if (submitting) return;

        setSubmitting(true);
        const toastId = toast.loading("Logging in...");

        try {
            await login(email.trim(), password);

            toast.success("Login successful! Welcome back.", {
                id: toastId,
            });

            navigate(redirectTo, { replace: true });
        } catch (error) {
            toast.error(getAuthErrorMessage(error), {
                id: toastId,
            });
        } finally {
            setSubmitting(false);
        }
    }

    async function handleGoogleLogin() {
        if (submitting) return;

        setSubmitting(true);
        const toastId = toast.loading("Connecting to Google...");

        try {
            await googleLogin();

            toast.success("Google login successful!", {
                id: toastId,
            });

            navigate(redirectTo, { replace: true });
        } catch (error) {
            toast.error(getAuthErrorMessage(error), {
                id: toastId,
            });
        } finally {
            setSubmitting(false);
        }
    }

    async function handleFacebookLogin() {
        if (submitting) return;

        setSubmitting(true);
        const toastId = toast.loading("Connecting to Facebook...");

        try {
            await facebookLogin();

            toast.success("Facebook login successful!", {
                id: toastId,
            });

            navigate(redirectTo, { replace: true });
        } catch (error) {
            console.error("Facebook login error:", error);

            toast.error(getAuthErrorMessage(error), {
                id: toastId,
            });
        } finally {
            setSubmitting(false);
        }
    }

    const labelClass =
        "mb-1.5 block text-sm font-medium text-slate-700";

    const inputClass =
        "block h-11 w-full rounded-lg border border-slate-300 bg-white py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

    const iconClass =
        "pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-500";

    const socialButtonStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        width: "100%",
        minHeight: "44px",
        padding: "10px 14px",
        border: "1px solid #d1d5db",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        color: "#1f2937",
        fontSize: "14px",
        fontWeight: 600,
        cursor: submitting ? "not-allowed" : "pointer",
        opacity: submitting ? 0.7 : 1,
    };

    return (
        <div className="w-full bg-white text-slate-900">
            <div className="mb-6">
                <p className="mb-1.5 text-xs font-bold tracking-wider text-blue-600">
                    WELCOME BACK
                </p>

                <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                    Log in
                </h1>

                <p className="mt-2 text-sm leading-5 text-slate-600">
                    Welcome back! Enter your details to continue.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="login-email" className={labelClass}>
                        Email address
                    </label>

                    <div className="relative">
                        <Mail size={18} className={iconClass} />

                        <input
                            id="login-email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="you@example.com"
                            className={`${inputClass} pl-11! pr-3!`}
                        />
                    </div>
                </div>

                <div>
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                        <label htmlFor="login-password" className={labelClass}>
                            Password
                        </label>

                        <Link
                            to="/forgot-password"
                            className="shrink-0 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline sm:text-sm"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <div className="relative">
                        <Lock size={18} className={iconClass} />

                        <input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                            className={`${inputClass} pl-11! pr-11!`}
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((previous) => !previous)
                            }
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="mt-5! flex min-h-11 w-full items-center justify-center rounded-lg border border-blue-600 bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? "Please wait..." : "Log in"}
                </button>
            </form>

            <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-500">
                    OR CONTINUE WITH
                </span>
                <div className="h-px flex-1 bg-slate-200" />
            </div>

            <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={submitting}
                style={socialButtonStyle}
            >
                <FcGoogle size={20} />
                <span>Continue with Google</span>
            </button>

            <button
                type="button"
                onClick={handleFacebookLogin}
                disabled={submitting}
                style={{
                    ...socialButtonStyle,
                    marginTop: "12px",
                }}
            >
                <FaFacebookF size={19} color="#1877F2" />
                <span>Continue with Facebook</span>
            </button>

            <p className="mt-5 text-center text-sm leading-5 text-slate-600">
                Don't have an account?{" "}
                <Link
                    to="/signup"
                    className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                    Sign up
                </Link>
            </p>
        </div>
    );
}

export default Login;
