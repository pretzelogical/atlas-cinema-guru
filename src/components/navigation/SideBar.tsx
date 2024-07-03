import { useState } from "react";

export default function SideBar() {
  const pages = ['home', 'favorites', 'watch later'];
  const [selected, setSelected] = useState<string>(pages[0]);
  const [isSmall, setIsSmall] = useState<boolean>(true);
  const [activities, setActivities] = useState<Array<unknown>>([]);
  const [showActivies, setShowActivites] = useState<boolean>(false);
  
  const setPage = (page: string) => {
    if (pages.includes(page)) {
      setSelected(page);
    }
  }

  return (
    <div className={
      isSmall
      ? "sidebar-container-small"
      : "sidebar-container"
    }
    onMouseEnter={() => setIsSmall(false)}
    onMouseLeave={() => setIsSmall(true)}
    >
    </div>
  )
}