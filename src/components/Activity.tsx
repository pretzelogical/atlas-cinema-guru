export type ActivityProps = {
  username: string;
  activity: string;
  destination: string;
  title: string;
  date: string;
};


export default function Activity({
  username,
  activity,
  destination,
  title,
  date
}: ActivityProps) {
  return (
    <div className="activity-container">
      <p><span className="text-color-primary">{username}</span> {activity} <span className="text-color-primary">{title}</span> to {destination} - {date}</p>
    </div>
  );
}