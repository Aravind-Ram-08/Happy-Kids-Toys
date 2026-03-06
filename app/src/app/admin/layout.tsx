import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin — Happy Kids Toys",
    description: "Admin dashboard for Happy Kids Toys store management",
    robots: "noindex,nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    // Admin has its own full-page layout — override the public layout
    return <>{children}</>;
}
