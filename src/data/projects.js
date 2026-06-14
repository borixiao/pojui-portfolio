import deg92Cover from '../assets/design/92deg-cover.jpg'
import deg92Brew from '../assets/design/92deg-scouse-brew.png'
import deg92Pack from '../assets/design/92deg-packaging.png'
import reebokPoster from '../assets/design/reebok-poster.jpg'
import reebokLogo from '../assets/design/reebok-logo.jpg'
import reebokProducts from '../assets/design/reebok-products.jpg'
import reebokBillboard from '../assets/design/reebok-billboard.jpg'
import reebokUiux from '../assets/design/reebok-uiux.png'
import artsyImg from '../assets/artsy-dublin.png'
import hybridImg from '../assets/hybrid-plant.jpeg'
import SJGImg from '../assets/SanJuanGaztelugatxe.png'
import returnImg from '../assets/return.png'
import processing1 from '../assets/spaceFuelRun.png'
import Solarsystem from '../assets/Solarsystem.png'
import Fleurdeserre from '../assets/Fleurdeserre.png'
export const projects = [
  {
    id: 1,
    title: "Artsy Dublin",
    category: "Web App",
    description:
      "An arts and culture event discovery platform for Dublin. Aggregates exhibitions, performances, and open-call events with location-based filtering and personalised recommendations.",
    tech: ["React", "Node.js", "Express", "MySQL"],
    image: artsyImg,
    color: "#e8e0d4",
    accent: "#c4a882",
    github: null,
    demo: "https://artsy-dublin.vercel.app/",
    tag: "WEB DEV",
  },
  {
    id: 2,
    title: "San Juan de Gaztelugatxe",
    category: "Web App",
    description:
      "The purpose of this website is to help people understand and plan a visit to San Juan de Gaztelugatxe. ",
    tech: ["HTML", "CSS", "JavaScript", "Digital Marketing"],
    image: SJGImg,
    color: "#e0d4e0",
    accent: "#9b7aad",
    github: 'https://github.com/borixiao/html-SanJuanGaztelugatxe',
    demo: 'https://borixiao.github.io/html-SanJuanGaztelugatxe/',
    tag: "WEB DEV",
  },
  {
    id: 3,
    title: "FLEUR DE SERRE",
    category: "Web App",
    description:
      "The website is designed to showcase plants with a French-inspired visual style",
    tech: ["HTML", "CSS", "JavaScript", "Digital Marketing"],
    image: Fleurdeserre,
    color: "#e0d4e0",
    accent: "#9b7aad",
    github: 'https://github.com/borixiao/midterm-1',
    demo: 'https://borixiao.github.io/midterm-1/',
    tag: "WEB DEV",
  },
  {
    id: 4,
    title: "Hybrid Plant Ecology",
    category: "VR / Unity",
    description:
      "A speculative VR ecosystem built in Unity exploring hybrid organism design. Imagines plant-animal chimeras evolving in response to climate scenarios — part science fiction, part ecological commentary.",
    tech: ["Unity", "C#", "VR", "3D Modelling"],
    image: hybridImg,
    color: "#d4e0d8",
    accent: "#6b9e7a",
    github: null,
    demo: null,
    tag: "VR / CREATIVE",
  },
  {
    id: 5,
    title: "The Return",
    category: "Interactive Fiction",
    description:
      "An experimental interactive horror narrative created with Twine. Inspired by Eastern Folk Horror and psychological thriller storytelling, the project explores memory, guilt, and karmic cycles through branching narrative design, religious symbolism, and atmosphere-driven interaction.",
    tech: ["Twine", "Narrative Design", "Interactive Storytelling", "Sound Design"],
    image: returnImg,
    color: "#d8d2cc",
    accent: "#7a5c52",
    github: null,
    demo: "https://brian0725.itch.io/the-return-10",
    tag: "HORROR / NARRATIVE",
  },
];

export const designProjects = [
  {
    id: 'd1',
    title: 'Reebok Brand Identity Redesign',
    category: 'Brand Identity',
    description:
      'A full brand identity redesign for Reebok — including a new logo mark, campaign posters, merchandise mockups, billboard advertising, and a responsive website redesign. Built around the campaign line "Be Bold. Be You."',
    tags: ['Brand Identity', 'Logo Design', 'UI/UX', 'Campaign', 'Merchandise'],
    image: reebokPoster,
    gallery: [reebokLogo, reebokProducts, reebokBillboard, reebokUiux],
    year: '2025',
    collaborators: ['Zhibo Cao', 'Dhanshri Sormace'],
  },
  {
    id: 'd2',
    title: '92 Degrees Brand Refresh',
    category: 'Brand Strategy',
    description:
      'A marketing and brand refresh proposal for 92 Degrees, a Liverpool-based specialty coffee brand. Proposed "Scouse Brew" as a signature product rooted in local identity, alongside signature packaging and a merchandise line.',
    tags: ['Brand Strategy', 'Marketing', 'Visual Design', 'Product Concept'],
    image: deg92Cover,
    gallery: [deg92Brew, deg92Pack],
    year: '2025',
    collaborators: [],
  },
]

export const processingProjects = [
  {
    id: 'p0',
    title: 'The Shape of Freedom',
    description:
      'Webcam silhouette detection dissolves the human form into a flock of animated birds. Built with Processing, OpenCV background subtraction, and a custom Bird physics system.',
    tech: ['Processing', 'OpenCV', 'Webcam', 'Generative Art'],
    liveCanvas: 'bird', // signals the card to render BirdCanvas instead of an image
    sourceCode: null,
    demo: null,
  },
  {
    id: 'p1',
    title: 'Particle Flow',
    description: 'Generative particle system reacting to mouse movement.',
    image: processing1,
    sourceCode: null,
    demo: null,
  },
  {
    id: 'p2',
    title: 'Noise Terrain',
    description: 'Perlin noise landscape with animated colour gradient.',
    image: Solarsystem,
    sourceCode: null,
    demo: null,
  },
  {
    id: 'p3',
    title: 'Recursive Tree',
    description: 'Interactive fractal tree grown with keyboard controls.',
    image: null,
    sourceCode: null,
    demo: null,
  },
]
