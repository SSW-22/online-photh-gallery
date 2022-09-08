import { useSelector } from "react-redux";

function Landing() {
  const displayName = useSelector((state) => state.auth.displayName);

  return (
    <div>
      <h1>{displayName}</h1>
      <h1>Landing Page</h1>
    </div>
  );
}

export default Landing;
