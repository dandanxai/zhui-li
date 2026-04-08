<template>
<div class="min-h-screen bg-[#fcfaf5] pt-32 pb-20 px-6 font-serif">
    <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div class="lg:col-span-1 space-y-6">
                <div class="bg-white p-8 border border-gray-100 text-center relative shadow-sm">
                    <div class="absolute top-0 left-0 w-full h-1 bg-palace-red"></div>
                    <div class="relative inline-block cursor-pointer mt-4" @click="handleAvatarClick">
                        <img :src="avatarUrl" class="w-24 h-24 rounded-full border-2 border-palace-red/10 object-cover bg-gray-50 transition-transform hover:scale-105" />
                        <div class="absolute inset-0 bg-black/40 rounded-full opacity-0 hover:opacity-100 flex items-center justify-center transition-all text-white text-[10px] backdrop-blur-sm">更换名帖</div>
                    </div>
                    <h2 class="mt-6 text-xl font-black tracking-widest text-[#111]">{{ user.nickName || '未命名居士' }}</h2>
                    <p class="text-[10px] text-gray-400 mt-2 uppercase tracking-[0.2em] italic">{{ roleName }}</p>
                    <div class="mt-8 pt-6 border-t border-gray-50 text-[10px] text-gray-400 uppercase tracking-widest">
                        初探时间：{{ user.createTime?.split(' ')[0] || '---' }}
                    </div>
                </div>

                <div class="bg-white border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <button v-for="tab in tabs" :key="tab.id" 
                            @click="activeTab = tab.id"
                            class="w-full text-left px-8 py-5 text-xs tracking-widest transition-all duration-300 flex items-center justify-between outline-none"
                            :class="[activeTab === tab.id ? 'bg-palace-red text-white' : 'hover:bg-[#fcfaf5] text-gray-500']">
                        <span>{{ tab.name }}</span>
                        <i v-if="activeTab === tab.id" class="ri-arrow-right-s-line"></i>
                    </button>
                </div>
            </div>

            <div class="lg:col-span-3">
                <div class="bg-white p-10 md:p-16 border border-gray-100 shadow-sm min-h-[600px] relative">
                    
                    <transition name="fade-slide">
                        <div v-if="activeTab === 'info'" class="space-y-12">
                            <div class="flex justify-between items-end border-b border-gray-100 pb-6">
                                <div>
                                    <h3 class="text-lg font-black tracking-widest text-[#111]">居士档案</h3>
                                    <p class="text-[10px] text-gray-400 uppercase tracking-widest mt-2">Personal Residence Record</p>
                                </div>
                                <button @click="isEditing = !isEditing" class="text-palace-red flex items-center gap-2 hover:opacity-70 transition-opacity outline-none">
                                    <i :class="isEditing ? 'ri-close-line' : 'ri-edit-line'"></i>
                                    <span class="text-[10px] font-bold uppercase tracking-widest">{{ isEditing ? '取消编辑' : '编辑资料' }}</span>
                                </button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                <div class="group">
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">名号 / Nickname</label>
                                    <input v-if="isEditing" v-model="form.nickName" class="w-full border-b border-palace-red/30 py-2 outline-none text-sm bg-transparent" />
                                    <p v-else class="py-2 text-sm font-bold tracking-widest text-[#111]">{{ user.nickName || '---' }}</p>
                                </div>
                                <div class="group">
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">联系方式 / Phone</label>
                                    <input v-if="isEditing" v-model="form.phonenumber" class="w-full border-b border-palace-red/30 py-2 outline-none text-sm bg-transparent" />
                                    <p v-else class="py-2 text-sm font-bold tracking-widest text-[#111]">{{ user.phonenumber || '---' }}</p>
                                </div>
                                <div class="group">
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">电子邮戳 / Email</label>
                                    <input v-if="isEditing" v-model="form.email" class="w-full border-b border-palace-red/30 py-2 outline-none text-sm bg-transparent" />
                                    <p v-else class="py-2 text-sm font-bold tracking-widest text-[#111]">{{ user.email || '---' }}</p>
                                </div>
                                <div class="group">
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">居士性别 / Gender</label>
                                    <div v-if="isEditing" class="flex gap-6 py-2">
                                        <label class="flex items-center gap-2 cursor-pointer text-sm"><input type="radio" v-model="form.sex" value="0" class="accent-palace-red" /> 乾 (男)</label>
                                        <label class="flex items-center gap-2 cursor-pointer text-sm"><input type="radio" v-model="form.sex" value="1" class="accent-palace-red" /> 坤 (女)</label>
                                    </div>
                                    <p v-else class="py-2 text-sm font-bold tracking-widest text-[#111]">{{ user.sex === '0' ? '乾 (男)' : (user.sex === '1' ? '坤 (女)' : '保密') }}</p>
                                </div>
                            </div>

                            <div v-if="isEditing" class="pt-6">
                                <button @click="submitProfile" class="bg-[#111] text-white px-12 py-4 text-[10px] tracking-[0.3em] font-bold hover:bg-palace-red transition-all">保存并更迭资料</button>
                            </div>
                        </div>
                    </transition>

                    <transition name="fade-slide">
                        <div v-if="activeTab === 'password'" class="space-y-12">
                            <div class="flex justify-between items-end border-b border-gray-100 pb-6">
                                <div>
                                    <h3 class="text-lg font-black tracking-widest text-[#111]">重设秘钥</h3>
                                    <p class="text-[10px] text-gray-400 uppercase tracking-widest mt-2">Reset Security Password</p>
                                </div>
                                <i class="ri-lock-password-line text-2xl text-gray-100"></i>
                            </div>
                            <div class="max-w-md space-y-10">
                                <div class="group">
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">原密钥 / Old Password</label>
                                    <input v-model="pwdForm.oldPassword" type="password" class="w-full border-b border-palace-red/20 py-2 outline-none text-sm bg-transparent" placeholder="请输入当前密钥" />
                                </div>
                                <div class="group">
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">新密钥 / New Password</label>
                                    <input v-model="pwdForm.newPassword" type="password" class="w-full border-b border-palace-red/20 py-2 outline-none text-sm bg-transparent" placeholder="请输入新密钥" />
                                </div>
                                <div class="group">
                                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">确认密钥 / Confirm Password</label>
                                    <input v-model="pwdForm.confirmPassword" type="password" class="w-full border-b border-palace-red/20 py-2 outline-none text-sm bg-transparent" placeholder="请再次输入新密钥" />
                                </div>
                                <button @click="submitPwd" class="bg-[#111] text-white px-12 py-4 text-[10px] tracking-[0.3em] font-bold hover:bg-palace-red transition-all">确认重设密钥</button>
                            </div>
                        </div>
                    </transition>

                    <transition name="fade-slide">
                        <div v-if="activeTab === 'security'" class="space-y-12">
                            <div class="flex justify-between items-end border-b border-gray-100 pb-6">
                                <div>
                                    <h3 class="text-lg font-black tracking-widest text-[#111]">安全中枢</h3>
                                    <p class="text-[10px] text-gray-400 uppercase tracking-widest mt-2">Security Hub & Protection</p>
                                </div>
                                <i class="ri-shield-check-line text-2xl text-palace-red/20"></i>
                            </div>
                            <div class="space-y-6">
                                <div class="flex items-center justify-between p-8 bg-[#fcfaf5] border border-gray-100">
                                    <div class="flex items-center gap-6">
                                        <div class="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center"><i class="ri-shield-fill text-xl"></i></div>
                                        <div>
                                            <p class="text-xs font-bold tracking-widest">账号状态：安全防护中</p>
                                            <p class="text-[10px] text-gray-400 mt-2">当前居士档案受考工台最高等级加密保护</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between p-8 bg-white border border-gray-100">
                                    <div class="flex items-center gap-6">
                                        <div class="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center"><i class="ri-smartphone-line text-xl"></i></div>
                                        <div>
                                            <p class="text-xs font-bold tracking-widest">最近登录活动</p>
                                            <p class="text-[10px] text-gray-400 mt-2">最后一次入卷时间：{{ user.loginDate || '今日' }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
    
    <input type="file" ref="avatarFile" class="hidden" @change="handleFileUpload" accept="image/*" />

    <Transition name="notify-fade">
        <div v-if="notification.show" class="fixed top-10 left-1/2 -translate-x-1/2 z-[3000] bg-[#111] text-white px-10 py-5 border border-palace-red/30 shadow-2xl flex items-center gap-5 backdrop-blur-md">
            <div class="w-1.5 h-5 bg-palace-red"></div>
            <span class="text-[11px] font-bold tracking-[0.3em] uppercase">{{ notification.msg }}</span>
        </div>
    </Transition>
</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserProfile, updateUserProfile, uploadAvatar, updateUserPwd } from '@/api/user'

const router = useRouter()
const user = ref({})
const isEditing = ref(false)
const activeTab = ref('info')
const avatarFile = ref(null)
const roleName = ref('营造居士')

// 通知系统
const notification = reactive({ show: false, msg: '' })
const showMsg = (msg) => {
    notification.msg = msg;
    notification.show = true;
    setTimeout(() => { notification.show = false }, 3000);
}

const tabs = [
    { id: 'info', name: '资料修改' },
    { id: 'password', name: '重设密码' },
    { id: 'security', name: '安全设置' }
]

const form = reactive({ nickName: '', phonenumber: '', email: '', sex: '' })
const pwdForm = reactive({ oldPassword: '', newPassword: '', confirmPassword: '' })

// 🏮 核心修改：去掉前缀拼接，直接使用 OSS 完整链接
const avatarUrl = computed(() => {
    if (user.value.avatar) {
        return user.value.avatar;
    }
    return '/default-avatar.png'; // 默认图
})

// 初始化与数据同步
const getUser = async () => {
    try {
        const res = await getUserProfile();
        user.value = res.data.data; 
        roleName.value = (res.data.roles && res.data.roles[0]?.roleName) || '营造居士';
        // 同步到表单以便编辑
        Object.assign(form, {
            nickName: user.value.nickName,
            phonenumber: user.value.phonenumber,
            email: user.value.email,
            sex: user.value.sex
        });
    } catch (err) { console.error("居士档案调取失败", err) }
}

const submitProfile = async () => {
    try {
        await updateUserProfile(form);
        showMsg('档案更迭成功');
        isEditing.value = false;
        await getUser(); // 刷新本地数据
    } catch (err) { console.error(err) }
}

const submitPwd = async () => {
    if (!pwdForm.oldPassword || !pwdForm.newPassword) return showMsg('居士，请补全密钥信息');
    if (pwdForm.newPassword !== pwdForm.confirmPassword) return showMsg('两次输入的新密钥不一致');
    
    try {
        const res = await updateUserPwd(pwdForm.oldPassword, pwdForm.newPassword);
        if (res.code === 200) {
            showMsg('密钥更新成功，正在重新入卷');
            setTimeout(() => {
                localStorage.removeItem('ZHL_TOKEN');
                router.push('/login');
            }, 1500);
        } else { showMsg(res.msg || '更迭失败，请核对原密钥'); }
    } catch (err) { showMsg('连接中断，请稍后再试'); }
}

const handleAvatarClick = () => avatarFile.value.click();
const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return showMsg('名帖文件需小于 2MB');

    const formData = new FormData();
    formData.append('avatarfile', file); 
    try {
        const res = await uploadAvatar(formData);
        // 注意：若依上传接口返回结构可能在 res.data 中
        const result = res.data || res; 
        if (result.code === 200) {
            showMsg('名帖更换成功');
            await getUser(); 
        } else { showMsg(result.msg || '更换失败'); }
    } catch (err) { showMsg('文件过大或连接中断'); }
}

onMounted(() => { getUser(); })
</script>

<style scoped>
/* 切换动画 */
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.4s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateX(20px); }
.fade-slide-leave-to { opacity: 0; transform: translateX(-20px); position: absolute; }

/* 通知动画 */
.notify-fade-enter-active, .notify-fade-leave-active { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.notify-fade-enter-from, .notify-fade-leave-to { opacity: 0; transform: translate(-50%, -20px); }

input { transition: all 0.3s ease; }
input:focus { padding-left: 5px; }
</style>