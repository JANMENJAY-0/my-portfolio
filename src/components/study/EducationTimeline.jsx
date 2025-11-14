
import React, { useRef, useEffect, useState, useId, useLayoutEffect } from 'react';
import './EducationTimeline.css'; // <-- import the separated CSS

// Data for the timeline (Chronological display: oldest at top)
const educationData = [
  {
    title: "Matriculation",
    institution: "Kendriya Vidyalaya, Jajpur",
    period: "Jun 2018",
    description: [
      "Completed 10th grade under CBSE curriculum with distinction.",
      "Actively participated in inter-school sports and academic competitions.",
      "Developed early interest in computer science and technology."
    ],
    isLeft: true,
    icon: 'school' // Font Awesome icon name
  },
  {
    title: "Intermediate (Science Stream)",
    institution: "IMAGE College, Bhubaneswar, Odisha",
    period: "Jun 2021",
    description: [
      "Focused on Physics, Chemistry, and Mathematics.",
      "Participated in multiple state-level science fairs and coding events.",
      "Laid a strong foundation for pursuing higher studies in Information Technology."
    ],
    isLeft: false,
    icon: 'book-open' // Font Awesome icon name
  },
  {
    title: "Graduation in Information Technology Management",
    institution: "Ravenshaw University, Cuttack, Odisha",
    period: "Jun 2024",
    description: [
      "Graduated with a degree in Information Technology Management.",
      "Worked on academic projects focused on system automation and e-commerce applications.",
      "Explored areas like database systems, web development, and software project management."
    ],
    isLeft: true,
    icon: 'graduation-cap' // Font Awesome icon name
  }
];


// Component to render Font Awesome icon using the global CSS class (Monochrome)
const EducationIcon = ({ type, colorClass = "text-gray-300" }) => {
  // Use 'fa-solid' (fas) for the icons
  return (
    <i className={`fa-solid fa-${type} ${colorClass}`} style={{ fontSize: '1.25rem' }}></i>
  );
};

// --- START ELECTRIC BORDER COMPONENT INTEGRATION ---
const ElectricBorder = ({ children, color = '#6366F1', speed = 0.8, chaos = 0.6, thickness = 2, className, style }) => {
  const rawId = useId().replace(/[:]/g, '');
  const filterId = `turbulent-displace-${rawId}`;
  const svgRef = useRef(null);
  const rootRef = useRef(null);
  const strokeRef = useRef(null);

  const updateAnim = () => {
    const svg = svgRef.current;
    const host = rootRef.current;
    const strokeEl = strokeRef.current;
    if (!svg || !host || !strokeEl) return;

    strokeEl.style.filter = `url(#${filterId})`;

    const width = Math.max(1, Math.round(host.clientWidth || host.getBoundingClientRect().width || 0));
    const height = Math.max(1, Math.round(host.clientHeight || host.getBoundingClientRect().height || 0));

    const dyAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dy"]'));
    if (dyAnims.length >= 2) {
      dyAnims[0].setAttribute('values', `${height}; 0`);
      dyAnims[1].setAttribute('values', `0; -${height}`);
    }

    const dxAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dx"]'));
    if (dxAnims.length >= 2) {
      dxAnims[0].setAttribute('values', `${width}; 0`);
      dxAnims[1].setAttribute('values', `0; -${width}`);
    }

    const baseDur = 6;
    const dur = Math.max(0.001, baseDur / (speed || 1));
    [...dyAnims, ...dxAnims].forEach(a => a.setAttribute('dur', `${dur}s`));

    const disp = svg.querySelector('feDisplacementMap');
    if (disp) disp.setAttribute('scale', String(30 * (chaos || 1)));

    const filterEl = svg.querySelector(`#${CSS.escape(filterId)}`);
    if (filterEl) {
      filterEl.setAttribute('x', '-200%');
      filterEl.setAttribute('y', '-200%');
      filterEl.setAttribute('width', '500%');
      filterEl.setAttribute('height', '500%');
    }
  };

  useEffect(() => {
    updateAnim();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, chaos]);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ro = new ResizeObserver(() => updateAnim());
    ro.observe(rootRef.current);
    updateAnim();
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const baseStyle = {
    position: 'relative',
    borderRadius: '1rem',
    overflow: 'visible',
    isolation: 'isolate',
    '--electric-border-color': color,
    '--eb-border-width': `${thickness}px`,
  };

  const ebSvgStyle = {
    position: 'fixed',
    left: '-10000px',
    top: '-10000px',
    width: '10px',
    height: '10px',
    opacity: '0.001',
    pointerEvents: 'none',
  };

  const ebContentStyle = {
    position: 'relative',
    borderRadius: 'inherit',
    zIndex: 1,
  };

  const ebLayersStyle = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    zIndex: 2,
  };

  const layerBaseStyle = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    boxSizing: 'border-box',
  };

  const strokeStyle = {
    ...layerBaseStyle,
    border: `${thickness}px solid ${color}`,
    transition: 'transform 0.3s ease',
  };

  const glow1Style = {
    ...layerBaseStyle,
    border: `${thickness}px solid rgba(255, 255, 255, 0.6)`,
    opacity: 0.5,
    filter: `blur(${0.5 + thickness * 0.25}px)`,
  };

  const glow2Style = {
    ...layerBaseStyle,
    border: `${thickness}px solid #FFFFFF`,
    opacity: 0.5,
    filter: `blur(${2 + thickness * 0.5}px)`,
  };

  const backgroundGlowStyle = {
    ...layerBaseStyle,
    zIndex: -1,
    transform: 'scale(1.08)',
    filter: 'blur(32px)',
    opacity: 0.3,
    background: `linear-gradient(-30deg, ${color}66, transparent, ${color}66)`,
  };

  return (
    <div ref={rootRef} className={`electric-border-root ${className ?? ''}`} style={{ ...baseStyle, ...style }}>
      <svg ref={svgRef} aria-hidden="true" focusable="false" style={ebSvgStyle}>
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="-200%" y="-200%" width="500%" height="500%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise3" seed="2" />
            <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise4" seed="2" />
            <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      <div className="eb-layers" style={ebLayersStyle}>
        <div ref={strokeRef} style={strokeStyle} />
        <div style={glow1Style} />
        <div style={glow2Style} />
        <div style={backgroundGlowStyle} />
      </div>

      <div className="eb-content" style={ebContentStyle}>{children}</div>
    </div>
  );
};
// --- END ELECTRIC BORDER COMPONENT INTEGRATION ---


const TimelineItem = ({ item }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isLeft = item.isLeft;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const baseClasses = `timeline-item ${isLeft ? 'is-left' : 'is-right'}`;
  const cardOuterClasses = `card-outer ${isVisible ? 'visible' : ''}`;
  const markerClasses = `timeline-marker ${isVisible ? 'visible' : ''}`;
  const dateClasses = `date-label ${isLeft ? 'date-right' : 'date-left'}`;
  const markerStyle = { left: 'calc(50% - 18px)' };

  return (
    <div ref={ref} className={baseClasses}>
      <div className={cardOuterClasses}>
        <ElectricBorder
          color="#6366F1"
          thickness={2}
          speed={0.6}
          chaos={0.6}
          className="card-electric-wrapper"
        >
          <div className="card-inner">
            <h3 className="card-title">{item.title}</h3>
            <p className="card-institution">{item.institution}</p>
            <ul className="card-description-list">
              {item.description.map((desc, idx) => (<li key={idx}>{desc}</li>))}
            </ul>
          </div>
        </ElectricBorder>
      </div>

      <div className={markerClasses} style={markerStyle}>
        <EducationIcon type={item.icon} colorClass="text-gray-300" />
      </div>

      <div className="date-wrapper">
        <span className={dateClasses}>
          {item.period}
        </span>

        <span className="date-mobile">
          {item.period}
        </span>
      </div>
    </div>
  );
};

export default function academic() {
  // Load Font Awesome CSS link if it isn't already present
  useEffect(() => {
    if (!document.querySelector('#fa-cdn')) {
      const link = document.createElement('link');
      link.id = 'fa-cdn';
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="app-container">
      <header className="timeline-header">
        <h1 className="header-title">Education Timeline</h1>
        <p className="header-subtitle">My journey through academia and specialized training.</p>
      </header>

      <div className="timeline-container">
        <div className="timeline-line"></div>

        {educationData.map((item, index) => (
          <TimelineItem key={index} item={item} />
        ))}

        <div className="closing-marker">
          <div className="closing-marker-inner">
            <div className="closing-marker-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
