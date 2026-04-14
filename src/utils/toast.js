// 文件位置: src/utils/toast.js
import { createVNode, render } from 'vue'
import ToastComponent from '@/components/common/Toast.vue'

/**
 * 全局告文提示弹窗
 * @param {String} msg 提示文案
 * @param {String} type 类型: 'success' | 'error'
 * @param {Number} duration 停留时间，默认3000ms
 */
export const showToast = (msg, type = 'error', duration = 3000) => {
    // 1. 创建一个承载弹窗的 div 容器
    const div = document.createElement('div')
    document.body.appendChild(div)

    // 2. 定义销毁函数（动画结束后清理垃圾节点）
    const onDestroy = () => {
        render(null, div) // 卸载 VNode
        div.remove()      // 移除 DOM 节点
    }

    // 3. 将 Vue 组件转为虚拟 DOM，并传入 Props
    const vnode = createVNode(ToastComponent, {
        msg,
        type,
        duration,
        onDestroy
    })

    // 4. 将虚拟 DOM 渲染到咱们创建的 div 里
    render(vnode, div)
}