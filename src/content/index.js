import content from './content.json';

// Image paths in content.json are relative to public/.
export const asset = (src) => `${process.env.PUBLIC_URL}${src}`;

// Page sections in order. Sections whose entries are empty are left out,
// along with their nav link. Each gets a floorplan designator (U1, U2...).
const SECTIONS = [
    { id: 'about', label: 'About', title: 'About Me', show: true },
    { id: 'experience', label: 'Experience', title: 'Experience', show: content.experience.length > 0 },
    { id: 'projects', label: 'Projects', title: 'Projects', show: true },
    { id: 'research', label: 'Research', title: 'Research', show: content.research.length > 0 },
    { id: 'coursework', label: 'Coursework', title: 'Coursework', show: content.coursework.length > 0 },
    { id: 'contact', label: 'Contact', title: 'Contact Me', show: true },
];

export const sections = SECTIONS
    .filter((section) => section.show)
    .map((section, i) => ({ ...section, designator: `U${i + 1}` }));

export const sectionById = (id) => sections.find((section) => section.id === id);

export default content;
