import { useUser } from "../../context/UserContext";

function Home() {
  const { user } = useUser();

  return (
    <div>
      <h2>Home Component</h2>
      <h3>Welcome, {user.name ? user.name : "Guest"}!</h3>
    </div>
  );
}

export default Home;
