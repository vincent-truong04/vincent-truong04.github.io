import content from './content.json';

// Image paths in content.json are relative to public/.
export const asset = (src) => `${process.env.PUBLIC_URL}${src}`;

export default content;
