import Navigation from "./Navigation";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const player = JSON.parse(localStorage.getItem("player"));

  return (
    <div>
      <Navigation />
      <div className="home">
        <div className="fog-img fog-img-first"></div>
        <div className="fog-img fog-img-second"></div>
        <h1>Welcome to D&D PAL {`${player} ${user}`}</h1>
        <h4>
          D&D PAL is a helper site for D&D 5e, we use the official 5th edition
          API to get you all the information you need to help you on your next
          adventure!
        </h4>
        <h4>
          Dungeons & Dragons 5E is the latest edition of the world's best-known
          tabletop roleplaying game. Players create characters and go on
          adventures led by a dungeon master (DM), who controls non-player
          characters (NPCs), monsters and events in the world.
        </h4>
        <br></br>
      </div>
    </div>
  );
};

export default Home;
