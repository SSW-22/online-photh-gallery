import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MyEventStatus from "../components/MyEventStatus";
import checkUserGallery from "../firebase/checkUserGallery";

// const DUMMY_DATA = {
//   status: "draft",
//   thumbnailBgColor: "bg-[#007BED]",
//   thumbnailTextColor: "text-[#FFFFFF]",
//   title: "My Youth",
//   name: "Seungmin Shin",
// };

function MyEvent() {
  const displayName = useSelector((state) => state.auth.displayName);
  const userUid = useSelector((state) => state.auth.uid);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    checkUserGallery(userUid).then((data) => setUserData(data));
  }, [userUid]);
  return (
    <div className="container mx-auto h-full font-['average']">
      <h1 className="my-12 text-xl font-medium">My Event</h1>
      <h2 className="font-normal mb-8">Hello {displayName},</h2>
      {userData && <MyEventStatus userData={userData} />}
    </div>
  );
}

export default MyEvent;
