<template>
  <div class="flex min-h-screen bg-[#F0F9FF]">
    <Sidebar />

    <main class="ml-72 flex-1 p-6">
      <header class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Welcome, Administrator</h2>
          <p class="text-sm text-slate-500 mt-0.5">{{ currentDateDisplay }}</p>
        </div>
        <div class="flex items-center gap-3">
          <!-- Notifications Dropdown -->
          <div class="relative" ref="notificationDropdown">
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
          <div class="relative" ref="profileDropdown">
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

      <div v-if="activeTab === 'overview'" class="grid grid-cols-12 gap-5">
        <div class="col-span-8 space-y-5">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-white">
            <h3 class="text-lg font-bold text-slate-800 mb-1">Member Highlights</h3>
            <p class="text-slate-400 text-xs mb-4">Upcoming birthdays and anniversaries</p>
            
            <div class="space-y-2.5">
              <div v-for="event in events" :key="event.id" class="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl">
                <div class="flex items-center gap-3">
                  <div :class="event.type === 'Birthday' ? 'bg-orange-100 text-orange-600' : 'bg-pink-100 text-pink-600'" class="p-3 rounded-xl">
                    <PhCake v-if="event.type === 'Birthday'" :size="20" weight="fill" />
                    <PhHeart v-else :size="20" weight="fill" />
                  </div>
                  <div>
                    <p class="font-bold text-slate-800">{{ getEventSentence(event) }}</p>
                    <p class="text-xs text-slate-400">{{ event.type === 'Birthday' ? 'Celebrating Birthday' : 'Wedding Anniversary' }}</p>
                  </div>
                </div>
                <p class="text-xs font-bold text-slate-400">{{ formatEventDate(event.date) }}</p>
              </div>
            </div>
          </div>

          <div class="bg-sky-500 rounded-2xl p-6 text-white shadow-lg shadow-sky-200/50 relative overflow-hidden">
            <PhWaves class="absolute -bottom-8 -right-8 opacity-20 rotate-12" :size="180" />
            <div class="relative z-10 grid grid-cols-2 gap-6">
              <div>
                <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-md">
                  <PhPackage :size="24" weight="fill" />
                </div>
                <h3 class="font-bold text-xl tracking-tight">Inventory Status</h3>
                <p class="opacity-80 text-xs mt-1">Centralized resource tracking system.</p>
              </div>
              <div class="space-y-2">
                <div class="flex items-center justify-between bg-white/10 p-4 rounded-xl border border-white/10">
                  <span class="text-sm font-medium">Worship Resources</span>
                  <span class="text-xl font-black">42</span>
                </div>
                <div class="flex items-center justify-between bg-white/10 p-4 rounded-xl border border-white/10">
                  <span class="text-sm font-medium">Pantry Items</span>
                  <span class="text-xl font-black">128</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-4">
          <div class="bg-white rounded-2xl p-5 shadow-sm border border-white">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-slate-800">Calendar</h3>
              <button @click="showModal = true" class="p-1.5 text-sky-500 bg-sky-50 rounded-lg hover:bg-sky-500 hover:text-white transition-all">
                <PhArrowsOutSimple :size="16" weight="bold" />
              </button>
            </div>
            <div class="grid grid-cols-7 gap-1 text-center">
              <span v-for="d in ['S','M','T','W','T','F','S']" :key="d" class="text-[9px] font-bold text-slate-300">{{d}}</span>
              <div v-for="(date, idx) in miniCalendarDays" :key="idx" 
                   class="aspect-square flex items-center justify-center text-[9px] font-bold rounded-md relative"
                   :class="[
                     !date.isCurrentMonth ? 'text-slate-200' : 'text-slate-600',
                     isToday(date) ? 'bg-sky-500 text-white shadow-sm' : '',
                     getEventsForDate(date).length && !isToday(date) ? 'after:content-[\'\'] after:absolute after:bottom-0.5 after:w-1 after:h-1 after:bg-sky-400 after:rounded-full' : ''
                   ]">
                {{ date.day }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col items-center justify-center min-h-[60vh] text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
        <PhLayout :size="48" weight="thin" class="mb-3" />
        <h3 class="text-lg font-bold text-slate-800">{{ activeTab.toUpperCase() }} Page</h3>
        <p class="text-sm">This module is currently being integrated.</p>
      </div>
    </main>

    <Transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <div class="bg-white w-full max-w-4xl max-h-[85vh] rounded-2xl p-6 shadow-2xl relative flex flex-col overflow-hidden">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-4 shrink-0">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <h2 class="text-2xl font-bold text-slate-800">{{ monthNames[viewDate.getMonth()] }} {{ viewDate.getFullYear() }}</h2>
                <button @click="resetToToday" class="px-3 py-1 bg-sky-500 text-white text-[9px] font-black rounded-md uppercase">Today</button>
              </div>
              <div class="flex flex-wrap items-center gap-3">
                <div class="flex items-center gap-1.5 pr-3 border-r border-slate-100">
                  <button @click="toggleFilter('Birthday')" :class="filters.includes('Birthday') ? 'bg-orange-50 text-orange-600' : 'text-slate-400'" class="px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all">Birthdays</button>
                  <button @click="toggleFilter('Anniversary')" :class="filters.includes('Anniversary') ? 'bg-pink-50 text-pink-600' : 'text-slate-400'" class="px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all">Anniversaries</button>
                </div>
                <input type="date" v-model="jumpDate" @change="handleDateJump" class="bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 text-[10px] font-bold" />
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button @click="changeMonth(-1)" class="p-1.5 hover:bg-slate-100 rounded-lg"><PhCaretLeft :size="18" /></button>
              <button @click="changeMonth(1)" class="p-1.5 hover:bg-slate-100 rounded-lg"><PhCaretRight :size="18" /></button>
              <button @click="showModal = false" class="p-2 bg-slate-50 rounded-lg"><PhX :size="20" /></button>
            </div>
          </div>
          <div class="flex-1 overflow-y-auto custom-scrollbar">
            <div class="grid grid-cols-7 gap-px bg-slate-100 rounded-xl overflow-hidden">
              <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="bg-slate-50 p-2 text-center text-[9px] font-black text-slate-400 uppercase">{{ day }}</div>
              <div v-for="(date, idx) in calendarDays" :key="idx" class="min-h-[90px] bg-white p-2">
                <span class="text-xs font-bold" :class="isToday(date) ? 'text-sky-500' : 'text-slate-300'">{{ date.day }}</span>
                <div class="mt-1 space-y-0.5">
                  <div v-for="event in getFilteredEvents(date)" :key="event.id" :class="event.type === 'Birthday' ? 'bg-orange-50 text-orange-600' : 'bg-pink-50 text-pink-600'" class="text-[8px] font-bold px-1 py-0.5 rounded">{{ getEventSentence(event, true) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  PhPackage, PhCake, PhHeart, PhWaves, PhCaretLeft, PhCaretRight, 
  PhX, PhArrowsOutSimple, PhBell, PhLayout, PhCaretDown,
  PhUser, PhGear, PhShield, PhSignOut
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

// Computed property for unread notifications
const unreadNotifications = computed(() => {
  return notifications.value.filter(n => !n.read)
})

// Notification methods
const readNotification = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}

// Dashboard state
const activeTab = ref('overview')
const showModal = ref(false)
const viewDate = ref(new Date())
const jumpDate = ref('')
const filters = ref(['Birthday', 'Anniversary'])
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const events = ref([
  { id: 1, name: 'Alice Guo', type: 'Birthday', date: '2026-04-22' },
  { id: 2, type: 'Anniversary', date: '2026-04-25', husband: 'Juan', wife: 'Maria', lastName: 'Santos' },
  { id: 3, name: 'Main Green', type: 'Birthday', date: '2026-05-01' },
])

const toggleFilter = (type) => {
  const i = filters.value.indexOf(type)
  i > -1 ? filters.value.splice(i, 1) : filters.value.push(type)
}

const resetToToday = () => {
  viewDate.value = new Date()
  jumpDate.value = ''
}

const handleDateJump = () => {
  if (jumpDate.value) viewDate.value = new Date(jumpDate.value)
}

const changeMonth = (d) => {
  viewDate.value = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() + d, 1)
}

const getEventSentence = (event, short = false) => {
  if (event.type === 'Anniversary') {
    return short ? `❤️ ${event.husband} & ${event.wife}` : `Mr. & Mrs. ${event.lastName} (${event.husband} & ${event.wife})`
  }
  return short ? `🎂 ${event.name}` : event.name
}

const formatEventDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
}

const generateDays = (dateRef) => {
  const y = dateRef.getFullYear()
  const m = dateRef.getMonth()
  const first = new Date(y, m, 1).getDay()
  const len = new Date(y, m + 1, 0).getDate()
  const days = []
  
  for (let i = first - 1; i >= 0; i--) {
    days.push({ day: new Date(y, m, 0).getDate() - i, month: m - 1, year: y, isCurrentMonth: false })
  }
  for (let i = 1; i <= len; i++) {
    days.push({ day: i, month: m, year: y, isCurrentMonth: true })
  }
  while (days.length < 42) {
    days.push({ day: days.length - (len + first) + 1, month: m + 1, year: y, isCurrentMonth: false })
  }
  
  return days
}

const calendarDays = computed(() => generateDays(viewDate.value))
const miniCalendarDays = computed(() => generateDays(new Date()))

const getEventsForDate = (d) => {
  const ds = `${d.year}-${String(d.month + 1).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`
  return events.value.filter(e => e.date === ds)
}

const getFilteredEvents = (d) => {
  return getEventsForDate(d).filter(e => filters.value.includes(e.type))
}

const isToday = (d) => {
  const t = new Date()
  return d.day === t.getDate() && d.month === t.getMonth() && d.year === t.getFullYear()
}

const currentDateDisplay = computed(() => {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
})
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E2E8F0;
  border-radius: 10px;
}
</style>