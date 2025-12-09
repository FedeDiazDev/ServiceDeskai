import { useNavigate } from "react-router-dom"
import Button from "../components/common/Button"

export default function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-dark-bg px-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-text-main">
                404 PAGE NOT FOUND
            </h1>
            <Button type="button" onClick={() => { navigate("/tickets")}}>Back to Home</Button>
        </div>
    )
}