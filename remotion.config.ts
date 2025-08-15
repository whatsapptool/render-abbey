import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';
import path from "path"


Config.overrideWebpackConfig((config) => {
  return {
    ...enableTailwind(config),
    resolve: {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias ?? {}),
        "@/remotion": path.join(process.cwd(), "remotion"),
        "@/styles": path.join(process.cwd(), "styles"),
        "@/types": path.join(process.cwd(), "types"),
      },
    },
  }
})
Config.setConcurrency(1)
Config.setVideoImageFormat("png")
Config.setCodec("h264")
Config.setBeepOnFinish(true)
Config.setScale(1)
Config.setAudioCodec('aac'); // Menonaktifkan audio processing
Config.setCachingEnabled(true);