// ========== 统一项目数据 ==========
const PROJECT_COLOR_MAP = {
  self_developed:'#00BFFF',
  secondary_dev:'#A23B72',
  self_deployed:'#F18F01',
  expt_test:'#73AB84',
  active:       '#00ff9d',
  archived:     '#333333',
  experimental: 'rgba(255, 128, 64, 0.9)',
  ui:           '#6b7280', 
};
const projects = [
  {
    name: 'Clipboard',
    subtitle: '简易网络剪切板',
    color: 'self_developed',
    scheme: 1,
    image: './assets/img/project-clipboard.png',
    desc: '基于 PHP 开发的网络剪切板，无需登录、无需额外数据库服务，上传服务器即可使用。支持多端实时同步、密码保护、自动过期与自定义分享链接。',
    link: 'https://github.com/lumesyleo/online-clipboard-php',
    linkText: 'VIEW_REPO →'
  },
  {
    name: '音乐播放器',
    subtitle: '无需登录即可试听音乐',
    color: 'self_developed',
    scheme: 1,
    image: './assets/img/project-musicplayer.png',
    desc: '灵感来源于 MetingJS，支持 Meting API 格式数据解析但不依赖 Aplayer 和 MetingJS。目前已实现基本功能，仍处于开发阶段。',
    link: 'https://music.lolic.dpdns.org/',
    linkText: 'VIEW_EXPERIENCE →'
  },
  {
    name: 'Music Manager',
    subtitle: '管理本地音乐',
    color: 'self_developed',
    scheme: 1,
    image: './assets/img/project-musicmanager.png',
    desc: '一个简易的本地音乐与歌单管理程序；为方便 Aplayer.js 调用，提供 Meting API 格式以供请求。适用于个人音乐服务器、网页播放器或移动客户端的后台数据管理。',
    link: 'https://github.com/lumesyleo/lite-music-manager',
    linkText: 'VIEW_REPO →'
  },
  {
    name: 'Hexo-2-Typecho-ft',
    subtitle: '日志聚合与溯源',
    color: 'secondary_dev',
    scheme: 2,
    image: './assets/img/project-hexo2typecho.png',
    desc: '基于项目 <code>zhghg/hexo-2-typecho</code> 二次开发，支持更多参数调整（如 slug 字段，对于想迁移 abbrlink 永久连接的用户而言比较有用）。',
    link: 'https://github.com/lumesyleo/hexo-2-typecho',
    linkText: 'VIEW_REPO →'
  },
  {
    name: 'Meting-API-ft',
    subtitle: '多功能的音乐服务接口',
    color: 'secondary_dev',
    scheme: 2,
    image: './assets/img/project-metingapift.png',
    desc: '基于项目 <code>injahow/meting-api</code> 二次开发，在此基础上补充部分参数和自定义服务器功能，目前主要测试 netease 和 Tencent 音乐源。<br>音频文件来自各网站公开接口，项目不会修改和存储任何音频文件，仅供测试使用，不得用于不正当用途。',
    link: 'https://github.com/lumesyleo/meting-api-ft',
    linkText: 'VIEW_REPO →'
  },
  {
    name: 'PicBox',
    subtitle: '简易多功能图片处理工具',
    color: 'self_developed',
    scheme: 1,
    image: './assets/img/project-picbox.png',
    desc: 'PicBox 是一个可静态部署的多功能图片处理工具，支持批量处理图片，所有操作均在本地完成。',
    link: 'https://github.com/lumesyleo/lite-picbox',
    linkText: 'VIEW_REPO →'
  },
  {
    name: '小工具实验室',
    subtitle: '收集有趣的事物',
    color: 'expt_test',
    scheme: 2,
    image: './assets/img/project-toolab.png',
    desc: '展示收集的一些网页特效、实用小工具，以及其它有意思的内容。<br>从某种意义上来说，这个站本身也是实验的一部分。',
    link: 'https://tool.lolic.dpdns.org/',
    linkText: 'VIEW_EXPERIENCE →'
  }
];