import { useSelector } from "react-redux";
import MyEventStatus from "../components/MyEventStatus";

function MyEvent() {
  const displayName = useSelector((state) => state.auth.displayName);
  const userGallery = useSelector((state) => state.gallery.gallery);
  if (userGallery.status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <main className="container mx-auto h-full font-['average'] max-w-[1000px] ">
      <h1 className="my-12 text-xl font-medium">My Event</h1>
      <h2 className="font-normal mb-8">Hello {displayName},</h2>
      {userGallery && <MyEventStatus userData={userGallery} />}
    </main>
  );
}

export default MyEvent;
