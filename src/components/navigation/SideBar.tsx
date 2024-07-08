import { useState, useEffect } from "react";
import client from '../../client';
import Button from '../general/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faStar, faClock } from "@fortawesome/free-solid-svg-icons";
import Activity from '../Activity';
import './navigation.scss';

export default function SideBar() {
  const pages = ['Home', 'Favorites', 'Watch later'];
  const [selected, setSelected] = useState<string>(pages[0]);
  const [isSmall, setIsSmall] = useState<boolean>(true);
  const [activities, setActivities] = useState<Array<unknown>>([]);
  const [showActivies, setShowActivites] = useState<boolean>(false);
  const [isLoading] = useGetActivitesFromServer(setActivities);

  const setPage = (pageName: string) => {
    if (pages.includes(pageName)) {
      setSelected(pageName);
    }
  };

  const selectIcon = (pageName: string) => {
    switch (pageName) {
      case 'Home':
        return faFile;
      case 'Favorites':
        return faStar;
      case 'Watch later':
        return faClock;
      default:
        return faFile;
    }
  };

  return (
    <div className={
      isSmall
        ? "sidebar-container-small"
        : "sidebar-container"
    }
      onMouseEnter={() => setIsSmall(false)}
      onMouseLeave={() => setIsSmall(true)}
    >
      {
        isSmall
          ? <div className="sidebar-nav">
            <ul>
              {pages.map((page) => (
                <li key={page}>
                  <Button
                    label=''
                    icon={<FontAwesomeIcon icon={selectIcon(page)} />}
                    onClick={() => setPage(page)}
                    className={selected === page ? 'sidebar-page-selected' : 'sidebar-page'}
                  />
                </li>
              ))}
            </ul>
          </div>
          : <><div className="sidebar-nav">
            <ul>
              {pages.map((page) => (
                <li key={page}>
                  <Button
                    label={page}
                    icon={<FontAwesomeIcon icon={selectIcon(page)} />}
                    onClick={() => setPage(page)}
                    className={selected === page ? 'sidebar-page-selected' : 'sidebar-page'}
                  />
                </li>
              ))}
            </ul>
          </div>
            <div className="sidebar-activities">
              <p className="sidebar-activities-header">Latest Activities</p>
              <ul>
                <li>
                  <Activity
                    username="John Doe"
                    activity="added"
                    title="The Matrix"
                    destination="watch later"
                    date="March 28, 2024"
                  />
                </li>
                <li>
                  <Activity
                    username="John Doe"
                    activity="added"
                    title="The Matrix"
                    destination="watch later"
                    date="March 28, 2024"
                  />
                </li>
                <li>
                  <Activity
                    username="John Doe"
                    activity="added"
                    title="The Matrix"
                    destination="watch later"
                    date="March 28, 2024"
                  />
                </li>
              </ul>
            </div></>
      }

    </div>
  );
}


const useGetActivitesFromServer = (setActivities: (activities: Array<unknown>) => void) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    client
      .get('/activity', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((response) => {
        setActivities(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [setActivities]);

  return [isLoading] as [boolean];
};
