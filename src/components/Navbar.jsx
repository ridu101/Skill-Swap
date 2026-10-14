import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Menu, X, LogOut, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Explore Skills", to: "/#skills", hash: "#skills" },
    { label: "How It Works", to: "/#how-it-works", hash: "#how-it-works" },
];

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

    // Home page section-e smooth scroll
    useEffect(() => {
        if (location.pathname !== "/" || !location.hash) return;

        const timer = setTimeout(() => {
            document.getElementById(location.hash.slice(1))?.scrollIntoView({
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
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Logout failed. Please try again.");
        }
    }

    function getLinkClass(link) {
        const isActive = link.hash
            ? location.pathname === "/" && location.hash === link.hash
            : link.to === "/"
                ? location.pathname === "/" && !location.hash
                : location.pathname === link.to;

        return `block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`;
    }

    function ProfileAvatar({ size = "h-10 w-10" }) {
        return (
            <span
                className={`relative flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-blue-100 bg-blue-100 font-bold text-blue-700 ring-2 ring-transparent transition hover:ring-blue-200`}
            >
                <span aria-hidden="true">
                    {displayName.charAt(0).toUpperCase() || "U"}
                </span>

                {user?.photoURL && (
                    <img
                        src={user.photoURL}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 h-full w-full rounded-full object-cover"
                        onError={(event) => {
                            event.currentTarget.style.display = "none";
                        }}
                    />
                )}
            </span>
        );
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
        <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
            <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="flex shrink-0 items-center gap-2"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <BookOpen size={22} />
                    </span>

                    <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                        Skill<span className="text-blue-600">Swap</span>
                    </span>
                </Link>

                {/* Desktop navigation */}
                <div className="hidden items-center gap-2 lg:gap-3 md:flex">
                    {renderNavLinks()}

                    {user && (
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`
                            }
                        >
                            My Profile
                        </NavLink>
                    )}
                </div>

                {/* Desktop actions */}
                <div className="hidden shrink-0 items-center gap-3 md:flex">
                    {user ? (
                        <>
                            <span className="max-w-32 truncate text-sm font-medium text-slate-600">
                                Hi, {displayName}
                            </span>

                            <Link
                                to="/profile"
                                title="My Profile"
                                aria-label="Open my profile"
                                className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <ProfileAvatar />
                            </Link>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
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

                {/* Mobile profile avatar + hamburger */}
                <div className="flex shrink-0 items-center gap-3 md:hidden">
                    {user && (
                        <Link
                            to="/profile"
                            onClick={() => setMenuOpen(false)}
                            title="My Profile"
                            aria-label="Open my profile"
                            className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <ProfileAvatar size="h-10 w-10" />
                        </Link>
                    )}

                    <button
                        type="button"
                        onClick={() => setMenuOpen((previous) => !previous)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100"
                    >
                        {menuOpen ? <X size={23} /> : <Menu size={23} />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-3 shadow-md md:hidden">
                    <div className="space-y-2">
                        {renderNavLinks()}

                        {user && (
                            <Link
                                to="/profile"
                                onClick={() => setMenuOpen(false)}
                                className={getLinkClass({ to: "/profile" })}
                            >
                                My Profile
                            </Link>
                        )}
                    </div>

                    <div className="mt-4 border-t border-slate-200 pt-4">
                        {user ? (
                            <div className="space-y-3">
                                <div className="flex min-w-0 items-center gap-3">
                                    <ProfileAvatar size="h-11 w-11" />

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-slate-900">
                                            {displayName}
                                        </p>
                                        <p className="truncate text-xs text-slate-500">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

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