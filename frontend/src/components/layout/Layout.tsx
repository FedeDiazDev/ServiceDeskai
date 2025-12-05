import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

export default function Layout() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
            <Header />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-4 pb-20 md:pb-4">
                    <Outlet />
                </main>
            </div>
            <BottomNav />
        </div>
    );
}
