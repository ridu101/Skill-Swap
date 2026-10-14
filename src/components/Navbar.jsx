
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Menu, X, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Explore Skills", to: "/#skills", hash: "#skills" },
    {
        label: "How It Works",
        to: "/#how-it-works",
        hash: "#how-it-works",
    },
];

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // Home page-er section-e smooth scroll
    useEffect(() => {
        if (location.pathname !== "/" || !location.hash) return;

        const timer = setTimeout(() => {
            const section = document.getElementById(
                location.hash.slice(1)
            );

            section?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 150);

        return () => clearTimeout(timer);
    }, [location.pathname, location.hash]);

    // Route change hole mobile menu close
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname, location.hash]);

    async function handleLogout() {
        try {
            await logout();
            setMenuOpen(false);
            toast.success("Logged out successfully!");
            navigate("/", { replace: true });
        } catch {
            toast.error("Logout failed. Please try again.");
        }
    }

    function getLinkClass(link) {
        const isActive = link.hash
            ? location.pathname === "/" && location.hash === link.hash
            : link.to === "/"
              ? location.pathname === "/" && !location.hash
              : location.pathname === link.to;

        return `block rounded - lg px - 3 py - 2 text - sm font - medium transition - colors duration - 200 ${
    isActive
        ? "bg-blue-50 text-blue-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
} `;
    }

    function renderNavLinks() {
        return navLinks.map((link) => (
            <Link
                key={link.label}
                to={link.to}
                className={getLinkClass(link)}
                onClick={() => setMenuOpen(false)}
            >
                {link.label}
            </Link>
        ));
    }

    return (
        <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
            <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="flex shrink-0 items-center gap-2"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <BookOpen size={22} />
                    </span>

                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        Skill<span className="text-blue-600">Swap</span>
                    </span>
                </Link>

                {/* Desktop navigation */}
                <div className="hidden items-center gap-1 md:flex">
                    {renderNavLinks()}

                    {user && (
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `block rounded - lg px - 3 py - 2 text - sm font - medium transition - colors ${
    isActive
        ? "bg-blue-50 text-blue-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
} `
                            }
                        >
                            My Profile
                        </NavLink>
                    )}
                </div>

                {/* Desktop actions */}
                <div className="hidden items-center gap-3 md:flex">
                    {user ? (
                        <>
                            <span className="max-w-[150px] truncate text-sm text-slate-600">
                                Hi, {user.displayName || user.email?.split("@")[0]}
                            </span>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            >
                                <LogOut size={16} />
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                            >
                                Log in
                            </Link>

                            <Link
                                to="/signup"
                                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Join for free
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    type="button"
                    onClick={() => setMenuOpen((previous) => !previous)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 md:hidden"
                >
                    {menuOpen ? <X size={23} /> : <Menu size={23} />}
                </button>
            </nav>

            {/* Mobile navigation */}
            {menuOpen && (
                <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-3 shadow-md md:hidden">
                    <div className="space-y-1">
                        {renderNavLinks()}

                        {user && (
                            <NavLink
                                to="/profile"
                                onClick={() => setMenuOpen(false)}
                                className={getLinkClass({
                                    to: "/profile",
                                })}
                            >
                                My Profile
                            </NavLink>
                        )}
                    </div>

                    <div className="mt-4 border-t border-slate-200 pt-4">
                        {user ? (
                            <div className="space-y-3">
                                <p className="truncate text-sm text-slate-600">
                                    Signed in as{" "}
                                    <span className="font-semibold text-slate-900">
                                        {user.displayName || user.email}
                                    </span>
                                </p>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                >
                                    <LogOut size={16} />
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded-lg border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Log in
                                </Link>

                                <Link
                                    to="/signup"
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                    Join for free
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;
