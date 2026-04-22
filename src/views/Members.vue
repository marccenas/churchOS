<template>
  <div class="flex min-h-screen bg-[#F0F9FF]">
    <Sidebar />
    
    <main class="ml-72 flex-1 p-6">
      <header class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Church Registry</h2>
          <p class="text-sm text-slate-500 mt-0.5">Manage and view all registered church members.</p>
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

      <div class="space-y-5">
        <div class="flex justify-end">
          <button 
            @click="isModalOpen = true"
            class="flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-sky-100 hover:bg-sky-600 transition-all text-sm"
          >
            <PhPlus :size="18" weight="bold" />
            Add Member
          </button>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-white overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/50 border-b border-slate-50">
                <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Full Name / Email</th>
                <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Contact</th>
                <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Ministries</th>
                <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr v-for="member in paginatedMembers" :key="member.id" class="hover:bg-sky-50/30 transition-colors group">
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center font-bold uppercase text-xs">
                      {{ member.name.charAt(0) }}
                    </div>
                    <div>
                      <p class="font-bold text-slate-800 text-sm">{{ member.name }}</p>
                      <p class="text-xs text-slate-400 mt-0.5">{{ member.email || 'No email provided' }}</p>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-sm text-slate-500">{{ member.phone }}</td>
                <td class="p-4">
                  <div class="flex flex-wrap gap-1.5">
                    <span 
                      v-for="m in member.ministries" :key="m"
                      class="text-[9px] font-bold px-2 py-0.5 rounded-md bg-sky-50 text-sky-600 border border-sky-100"
                    >
                      {{ m }}
                    </span>
                    <span v-if="!member.ministries.length" class="text-xs text-slate-300 italic">None</span>
                  </div>
                </td>
                <td class="p-4 text-right">
                  <button class="p-1.5 text-slate-400 hover:text-sky-500 transition-colors">
                    <PhPencilLine :size="18" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="p-4 border-t border-slate-50 flex justify-between items-center bg-slate-50/30">
            <p class="text-xs text-slate-400">
              Showing <span class="text-slate-800">{{ members.length > 0 ? startIndex + 1 : 0 }}</span> to <span class="text-slate-800">{{ Math.min(endIndex, members.length) }}</span> of {{ members.length }}
            </p>
            <div class="flex gap-1.5">
              <button @click="currentPage--" :disabled="currentPage === 1" class="p-1.5 rounded-lg bg-white border border-slate-100 disabled:opacity-30 transition-all">
                <PhCaretLeft :size="16" />
              </button>
              <button @click="currentPage++" :disabled="endIndex >= members.length" class="p-1.5 rounded-lg bg-white border border-slate-100 disabled:opacity-30 transition-all">
                <PhCaretRight :size="16" />
              </button>
            </div>
          </div>
        </div>

        <div v-if="isModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div @click="isModalOpen = false" class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
          
          <div class="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
            <div class="flex justify-between items-start mb-5">
              <div>
                <h3 class="text-xl font-bold text-slate-900">New Member Profile</h3>
                <p class="text-sm text-slate-500">Complete the information below to register a member.</p>
              </div>
              <button @click="isModalOpen = false" class="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                <PhX :size="20" />
              </button>
            </div>

            <form @submit.prevent="saveMember" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2 md:col-span-1">
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input v-model="newMember.name" type="text" placeholder="John Doe" class="w-full p-3 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-sky-100 outline-none text-slate-700" required />
                </div>

                <div class="col-span-2 md:col-span-1">
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input v-model="newMember.email" type="email" placeholder="name@email.com" class="w-full p-3 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-sky-100 outline-none text-slate-700" />
                </div>
                
                <div class="col-span-2 md:col-span-1">
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                  <input v-model="newMember.phone" type="text" placeholder="09XX XXX XXXX" class="w-full p-3 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-sky-100 outline-none text-slate-700" />
                </div>

                <div class="col-span-2 md:col-span-1">
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Birth Date</label>
                  <input v-model="newMember.birthday" type="date" class="w-full p-3 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-sky-100 outline-none text-slate-700" />
                </div>

                <div class="col-span-2">
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Home Address</label>
                  <input v-model="newMember.address" type="text" placeholder="Street, Barangay, City" class="w-full p-3 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-sky-100 outline-none text-slate-700" />
                </div>

                <div class="col-span-2">
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Ministries (Optional)</label>
                  <div class="flex flex-wrap gap-2">
                    <button 
                      v-for="ministry in ministryOptions" 
                      :key="ministry"
                      type="button"
                      @click="toggleMinistry(ministry)"
                      :class="newMember.ministries.includes(ministry) ? 'bg-sky-500 text-white shadow-sm' : 'bg-slate-50 text-slate-500 hover:bg-slate-200'"
                      class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    >
                      {{ ministry }}
                    </button>
                  </div>
                </div>
              </div>

              <div class="flex gap-3 pt-3">
                <button type="button" @click="isModalOpen = false" class="flex-1 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
                <button type="submit" class="flex-1 py-2.5 bg-sky-500 text-white text-sm font-bold rounded-xl shadow-md shadow-sky-100 hover:bg-sky-600 transition-all">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  PhPlus, PhPencilLine, PhCaretLeft, PhCaretRight, PhX,
  PhBell, PhCake, PhHeart, PhCaretDown, PhUser, PhGear, PhShield, PhSignOut
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

// Member management state
const isModalOpen = ref(false)
const currentPage = ref(1)
const itemsPerPage = 8

const ministryOptions = ['Worship', 'Media', 'Youth', 'Ushers', 'Kids', 'Intercessory']
const newMember = ref({
  name: '',
  email: '',
  phone: '',
  birthday: '',
  address: '',
  ministries: []
})

const members = ref([
  { id: 1, name: 'Marc Arcenas', email: 'marc@example.com', phone: '0912-345-6789', ministries: ['Media', 'Worship'] },
  { id: 2, name: 'Sarah Jenkins', email: 'sarah.j@outlook.com', phone: '0922-111-2222', ministries: ['Kids'] },
  { id: 3, name: 'David Miller', email: '', phone: '0945-888-9999', ministries: ['worship'] },
  { id: 4, name: 'Grace Hopper', email: 'grace.h@church.org', phone: '0917-000-1111', ministries: [] },
  { id: 5, name: 'Michael Scott', email: 'm.scott@dunder.com', phone: '0918-555-4444', ministries: ['Ushers'] },
  { id: 6, name: 'Jim Halpert', email: 'jimmy@example.com', phone: '0918-222-3333', ministries: ['Youth'] },
])

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)
const paginatedMembers = computed(() => members.value.slice(startIndex.value, endIndex.value))

const toggleMinistry = (name) => {
  const index = newMember.value.ministries.indexOf(name)
  if (index > -1) {
    newMember.value.ministries.splice(index, 1)
  } else {
    newMember.value.ministries.push(name)
  }
}

const saveMember = () => {
  members.value.unshift({
    id: Date.now(),
    ...newMember.value
  })
  
  newMember.value = { 
    name: '', 
    email: '', 
    phone: '', 
    birthday: '', 
    address: '', 
    ministries: [] 
  }
  isModalOpen.value = false
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