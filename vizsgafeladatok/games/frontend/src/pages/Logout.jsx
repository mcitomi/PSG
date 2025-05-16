import { useEffect } from "react";

export default () => {
    useEffect(() => {
        localStorage.removeItem("token");
    }, []);

    return (
        <h1 className="text-center">Kijelentkezés</h1>
    );
}