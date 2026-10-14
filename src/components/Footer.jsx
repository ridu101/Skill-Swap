
import { Link } from "react-router-dom";
import { BookOpen, Mail, ArrowUpRight } from "lucide-react";

function Footer() {
  const linkStyle = {
    color: "#64748b",
    fontSize: "14px",
    textDecoration: "none",
  };

  const headingStyle = {
    color: "#111827",
    fontSize: "15px",
    fontWeight: "600",
    marginBottom: "14px",
  };

  return (
    <footer
      style={{
        backgroundColor: "#ffffff",
        color: "#374151",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <div className="container-shell grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "#2563eb",
                color: "#ffffff",
              }}
            >
              <BookOpen size={19} />
            </span>

            <span
              style={{
                color: "#111827",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              Skill<span style={{ color: "#2563eb" }}>Swap</span>
            </span>
          </Link>

          <p
            style={{
              maxWidth: "360px",
              color: "#64748b",
              fontSize: "14px",
              lineHeight: "1.8",
              margin: 0,
            }}
          >
            Learn something useful. Share what you know. Connect with people
            who want to grow together.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 style={headingStyle}>Explore</h3>

          <div className="flex flex-col gap-3">
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/#skills" style={linkStyle}>Explore skills</Link>
            <Link to="/#how-it-works" style={linkStyle}>How it works</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 style={headingStyle}>Get in touch</h3>

          <a
            href="mailto:hello@skillswap.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              color: "#64748b",
              fontSize: "14px",
              textDecoration: "none",
              overflowWrap: "anywhere",
            }}
          >
            <Mail size={16} />
            <span>hello@skillswap.com</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ borderTop: "1px solid #e5e7eb" }}>
        <div className="container-shell flex flex-col justify-between gap-3 py-5 sm:flex-row">
          <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>
            © {new Date().getFullYear()} SkillSwap. All rights reserved.
          </p>

          <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>
            Built for a community that loves to learn.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
