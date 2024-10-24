import type { PluginVisualizerOptions } from 'rollup-plugin-visualizer';
import type { ConfigEnv, PluginOption, UserConfig } from 'vite';
import type { PluginOptions } from 'vite-plugin-dts';

interface PrintPluginOptions {
  /**
   * 打印的数据
   */
  infoMap?: Record<string, string | undefined>;
}

interface ArchiverPluginOptions {
  /**
   * 输出文件名
   * @default dist
   */
  name?: string;
  /**
   * 输出目录
   * @default .
   */
  outputDir?: string;
}

/**
 * 用于判断是否需要加载插件
 */
interface ConditionPlugin {
  // 判断条件
  condition?: boolean;
  // 插件对象
  plugins: () => PluginOption[] | PromiseLike<PluginOption[]>;
}

interface CommonPluginOptions {
  /** 是否开启devtools */
  devtools?: boolean;
  /** 环境变量 */
  env?: Record<string, any>;
  /** 是否注入metadata */
  injectMetadata?: boolean;
  /** 是否构建模式 */
  isBuild?: boolean;
  /** 构建模式 */
  mode?: string;
  /** 开启依赖分析 */
  visualizer?: boolean | PluginVisualizerOptions;
}

interface ApplicationPluginOptions extends CommonPluginOptions {
  /** 开启后，会在打包dist同级生成dist.zip */
  archiver?: boolean;
  /** 压缩归档插件配置 */
  archiverPluginOptions?: ArchiverPluginOptions;
  /** 开启 gzip|brotli 压缩 */
  compress?: boolean;
  /** 压缩类型 */
  compressTypes?: ('brotli' | 'gzip')[];
  /** 在构建的时候抽离配置文件 */
  extraAppConfig?: boolean;
  /** 是否开启html插件  */
  html?: boolean;
  /** 是否开启i18n */
  i18n?: boolean;
  /** 是否开启 importmap CDN  */
  importmap?: boolean;
  /** 是否注入app loading */
  injectAppLoading?: boolean;
  /** 是否注入全局scss */
  injectGlobalScss?: boolean;
  /** 是否注入版权信息 */
  license?: boolean;
  /** 是否开启nitro mock */
  nitroMock?: boolean;
  /** 开启控制台自定义打印 */
  print?: boolean;
  /** 打印插件配置 */
  printInfoMap?: PrintPluginOptions['infoMap'];
  /** 是否开启vxe-table懒加载 */
  vxeTableLazyImport?: boolean;
}

interface LibraryPluginOptions extends CommonPluginOptions {
  /** 开启 dts 输出 */
  dts?: boolean | PluginOptions;

  /** 是否注入lib css */
  injectLibCss?: boolean;
}

type ApplicationOptions = ApplicationPluginOptions;

type LibraryOptions = LibraryPluginOptions;

type DefineApplicationOptions = (config?: ConfigEnv) => Promise<{
  application?: ApplicationOptions;
  vite?: UserConfig;
}>;

type DefineLibraryOptions = (config?: ConfigEnv) => Promise<{
  library?: LibraryOptions;
  vite?: UserConfig;
}>;

type DefineConfig = DefineApplicationOptions | DefineLibraryOptions;

export type {
  ApplicationPluginOptions,
  ArchiverPluginOptions,
  CommonPluginOptions,
  ConditionPlugin,
  DefineApplicationOptions,
  DefineConfig,
  DefineLibraryOptions,
  LibraryPluginOptions,
  PrintPluginOptions,
};
