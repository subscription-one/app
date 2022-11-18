
export default function useAuth() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const login = useCallback(async (email, password) => {
        const response = await fetch(`${API_URL}/auth/local`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            identifier: email,
            password,
        }),
        });
    
        const data = await response.json();
    
        if (data.jwt) {
        setUser(data.user);
        setIsAuthenticated(true);
        } else {
        throw new Error(data.message[0].messages[0].message);
        }
    }, []);
    
    const logout = useCallback(async () => {
        setUser(null);
        setIsAuthenticated(false);
    }, []);
    
    const register = useCallback(async (email, password) => {
        const response = await fetch(`${API_URL}/auth/local/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email,
            email,
            password,
        }),
        });
    
        const data = await response.json();
    
        if (data.jwt) {
        setUser(data.user);
        setIsAuthenticated(true);
        } else {
        throw new Error(data.message[0].messages[0].message);
        }
    }, []);
    
    return {
        isAuthenticated,
        user,
        login,
        logout,
        register,
    };
    }