import { useContext, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { UserContext } from "../context/useContext";

export const useUserAuth = () => {
    const { user, loading, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) return;

        if(!user && typeof clearUser === 'function') {
            try {
                clearUser();
                navigate("/login");
            } catch (error) {
                console.error('Error in useUserAuth:', error);
            }
        }
    }, [user, loading, navigate, clearUser]);
};