import "./cards.css"
import Card from "./Card"

const Cards = () => {

   const cardData = [
    {
      id: 1,
      name: "Kasun Dilanka",
      subtitle: "Designer who creates delightful experiences",
      avatar: "https://i.pravatar.cc/150?img=11",
      projects: 144,
      likes: 604,
      comments: 44,
      linkedin: "https://linkedin.com",
      behance: "https://behance.net",
    },
    {
      id: 2,
      name: "Aman Verma",
      subtitle: "Full-stack developer & problem solver",
      avatar: "https://i.pravatar.cc/150?img=12",
      projects: 96,
      likes: 420,
      comments: 32,
      linkedin: "https://linkedin.com",
      behance: "https://behance.net",
    },
    {
      id: 3,
      name: "Riya Sharma",
      subtitle: "UI/UX designer with a love for minimalism",
      avatar: "https://i.pravatar.cc/150?img=13",
      projects: 121,
      likes: 530,
      comments: 51,
      linkedin: "https://linkedin.com",
      behance: "https://behance.net",
    },
    {
      id: 4,
      name: "Arjun Patel",
      subtitle: "Creative frontend developer",
      avatar: "https://i.pravatar.cc/150?img=14",
      projects: 88,
      likes: 390,
      comments: 27,
      linkedin: "https://linkedin.com",
      behance: "https://behance.net",
    },
    {
      id: 5,
      name: "Sneha Iyer",
      subtitle: "Visual designer & illustrator",
      avatar: "https://i.pravatar.cc/150?img=15",
      projects: 167,
      likes: 720,
      comments: 68,
      linkedin: "https://linkedin.com",
      behance: "https://behance.net",
    },
    {
      id: 6,
      name: "Rahul Mehta",
      subtitle: "Product designer focused on usability",
      avatar: "https://i.pravatar.cc/150?img=16",
      projects: 110,
      likes: 498,
      comments: 39,
      linkedin: "https://linkedin.com",
      behance: "https://behance.net",
    },
    {
      id: 7,
      name: "Neha Kapoor",
      subtitle: "UX researcher & design thinker",
      avatar: "https://i.pravatar.cc/150?img=17",
      projects: 75,
      likes: 340,
      comments: 21,
      linkedin: "https://linkedin.com",
      behance: "https://behance.net",
    },
    {
      id: 8,
      name: "Vikram Singh",
      subtitle: "Motion designer & animator",
      avatar: "https://i.pravatar.cc/150?img=18",
      projects: 132,
      likes: 610,
      comments: 49,
      linkedin: "https://linkedin.com",
      behance: "https://behance.net",
    },
    {
      id: 9,
      name: "Ananya Roy",
      subtitle: "Brand designer & storyteller",
      avatar: "https://i.pravatar.cc/150?img=19",
      projects: 158,
      likes: 680,
      comments: 55,
      linkedin: "https://linkedin.com",
      behance: "https://behance.net",
    },
    {
      id: 10,
      name: "Kunal Jain",
      subtitle: "Creative technologist",
      avatar: "https://i.pravatar.cc/150?img=20",
      projects: 90,
      likes: 410,
      comments: 30,
      linkedin: "https://linkedin.com",
      behance: "https://behance.net",
    },
  ];


  return (
    <div>
      <div className="card-wrapper">
        {cardData.map((user) => (
          <Card key={user.id} data={user} />
        ))}
      </div>
    </div>
  );
}

export default Cards ;
