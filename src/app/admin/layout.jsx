"use client";
import { useState, useEffect } from "react";
import { usePathname,useRouter } from "next/navigation";
import Link from "next/link";
import { Layout, Menu, Button, theme } from "antd";
import {
  MenuFoldOutlined,
  GlobalOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingFilled,
  PictureOutlined,
} from "@ant-design/icons";
import { logout } from "@/services/auth.service";
import Logoweb from "@/src/components/Logoweb";
import { TOKEN_KEY } from "@/config/token_key";
import Cookies from "js-cookie";

const { Header, Sider, Content, Footer } = Layout;

const Sidebar = ({ children }) => {
  // const [token] = useState(localStorage.getItem(TOKEN_KEY) || null);
  const token = Cookies.get(TOKEN_KEY);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const [activeItem, setActiveItem] = useState(pathname);

  const router = useRouter();

  if (token === null) {
    return <>{children}</>;
  }



  const menuItems = [
    { key: "/admin", label: "หน้าหลัก", icon: HomeOutlined },
    { key: "/admin/website", label: "เว็บทั้งหมด", icon: GlobalOutlined  },
    // { key: "/admin/media", label: "สื่อ", icon: PictureOutlined },
    // { key: "/admin/setting", label: "ตั้งค่า", icon: SettingFilled },
    { key: "/login", label: "ออกจากระบบ", icon: LogoutOutlined },
  ];

  const handleItemClick = (key) => {
    setActiveItem(key);
    setIsMobileOpen(false);

    if (key === "/login") {
      logout();
      location.reload();
      return;
    }
  };

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="relative mx-auto text-center w-16 my-2  flex justify-center">
          <Logoweb />
        </div>
        <div className="text-center text-gray-300 text-sm truncate">
          Admin Panel
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.key;

            return (
              <li key={item.key}>
                <Link
                  onClick={() => handleItemClick(item.key)}
                  href={item.key}
                  className={`
                    w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg
                    transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                    ${item.key === "logout" ? "mt-auto" : ""}
                  `}
                >
                  <IconComponent
                    className={`
                      flex-shrink-0 w-5 h-5
                      ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white"
                      }
                    `}
                  />
                  <span className="ml-3 truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-40 lg:w-60 bg-gray-800 border-r border-gray-700">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`
        lg:hidden fixed inset-y-0 left-0 z-50 w-64
        bg-gray-800 border-r border-gray-700
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <SidebarContent isMobile={true} />
      </div>

      {/* Header */}
      <div className="fixed top-0 right-0 z-30 lg:left-60 left-0 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600"/>
            </button>

            {/* Page Title */}
            <h1 className="text-lg font-semibold text-gray-900">
              {menuItems.find((item) => item.key === activeItem)?.label ||
                "Admin Panel"}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-60 ml-0 py-16 bg-gray-50">
        <div className="min-h-screen  px-2.5">{children}</div>
      </div>

      {/* Footer */}
      <div className=" bg-white border-t border-gray-200">
        <div className="px-6 py-3 text-center text-xs text-gray-500">
          ©{new Date().getFullYear()} . ALL RIGHTS RESERVED.
        </div>
      </div>
    </>
  );
};

export default Sidebar;
