import { staticFile } from "remotion";

// CloudImg proxy service
const CLOUDIMG_PREFIX = "https://ce880219c.cloudimg.io/v7/";
const CLOUDIMG_CROP = "";

export function withCloudImg(url: string) {
  // Jika url sudah mengandung prefix, jangan tambahkan lagi
  if (url.startsWith(CLOUDIMG_PREFIX)) return url;
  
  // Pastikan URL memiliki protocol
  let normalizedUrl = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    normalizedUrl = `https://${url}`;
  }
  
  // Pastikan hasil akhir memiliki https:// di depan
  const processedUrl = CLOUDIMG_PREFIX + normalizedUrl.replace(/^https?:\/\//, "");
  return processedUrl.startsWith('https://') ? processedUrl : `https://${processedUrl}`;
}

export function withCloudImgCrop(url: string) {
  // Hilangkan query string lama jika ada
  let cleanUrl = url.split("?")[0];
  const processedUrl = withCloudImg(cleanUrl) + CLOUDIMG_CROP;
  // Pastikan hasil akhir memiliki https://
  return processedUrl.startsWith('https://') ? processedUrl : `https://${processedUrl}`;
}

export function getImageSource(url: string | undefined) {
  if (!url) return staticFile('default.svg');
  
  // Normalize URL - tambahkan https:// jika tidak ada protocol
  let normalizedUrl = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    // Jika URL tidak dimulai dengan protocol, tambahkan https://
    normalizedUrl = `https://${url}`;
  }
  
  // Check if the URL is remote (starts with http:// or https://)
  if (normalizedUrl.startsWith('http://') || normalizedUrl.startsWith('https://')) {
    // Gunakan CloudImg proxy untuk remote images
    const proxyUrl = withCloudImgCrop(normalizedUrl);
    // Pastikan hasil akhir memiliki https://
    return proxyUrl.startsWith('https://') ? proxyUrl : `https://${proxyUrl}`;
  }
  // If it's a local file, use staticFile
  return staticFile(url);
}

// Fallback function untuk image yang gagal load
export function getImageSourceWithFallback(url: string | undefined) {
  if (!url) return staticFile('default.svg');
  
  // Normalize URL - tambahkan https:// jika tidak ada protocol
  let normalizedUrl = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    normalizedUrl = `https://${url}`;
  }
  
  // Check if the URL is remote
  if (normalizedUrl.startsWith('http://') || normalizedUrl.startsWith('https://')) {
    // Coba dengan CloudImg proxy terlebih dahulu
    const proxyUrl = withCloudImgCrop(normalizedUrl);
    const finalProxyUrl = proxyUrl.startsWith('https://') ? proxyUrl : `https://${proxyUrl}`;
    
    // Jika URL asli adalah YouTube thumbnail, gunakan URL asli sebagai fallback
    if (normalizedUrl.includes('yt3.ggpht.com') || normalizedUrl.includes('ytimg.com')) {
      return {
        primary: finalProxyUrl,
        fallback: normalizedUrl,
        isYouTube: true
      };
    }
    
    return {
      primary: finalProxyUrl,
      fallback: normalizedUrl,
      isYouTube: false
    };
  }
  
  // If it's a local file, use staticFile
  return {
    primary: staticFile(url),
    fallback: staticFile(url),
    isYouTube: false
  };
} 