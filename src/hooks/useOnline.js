import { useState, useEffect } from "react";
function useOnline() {

    const [isOnline, setisOnline] = useState(navigator.onLine);

    useEffect(() => {

        function handleOnline() {
            setisOnline(true);
        }

        function handleOffline() {
            setisOnline(false);
        }

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);
 return isOnline
}
export default useOnline;