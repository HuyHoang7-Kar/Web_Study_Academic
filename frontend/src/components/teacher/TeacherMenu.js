import { Link, useLocation } from "react-router-dom";
import {
  FaCalculator, FaSearch, FaBell, FaCog, FaQuestionCircle,
  FaUser, FaSignOutAlt, FaWrench, FaChalkboardTeacher, FaBook, FaHome
} from "react-icons/fa";
import "./teachermenu.css";
import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:8000";

function TeacherMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.replace("/login");
    }
    window.onpageshow = (event) => {
      if (event.persisted) window.location.reload();
    };
  }, []);

  const getAvatarUrl = () => {
    if (user?.avatar) {
      return user.avatar.startsWith("http") ? user.avatar : `${BASE_URL}${user.avatar}`;
    }
    return null;
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.replace("/");
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeout) clearTimeout(searchTimeout);

    const newTimeout = setTimeout(() => {
      if (value) window.find(value, false, false, true, false, false);
    }, 500);

    setSearchTimeout(newTimeout);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchTerm) {
      window.find(searchTerm, false, false, true, false, false);
    }
  };
  return (
    <div className="menu-container">
      <div className="header">
      <h1 className="header-title" style={{ marginBottom: "23px", fontSize: "28px"}}>
        <div className="header">
          <img src="/geometry.png" className="header-icon-math" alt="Calculator" />
          <span className="header-text black">Toán </span>
          <span className="header-text black">Học </span>
          <span className="header-text blue">Sinh </span>
          <span className="header-text blue">Viên </span>
        </div>
      </h1>
      </div>
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
          />
          <FaSearch className="search-icon" title="Tìm kiếm" />
        </div>
      </div>

      <div className="icons-and-profile">
        <div className="icons-container">
          <FaBell className="header-icon" />
          <FaQuestionCircle className="header-icon" />
          <FaCog className="header-icon" />
        </div>

        <div
          className="profile-dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="profile-info">
            <span className="profile-email">{user?.full_name || "Người dùng"}</span>
            {getAvatarUrl() ? (
              <img src={getAvatarUrl()} alt="Avatar" className="profile-avatar" />
            ) : (
              <FaCalculator className="profile-icon" />
            )}
          </div>

          {isDropdownOpen && (
            <ul className="submenu-profile">
              <li>
                <Link to="/profile">
                  <FaUser className="submenu-icon" /> Hồ sơ
                </Link>
              </li>
              <li>
                <Link to="/settings">
                  <FaWrench className="submenu-icon" /> Tài khoản
                </Link>
              </li>
              <li onClick={handleLogout} className="logout hover-effect">
                <FaSignOutAlt className="submenu-icon" /> Đăng xuất
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* ======== NAVIGATION MENU ======== */}
      <ul className="nav">
        <li className="menu-item-container">
        <Link to="/teacher" className="menu-item no-underline">
          TRANG CHỦ ▾
        </Link>

          <ul className="submenu">
            <li className={location.pathname === "/teacherhome1" ? "active" : ""}>
              <Link to="/teacherhome1">
                <FaHome className="submenu-icon" /> Home1
              </Link>
            </li>
            <li className={location.pathname === "/teacherhome2" ? "active" : ""}>
              <Link to="/teacherhome2">
                <FaBook className="submenu-icon" /> Home2
              </Link>
            </li>
            <li className={location.pathname === "/teacherhome3" ? "active" : ""}>
              <Link to="/teacherhome3">
                <FaChalkboardTeacher className="submenu-icon" /> Home3
              </Link>
            </li>
          </ul>
        </li>

        <li className={location.pathname === "/teacherintro" ? "active" : ""}>
          <Link to="/teacherintro">GIỚI THIỆU</Link>
        </li>
        <li className={location.pathname === "/teachercourses/listcourses" ? "active" : ""}>
          <Link to="/teachercourses/listcourses">DANH SÁCH KHÓA HỌC</Link>
        </li>

        <li className={location.pathname === "/teacherresult" ? "active" : ""}>
          <Link to="/teacherresult">BÁO CÁO THỐNG KÊ</Link>
        </li>
        <li className={location.pathname.startsWith("/teacherforum") ? "active" : ""}>
          <Link to="/teacherforum">DIỄN ĐÀN HỌC TẬP</Link>
        </li>
        <li className={location.pathname === "/teachercontact" ? "active" : ""}>
          <Link to="/teachercontact">LIÊN HỆ</Link>
        </li>
      </ul>
    </div>
  );
}

export default TeacherMenu;
