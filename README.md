# 图片文件夹分割说明

这个文件夹包含了原始 `web/images` 文件夹的分割版本，每个子文件夹大小都控制在25MB以内，以便上传到GitHub。

## 文件夹结构

- `images_part_01/` - 82.59MB (1个文件)
  - hero-1.png (超大文件，单独存放)

- `images_part_02/` - 23.09MB (1个文件)
  - medical-gauze-pads-3.png

- `images_part_03/` - 22.43MB (1个文件)
  - hero-2.png

- `images_part_04/` - 13.04MB (1个文件)
  - medical-surgical-packs.png

- `images_part_05/` - 13.04MB (1个文件)
  - medical-dressing.png

- `images_part_06/` - 23.86MB (2个文件)
  - disposable-dental-packs.png
  - medical-gauze-pads-2.png

- `images_part_07/` - 18.41MB (14个文件)
  - about-company.png
  - factory-1.png
  - factory-2.png
  - factory-3.png
  - factory-4.png
  - factory-5.png
  - hero-3.png
  - location-map .png
  - medical-bandages.png
  - medical-gauze-balls.png
  - medical-gauze-pads-1.png
  - medical-gauze-pads-thick.png
  - medical-surgical-pack.png
  - placeholder.html

## 使用方法

1. 将每个 `images_part_XX` 文件夹分别上传到GitHub仓库
2. 在您的项目中，可以按需下载特定的图片文件夹
3. 如果需要完整恢复原始结构，可以将所有子文件夹的内容合并到一个 `images` 文件夹中

## 注意事项

- `hero-1.png` 文件大小为82.59MB，超过了GitHub的单文件100MB限制，建议使用Git LFS或压缩后上传
- 所有其他文件夹都控制在25MB以内，可以直接上传到GitHub
- 文件名中的空格已保留，请注意处理

## 恢复原始结构

如果需要恢复原始的 `images` 文件夹结构，可以运行以下命令：

```bash
# 在web目录下运行
cd web
mkdir -p images_backup
for dir in images_split/images_part_*; do
    cp "$dir"/* images_backup/
done
```
