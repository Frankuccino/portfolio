export type BookCategory = "technical" | "personal";

export type Book = {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  /** Open Library CoverID, used to build the covers.openlibrary.org URL */
  coverId?: string;
  /** Shorter rendering for the spine, where the full title will not fit */
  spineTitle?: string;
};

export const books: Book[] = [
  // ——— Technical ———
  {
    id: "software-engineering-at-google",
    coverId: "10450993",
    title: "Software Engineering at Google",
    author: "Tom Winters, Tom Manshreck & Hyrum Wright",
    category: "technical",
  },
  {
    id: "fundamentals-of-software-architecture",
    coverId: "10193363",
    title: "Fundamentals of Software Architecture",
    author: "Mark Richards & Neal Ford",
    category: "technical",
  },
  {
    id: "software-architecture-the-hard-parts",
    coverId: "12318698",
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
    coverId: "8434671",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "technical",
  },
  {
    id: "architecting-for-scale",
    coverId: "8512077",
    title: "Architecting for Scale",
    author: "Lee Atchison",
    category: "technical",
  },
  {
    id: "becoming-a-data-head",
    coverId: "13177267",
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
    coverId: "6755148",
    title: "Version Control with Git",
    author: "Jon Loeliger & Matthew McCullough",
    category: "technical",
  },
  {
    id: "the-pragmatic-programmer",
    coverId: "10143650",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    category: "technical",
  },
  {
    id: "mastering-go",
    coverId: "8508880",
    title: "Mastering Go",
    author: "Mihalis Tsoukalos",
    category: "technical",
  },
  {
    id: "responsive-web-design",
    coverId: "10458472",
    title: "Responsive Web Design with HTML5 and CSS",
    author: "Ben Frain",
    category: "technical",
  },
  {
    id: "bootstrapping-microservices",
    coverId: "15273354",
    title: "Bootstrapping Microservices with Docker, Kubernetes, and Terraform",
    spineTitle: "Bootstrapping Microservices",
    author: "Ashley Davis",
    category: "technical",
  },
  {
    id: "sql-all-in-one-for-dummies",
    coverId: "8722155",
    title: "SQL All-in-One For Dummies",
    author: "Allen G. Taylor",
    category: "technical",
  },
  {
    id: "cracking-the-coding-interview",
    coverId: "7276811",
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    category: "technical",
  },
  {
    id: "ai-engineering",
    coverId: "15091156",
    title: "AI Engineering",
    author: "Chip Huyen",
    category: "technical",
  },
  {
    id: "designing-machine-learning-systems",
    coverId: "13314480",
    title: "Designing Machine Learning Systems",
    spineTitle: "Designing ML Systems",
    author: "Chip Huyen",
    category: "technical",
  },
  {
    id: "llm-engineers-handbook",
    title: "LLM Engineer's Handbook",
    author: "Paul Iusztin & Maxime Labonne",
    category: "technical",
  },
  {
    id: "architecting-ai-software-systems",
    title: "Architecting AI Software Systems",
    spineTitle: "Architecting AI Systems",
    author: "Richard D. Avila & Imran Ahmad",
    category: "technical",
  },
  {
    id: "llmops",
    title: "LLMOps: Managing Large Language Models in Production",
    spineTitle: "LLMOps",
    author: "Abi Aryan",
    category: "technical",
  },
  {
    id: "hands-on-machine-learning",
    coverId: "15225435",
    title: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow",
    spineTitle: "Hands-On Machine Learning",
    author: "Aurélien Géron",
    category: "technical",
  },
  {
    id: "high-performance-python",
    title: "High Performance Python",
    author: "Micha Gorelick & Ian Ozsvald",
    category: "technical",
  },
  {
    id: "architecture-patterns-with-python",
    coverId: "12423995",
    title: "Architecture Patterns with Python",
    author: "Harry J.W. Percival & Bob Gregory",
    category: "technical",
  },
  {
    id: "robust-python",
    coverId: "12932198",
    title: "Robust Python",
    author: "Patrick Viafore",
    category: "technical",
  },

  // ——— Personal ———
  {
    id: "principles-life-and-work",
    coverId: "8315355",
    title: "Principles: Life and Work",
    author: "Ray Dalio",
    category: "personal",
  },
  {
    id: "the-personal-mba",
    coverId: "6713257",
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
    coverId: "4941284",
    title: "The Effective Executive",
    author: "Peter F. Drucker",
    category: "personal",
  },
  {
    id: "emotional-intelligence",
    coverId: "1359485",
    title: "Emotional Intelligence",
    author: "Daniel Goleman",
    category: "personal",
  },
  {
    id: "the-lean-startup",
    coverId: "7104760",
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "personal",
  },
  {
    id: "zero-to-one",
    coverId: "9002334",
    title: "Zero to One",
    author: "Peter Thiel & Blake Masters",
    category: "personal",
  },
  {
    id: "the-laws-of-human-nature",
    coverId: "10170095",
    title: "The Laws of Human Nature",
    author: "Robert Greene",
    category: "personal",
  },
  {
    id: "mastery",
    coverId: "7561012",
    title: "Mastery",
    author: "Robert Greene",
    category: "personal",
  },
  {
    id: "the-art-of-seduction",
    coverId: "917840",
    title: "The Art of Seduction",
    author: "Robert Greene",
    category: "personal",
  },
  {
    id: "the-concise-33-strategies-of-war",
    coverId: "1119676",
    title: "The Concise 33 Strategies of War",
    author: "Robert Greene",
    category: "personal",
  },
  {
    id: "the-daily-laws",
    coverId: "11532633",
    title: "The Daily Laws",
    author: "Robert Greene",
    category: "personal",
  },
  {
    id: "the-48-laws-of-power",
    coverId: "6424160",
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    category: "personal",
  },
  {
    id: "the-22-immutable-laws-of-marketing",
    coverId: "4009958",
    title: "The 22 Immutable Laws of Marketing",
    author: "Al Ries & Jack Trout",
    category: "personal",
  },
  {
    id: "the-greatest-salesman-in-the-world",
    coverId: "8458650",
    title: "The Greatest Salesman in the World",
    author: "Og Mandino",
    category: "personal",
  },
  {
    id: "scientific-advertising",
    coverId: "3337286",
    title: "Scientific Advertising",
    author: "Claude C. Hopkins",
    category: "personal",
  },
  {
    id: "the-disciplined-trader",
    coverId: "89353",
    title: "The Disciplined Trader",
    author: "Mark Douglas",
    category: "personal",
  },
  {
    id: "trading-in-the-zone",
    coverId: "460625",
    title: "Trading in the Zone",
    author: "Mark Douglas",
    category: "personal",
  },
];

export const bookCount = books.length;

/**
 * Open Library serves covers by CoverID, which (unlike ISBN) is exempt from
 * their 100-requests-per-5-minutes rate limit. See
 * https://openlibrary.org/dev/docs/api/covers
 */
export const coverUrl = (book: Book, size: "S" | "M" | "L" = "M") =>
  book.coverId
    ? `https://covers.openlibrary.org/b/id/${book.coverId}-${size}.jpg`
    : undefined;
