import React , {useState} from 'react';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState('');
  
    const handleSubmit = async (e) => {
          e.preventDefault();
          const endpoint = isLogin ? 'signin' : 'signup';
          
          try {
            const response = await fetch(`http://localhost:5000/${endpoint}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password }),
            });
            
            const data = await response.json();
            if (response.ok) {
              localStorage.setItem('token', data.token);
              setIsLoggedIn(true);
              setMessage('');
            } else {
              setMessage(data.message);
            }
          } catch (error) {
            setMessage('Connection error');
          }
        };
      
        const handleSignOut = () => {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        };
      
        if (isLoggedIn) {
          return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
              <h2 className="text-2xl font-bold mb-4">Welcome {username}!</h2>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          );
        }


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-6">{isLogin ? 'Sign In' : 'Sign Up'}</h2>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center bg-white p-6 rounded shadow-md w-80"
            >
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mb-4 px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4 px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                >
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </button>
            </form>
            <button
                onClick={() => setIsLogin(!isLogin)}
                className="mt-4 text-blue-500 hover:underline"
            >
                Switch to {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
            {message && (
                <p className="mt-4 text-red-500 text-sm">{message}</p>
            )}
        </div>
    );
};
export default Auth;