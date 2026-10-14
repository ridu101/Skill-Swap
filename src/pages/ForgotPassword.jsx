
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { getAuthErrorMessage } from "../utils/authErrors";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { resetPassword } = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();
        if (submitting) return;

        setSubmitting(true);
        const toastId = toast.loading("Sending reset email...");

        try {
            await resetPassword(email.trim());
            toast.success("Password reset email sent. Check your inbox.", {
                id: toastId,
            });
        } catch (error) {
            toast.error(getAuthErrorMessage(error), { id: toastId });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="w-full bg-white text-slate-900">
            <p className="mb-2 text-sm font-semibold text-blue-600">
                ACCOUNT RECOVERY
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Forgot password?
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-600">
                Enter your email address to receive a password reset link.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div>
                    <label
                        htmlFor="reset-email"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Email address
                    </label>

                    <div className="relative w-full">
                        <Mail
                            size={18}
                            className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-500"
                        />

                        <input
                            id="reset-email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            placeholder="you@example.com"
                            className="field-ui w-full !pl-11"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary-ui w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? "Sending..." : "Request reset link"}
                </button>
            </form>

            <Link
                to="/login"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
            >
                <ArrowLeft size={16} />
                Back to login
            </Link>
        </div>
    );
}

export default ForgotPassword;
