import { useSelector } from "react-redux";
import MyEventStatus from "../components/MyEventStatus";

const DUMMY_DATA = {
  status: "draft",
  thumbnailBgColor: "bg-[#007BED]",
  thumbnailTextColor: "text-[#FFFFFF]",
  title: "My Youth",
  name: "Seungmin Shin",
};

function MyEvent() {
  const displayName = useSelector((state) => state.auth.displayName);
  const userData = DUMMY_DATA;

  return (
    <div className="container mx-auto h-full font-['average']">
      <h1 className="my-12 text-xl font-medium">My Event</h1>
      <h2 className="font-normal mb-8">Hello {displayName},</h2>
      <MyEventStatus userData={userData} />
    </div>
  );
}

export default MyEvent;
