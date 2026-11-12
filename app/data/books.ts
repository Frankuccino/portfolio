export type BookCategory = "technical" | "personal";

export type Book = {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
};

export const books: Book[] = [
  // ——— Technical ———
  {
    id: "software-engineering-at-google",
    title: "Software Engineering at Google",
    author: "Tom Winters, Tom Manshreck & Hyrum Wright",
    category: "technical",
  },
  {
    id: "fundamentals-of-software-architecture",
    title: "Fundamentals of Software Architecture",
    author: "Mark Richards & Neal Ford",
    category: "technical",
  },
  {
    id: "software-architecture-the-hard-parts",
    title: "Software Architecture: The Hard Parts",
    author: "Neal Ford, Mark Richards, Pramod Sadalage & Zhamak Dehghani",
    category: "technical",
  },
  {
    id: "learning-domain-driven-design",
    title: "Learning Domain-Driven Design",
    author: "Vlad Khononov",
    category: "technical",
  },
  {
    id: "designing-data-intensive-applications",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "technical",
  },
  {
    id: "architecting-for-scale",
    title: "Architecting for Scale",
    author: "Lee Atchley",
    category: "technical",
  },
  {
    id: "becoming-a-data-head",
    title: "Becoming a Data Head",
    author: "Alex J. Gutman & Jordan Goldmeier",
    category: "technical",
  },
  {
    id: "clean-code-cookbook",
    title: "Clean Code Cookbook",
    author: "Maximiliano Contieri",
    category: "technical",
  },
  {
    id: "version-control-with-git",
    title: "Version Control with Git",
    author: "Jon Loeliger & Matthew McCullough",
    category: "technical",
  },
  {
    id: "the-pragmatic-programmer",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    category: "technical",
  },
  {
    id: "mastering-go",
    title: "Mastering Go",
    author: "Mihalis Tsoukalos",
    category: "technical",
  },
  {
    id: "responsive-web-design",
    title: "Responsive Web Design with HTML5 and CSS",
    author: "Ben Frain",
    category: "technical",
  },
  {
    id: "bootstrapping-microservices",
    title: "Bootstrapping Microservices with Docker, Kubernetes, and Terraform",
    author: "Ashley Davis",
    category: "technical",
  },
  {
    id: "sql-all-in-one-for-dummies",
    title: "SQL All-in-One For Dummies",
    author: "Allen G. Taylor",
    category: "technical",
  },
  {
    id: "cracking-the-coding-interview",
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    category: "technical",
  },

  // ——— Personal ———
  {
    id: "principles-life-and-work",
    title: "Principles: Life and Work",
    author: "Ray Dalio",
    category: "personal",
  },
  {
    id: "the-personal-mba",
    title: "The Personal MBA",
    author: "Josh Kaufman",
    category: "personal",
  },
  {
    id: "how-highly-effective-people-speak",
    title: "How Highly Effective People Speak",
    author: "Peter Daniel Andrei",
    category: "personal",
  },
  {
    id: "the-effective-executive",
    title: "The Effective Executive",
    author: "Peter F. Drucker",
    category: "personal",
  },
  {
    id: "emotional-intelligence",
    title: "Emotional Intelligence",
    author: "Daniel Goleman",
    category: "personal",
  },
  {
    id: "the-lean-startup",
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "personal",
  },
  {
    id: "zero-to-one",
    title: "Zero to One",
    author: "Peter Thiel & Blake Masters",
    category: "personal",
  },
  {
    id: "the-laws-of-human-nature",
    title: "The Laws of Human Nature",
    author: "Robert Greene",
    category: "personal",
  },
  {
    id: "mastery",
    title: "Mastery",
    author: "Robert Greene",
    category: "personal",
  },
  {
    id: "the-art-of-seduction",
    title: "The Art of Seduction",
    author: "Robert Greene",
    category: "personal",
  },
  {
    id: "the-concise-33-strategies-of-war",
    title: "The Concise 33 Strategies of War",
    author: "Robert Greene",
    category: "personal",
  },
  {
    id: "the-daily-laws",
    title: "The Daily Laws",
    author: "Robert Greene",
    category: "personal",
  },
  {
    id: "the-48-laws-of-power",
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    category: "personal",
  },
  {
    id: "the-22-immutable-laws-of-marketing",
    title: "The 22 Immutable Laws of Marketing",
    author: "Al Ries & Jack Trout",
    category: "personal",
  },
  {
    id: "the-greatest-salesman-in-the-world",
    title: "The Greatest Salesman in the World",
    author: "Og Mandino",
    category: "personal",
  },
  {
    id: "scientific-advertising",
    title: "Scientific Advertising",
    author: "Claude C. Hopkins",
    category: "personal",
  },
  {
    id: "the-disciplined-trader",
    title: "The Disciplined Trader",
    author: "Mark Douglas",
    category: "personal",
  },
  {
    id: "trading-in-the-zone",
    title: "Trading in the Zone",
    author: "Mark Douglas",
    category: "personal",
  },
];

export const bookCount = books.length;
