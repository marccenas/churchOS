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
                      <PhShield :size="16" />
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

      <div class="space-y-4">
        <!-- Search and Filter Bar -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <!-- Search -->
            <div class="relative">
              <PhMagnifyingGlass :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search by name, email, or phone..."
                class="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-sky-300 w-80"
              />
            </div>

            <!-- Filter Dropdown -->
            <div class="relative">
              <button 
                @click="showFilterMenu = !showFilterMenu"
                class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all"
              >
                <PhFunnel :size="16" />
                Filter by Ministry
                <span v-if="activeMinistryFilters.length > 0" class="bg-sky-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {{ activeMinistryFilters.length }}
                </span>
              </button>

              <Transition name="dropdown">
                <div 
                  v-if="showFilterMenu" 
                  class="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50"
                >
                  <div class="p-3 border-b border-slate-50">
                    <p class="text-xs font-bold text-slate-800">Select Ministries</p>
                  </div>
                  <div class="max-h-64 overflow-y-auto p-2">
                    <label 
                      v-for="ministry in ministryOptions" 
                      :key="ministry"
                      class="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg cursor-pointer"
                    >
                      <input 
                        type="checkbox" 
                        :value="ministry" 
                        v-model="activeMinistryFilters"
                        class="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-200"
                      />
                      <span class="text-xs text-slate-700">{{ ministry }}</span>
                    </label>
                  </div>
                  <div class="p-2 border-t border-slate-50 flex gap-2">
                    <button 
                      @click="activeMinistryFilters = []"
                      class="flex-1 text-center text-[10px] font-bold text-slate-500 hover:text-slate-700 py-1"
                    >
                      Clear All
                    </button>
                    <button 
                      @click="selectAllMinistries"
                      class="flex-1 text-center text-[10px] font-bold text-sky-500 hover:text-sky-600 py-1"
                    >
                      Select All
                    </button>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Active Filters Display -->
            <div v-if="activeMinistryFilters.length > 0" class="flex items-center gap-2">
              <span class="text-xs text-slate-400">Active filters:</span>
              <div class="flex gap-1">
                <span 
                  v-for="ministry in activeMinistryFilters" 
                  :key="ministry"
                  class="text-[9px] font-bold px-2 py-1 rounded-md bg-sky-50 text-sky-600 border border-sky-100 flex items-center gap-1"
                >
                  {{ ministry }}
                  <button @click="removeFilter(ministry)" class="hover:text-sky-800">
                    <PhX :size="10" />
                  </button>
                </span>
              </div>
              <button 
                @click="activeMinistryFilters = []"
                class="text-[9px] text-slate-400 hover:text-slate-600"
              >
                Clear all
              </button>
            </div>
          </div>

          <!-- Add Member Button -->
          <button 
            @click="isModalOpen = true"
            class="flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-sky-100 hover:bg-sky-600 transition-all text-sm"
          >
            <PhPlus :size="18" weight="bold" />
            Add Member
          </button>
        </div>

        <!-- Members Table -->
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
              <tr v-if="filteredMembers.length === 0">
                <td colspan="4" class="p-8 text-center text-slate-400">
                  <PhUsers :size="32" class="mx-auto mb-2 opacity-50" />
                  <p class="text-sm font-medium">No members found</p>
                  <p class="text-xs mt-1">Try adjusting your search or filters</p>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div class="p-4 border-t border-slate-50 flex justify-between items-center bg-slate-50/30">
            <p class="text-xs text-slate-400">
              Showing <span class="text-slate-800">{{ filteredMembers.length > 0 ? startIndex + 1 : 0 }}</span> to 
              <span class="text-slate-800">{{ Math.min(endIndex, filteredMembers.length) }}</span> of 
              <span class="text-slate-800">{{ filteredMembers.length }}</span> members
            </p>
            <div class="flex gap-1.5">
              <button 
                @click="currentPage--" 
                :disabled="currentPage === 1" 
                class="p-1.5 rounded-lg bg-white border border-slate-100 disabled:opacity-30 transition-all"
              >
                <PhCaretLeft :size="16" />
              </button>
              <button 
                v-for="page in visiblePages" 
                :key="page"
                @click="currentPage = page"
                :class="currentPage === page ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 border-slate-100'"
                class="px-3 py-1.5 rounded-lg text-xs font-bold border transition-all"
              >
                {{ page }}
              </button>
              <button 
                @click="currentPage++" 
                :disabled="endIndex >= filteredMembers.length" 
                class="p-1.5 rounded-lg bg-white border border-slate-100 disabled:opacity-30 transition-all"
              >
                <PhCaretRight :size="16" />
              </button>
            </div>
          </div>
        </div>

        <!-- Add Member Modal -->
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
import { RouterLink } from 'vue-router'
import { 
  PhPlus, PhPencilLine, PhCaretLeft, PhCaretRight, PhX,
  PhBell, PhCake, PhHeart, PhCaretDown, PhUser, PhGear, PhShield, PhSignOut,
  PhMagnifyingGlass, PhFunnel, PhUsers
} from '@phosphor-icons/vue'
import Sidebar from '../components/Sidebar.vue'

// Dropdown state
const showNotifications = ref(false)
const showProfileMenu = ref(false)
const showFilterMenu = ref(false)

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

// Member management state
const isModalOpen = ref(false)
const currentPage = ref(1)
const itemsPerPage = 8
const searchQuery = ref('')
const activeMinistryFilters = ref([])

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
  { id: 1, name: 'Rain Daring', email: 'r.daring@example.com', phone: '0912-345-6789', ministries: ['Media', 'Worship'] },
  { id: 2, name: 'Sarah Jenkins', email: 'sarah.j@outlook.com', phone: '0922-111-2222', ministries: ['Kids'] },
  { id: 3, name: 'David Miller', email: '', phone: '0945-888-9999', ministries: ['Worship'] },
  { id: 4, name: 'Grace Hopper', email: 'grace.h@church.org', phone: '0917-000-1111', ministries: [] },
  { id: 5, name: 'Michael Scott', email: 'm.scott@dunder.com', phone: '0918-555-4444', ministries: ['Ushers'] },
  { id: 6, name: 'Jim Halpert', email: 'jimmy@example.com', phone: '0918-222-3333', ministries: ['Youth'] },
  { id: 7, name: 'Pam Beesly', email: 'pam@office.com', phone: '0919-777-8888', ministries: ['Media', 'Kids'] },
  { id: 8, name: 'Dwight Schrute', email: 'dwight@schrutefarms.com', phone: '0920-111-2222', ministries: ['Intercessory'] },
  { id: 9, name: 'Angela Martin', email: 'angela@accounting.com', phone: '0921-333-4444', ministries: ['Worship', 'Ushers'] },
  { id: 10, name: 'Kevin Malone', email: 'kevin@chili.com', phone: '0922-555-6666', ministries: ['Media'] },
])

// Filtered members based on search and ministry filters
const filteredMembers = computed(() => {
  let filtered = members.value
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(member => 
      member.name.toLowerCase().includes(query) ||
      (member.email && member.email.toLowerCase().includes(query)) ||
      member.phone.includes(query)
    )
  }
  
  // Ministry filter
  if (activeMinistryFilters.value.length > 0) {
    filtered = filtered.filter(member => 
      activeMinistryFilters.value.some(ministry => member.ministries.includes(ministry))
    )
  }
  
  return filtered
})

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)
const paginatedMembers = computed(() => filteredMembers.value.slice(startIndex.value, endIndex.value))

const totalPages = computed(() => Math.ceil(filteredMembers.value.length / itemsPerPage))
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const toggleMinistry = (name) => {
  const index = newMember.value.ministries.indexOf(name)
  if (index > -1) {
    newMember.value.ministries.splice(index, 1)
  } else {
    newMember.value.ministries.push(name)
  }
}

const removeFilter = (ministry) => {
  const index = activeMinistryFilters.value.indexOf(ministry)
  if (index > -1) {
    activeMinistryFilters.value.splice(index, 1)
  }
}

const selectAllMinistries = () => {
  activeMinistryFilters.value = [...ministryOptions]
}

const saveMember = () => {
  if (!newMember.value.name) {
    alert('Please enter a name.')
    return
  }
  
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
  currentPage.value = 1 // Reset to first page
}

// Reset page when filters change
const resetPage = () => {
  currentPage.value = 1
}

// Watch for filter changes
import { watch } from 'vue'
watch([searchQuery, activeMinistryFilters], resetPage)

// Click outside for filter menu
const handleClickOutside = (event) => {
  if (showFilterMenu.value && !event.target.closest('.relative')) {
    showFilterMenu.value = false
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('click', handleClickOutside)
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