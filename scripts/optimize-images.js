import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 图片目录
const imagesDir = path.join(__dirname, '../public/images');

// 最大宽度限制，根据网站实际需求调整
const maxWidth = 1200;

// 遍历目录中的所有文件和子目录
async function processDirectory(directoryPath) {
  try {
    const items = fs.readdirSync(directoryPath);
    
    for (const item of items) {
      const itemPath = path.join(directoryPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        // 递归处理子目录
        await processDirectory(itemPath);
      } else if (stat.isFile() && isImage(item)) {
        // 处理图片文件
        await optimizeImage(itemPath);
      }
    }
  } catch (error) {
    console.error(`处理目录失败: ${directoryPath}`, error);
  }
}

// 检查文件是否为图片
function isImage(filename) {
  const ext = path.extname(filename).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
}

// 优化图片
async function optimizeImage(imagePath) {
  try {
    const filename = path.basename(imagePath);
    const dir = path.dirname(imagePath);
    const outputWebP = path.join(dir, `${path.parse(filename).name}.webp`);
    
    // 获取图片信息
    const metadata = await sharp(imagePath).metadata();
    
    // 计算新的宽度，保持宽高比
    const width = Math.min(metadata.width, maxWidth);
    const height = Math.round((width / metadata.width) * metadata.height);
    
    // 优化并转换为WebP格式
    await sharp(imagePath)
      .resize(width, height)
      .webp({ quality: 80 }) // 80%的质量通常是文件大小和质量的良好平衡
      .toFile(outputWebP);
    
    console.log(`已优化: ${outputWebP}`);
    
    // 创建一个经过优化的JPG版本(某些浏览器可能不支持WebP)
    const outputJpg = path.join(dir, `${path.parse(filename).name}_optimized.jpg`);
    await sharp(imagePath)
      .resize(width, height)
      .jpeg({ quality: 80, progressive: true })
      .toFile(outputJpg);
    
    console.log(`已优化: ${outputJpg}`);
  } catch (error) {
    console.error(`优化图片失败: ${imagePath}`, error);
  }
}

// 开始处理
(async () => {
  console.log('开始优化图片...');
  await processDirectory(imagesDir);
  console.log('图片优化完成!');
})(); 