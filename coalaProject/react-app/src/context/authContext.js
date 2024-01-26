import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [categories, setCategories] = useState([]);
  const [generatedSubItems, setGeneratedSubItems] = useState({});

  const login = async (userData) => {
    try {
      const res = await axios.post(`${serverUrl}/login/`, userData, {
        withCredentials: true,
      });

      setCurrentUser(res.data);

      var name = res.data?.NAME;
      alert(name + "님 환영합니다 !");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          alert("아이디 또는 비밀번호가 올바르지 않습니다."); // 404: Not Found (로그인 실패)
        } else if (error.response.status === 401) {
          alert("아이디 또는 비밀번호가 올바르지 않습니다."); // 401: Unauthorized
        } else {
          console.error("로그인 중 오류:", error.response.status);
        }
      } else {
        console.error("로그인 중 오류:", error.message);
      }
    }
  };

  const logout = async () => {
    await axios.get(`${serverUrl}/login/logout`, {
      withCredentials: true,
    });
    setCurrentUser(null);
    alert("로그아웃이 완료되었습니다.");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        categories,
        setCategories,
        generatedSubItems,
        setGeneratedSubItems,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
