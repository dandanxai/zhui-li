// src/data/buildings.js
export const buildingsData = {
// 皇宫类
"taihedian": { id: "taihedian", name: "北京故宫 · 太和殿", location: "北京", tags: ["至尊", "重檐庑殿顶"], desc: "明清皇权中心，集中国古建最高规制于一身。", img: "https://images.unsplash.com/photo-1543013327-04669fec8935?w=1200", fullContent: "太和殿是故宫中等级最高的建筑，坐落于三层汉白玉须弥座之上。其重檐庑殿顶与金龙和玺彩画展现了封建帝王无可撼动的权威。" },
"dazhengdian": { id: "dazhengdian", name: "沈阳故宫 · 大政殿", location: "沈阳", tags: ["清初", "八角攒尖"], desc: "清初八角重檐攒尖顶建筑，融合汉、满、蒙建筑艺术。", img: "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=1200", fullContent: "大政殿是一座八角重檐攒尖式木结构建筑，体现了满族传统的‘帐篷’风格与汉族宫殿规制的结合。" },
"hanyuandian": { id: "hanyuandian", name: "唐大明宫 · 含元殿", location: "西安", tags: ["盛唐", "龙尾道"], desc: "唐帝国权力象征。规模宏大，开创了高台宫殿建筑的先河。", img: "https://images.unsplash.com/photo-1582650517303-b42616d56f8e?w=1200", fullContent: "含元殿是大明宫的正殿，巍峨壮丽。其庞大的体量与三层高台的布局，是盛唐气象的最佳注脚。" },
"budala": { id: "budala", name: "布达拉宫", location: "拉萨", tags: ["藏式巅峰", "宫堡式"], desc: "藏式建筑宫殿化的巅峰之作，矗立于云端。", img: "https://images.unsplash.com/photo-1589311026049-760773d2a71d?w=1200", fullContent: "布达拉宫依山而筑，分为红宫和白宫，其独特的石木结构和壁画艺术是藏族建筑精髓的集中体现。" },
"minggugong": { id: "minggugong", name: "南京 · 明故宫遗址", location: "南京", desc: "北京故宫的蓝本，石刻规制能窥见大明初期的雄浑气象。", img: "https://images.unsplash.com/photo-1628100808298-508b9cdfb705?w=1200", fullContent: "明故宫虽大部已毁，但作为北京故宫的原型，其宏伟的规制与工艺至今仍具有极高的研究价值。" },

// 坛庙官衙类
"qiniandian": { id: "qiniandian", name: "北京 · 天坛祈年殿", location: "北京", tags: ["祭天", "圆攒尖顶"], desc: "明清皇帝祈岁之所。蓝色琉璃瓦象征上苍。", img: "https://images.unsplash.com/photo-1582650726715-db14757c23bc?w=1200", fullContent: "祈年殿内部无一根横梁，全靠二十八根巨柱支撑，暗合周天星宿与四季时令。" },
"pxys": { id: "pxys", name: "山西 · 平遥县署", location: "平遥", tags: ["县衙", "中轴对称"], desc: "中国现存最完整的古县衙，体现封建基层威严。", img: "https://images.unsplash.com/photo-1542640244-7e672d6cb466?w=1200", fullContent: "平遥县署通过多重院落的层层递进，展现了中国封建官场‘公门如水’的肃穆氛围。" },
"dachengdian": { id: "dachengdian", name: "曲阜 · 孔庙大成殿", location: "曲阜", tags: ["祭孔", "龙柱"], desc: "祭祀孔子的主殿，十根深浮雕龙柱规制等同皇室。", img: "https://images.unsplash.com/photo-1599408031306-035985043812?w=1200", fullContent: "大成殿檐下的石刻龙柱，工艺精湛绝伦，是中国古建中罕见的至高规格装饰。" },
"tiankuang": { id: "tiankuang", name: "岱庙 · 天贶殿", location: "泰安", desc: "泰山封禅的中心。建筑庄重古朴，绘有精美壁画。", img: "https://images.unsplash.com/photo-1624391645062-8e6840615967?w=1200", fullContent: "作为中国三大宫殿式建筑之一，天贶殿不仅是皇家封禅的重地，更是泰山文化的象征。" },
"diwangmiao": { id: "diwangmiao", name: "历代帝王庙", location: "北京", desc: "明清祭祀历代先皇之所，体现家国同构文化。", img: "https://images.unsplash.com/photo-1563290637-295ea9fdf196?w=1200", fullContent: "景德崇圣殿是历代帝王庙的主体，其规制严谨，是北京重要的官式祭祀建筑典范。" },

// 民居类
"hongcun": { id: "hongcun", name: "皖南 · 宏村", location: "安徽", tags: ["徽派", "水系"], desc: "以水系为纽带，粉墙黛瓦，如水墨画境。", img: "https://images.unsplash.com/photo-1529982412356-901cc3a363bc?w=1200", fullContent: "宏村将自然水源引入村落，形成了独特的‘牛’形布局，是建筑与生态平衡的杰作。" },
"tulou": { id: "tulou", name: "福建 · 承启楼", location: "福建", tags: ["客家", "堡垒"], desc: "福建土楼之王。四环相套，将宗族聚居与防御完美结合。", img: "https://images.unsplash.com/photo-1628100808298-508b9cdfb705?w=1200", fullContent: "承启楼全楼可容纳数百人，其坚固的夯土墙体现了客家人在迁徙中的智慧与团结。" },
"wangjia": { id: "wangjia", name: "山西 · 王家大院", location: "灵石", tags: ["晋商", "三雕"], desc: "晋商民居巅峰。依山就势，三雕工艺精湛。", img: "https://images.unsplash.com/photo-1598420138927-4c32b5093551?w=1200", fullContent: "王家大院规模宏大，其丰富的砖、木、石三雕艺术具有极高的美学和民俗研究价值。" },
"siheyuan": { id: "siheyuan", name: "北京 · 四合院", location: "北京", desc: "标准的华北院落，体现宗法伦理对居住空间的影响。", img: "https://images.unsplash.com/photo-1563290637-295ea9fdf196?w=1200", fullContent: "四合院通过封闭且秩序井然的院落，体现了中国传统社会长幼有序、内外有别的居住理念。" },
"diaolou": { id: "diaolou", name: "开平 · 碉楼", location: "江门", tags: ["中西合璧", "防御"], desc: "结合了中西建筑风格，采用混凝土与夯土结构。", img: "https://images.unsplash.com/photo-1557991668-3004040e9095?w=1200", fullContent: "作为华侨文化的象征，碉楼既有西方的巴洛克装饰，又有中国传统的防卫逻辑。" },
"wangshiyuan": { id: "wangshiyuan", name: "苏州 · 网师园", location: "苏州", tags: ["私家园林", "灵动"], desc: "私家园林民居，空间转换灵动，尽显文人旨趣。", img: "https://images.unsplash.com/photo-1529683889020-f56f35831558?w=1200", fullContent: "网师园以小巧精致著称，通过‘借景’与‘对景’，在极小的空间内创造了丰富的视觉层次。" },

// 桥梁类
"zhaozhou": { id: "zhaozhou", name: "河北 · 赵州桥", location: "赵县", tags: ["隋代", "敞肩拱"], desc: "隋代李春造。敞肩拱结构奇特，跨越千年依然稳固。", img: "https://images.unsplash.com/photo-1596766782334-0f2c422f281e?w=1200", fullContent: "赵州桥是大跨度单孔石拱桥的鼻祖，四个分拱的设计不仅美观，更极大地提高了桥身的抗震与泄洪能力。" },
"guangji": { id: "guangji", name: "潮州 · 广济桥", location: "潮州", tags: ["启闭式", "浮桥"], desc: "中国四大古桥之一。集梁桥、浮桥、拱桥于一体。", img: "https://images.unsplash.com/photo-1582650726715-db14757c23bc?w=1200", fullContent: "广济桥中部的十八只木船连接成浮桥，能够自由开启，是中国桥梁史上极具创意的设计。" },
"lugou": { id: "lugou", name: "北京 · 卢沟桥", location: "北京", desc: "著名的联拱石桥。桥柱上刻有数百尊神态各异的石狮。", img: "https://images.unsplash.com/photo-1579308101416-09257d079d85?w=1200", fullContent: "卢沟桥不仅具有极高的建筑成就，其数不清的石狮子更是民间流传甚广的文化谈资。" },
"luoyang": { id: "luoyang", name: "泉州 · 洛阳桥", location: "泉州", desc: "首创“筏形基础”，展现惊人的跨海造桥智慧。", img: "https://images.unsplash.com/photo-1624391645062-8e6840615967?w=1200", fullContent: "通过在桥墩下养殖牡蛎来加固基座，洛阳桥是建筑学与生物学跨界结合的古代典范。" },
"baodai": { id: "baodai", name: "苏州 · 宝带桥", location: "苏州", desc: "中国最长的石多孔连拱桥，五十三个桥孔如玉带横卧。", img: "https://images.unsplash.com/photo-1529683889020-f56f35831558?w=1200", fullContent: "宝带桥专为纤道和漕运设计，体现了京杭大运河鼎盛时期的水利与交通功勋。" },
"fengyu": { id: "fengyu", name: "程阳 · 风雨桥", location: "三江", tags: ["侗族", "榫卯"], desc: "侗族建筑瑰宝。全桥不费一钉一铆，全凭榫卯连接。", img: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=1200", fullContent: "风雨桥集塔、廊、亭、桥于一体，既是交通要道，也是侗族同胞日常社交的灵魂场所。" }
};