<template>
    <div class="min-h-screen bg-[#fcfaf5] pt-40 pb-24 px-6 md:px-12 selection:bg-palace-red selection:text-white">
        <button @click="$router.back()" class="fixed top-32 left-6 md:left-12 z-30 flex items-center gap-2 text-gray-400 hover:text-palace-red transition-colors group nav-back">
            <span class="text-xl group-hover:-translate-x-1 transition-transform">←</span>
            <span class="text-xs font-serif tracking-widest font-bold">归卷 BACK</span>
        </button>
    
        <div class="max-w-7xl mx-auto">
            <div class="mb-20 page-header">
                <h1 class="text-4xl md:text-6xl font-serif text-[#111] tracking-widest mb-4 font-black">{{ pageData.title }}</h1>
                <p class="text-gray-500 font-sans font-bold tracking-[0.2em] uppercase text-sm">{{ pageData.enTitle }}</p>
                <div class="w-12 h-[2px] bg-palace-red/60 mt-8"></div>
            </div>
    
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                <div 
                    v-for="(item, index) in pageData.list" 
                    :key="index" 
                    class="group cursor-pointer building-card opacity-0"
                    @click="$router.push(`/building/${item.id}`)"
                >
                    <div class="aspect-[3/4] overflow-hidden rounded-sm mb-6 bg-gray-100 relative shadow-sm border border-black/5">
                        <img :src="item.img" :alt="item.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000">
                        
                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center px-10 text-center backdrop-blur-sm">
                            <span class="w-1.5 h-1.5 bg-palace-red rounded-full mb-6"></span>
                            
                            <p class="text-white font-serif text-lg leading-relaxed tracking-[0.2em] mb-8 font-medium italic">
                                「 {{ item.poem }} 」
                            </p>
                            
                            <div class="flex flex-col items-center gap-2">
                                <span class="text-white/50 text-[9px] tracking-[0.4em] uppercase font-sans">点击入卷探源</span>
                                <div class="w-8 h-[1px] bg-white/20"></div>
                            </div>
                        </div>
                    </div>
    
                    <div class="flex items-center gap-2 mb-4">
                        <span class="w-2 h-[1px] bg-palace-red"></span>
                        <span class="text-[10px] text-gray-400 font-sans font-black tracking-widest uppercase">{{ item.location }}</span>
                    </div>
    
                    <h3 class="text-xl font-serif text-[#111] font-bold mb-3 tracking-widest group-hover:text-palace-red transition-colors duration-500">
                        {{ item.name }}
                    </h3>
    
                    <p class="text-sm text-gray-500 leading-[2] tracking-wider font-light text-justify">
                        {{ item.desc }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    </template>
    
    <script setup>
    import { computed, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import gsap from 'gsap' // 🏮 引入动画库
    
    const route = useRoute()
    const category = computed(() => route.params.category)
    
    // =====================================================================
    // 建筑大数据库：已为您为每个建筑配置了专属意境诗词
    // =====================================================================
    const database = {
    // 1. 皇宫威仪
    palace: {
        title: '皇宫威仪 · 详考',
        enTitle: 'Imperial Palace Collection',
        list: [
        { id: 'taihedian', name: '北京故宫 · 太和殿', location: '北京', poem: '九天阊阖开宫殿，万国衣冠拜冕旒。', desc: '明清皇权中心。重檐庑殿顶与金龙和玺彩画，是中国古代建筑等级制度的终极体现。', img: 'https://images.unsplash.com/photo-1543013327-04669fec8935?w=800' },
        { id: 'dazhengdian', name: '沈阳故宫 · 大政殿', location: '沈阳', poem: '盛京王气接云端，八角凌空护旧关。', desc: '清初八角重檐攒尖顶建筑。独特的亭式建筑布局，融合了满族帐篷文化与汉族宫殿艺术。', img: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=800' },
        { id: 'hanyuandian', name: '大明宫 · 含元殿', location: '西安', poem: '千官肃事，九门开、万国咸通。', desc: '唐帝国权力象征。规模宏大，其“龙尾道”设计开创了高台宫殿建筑的先河。', img: 'https://images.unsplash.com/photo-1582650517303-b42616d56f8e?w=800' },
        { id: 'budala', name: '布达拉宫', location: '拉萨', poem: '红墙白雪映苍穹，圣殿岧峣入梵宫。', desc: '红宫与白宫交相辉映，是藏式建筑宫殿化的巅峰之作，气势磅礴，矗立于云端。', img: 'https://images.unsplash.com/photo-1589311026049-760773d2a71d?w=800' },
        { id: 'minggugong', name: '明故宫遗址', location: '南京', poem: '龙盘虎踞山河壮，断石残基见大明。', desc: '北京故宫的蓝本。虽大多已毁，但其石刻规制依然能窥见大明初期的雄浑气象。', img: 'https://images.unsplash.com/photo-1628100808298-508b9cdfb705?w=800' }
        ]
    },
    
    // 2. 坛庙官衙
    official: {
        title: '坛庙官衙 · 详考',
        enTitle: 'Altar & Official Building',
        list: [
        { id: 'qiniandian', name: '天坛 · 祈年殿', location: '北京', poem: '圜丘高叠向苍穹，祈岁精诚动紫宫。', desc: '明清皇帝祈岁之所。三重檐圆攒尖顶，蓝色琉璃瓦象征上苍，其梁柱暗合周天星宿。', img: 'https://images.unsplash.com/photo-1582650517303-b42616d56f8e?w=800' },
        { id: 'pxys', name: '平遥县署', location: '平遥', poem: '明镜高悬清吏治，丹心一片在民生。', desc: '现存最完整的古县衙。中轴对称、前朝后寝，深刻体现了封建基层行政机构的威严秩序。', img: 'https://images.unsplash.com/photo-1542640244-7e672d6cb466?w=800' },
        { id: 'dachengdian', name: '孔庙 · 大成殿', location: '曲阜', poem: '万世师表垂千古，金龙巨柱镇杏坛。', desc: '祭祀孔子的主殿。双层歇山顶配以十根精美的深浮雕龙柱，规制等同于皇室级别。', img: 'https://images.unsplash.com/photo-1599408031306-035985043812?w=800' },
        { id: 'tiankuang', name: '岱庙 · 天贶殿', location: '泰安', poem: '仰之弥高连封岳，泰山神威启万方。', desc: '泰山封禅的中心。建筑庄重古朴，内部绘有巨大的《泰山神启跸回銮图》壁画。', img: 'https://images.unsplash.com/photo-1624391645062-8e6840615967?w=800' },
        { id: 'diwangmiao', name: '历代帝王庙', location: '北京', poem: '三皇五帝尊千古，社稷中枢祭圣贤。', desc: '明清祭祀历代先皇之所。景德崇圣殿规制严谨，体现了中国传统家国同构的祭祀文化。', img: 'https://images.unsplash.com/photo-1563290637-295ea9fdf196?w=800' }
        ]
    },
    
    // 3. 烟火民居
    dwelling: {
        title: '烟火民居 · 详考',
        enTitle: 'Vernacular Dwelling',
        list: [
        { id: 'hongcun', name: '皖南 · 宏村', location: '黄山', poem: '一生痴绝处，无梦到徽州。', desc: '徽派建筑杰作。以水系为纽带，粉墙黛瓦、马头墙高耸，营造出如墨泼画的江南意境。', img: 'https://images.unsplash.com/photo-1529982412356-901cc3a363bc?w=800' },
        { id: 'tulou', name: '福建 · 承启楼', location: '永定', poem: '圆楼千载护宗盟，聚族而居四海平。', desc: '福建土楼之王。四环相套的圆形堡垒，将家族聚居与军事防御功能完美结合。', img: 'https://images.unsplash.com/photo-1628100808298-508b9cdfb705?w=800' },
        { id: 'wangjia', name: '王家大院', location: '灵石', poem: '晋商风云凝古堡，石雕刻尽百年荣。', desc: '晋商民居巅峰。依山就势，石、木、砖“三雕”工艺精湛，有“民间故宫”之美誉。', img: 'https://images.unsplash.com/photo-1598420138927-4c32b5093551?w=800' },
        { id: 'siheyuan', name: '北京 · 四合院', location: '北京', poem: '槐影拂阶尘不染，深屏隐院意悠长。', desc: '标准的华北院落。四方围合、长幼有序，体现了中国宗法伦理对居住空间的影响。', img: 'https://images.unsplash.com/photo-1563290637-295ea9fdf196?w=800' },
        { id: 'diaolou', name: '开平 · 碉楼', location: '江门', poem: '中西合璧碉楼影，桑梓情深寄远方。', desc: '独特的防御性民居。巧妙结合了古希腊、古罗马及伊斯兰建筑风格与岭南建筑艺术。', img: 'https://images.unsplash.com/photo-1557991668-3004040e9095?w=800' },
        { id: 'wangshiyuan', name: '苏州 · 网师园', location: '苏州', poem: '网得清风留水院，师法自然入画屏。', desc: '私家园林民居。以池塘为中心，建筑体量轻巧，空间转换灵动，尽显文人生活旨趣。', img: 'https://images.unsplash.com/photo-1529683889020-f56f35831558?w=800' }
        ]
    },
    
    // 4. 千载桥梁
    bridge: {
        title: '千载桥梁 · 详考',
        enTitle: 'Ancient Bridges',
        list: [
        { id: 'zhaozhou', name: '赵州桥', location: '赵县', poem: '蛟龙卧水千年固，神斧劈开万浪分。', desc: '隋代李春造。敞肩拱结构不仅美观，更能在洪水时减小水流压力，跨越千年依然稳固。', img: 'https://images.unsplash.com/photo-1596766782334-0f2c422f281e?w=800' },
        { id: 'guangji', name: '潮州 · 广济桥', location: '潮州', poem: '十八梭船廿四洲，广济浮桥水上悠。', desc: '中国四大古桥之一。独特的启闭式桥梁，将梁桥、浮桥、拱桥融为一体，智慧卓绝。', img: 'https://images.unsplash.com/photo-1582650726715-db14757c23bc?w=800' },
        { id: 'lugou', name: '北京 · 卢沟桥', location: '北京', poem: '石狮不解离人恨，残照卢沟伴晓钟。', desc: '著名的联拱石桥。桥柱上刻有数百尊神态各异的石狮，马可波罗曾赞其为“世界上绝无仅有”。', img: 'https://images.unsplash.com/photo-1579308101416-09257d079d85?w=800' },
        { id: 'luoyang', name: '泉州 · 洛阳桥', location: '泉州', poem: '蛎固基深凭海立，洛阳桥影跨惊涛。', desc: '首创“筏形基础”和“种蛎固基”法，利用生物粘附加固桥墩，展现了惊人的跨海造桥智慧。', img: 'https://images.unsplash.com/photo-1624391645062-8e6840615967?w=800' },
        { id: 'baodai', name: '苏州 · 宝带桥', location: '苏州', poem: '如虹贯水长千尺，宝带横江映月明。', desc: '中国最长的石多孔连拱桥。五十三个桥孔如玉带横卧，是运河漕运时代的壮丽见证。', img: 'https://images.unsplash.com/photo-1529683889020-f56f35831558?w=800' },
        { id: 'fengyu', name: '程阳 · 风雨桥', location: '三江', poem: '不费枚钉成伟筑，风雨长廊寄侗情。', desc: '侗族建筑瑰宝。全桥不费一钉一铆，全凭榫卯连接，集桥、廊、亭、塔于一身，工艺绝伦。', img: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800' }
        ]
    }
    }
    
    const pageData = computed(() => database[category.value] || database.palace)
    
    // 🏮 核心：页面挂载时触发 GSAP 动画
    onMounted(() => {
        // 1. 返回按钮淡入
        gsap.fromTo('.nav-back', 
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }
        );
    
        // 2. 标题区上浮淡入
        gsap.fromTo('.page-header', 
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.1 }
        );
    
        // 3. 卡片列表错落浮现 (Stagger 动画)
        gsap.fromTo('.building-card', 
            { opacity: 0, y: 60 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1, 
                stagger: 0.15, // 每张卡片延迟0.15秒出现
                ease: 'power3.out',
                delay: 0.3     // 总体延迟，等标题先出来
            }
        );
    })
    </script>
    
    <style scoped>
    /* 悬停时整个卡片轻微上浮，配合文字变色 */
    .group:hover {
        transform: translateY(-4px);
    }
    .building-card {
        will-change: transform, opacity;
    }
    </style>