import { useEffect, useState } from "react";
import ImageWithLoaderAndFallback from "../ImageWithLoaderAndFallback/ImageWithLoaderAndFallback";
import styles from "./sidebar.module.scss";
import Image from "next/image";
import avatar from '../../../public/userprofile.svg'
import logout from "../../../public/logout.svg";
import logo from "../../../public/logo1x.svg";

import { menuData } from "../PaymentHeader/menudata";
import { usePathname } from "next/navigation";
import { useLogout } from "@/context/LogoutContext";

export default function SideBar() {
  const { setIsOpen } = useLogout();

  const [userData, setUserData] = useState([])
  const pathname = usePathname();


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userdata"));
    if (user) {
      setUserData(user);
    }
  }, []);

  const logoutTrigger = () => {
    // handleClose();
    setIsOpen(true);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Image src={logo} alt=""/>
      </div>
      <div className={styles.user_profile}>
        <ImageWithLoaderAndFallback
          src={userData?.dpURL}
          alt="User profile"
          width={40}
          height={40}
          className={styles.dpImg}
          fallback={avatar}
        />

        {console.log(userData?.dpURL,'---->')}

        <div className={styles.name_div}>
          <div className={styles.username}>
            {" "}
            {userData?.firstname} {userData?.lastname}
          </div>
          <div className={styles.name}>{userData?.userName}</div>
        </div>
      </div>
      <div className={styles.menus_div}>
        {menuData?.map((data, id) => (
          <div
            className={`${styles.menu} ${
              pathname == data?.path ? styles.active_menu : ""
            }`}
            key={data.id}
            // onClick={pathname == data?.path ? handleClose : null}
          >
            <Image
              src={`/${data?.logo}.svg`}
              alt={data?.logo}
              width={36}
              height={36}
              className={data?.disabled && styles.disabled_img}
            />
            <div
              className={
                data?.disabled ? styles.disabled_menu_title : styles.menu_title
              }
            >
              {data?.title}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.logout_div}>
        <div className={styles.border_line}></div>
        <div className={styles.logout_menu} onClick={logoutTrigger}>
          <Image src={logout} alt={"logout"} width={36} height={36} />
          <div className={styles.logout_title}>Logout</div>
        </div>
      </div>
    </div>
  );
}
