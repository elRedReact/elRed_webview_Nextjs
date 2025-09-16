import React, { useEffect, useState } from "react";
import SideBar from "./SideBar/SideBar";
import styles from "./MembershipLayout.module.css"; // optional CSS module

const MembershipLayout = ({ children }) => {
  const [showLayout, setShowLayout] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowLayout(window.innerWidth >= 769);
    };

    // Initial check
    handleResize();

    // Listen for window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!showLayout) {
    return <>{children}</>; // Return just the content for mobile view
  }

  return (
    <div className={styles.main_layout}>
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className={styles.side_content}>{children}</div>
    </div>
  );
};

export default MembershipLayout;
