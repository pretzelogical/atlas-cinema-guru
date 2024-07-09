import { useState, useEffect } from "react";
import client from '../../client';
import Button from '../general/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faStar, faClock } from "@fortawesome/free-solid-svg-icons";
import Activity from '../Activity';
import './navigation.scss';
import { useNavigate } from "react-router-dom";

export type ActivitiesState = {
  id: number,
  activityType: string,
  createdAt: string,
  title: { title: string },
  updatedAt: Date,
  user: { username: string },
  userId: number
}

export type SideBarProps = {
  activePage: string
}

export default function SideBar({ activePage }: SideBarProps) {
  const pagesRoutes = {
    'Home': '/home',
    'Favorites': '/favorites',
    'Watch later': '/watchlater'
  };
  const [isSmall, setIsSmall] = useState<boolean>(true);
  const [activities, setActivities] = useState<Array<ActivitiesState>>([]);
  const [isLoading] = useGetActivitesFromServer(setActivities);
  const navigate = useNavigate();

  let pageSelected = 'Home';

  if (Object.keys(pagesRoutes).includes(activePage)) {
    pageSelected = activePage;
  } else {
    console.log('Invalid page given to SideBar');
  }


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
              {Object.entries(pagesRoutes).map(([page, route]) => (
                <li key={page}>
                  <Button
                    label=''
                    icon={<FontAwesomeIcon icon={selectIcon(page)} />}
                    onClick={() => navigate(route)}
                    className={pageSelected === page ? 'sidebar-page-selected' : 'sidebar-page'}
                  />
                </li>
              ))}
            </ul>
          </div>
          : <><div className="sidebar-nav">
            <ul>
              {Object.entries(pagesRoutes).map(([page, route]) => (
                <li key={page}>
                  <Button
                    label={page}
                    icon={<FontAwesomeIcon icon={selectIcon(page)} />}
                    onClick={() => navigate(route)}
                    className={pageSelected === page ? 'sidebar-page-selected' : 'sidebar-page'}
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


const useGetActivitesFromServer = (setActivities: React.Dispatch<React.SetStateAction<ActivitiesState[]>>) => {
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
