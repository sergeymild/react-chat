import React from 'react';

const getAnimatedGradient = (primary, secondary, id) => {
  const defaultAttributes = {
    attributeName: 'offset',
    dur: '1.5s',
    repeatCount: 'indefinite'
  };
  return (
    <linearGradient id={id}>
      <stop offset='0%' stopColor={primary.color} stopOpacity={primary.opacity}>
        <animate
          {...defaultAttributes}
          values='-2; 1'
        />
      </stop>
      <stop offset='50%' stopColor={secondary.color} stopOpacity={secondary.opacity}>
        <animate
          {...defaultAttributes}
          values='-1.5; 1.5'
        />
      </stop>
      <stop offset='100%' stopColor={primary.color} stopOpacity={primary.opacity}>
        <animate
          {...defaultAttributes}
          values='-1; 2'
        />
      </stop>
    </linearGradient>
  );
};

const getAnimatedPaths = (paths, size, primary, secondary, key) => {
  const clipPathId = `path-${key}`;
  const linearGradientId = `gradient-${key}`;
  return (
    <React.Fragment>
      <rect
        clipPath={`url(#${clipPathId})`}
        fill={`url(#${linearGradientId})`}
        height={size.height}
        width={size.width}
        x='0'
        y='0'
      />
      <defs>
        {getClipPaths(paths, clipPathId)}
        {getAnimatedGradient(primary, secondary, linearGradientId)}
      </defs>
    </React.Fragment>
  );
};

const getClipPaths = (paths, id) => (
  <clipPath id={id}>
    {paths}
  </clipPath>
);

const getInlineSvg = (key, classNames = null) => {
  const primary = {
    color: '#eceff1',
    opacity: 1
  };
  const secondary = {
    color: '#cfd8dc',
    opacity: 0.5
  };
  const type = loaderDictionary[key] ? 'animated' : 'static';
  const { paths, size } = svgDictionary[key];
  const svgWidth = size.width || size.height;
  const svgHeight = size.height || size.width;
  const svgProperties = {
    fill: type === 'static' ? 'currentcolor' : null,
    verticalAlign: 'middle',
    width: svgWidth,
    height: svgHeight
  };
  return (
    <svg
      className={classNames}
      fit='true'
      preserveAspectRatio='xMidYMid meet'
      style={svgProperties}
      version='1.1'
      viewBox={`0 0 ${type === 'static' ? polymerSize : svgWidth} ${type === 'static' ? polymerSize : svgHeight}`}
    >
      {type === 'animated' ? getAnimatedPaths(paths, size, primary, secondary, key) : paths}
    </svg>
  );
};

const polymerSize = 24;

const defaultIconSize = {
  height: 32,
  width: 32
};

const loaderDictionary = {
  avatarRound: {
    paths: (
      <circle cx='16' cy='16' r='16' />
    ),
    size: {
      height: 32,
      width: 32
    }
  },
  avatarSquare: {
    paths: (
      <rect x='0' y='0' rx='5' ry='5' width='32' height='32' />
    ),
    size: {
      height: 32,
      width: 32
    }
  },
  icon: {
    paths: (
      <rect x='0' y='0' rx='5' ry='5' width='32' height='32' />
    ),
    size: {
      height: 32,
      width: 32
    }
  },
  media: {
    paths: (
      <rect x='0' y='0' rx='5' ry='5' width='120' height='90' />
    ),
    size: {
      height: 90,
      width: 120
    }
  },
  message: {
    paths: (
      <React.Fragment>
        <rect x='0' y='0' rx='5' ry='5' width='70' height='10' />
        <rect x='0' y='20' rx='5' ry='5' width='130' height='10' />
        <rect x='140' y='20' rx='5' ry='5' width='100' height='10' />
        <rect x='0' y='40' rx='5' ry='5' width='100' height='10' />
        <rect x='110' y='40' rx='5' ry='5' width='60' height='10' />
        <rect x='180' y='40' rx='5' ry='5' width='60' height='10' />
        <rect x='180' y='60' rx='5' ry='5' width='60' height='10' />
      </React.Fragment>
    ),
    size: {
      height: 70,
      width: 240
    }
  },
  room: {
    paths: (
      <React.Fragment>
        <circle cx='35' cy='35' r='25' />
        <rect x='70' y='14' rx='0' ry='0' width='80' height='8' />
        <rect x='70' y='30' rx='0' ry='0' width='2000' height='8' />
        <rect x='70' y='46' rx='0' ry='0' width='2000' height='8' />
      </React.Fragment>
    ),
    size: {
      height: 70,
      width: 2000
    }
  }
};

const placeholderDictionary = {
  archive: {
    paths: (
      <g>
        <path d='M20.54 5.23l-1.39-1.68c-.27-.34-.68-.55-1.15-.55h-12c-.47
                 0-.88.21-1.16.55l-1.38 1.68c-.29.34-.46.79-.46 1.27v12.5c0
                 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-12.5c0-.48-.17-.93-.46-1.27zm-8.54
                 12.27l-5.5-5.5h3.5v-2h4v2h3.5l-5.5 5.5zm-6.88-12.5l.81-1h12l.94 1h-13.75z' />
      </g>
    ),
    size: defaultIconSize
  },
  attach: {
    paths: (
      <g>
        <path d='M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4v-12.5c0-1.38 1.12-2.5 2.5-2.5s2.5
                 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1v-9.5h-1.5v9.5c0 1.38 1.12 2.5
                 2.5 2.5s2.5-1.12 2.5-2.5v-10.5c0-2.21-1.79-4-4-4s-4 1.79-4 4v12.5c0 3.04 2.46 5.5
                 5.5 5.5s5.5-2.46 5.5-5.5v-11.5h-1.5z' />
      </g>
    ),
    size: defaultIconSize
  },
  audio: {
    paths: (
      <g>
        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 6h-3v7c0
                 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3c.55 0 1.06.16 1.5.42V6H16v2z' />
      </g>
    ),
    size: defaultIconSize
  },
  back: {
    paths: (
      <g>
        <path d='M15.41 7.41l-1.41-1.41-6 6 6 6 1.41-1.41-4.58-4.59z' />
      </g>
    ),
    size: defaultIconSize
  },
  check: {
    paths: (
      <g>
        <path d='M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z' />
      </g>
    ),
    size: defaultIconSize
  },
  circle: {
    paths: (
      <g>
        <circle cx='12' cy='12' r='10' />
      </g>
    ),
    size: defaultIconSize
  },
  collapse: {
    paths: (
      <g>
        <path d='M7.41 18.59l1.42 1.41 3.17-3.17 3.17 3.17 1.41-1.41-4.58-4.59-4.59
                 4.59zm9.18-13.18l-1.42-1.41-3.17 3.17-3.17-3.17-1.42 1.41 4.59 4.59 4.59-4.59z' />
      </g>
    ),
    size: defaultIconSize
  },
  copy: {
    paths: (
      <g>
        <path d='M16 1h-12c-1.1 0-2 .9-2 2v14h2v-14h12v-2zm3 4h-11c-1.1 0-2 .9-2 2v14c0
                 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm0 16h-11v-14h11v14z' />
      </g>
    ),
    size: defaultIconSize
  },
  cross: {
    paths: (
      <g>
        <path d='M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59
                 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z' />
      </g>
    ),
    size: defaultIconSize
  },
  delete: {
    paths: (
      <g>
        <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9
                 2-2v-12h-12v12zm13-15h-3.5l-1-1h-5l-1 1h-3.5v2h14v-2z' />
      </g>
    ),
    size: defaultIconSize
  },
  description: {
    paths: (
      <g>
        <path d='M14 2h-8c-1.1 0-1.99.9-1.99 2l-.01 16c0 1.1.89 2 1.99 2h12.01c1.1 0 2-.9
                 2-2v-12l-6-6zm2 16h-8v-2h8v2zm0-4h-8v-2h8v2zm-3-5v-5.5l5.5 5.5h-5.5z' />
      </g>
    ),
    size: defaultIconSize
  },
  email: {
    paths: (
      <g>
        <path d='M20 4h-16c-1.1 0-1.99.9-1.99 2l-.01 12c0 1.1.9 2 2 2h16c1.1 0
                 2-.9 2-2v-12c0-1.1-.9-2-2-2zm0 4l-8 5-8-5v-2l8 5 8-5v2z' />
      </g>
    ),
    size: defaultIconSize
  },
  error: {
    paths: (
      <g>
        <path d='M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48
                 10-10-4.48-10-10-10zm1 15h-2v-2h2v2zm0-4h-2v-6h2v6z' />
      </g>
    ),
    size: defaultIconSize
  },
  expand: {
    paths: (
      <g>
        <path d='M12 5.83l3.17 3.17 1.41-1.41-4.58-4.59-4.59 4.59 1.42 1.41 3.17-3.17zm0
                 12.34l-3.17-3.17-1.41 1.41 4.58 4.59 4.59-4.59-1.42-1.41-3.17 3.17z' />
      </g>
    ),
    size: defaultIconSize
  },
  file: {
    paths: (
      <g>
        <path d='M6 2c-1.1 0-1.99.9-1.99 2l-.01 16c0 1.1.89 2 1.99
                 2h12.01c1.1 0 2-.9 2-2v-12l-6-6h-8zm7 7v-5.5l5.5 5.5h-5.5z' />
      </g>
    ),
    size: defaultIconSize
  },
  forward: {
    paths: (
      <g>
        <path d='M12 8v-4l8 8-8 8v-4h-8v-8z' />
      </g>
    ),
    size: defaultIconSize
  },
  gif: {
    paths: (
      <g>
        <path d='M10 8v8l5-4-5-4zm9-5h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2
                 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm0 16h-14v-14h14v14z' />
      </g>
    ),
    size: defaultIconSize
  },
  image: {
    paths: (
      <g>
        <path d='M21 19v-14c0-1.1-.9-2-2-2h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2
                 2h14c1.1 0 2-.9 2-2zm-12.5-5.5l2.5 3.01 3.5-4.51 4.5 6h-14l3.5-4.5z' />
      </g>
    ),
    size: defaultIconSize
  },
  info: {
    paths: (
      <g>
        <path d='M11 17h2v-6h-2v6zm1-15c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0
                 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v-2h-2v2z' />
      </g>
    ),
    size: defaultIconSize
  },
  link: {
    paths: (
      <g>
        <path d='M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4v-1.9h-4c-2.76 0-5 2.24-5 5s2.24 5 5
                 5h4v-1.9h-4c-1.71 0-3.1-1.39-3.1-3.1zm4.1 1h8v-2h-8v2zm9-6h-4v1.9h4c1.71
                 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4v1.9h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z' />
      </g>
    ),
    size: defaultIconSize
  },
  location: {
    paths: (
      <g>
        <path d='M12 2c-3.87 0-7 3.13-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0
                 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' />
      </g>
    ),
    size: defaultIconSize
  },
  markdown: {
    paths: (
      <g>
        <path d='M3 13h2v-2h-2v2zm0 4h2v-2h-2v2zm0-8h2v-2h-2v2zm4
                 4h14v-2h-14v2zm0 4h14v-2h-14v2zm0-10v2h14v-2h-14z' />
      </g>
    ),
    size: defaultIconSize
  },
  name: {
    paths: (
      <g>
        <path d='M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1-2.1-.94-2.1-2.1.94-2.1 2.1-2.1m0
                 9c2.97 0 6.1 1.46 6.1 2.1v1.1h-12.2v-1.1c0-.64 3.13-2.1 6.1-2.1m0-10.9c-2.21 0-4
                 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z' />
      </g>
    ),
    size: defaultIconSize
  },
  new: {
    paths: (
      <circle cx='12' cy='12' r='10' />
    ),
    size: defaultIconSize
  },
  next: {
    paths: (
      <g>
        <path d='M10 6l-1.41 1.41 4.58 4.59-4.58 4.59 1.41 1.41 6-6z' />
      </g>
    ),
    size: defaultIconSize
  },
  pdf: {
    paths: (
      <g>
        <path d='M19 3h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9
                 2-2v-14c0-1.1-.9-2-2-2zm-10 14h-2v-7h2v7zm4 0h-2v-10h2v10zm4 0h-2v-4h2v4z' />
      </g>
    ),
    size: defaultIconSize
  },
  phone: {
    paths: (
      <g>
        <path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24
                 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1v3.49c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17
                 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' />
      </g>
    ),
    size: defaultIconSize
  },
  pin: {
    paths: (
      <g>
        <path d='M17 3h-10c-1.1 0-1.99.9-1.99 2l-.01 16 7-3 7 3v-16c0-1.1-.9-2-2-2z' />
      </g>
    ),
    size: defaultIconSize
  },
  profile: {
    paths: (
      <g>
        <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4
                 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
      </g>
    ),
    size: defaultIconSize
  },
  refresh: {
    paths: (
      <g>
        <path d='M17.65 6.35c-1.45-1.45-3.44-2.35-5.65-2.35-4.42 0-7.99 3.58-7.99 8s3.57
                 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31
                 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78l-3.22 3.22h7v-7l-2.35 2.35z' />
      </g>
    ),
    size: defaultIconSize
  },
  reply: {
    paths: (
      <g>
        <path d='M10 9v-4l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z' />
      </g>
    ),
    size: defaultIconSize
  },
  search: {
    paths: (
      <g>
        <path d='M15.5 14h-.79l-.28-.27c.98-1.14 1.57-2.62 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5
                 2.91-6.5 6.5 2.91 6.5 6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99
                 1.49-1.49-4.99-5zm-6 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5
                 4.5-2.01 4.5-4.5 4.5z' />
      </g>
    ),
    size: defaultIconSize
  },
  send: {
    paths: (
      <g>
        <path d='M2.01 21l20.99-9-20.99-9-.01 7 15 2-15 2z' />
      </g>
    ),
    size: defaultIconSize
  },
  share: {
    paths: (
      <g>
        <path d='M18 16.08c-.76 0-1.44.3-1.96.77l-7.13-4.15c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5
                 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7l-7.05
                 4.11c-.54-.5-1.25-.81-2.04-.81-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12
                 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61
                 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z' />
      </g>
    ),
    size: defaultIconSize
  },
  square: {
    paths: (
      <g>
        <rect x='2' y='2' rx='5' ry='5' width='20' height='20' />
      </g>
    ),
    size: defaultIconSize
  },
  star: {
    paths: (
      <g>
        <path d='M12 17.27l6.18 3.73-1.64-7.03 5.46-4.73-7.19-.61-2.81-6.63-2.81
                 6.63-7.19.61 5.46 4.73-1.64 7.03z' />
      </g>
    ),
    size: defaultIconSize
  },
  unread: {
    paths: (
      <g>
        <path d='M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9h-3l4
                 4 4-4h-3c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42
                 1.44c1.52 1.16 3.42 1.86 5.48 1.86 4.97 0 9-4.03 9-9s-4.03-9-9-9z'></path>
      </g>
    ),
    size: defaultIconSize
  },
  video: {
    paths: (
      <g>
        <path d='M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2
                 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z' />
      </g>
    ),
    size: defaultIconSize
  },
  website: {
    paths: (
      <g>
        <path d='M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm-1
                 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79l4.79 4.79v1c0 1.1.9 2
                 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55
                 0 1-.45 1-1v-2h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' />
      </g>
    ),
    size: defaultIconSize
  }
};

const loaderKeys = Object.keys(loaderDictionary);

const placeholderKeys = Object.keys(placeholderDictionary);

const svgDictionary = { ...loaderDictionary, ...placeholderDictionary };

export {
  getInlineSvg,
  loaderKeys,
  placeholderKeys,
  svgDictionary
};
