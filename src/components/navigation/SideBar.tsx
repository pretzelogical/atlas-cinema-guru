import { useState, useEffect } from "react";
import client from '../../client';
import Button from '../general/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faStar, faClock } from "@fortawesome/free-solid-svg-icons";
import Activity from '../Activity';
import './navigation.scss';

export type ActivitiesState = {
  id: number,
  activityType: string,
  createdAt: string,
  title: { title: string },
  updatedAt: Date,
  user: { username: string },
  userId: number
}

export default function SideBar() {
  const pages = ['Home', 'Favorites', 'Watch later'];
  const [selected, setSelected] = useState<string>(pages[0]);
  const [isSmall, setIsSmall] = useState<boolean>(true);
  const [activities, setActivities] = useState<Array<ActivitiesState>>([]);
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
                {generateActivities(activities)}
              </ul>
            </div></>
      }

    </div>
  );
}

const generateActivities = (activities: Array<ActivitiesState>) => {
  return activities.map((activity) => (
    <li key={activity.id}>
      <Activity
        activityType={activity.activityType}
        username={activity.user.username}
        date={new Date(activity.createdAt)}
        title={activity.title.title}
      />
    </li>
  ));
};


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
