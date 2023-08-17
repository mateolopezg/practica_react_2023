import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard.jsx";

const users = [
  {
    userName: "ibm",
    name: "ibm",
    isFollowing: true,
  },
  {
    userName: "nttdata",
    name: "nttdata",
    isFollowing: false,
  },
  {
    userName: "intel",
    name: "intel",
    isFollowing: true,
  },
  {
    userName: "snapdragon",
    name: "snapdragon",
    isFollowing: false,
  },
  {
    userName: "globant",
    name: "globant",
    isFollowing: false,
  },
  {
    userName: "huawei",
    name: "huawei",
    isFollowing: true,
  },
  {
    userName: "devires",
    name: "devires",
    isFollowing: true,
  },
];

export function App() {
  return (
    <section className="App">
      {users.map((user) => {
        const { userName, name, isFollowing } = user;
        return (
          <TwitterFollowCard
            key={userName}
            userName={userName}
            initialsIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>
        );
      })}
    </section>
  );
}
