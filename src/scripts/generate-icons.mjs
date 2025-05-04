import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function kebabToPascalCase(str) {
  return str
    .replace(/[0-9\s]/g, '') // Remove numbers
    .replace(/[-_]+(.)?/g, (_, char) => (char ? char.toUpperCase() : '')) // Convert to PascalCase
    .replace(/^\w/, (c) => c.toUpperCase()); // Ensure first letter is uppercase
}

function generateIconsFile(type) {
  const capitalized = type[0].toLocaleUpperCase() + type.slice(1);
  const iconsDir = resolve(__dirname, `../assets/icons/${type}`);
  const outputFile = resolve(__dirname, `../components/Icon/icons-${type}.ts`);

  const icons = fs
    .readdirSync(iconsDir)
    .filter((file) => file.endsWith('.svg'))
    .map((file) => file.replace('.svg', ''));

  const fileContent = `
  ${icons.map((icon) => `import ${kebabToPascalCase(icon)}${capitalized} from '../../assets/icons/${type}/${icon}.svg';`).join('\n')}

  export const ${capitalized}Icons = {
    ${icons.map((icon) => `${kebabToPascalCase(icon)}${capitalized},`).join('\n')}
  } as const;

  export type ${capitalized}IconName = keyof typeof ${capitalized}Icons;
`;

  fs.writeFileSync(outputFile, fileContent.trim());
  console.log(`✅ Icons file generated: ${outputFile}`);
}
generateIconsFile('filled');
generateIconsFile('outlined');
