import { useSelector } from "react-redux";
import { FiAlertTriangle } from "react-icons/fi";
import MyEventStatus from "../components/MyEventStatus";
import useNumber from "../hooks/use-number";
import Modal from "../components/modal/Modal";

function MyEvent() {
  const displayName = useSelector((state) => state.auth.displayName);
  const userGallery = useSelector((state) => state.gallery.gallery);
  const modalData = useSelector((state) => state.modal);

  const numbGalleries = useNumber();

  if (userGallery.status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <main className="container mx-auto h-full font-['average'] max-w-[1000px] ">
      {modalData.isOpen && <Modal />}
      <h1 className="my-12 text-xl font-medium">My Event</h1>
      <h2 className="font-normal mb-8">Hello {displayName},</h2>
      {userGallery && <MyEventStatus userData={userGallery} />}
      {numbGalleries > 35 && (
        <div className="mt-[2rem] flex flex-col gap-[0.6rem]">
          <div className="flex items-center">
            <div className="text-[1.5rem] mr-[0.5rem]">
              <FiAlertTriangle />
            </div>
            <p>An important message from OPG</p>
          </div>
          <p className="text-ellipsis whitespace-nowrap">
            Please note that our gallery can accomodate up to 36 events and
            currently we are at full capacity. You will only be able to host
            your event when slots become available.
          </p>
        </div>
      )}
    </main>
  );
}

export default MyEvent;
