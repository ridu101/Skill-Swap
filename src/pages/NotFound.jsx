import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function NotFound() {
    return (
        <div className="page-bg flex min-h-[70vh] items-center justify-center px-5 py-16">
            <div className="max-w-md text-center">
                <p className="text-7xl font-bold tracking-tight text-blue-500">404</p>
                <h1 className="mt-5 text-3xl font-bold text-main">Page not found</h1>
                <p className="mt-3 leading-7 text-muted">
                    The page you're looking for doesn't exist or may have moved.
                </p>
                <Link to="/" className="btn-primary-ui mt-7">
                    <ArrowLeft size={17} /> Back to home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;