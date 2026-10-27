const KNOWN_SUBJECTS = {
  java: {
    slug: 'openjdk',
    color: '#007396',
    label: 'Java',
  },
  'core java': {
    slug: 'openjdk',
    color: '#007396',
    label: 'Java',
  },
  react: {
    slug: 'react',
    color: '#61DAFB',
    label: 'React',
  },
  javascript: {
    slug: 'javascript',
    color: '#F7DF1E',
    label: 'JS',
  },
  js: {
    slug: 'javascript',
    color: '#F7DF1E',
    label: 'JS',
  },
  typescript: {
    slug: 'typescript',
    color: '#3178C6',
    label: 'TS',
  },
  sql: {
    slug: 'mysql',
    color: '#4479A1',
    label: 'SQL',
  },
  python: {
    slug: 'python',
    color: '#3776AB',
    label: 'Py',
  },
  node: {
    slug: 'nodedotjs',
    color: '#339933',
    label: 'Node',
  },
  html: {
    slug: 'html5',
    color: '#E34F26',
    label: 'HTML',
  },
  css: {
    slug: 'css3',
    color: '#1572B6',
    label: 'CSS',
  },
  git: {
    slug: 'git',
    color: '#F05032',
    label: 'Git',
  },
  spring: {
    slug: 'spring',
    color: '#6DB33F',
    label: 'Spring',
  },
  mongodb: {
    slug: 'mongodb',
    color: '#47A248',
    label: 'Mongo',
  },
  docker: {
    slug: 'docker',
    color: '#2496ED',
    label: 'Docker',
  },
}

function hashString(value) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

const FALLBACK_COLORS = [
  '#4f46e5',
  '#0891b2',
  '#059669',
  '#d97706',
  '#db2777',
  '#7c3aed',
]

export function getSubjectIcon(name) {
  const normalized = name.trim().toLowerCase()
  const known = KNOWN_SUBJECTS[normalized]

  if (known) {
    return {
      type: 'logo',
      iconUrl: `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${known.slug}.svg`,
      color: known.color,
      initials: known.label.slice(0, 2).toUpperCase(),
    }
  }

  const words = name.trim().split(/\s+/).filter(Boolean)
  const initials =
    words.length >= 2
      ? (words[0][0] + words[1][0]).toUpperCase()
      : name.trim().slice(0, 2).toUpperCase() || '?'

  const colorIndex = hashString(normalized || name) % FALLBACK_COLORS.length

  return {
    type: 'initials',
    iconUrl: null,
    color: FALLBACK_COLORS[colorIndex],
    initials,
  }
}
