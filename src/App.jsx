import {
  ArrowIcon,
  BookIcon,
  BriefcaseIcon,
  CodeIcon,
  GitHubIcon,
  GitLabIcon,
  GlobeIcon,
  HomeIcon,
  LinkedInIcon,
  MailIcon,
  UserIcon,
  XIcon,
  YouTubeIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "./components/Icons.jsx";
import { useCallback, useEffect, useRef, useState } from "react";

const currentYear = new Date().getFullYear();

const cards = [
  {
    title: "Dev Portfolio",
    description:
      "Portfolio for Full Stack React, TypeScript, Python, APIs, cloud systems, tools, SaaS platforms etc.",
    href: "https://dev.bicknell.uk",
    cta: "dev.bicknell.uk",
    tone: "lightblue",
    icon: CodeIcon,
  },
  {
    title: "Personal Site",
    description:
      "Articles, videos, books, projects and thoughts on technology, productivity, business and life.",
    href: "https://adam.bicknell.uk",
    cta: "adam.bicknell.uk",
    tone: "blue",
    icon: BookIcon,
  },
  {
    title: "Bicknell Digital",
    description:
      "Websites, digital systems, e-commerce, consulting and ongoing digital support for businesses.",
    href: "https://www.bicknelldigital.co.uk",
    cta: "bicknelldigital.co.uk",
    tone: "brand",
    icon: BriefcaseIcon,
  },
];

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/adambicknell",
    icon: GitHubIcon,
  },
  {
    name: "GitLab",
    href: "https://gitlab.com/adamb-linelab",
    icon: GitLabIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/adamrbicknell",
    icon: LinkedInIcon,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/dambicknell",
    icon: FacebookIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/dambicknell",
    icon: InstagramIcon,
  },
  // {
  //   name: "YouTube",
  //   href: "https://www.youtube.com/",
  //   icon: YouTubeIcon,
  // },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/dambicknell",
    icon: TikTokIcon,
  },

  {
    name: "X",
    href: "https://x.com/dambicknell",
    icon: XIcon,
  },
  {
    name: "Personal Website",
    href: "https://adam.bicknell.uk",
    icon: GlobeIcon,
  },
];

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="bicknell.uk home">
        <span className="brand-mark">AB</span>
        <span className="brand-name">bicknell.uk</span>
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        <a className="nav-link nav-link-active" href="/">
          <HomeIcon />
          Home
        </a>
        <a className="nav-link" href="https://adam.bicknell.uk/about">
          <UserIcon />
          About
        </a>
        <a className="nav-link" href="mailto:adam@bicknell.uk">
          <MailIcon />
          Contact
        </a>
      </nav>
    </header>
  );
}

function HubCard({ card, descriptionRef, descriptionHeight }) {
  const Icon = card.icon;

  return (
    <article className={`hub-card hub-card-${card.tone}`}>
      <div className="icon-wrap" aria-hidden="true">
        <Icon />
      </div>

      <h2>{card.title}</h2>

      <p
        ref={descriptionRef}
        className="hub-card-description"
        style={
          descriptionHeight
            ? { minHeight: `${descriptionHeight}px` }
            : undefined
        }
      >
        {card.description}
      </p>

      <a className="card-button" href={card.href}>
        <span>{card.cta}</span>
        <ArrowIcon />
      </a>
    </article>
  );
}

function SocialLink({ social }) {
  const Icon = social.icon;

  return (
    <a
      className="social-link"
      href={social.href}
      aria-label={social.name}
      target="_blank"
      rel="noreferrer"
      title={social.name}
    >
      <Icon />
    </a>
  );
}

function useEqualCardDescriptionHeights(items) {
  const descriptionRefs = useRef([]);
  const [descriptionHeight, setDescriptionHeight] = useState(0);

  const setDescriptionRef = useCallback(
    (index) => (node) => {
      descriptionRefs.current[index] = node;
    },
    [],
  );

  useEffect(() => {
    const descriptions = descriptionRefs.current.filter(Boolean);

    if (!descriptions.length) {
      return undefined;
    }

    const updateHeight = () => {
      descriptions.forEach((description) => {
        description.style.minHeight = "0px";
      });

      const tallestHeight = Math.ceil(
        Math.max(
          ...descriptions.map((description) => description.scrollHeight),
        ),
      );

      setDescriptionHeight(tallestHeight);
    };

    const resizeObserver = new ResizeObserver(updateHeight);

    descriptions.forEach((description) => {
      resizeObserver.observe(description);
    });

    updateHeight();

    return () => {
      resizeObserver.disconnect();
    };
  }, [items]);

  return {
    descriptionHeight,
    setDescriptionRef,
  };
}

function App() {
  const { descriptionHeight, setDescriptionRef } =
    useEqualCardDescriptionHeights(cards);

  return (
    <div className="page-shell">
      <Header />

      <main>
        <section className="hero">
          <div className="hero-inner">
            <img
              className="profile-image"
              src="/adam.jpg"
              alt="Adam Bicknell"
              width="150"
              height="150"
            />

            <div className="hero-copy">
              <h1>Adam Bicknell</h1>
              <p className="subtitle">
                Software engineer, entrepreneur, writer, creator and founder.
              </p>
              <span className="divider" aria-hidden="true" />
              <p className="intro">
                This is the home for my work, ideas and projects across
                technology, business, books, videos, personal growth,
                spirituality and the esoteric.
              </p>
            </div>
          </div>
        </section>

        <section className="hub-grid" aria-label="Main links">
          {cards.map((card, index) => (
            <HubCard
              key={card.title}
              card={card}
              descriptionRef={setDescriptionRef(index)}
              descriptionHeight={descriptionHeight}
            />
          ))}
        </section>
      </main>

      <footer className="site-footer">
        <p>Connect with me</p>

        <div className="social-links">
          {socials.map((social) => (
            <SocialLink key={social.name} social={social} />
          ))}
        </div>

        <small>© {currentYear} Adam Bicknell. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default App;
