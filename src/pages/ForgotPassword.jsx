import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

function ForgotPassword() {
    const [email, setEmail] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        toast("Password reset demo only — Firebase will be connected later.");
    }

    return (
        <div>
            <p className="mb-2 text-sm font-semibold text-blue-500">ACCOUNT RECOVERY</p>
            <h1 className="text-3xl font-bold tracking-tight text-main">
                Forgot password?
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted">
                Enter your email address. Once Firebase is connected, you'll be able
                to request a password reset link.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div>
                    <label
                        htmlFor="email"
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
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            placeholder="you@example.com"
                            style={{ paddingLeft: "44px" }}
                            className="field-ui w-full"
                        />
                    </div>
                </div>

                <button type="submit" className="btn-primary-ui w-full">
                    Request reset link
                </button>
            </form>
            <Link
                to="/login"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:underline"
            >
                <ArrowLeft size={16} /> Back to login
            </Link>
        </div>
    );
}

export default ForgotPassword;