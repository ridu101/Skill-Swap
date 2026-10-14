
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Explore Skills", to: "/#skills", hash: "#skills" },
    {
        label: "How It Works",
        to: "/#how-it-works",
        hash: "#how-it-works",
    },
    { label: "My Profile", to: "/profile" },
];

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Home page section-e navigate korar por scroll korbe.
    useEffect(() => {
        if (location.pathname === "/" && location.hash) {
            const timer = setTimeout(() => {
                const section = document.getElementById(
                    location.hash.replace("#", "")
                );

                section?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [location.pathname, location.hash]);

    // Route ba section link click korle mobile menu close hobe.
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMenuOpen(false);
    }, [location.pathname, location.hash]);

    function getLinkClass(link) {
        const isActive = link.hash
            ? location.pathname === "/" && location.hash === link.hash
            : link.to === "/"
                ? location.pathname === "/" && !location.hash
                : location.pathname === link.to ||
                location.pathname.startsWith(`${link.to}/`);

        return `block rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`;
    }

    return (
        <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
            <nav className="mx-auto flex min-h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
                    {navLinks.map((link) => {
                        if (link.hash) {
                            return (
                                <Link
                                    key={link.label}
                                    to={link.to}
                                    className={getLinkClass(link)}
                                >
                                    {link.label}
                                </Link>
                            );
                        }

                        return (
                            <NavLink
                                key={link.label}
                                to={link.to}
                                end={link.to === "/"}
                                className={getLinkClass(link)}
                            >
                                {link.label}
                            </NavLink>
                        );
                    })}
                </div>

                {/* Desktop actions */}
                <div className="hidden items-center gap-3 md:flex">
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
                        {navLinks.map((link) => {
                            if (link.hash) {
                                return (
                                    <Link
                                        key={link.label}
                                        to={link.to}
                                        className={getLinkClass(link)}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            }

                            return (
                                <NavLink
                                    key={link.label}
                                    to={link.to}
                                    end={link.to === "/"}
                                    className={getLinkClass(link)}
                                >
                                    {link.label}
                                </NavLink>
                            );
                        })}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
                        <Link
                            to="/login"
                            className="rounded-lg border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Log in
                        </Link>

                        <Link
                            to="/signup"
                            className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            Join for free
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;
