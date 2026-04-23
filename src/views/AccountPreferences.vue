<template>
  <div class="flex min-h-screen bg-[#F0F9FF]">
    <Sidebar />
    
    <main class="ml-72 flex-1 p-6">
      <header class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Account Preferences</h2>
          <p class="text-sm text-slate-500 mt-0.5">Customize your experience and notification settings.</p>
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
                  <RouterLink to="/profile" custom v-slot="{ navigate }">
                    <button @click="navigate" class="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 transition-colors text-left">
                      <PhUser :size="16" />
                      Profile Settings
                    </button>
                  </RouterLink>
                  <RouterLink to="/preferences" custom v-slot="{ navigate }">
                    <button @click="navigate" class="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 transition-colors text-left">
                      <PhGear :size="16" />
                      Account Preferences
                    </button>
                  </RouterLink>
                  <RouterLink to="/security" custom v-slot="{ navigate }">
                    <button @click="navigate" class="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 transition-colors text-left">
                      <PhGear :size="16" />
                      Security
                    </button>
                  </RouterLink>
                </div>
                
                <div class="border-t border-slate-50 py-1">
                  <RouterLink to="/login" custom v-slot="{ navigate }">
                    <button @click="navigate" class="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors text-left font-medium">
                      <PhSignOut :size="16" />
                      Logout
                    </button>
                  </RouterLink>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </header>

      <div class="space-y-8">
        <!-- Notification Preferences Section -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-sky-50 rounded-lg text-sky-500">
              <PhBell :size="20" weight="fill" />
            </div>
            <h3 class="text-lg font-bold text-slate-800">Notification Preferences</h3>
          </div>
          
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-white">
            <div class="space-y-4">
              <div class="flex items-center justify-between py-2">
                <div>
                  <p class="font-medium text-slate-800">Email Notifications</p>
                  <p class="text-xs text-slate-400 mt-0.5">Receive email updates about important activity</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="preferences.emailNotifications" class="sr-only peer">
                  <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                </label>
              </div>
              
              <div class="flex items-center justify-between py-2 border-t border-slate-50">
                <div>
                  <p class="font-medium text-slate-800">Push Notifications</p>
                  <p class="text-xs text-slate-400 mt-0.5">Receive push notifications in your browser</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="preferences.pushNotifications" class="sr-only peer">
                  <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                </label>
              </div>

              <div class="border-t border-slate-50 pt-4">
                <p class="font-medium text-slate-800 mb-3">Notify me about</p>
                <div class="space-y-3">
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" v-model="preferences.notifyBirthdays" class="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-200">
                    <span class="text-sm text-slate-700">Member Birthdays</span>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" v-model="preferences.notifyAnniversaries" class="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-200">
                    <span class="text-sm text-slate-700">Wedding Anniversaries</span>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" v-model="preferences.notifyInventory" class="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-200">
                    <span class="text-sm text-slate-700">Low Inventory Alerts</span>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" v-model="preferences.notifyNewMembers" class="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-200">
                    <span class="text-sm text-slate-700">New Member Registrations</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Language & Region Section -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-slate-100 rounded-lg text-slate-500">
              <PhGlobe :size="20" weight="fill" />
            </div>
            <h3 class="text-lg font-bold text-slate-800">Language & Region</h3>
          </div>
          
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-white">
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Language</label>
                <select 
                  v-model="preferences.language"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-300"
                >
                  <option value="en">English</option>
                  <option value="tl">Tagalog</option>
                  <option value="es">Spanish</option>
                </select>
              </div>
              
              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Time Zone</label>
                <select 
                  v-model="preferences.timezone"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-300"
                >
                  <option value="Asia/Manila">Philippines (UTC+8)</option>
                  <option value="America/New_York">Eastern Time (UTC-5)</option>
                  <option value="America/Los_Angeles">Pacific Time (UTC-8)</option>
                  <option value="Europe/London">London (UTC+0)</option>
                </select>
              </div>
              
              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Date Format</label>
                <select 
                  v-model="preferences.dateFormat"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-300"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <!-- Save Button -->
        <div class="flex justify-end">
          <button 
            @click="savePreferences"
            class="bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-3 rounded-xl shadow-md shadow-sky-100 transition-all text-sm"
          >
            Save All Preferences
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  PhBell, PhCake, PhHeart, PhCaretDown, PhUser, PhGear, PhShield, PhSignOut,
  PhMonitor, PhSun, PhMoon, PhDesktop, PhGlobe
} from '@phosphor-icons/vue'
import Sidebar from '../components/Sidebar.vue'

// Dropdown state
const showNotifications = ref(false)
const showProfileMenu = ref(false)

// Notifications data
const notifications = ref([
  { id: 1, type: 'birthday', message: 'Alice Guo has a birthday today!', time: 'Today', read: false },
  { id: 2, type: 'anniversary', message: 'Mr. & Mrs. Santos celebrating 15 years', time: 'Tomorrow', read: false },
  { id: 3, type: 'birthday', message: 'Main Green\'s birthday in 9 days', time: 'May 1', read: true },
])

const unreadNotifications = computed(() => notifications.value.filter(n => !n.read))
const readNotification = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) notification.read = true
}
const markAllAsRead = () => notifications.value.forEach(n => n.read = true)

// Preferences data
const preferences = ref({
  emailNotifications: true,
  pushNotifications: false,
  notifyBirthdays: true,
  notifyAnniversaries: true,
  notifyInventory: true,
  notifyNewMembers: true,
  theme: 'light',
  itemsPerPage: 25,
  compactMode: false,
  language: 'en',
  timezone: 'Asia/Manila',
  dateFormat: 'MM/DD/YYYY'
})

const savePreferences = () => {
  alert('Preferences saved successfully!')
  console.log('Preferences saved:', preferences.value)
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
</style>