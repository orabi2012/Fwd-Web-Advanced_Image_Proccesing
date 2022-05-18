import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

async function img_processing(imgName: string, height: string, width: string) {
  const h = parseInt(height);
  const w = parseInt(width);

  const thumb_dir = path.join(__dirname, '../..', `/images/thumb`);
  if (!fs.existsSync(thumb_dir)) {
    fs.mkdir(thumb_dir, { recursive: true }, (err) => {
      err?.message;
    });
  }

  try {
    await sharp(path.join(__dirname, '../..', `/images/${imgName}.jpg`))
      .resize(w, h)
      .toFile(
        path.join(__dirname, '../..', `/images/thumb/${imgName}_${w}_${h}.jpg`)
      );

    return true;
  } catch (error) {
    return false;
    //  will be 501 ('internal server error');
  }
}

export default img_processing;
