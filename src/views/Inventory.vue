<template>
  <div class="flex min-h-screen bg-[#F0F9FF]">
    <Sidebar />
    
    <main class="ml-72 flex-1 p-6">
      <header class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Resource Encoding</h2>
          <p class="text-sm text-slate-500 mt-0.5">Select a category to begin documenting items.</p>
        </div>
        <div class="flex items-center gap-3">
          <!-- Notifications Dropdown -->
          <div class="relative">
            <button 
              @click="showNotifications = !showNotifications"
              class="p-2.5 bg-white rounded-xl text-slate-400 shadow-sm border border-slate-50 hover:text-sky-500 transition-all relative"
            >
              <PhBell :size="20" />
              <span 
                v-if="unreadNotifications.length > 0" 
                class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                {{ unreadNotifications.length }}
              </span>
            </button>
            
            <Transition name="dropdown">
              <div 
                v-if="showNotifications" 
                class="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50"
              >
                <div class="p-3 border-b border-slate-50">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-bold text-slate-800">Notifications</h4>
                    <button 
                      @click="markAllAsRead"
                      class="text-[9px] font-black text-sky-500 uppercase tracking-wider hover:text-sky-600"
                    >
                      Mark all read
                    </button>
                  </div>
                </div>
                
                <div class="max-h-64 overflow-y-auto">
                  <div 
                    v-for="notification in notifications" 
                    :key="notification.id"
                    @click="readNotification(notification.id)"
                    :class="notification.read ? 'bg-white' : 'bg-sky-50/30'"
                    class="p-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div class="flex items-start gap-2">
                      <div :class="notification.type === 'birthday' ? 'bg-orange-100 text-orange-600' : 'bg-pink-100 text-pink-600'" class="p-1.5 rounded-lg">
                        <PhCake v-if="notification.type === 'birthday'" :size="14" weight="fill" />
                        <PhHeart v-else :size="14" weight="fill" />
                      </div>
                      <div class="flex-1">
                        <p class="text-xs font-medium text-slate-800">{{ notification.message }}</p>
                        <p class="text-[9px] text-slate-400 mt-0.5">{{ notification.time }}</p>
                      </div>
                      <div v-if="!notification.read" class="w-1.5 h-1.5 bg-sky-500 rounded-full mt-1.5"></div>
                    </div>
                  </div>
                </div>
                
                <div class="p-2 border-t border-slate-50 bg-slate-50/30">
                  <button class="w-full text-center text-[10px] font-bold text-slate-500 hover:text-slate-700 transition-colors">
                    View All Notifications
                  </button>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Profile Dropdown -->
          <div class="relative">
            <button 
              @click="showProfileMenu = !showProfileMenu"
              class="flex items-center gap-2 bg-white p-1.5 pr-4 rounded-xl border border-slate-50 shadow-sm hover:shadow-md transition-all"
            >
              <div class="w-8 h-8 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center font-bold text-sm">AD</div>
              <div class="text-left">
                <p class="text-xs font-bold text-slate-800">Admin</p>
                <p class="text-[9px] font-medium text-slate-400 uppercase">Manager</p>
              </div>
              <PhCaretDown :size="14" class="text-slate-400 ml-1" />
            </button>
            
            <Transition name="dropdown">
              <div 
                v-if="showProfileMenu" 
                class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50"
              >
                <div class="p-3 border-b border-slate-50">
                  <p class="text-sm font-bold text-slate-800">Administrator</p>
                  <p class="text-[10px] text-slate-400 mt-0.5">admin@church.org</p>
                </div>
                
                <div class="py-1">
                  <button class="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 transition-colors text-left">
                    <PhUser :size="16" />
                    Profile Settings
                  </button>
                  <button class="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 transition-colors text-left">
                    <PhGear :size="16" />
                    Account Preferences
                  </button>
                  <button class="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 transition-colors text-left">
                    <PhShield :size="16" />
                    Security
                  </button>
                </div>
                
                <div class="border-t border-slate-50 py-1">
                  <button class="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors text-left font-medium">
                    <PhSignOut :size="16" />
                    Logout
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </header>

      <div class="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-white">
        <div class="flex items-center gap-4 mb-6">
          <div class="p-3 bg-sky-50 rounded-xl text-sky-500">
            <PhStack :size="24" weight="fill" />
          </div>
          <div>
            <h3 class="text-xl font-bold text-slate-800">New Resource Entry</h3>
            <p class="text-sm text-slate-400 mt-0.5">Document items for inventory tracking.</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <button 
            @click="form.category = 'worship'"
            :class="form.category === 'worship' ? 'border-sky-400 bg-sky-50/30' : 'border-slate-100 bg-white'"
            class="flex flex-col items-start p-5 rounded-xl border-2 text-left transition-all group"
          >
            <PhMusicNotes :size="20" :weight="form.category === 'worship' ? 'fill' : 'regular'" class="text-sky-500 mb-3" />
            <span class="block font-bold text-slate-800">Worship Team</span>
            <span class="text-[10px] font-medium text-slate-400 mt-0.5 uppercase tracking-wider">Instruments & Tech</span>
          </button>

          <button 
            @click="form.category = 'pantry'"
            :class="form.category === 'pantry' ? 'border-sky-400 bg-sky-50/30' : 'border-slate-100 bg-white'"
            class="flex flex-col items-start p-5 rounded-xl border-2 text-left transition-all group"
          >
            <PhCookingPot :size="20" :weight="form.category === 'pantry' ? 'fill' : 'regular'" class="text-slate-400 group-hover:text-sky-500 mb-3" />
            <span class="block font-bold text-slate-800">Church Pantry</span>
            <span class="text-[10px] font-medium text-slate-400 mt-0.5 uppercase tracking-wider">Food & Supplies</span>
          </button>
        </div>

        <div class="space-y-5">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Item Name</label>
            <input 
              v-model="form.itemName"
              type="text" 
              placeholder="e.g. Roland Keyboard, Jasmine Rice..."
              class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-4 text-sm text-slate-700 font-medium outline-none transition-all placeholder:text-slate-300"
            />
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Technical Condition</label>
            <input 
              v-model="form.condition"
              type="text" 
              placeholder="Excellent / New"
              class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-4 text-sm text-slate-700 font-medium outline-none transition-all placeholder:text-slate-300"
            />
          </div>
        </div>

        <button 
          @click="saveResource"
          class="w-full mt-8 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 rounded-xl shadow-md shadow-sky-100 transition-all active:scale-[0.98] uppercase tracking-wider text-xs"
        >
          Save Resource Data
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  PhStack, PhMusicNotes, PhCookingPot, PhBell, PhCake, PhHeart,
  PhCaretDown, PhUser, PhGear, PhShield, PhSignOut
} from '@phosphor-icons/vue'
import Sidebar from '../components/Sidebar.vue'

// Dropdown state
const showNotifications = ref(false)
const showProfileMenu = ref(false)

// Notifications data
const notifications = ref([
  { 
    id: 1, 
    type: 'birthday', 
    message: 'Alice Guo has a birthday today!', 
    time: 'Today',
    read: false 
  },
  { 
    id: 2, 
    type: 'anniversary', 
    message: 'Mr. & Mrs. Santos celebrating 15 years', 
    time: 'Tomorrow',
    read: false 
  },
  { 
    id: 3, 
    type: 'birthday', 
    message: 'Main Green\'s birthday in 9 days', 
    time: 'May 1',
    read: true 
  },
])

const unreadNotifications = computed(() => {
  return notifications.value.filter(n => !n.read)
})

const readNotification = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}

// Form state
const form = ref({
  category: 'worship',
  itemName: '',
  condition: ''
})

const saveResource = () => {
  if (!form.value.itemName) {
    alert('Please enter an item name.')
    return
  }
  
  console.log('Resource Saved:', { ...form.value })
  
  form.value.itemName = ''
  form.value.condition = ''
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

input::placeholder {
  font-weight: 500;
}
</style>