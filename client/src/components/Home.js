import Navigation from "./Navigation";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Navigation />
      <div className="home">
        <h1>Welcome to D&D PAL {user ? user : "Adventurer"}</h1>
        <p>
          D&D PAL is a helper site for D&D 5e, we use the official 5th edition
          API to get you all the information you need to help you on your next
          adventure!
        </p>
        <p>
          Dungeons & Dragons 5E is the latest edition of the world's best-known
          tabletop roleplaying game. Players create characters and go on
          adventures led by a dungeon master (DM), who controls non-player
          characters (NPCs), monsters and events in the world.
        </p>
      </div>
    </div>
  );
};

export default Home;
