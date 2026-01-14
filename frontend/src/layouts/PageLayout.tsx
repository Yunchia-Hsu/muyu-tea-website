import type { ReactNode } from "react";
import "./PageLayout.css";
import ChatWidget from "../components/ChatWidget";
type PageLayoutProps = {
    children: ReactNode;
};

export default function PageLayout ({ children }: PageLayoutProps) {
    return (
        <div className="page-background">
            <div className="page-card">
                {children}
            </div>
                <ChatWidget />
        </div>
    )
}
