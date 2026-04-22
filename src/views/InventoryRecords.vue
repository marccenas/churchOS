<template>
  <div class="flex min-h-screen bg-[#F0F9FF]">
    <Sidebar />
    
    <main class="ml-72 flex-1 p-6">
      <header class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Inventory Records</h2>
          <p class="text-sm text-slate-500 mt-0.5">View and manage all inventory items.</p>
        </div>
        <div class="flex items-center gap-3">
          <!-- View Toggle -->
          <div class="flex gap-2 mr-2">
            <RouterLink to="/inventory" custom v-slot="{ navigate }">
              <button @click="navigate" class="p-2.5 bg-white rounded-xl text-slate-400 shadow-sm border border-slate-50 hover:text-sky-500 transition-all">
                <PhPlusCircle :size="20" />
              </button>
            </RouterLink>
            <button class="p-2.5 bg-sky-500 rounded-xl text-white shadow-sm border border-sky-500 transition-all">
              <PhTable :size="20" />
            </button>
          </div>
          
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
        <!-- Category Tabs and Filters -->
        <div class="flex items-center justify-between">
          <div class="flex gap-2">
            <button 
              @click="activeCategory = 'worship'"
              :class="activeCategory === 'worship' ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 border-slate-200'"
              class="px-5 py-2.5 rounded-xl text-sm font-bold border transition-all flex items-center gap-2"
            >
              <PhMusicNotes :size="18" :weight="activeCategory === 'worship' ? 'fill' : 'regular'" />
              Worship Resources
            </button>
            <button 
              @click="activeCategory = 'pantry'"
              :class="activeCategory === 'pantry' ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 border-slate-200'"
              class="px-5 py-2.5 rounded-xl text-sm font-bold border transition-all flex items-center gap-2"
            >
              <PhCookingPot :size="18" :weight="activeCategory === 'pantry' ? 'fill' : 'regular'" />
              Pantry Items
            </button>
          </div>

          <div class="flex items-center gap-3">
            <!-- Search -->
            <div class="relative">
              <PhMagnifyingGlass :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search items..."
                class="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-sky-300 w-64"
              />
            </div>

            <!-- Filter Dropdown -->
            <div class="relative">
              <button 
                @click="showFilterMenu = !showFilterMenu"
                class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all"
              >
                <PhFunnel :size="16" />
                Filter
                <span v-if="activeFilters.length > 0" class="bg-sky-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {{ activeFilters.length }}
                </span>
              </button>

              <Transition name="dropdown">
                <div 
                  v-if="showFilterMenu" 
                  class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50"
                >
                  <div class="p-3 border-b border-slate-50">
                    <p class="text-xs font-bold text-slate-800">Filter by Type</p>
                  </div>
                  <div class="max-h-64 overflow-y-auto p-2">
                    <label 
                      v-for="type in filterOptions" 
                      :key="type"
                      class="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg cursor-pointer"
                    >
                      <input 
                        type="checkbox" 
                        :value="type" 
                        v-model="activeFilters"
                        class="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-200"
                      />
                      <span class="text-xs text-slate-700">{{ type }}</span>
                    </label>
                  </div>
                  <div class="p-2 border-t border-slate-50">
                    <button 
                      @click="activeFilters = []"
                      class="w-full text-center text-[10px] font-bold text-slate-500 hover:text-slate-700 py-1"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <!-- Table with Fade Transition -->
        <Transition name="fade" mode="out-in">
          <div :key="activeCategory" class="bg-white rounded-2xl shadow-sm border border-white overflow-hidden">
            <!-- Worship Table -->
            <div v-if="activeCategory === 'worship'">
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-slate-50/50 border-b border-slate-50">
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Equipment Name</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Type</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Brand/Model</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Condition</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Location</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Quantity</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  <tr v-for="item in filteredWorshipItems" :key="item.id" class="hover:bg-sky-50/30 transition-colors">
                    <td class="p-4">
                      <div class="flex items-center gap-3">
                        <div class="p-2 bg-sky-50 rounded-lg text-sky-500">
                          <PhMusicNotes :size="16" weight="fill" />
                        </div>
                        <span class="font-medium text-slate-800 text-sm">{{ item.equipmentName }}</span>
                      </div>
                    </td>
                    <td class="p-4">
                      <span class="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 text-slate-600">
                        {{ item.equipmentType }}
                      </span>
                    </td>
                    <td class="p-4 text-sm text-slate-600">{{ item.brand || '-' }}</td>
                    <td class="p-4">
                      <span :class="getConditionClass(item.condition)" class="text-[10px] font-bold px-2 py-1 rounded-full">
                        {{ item.condition }}
                      </span>
                    </td>
                    <td class="p-4 text-sm text-slate-600">{{ item.location || '-' }}</td>
                    <td class="p-4 text-sm text-slate-700 font-medium">{{ item.quantity }}</td>
                    <td class="p-4 text-right">
                      <button class="p-1.5 text-slate-400 hover:text-sky-500 transition-colors">
                        <PhPencilLine :size="16" />
                      </button>
                      <button class="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
                        <PhTrash :size="16" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pantry Table -->
            <div v-else>
              <!-- Pantry Sub-tabs -->
              <div class="p-4 border-b border-slate-50 flex gap-2">
                <button 
                  @click="pantrySubTab = 'food'"
                  :class="pantrySubTab === 'food' ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'"
                  class="px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
                >
                  Food & Ingredients
                </button>
                <button 
                  @click="pantrySubTab = 'equipment'"
                  :class="pantrySubTab === 'equipment' ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'"
                  class="px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
                >
                  Kitchen Equipment
                </button>
              </div>

              <!-- Food Table -->
              <table v-if="pantrySubTab === 'food'" class="w-full text-left">
                <thead>
                  <tr class="bg-slate-50/50 border-b border-slate-50">
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Item Name</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Category</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Quantity</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Unit</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Expiration</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Location</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  <tr v-for="item in filteredPantryFoodItems" :key="item.id" class="hover:bg-sky-50/30 transition-colors">
                    <td class="p-4">
                      <div class="flex items-center gap-3">
                        <div class="p-2 bg-orange-50 rounded-lg text-orange-500">
                          <PhBowlFood :size="16" weight="fill" />
                        </div>
                        <span class="font-medium text-slate-800 text-sm">{{ item.itemName }}</span>
                      </div>
                    </td>
                    <td class="p-4">
                      <span class="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 text-slate-600">
                        {{ item.category }}
                      </span>
                    </td>
                    <td class="p-4 text-sm text-slate-700 font-medium">{{ item.quantity }}</td>
                    <td class="p-4 text-sm text-slate-600">{{ item.unit }}</td>
                    <td class="p-4">
                      <span :class="isExpiringSoon(item.expirationDate) ? 'text-red-600 bg-red-50' : 'text-slate-600'" class="text-xs font-medium">
                        {{ formatDate(item.expirationDate) }}
                      </span>
                    </td>
                    <td class="p-4 text-sm text-slate-600">{{ item.storageLocation || '-' }}</td>
                    <td class="p-4 text-right">
                      <button class="p-1.5 text-slate-400 hover:text-sky-500 transition-colors">
                        <PhPencilLine :size="16" />
                      </button>
                      <button class="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
                        <PhTrash :size="16" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Equipment Table -->
              <table v-else class="w-full text-left">
                <thead>
                  <tr class="bg-slate-50/50 border-b border-slate-50">
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Equipment Name</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Type</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Brand</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Condition</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Power</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Location</th>
                    <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  <tr v-for="item in filteredPantryEquipmentItems" :key="item.id" class="hover:bg-sky-50/30 transition-colors">
                    <td class="p-4">
                      <div class="flex items-center gap-3">
                        <div class="p-2 bg-slate-100 rounded-lg text-slate-500">
                          <PhOven :size="16" weight="fill" />
                        </div>
                        <span class="font-medium text-slate-800 text-sm">{{ item.equipmentName }}</span>
                      </div>
                    </td>
                    <td class="p-4">
                      <span class="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 text-slate-600">
                        {{ item.equipmentType }}
                      </span>
                    </td>
                    <td class="p-4 text-sm text-slate-600">{{ item.brand || '-' }}</td>
                    <td class="p-4">
                      <span :class="getConditionClass(item.condition)" class="text-[10px] font-bold px-2 py-1 rounded-full">
                        {{ item.condition }}
                      </span>
                    </td>
                    <td class="p-4 text-sm text-slate-600">{{ item.powerRating || '-' }}</td>
                    <td class="p-4 text-sm text-slate-600">{{ item.location || '-' }}</td>
                    <td class="p-4 text-right">
                      <button class="p-1.5 text-slate-400 hover:text-sky-500 transition-colors">
                        <PhPencilLine :size="16" />
                      </button>
                      <button class="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
                        <PhTrash :size="16" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div class="p-4 border-t border-slate-50 flex justify-between items-center bg-slate-50/30">
              <p class="text-xs text-slate-400">
                Showing <span class="text-slate-800">{{ startIndex + 1 }}</span> to 
                <span class="text-slate-800">{{ Math.min(endIndex, totalItems) }}</span> of 
                <span class="text-slate-800">{{ totalItems }}</span> items
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
                  :disabled="endIndex >= totalItems" 
                  class="p-1.5 rounded-lg bg-white border border-slate-100 disabled:opacity-30 transition-all"
                >
                  <PhCaretRight :size="16" />
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  PhBell, PhCake, PhHeart, PhCaretDown, PhUser, PhGear, PhShield, PhSignOut,
  PhTable, PhPlusCircle, PhMusicNotes, PhCookingPot, PhMagnifyingGlass, PhFunnel,
  PhPencilLine, PhTrash, PhCaretLeft, PhCaretRight, PhBowlFood, PhOven
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

// Table state
const activeCategory = ref('worship')
const pantrySubTab = ref('food')
const searchQuery = ref('')
const activeFilters = ref([])
const currentPage = ref(1)
const itemsPerPage = 10

// Sample Worship Data
const worshipItems = ref([
  { id: 1, equipmentName: 'Roland Keyboard', equipmentType: 'Instrument', brand: 'Roland', condition: 'excellent', quantity: 2, location: 'Stage' },
  { id: 2, equipmentName: 'Shure Microphone', equipmentType: 'Audio', brand: 'Shure', condition: 'good', quantity: 6, location: 'Sound Booth' },
  { id: 3, equipmentName: 'LED Par Lights', equipmentType: 'Lighting', brand: 'Chauvet', condition: 'good', quantity: 8, location: 'Stage' },
  { id: 4, equipmentName: 'Projector', equipmentType: 'Visual', brand: 'Epson', condition: 'excellent', quantity: 1, location: 'AV Room' },
  { id: 5, equipmentName: 'Acoustic Guitar', equipmentType: 'Instrument', brand: 'Yamaha', condition: 'fair', quantity: 3, location: 'Stage' },
  { id: 6, equipmentName: 'Mixing Console', equipmentType: 'Audio', brand: 'Behringer', condition: 'good', quantity: 1, location: 'Sound Booth' },
  { id: 7, equipmentName: 'Drum Set', equipmentType: 'Instrument', brand: 'Pearl', condition: 'good', quantity: 1, location: 'Stage' },
  { id: 8, equipmentName: 'Wireless Mic System', equipmentType: 'Audio', brand: 'Sennheiser', condition: 'excellent', quantity: 4, location: 'Sound Booth' },
  { id: 9, equipmentName: 'Monitor Speakers', equipmentType: 'Audio', brand: 'JBL', condition: 'good', quantity: 2, location: 'Stage' },
  { id: 10, equipmentName: 'Bass Guitar', equipmentType: 'Instrument', brand: 'Fender', condition: 'good', quantity: 1, location: 'Stage' },
  { id: 11, equipmentName: 'Keyboard Stand', equipmentType: 'Other', brand: 'On-Stage', condition: 'good', quantity: 3, location: 'Stage' },
  { id: 12, equipmentName: 'Cables (XLR)', equipmentType: 'Audio', brand: 'Mogami', condition: 'fair', quantity: 20, location: 'Sound Booth' },
])

// Sample Pantry Food Data
const pantryFoodItems = ref([
  { id: 1, itemName: 'Jasmine Rice', category: 'Grains', quantity: 50, unit: 'kg', expirationDate: '2026-08-15', storageLocation: 'Shelf A', supplier: 'Local Market' },
  { id: 2, itemName: 'Canned Tuna', category: 'Canned', quantity: 100, unit: 'can', expirationDate: '2027-03-20', storageLocation: 'Shelf B', supplier: 'Donation' },
  { id: 3, itemName: 'Cooking Oil', category: 'Condiments', quantity: 20, unit: 'liter', expirationDate: '2026-06-10', storageLocation: 'Shelf C', supplier: 'Wholesale Club' },
  { id: 4, itemName: 'All-Purpose Flour', category: 'Baking', quantity: 25, unit: 'kg', expirationDate: '2026-05-30', storageLocation: 'Shelf A', supplier: 'Bakery Supply' },
  { id: 5, itemName: 'Sugar', category: 'Baking', quantity: 30, unit: 'kg', expirationDate: '2026-09-01', storageLocation: 'Shelf A', supplier: 'Wholesale Club' },
  { id: 6, itemName: 'Instant Coffee', category: 'Beverages', quantity: 15, unit: 'pack', expirationDate: '2026-12-25', storageLocation: 'Shelf B', supplier: 'Donation' },
  { id: 7, itemName: 'Powdered Milk', category: 'Dairy', quantity: 10, unit: 'kg', expirationDate: '2026-04-28', storageLocation: 'Shelf C', supplier: 'Donation' },
  { id: 8, itemName: 'Canned Corn', category: 'Canned', quantity: 80, unit: 'can', expirationDate: '2027-01-15', storageLocation: 'Shelf B', supplier: 'Local Market' },
])

// Sample Pantry Equipment Data
const pantryEquipmentItems = ref([
  { id: 1, equipmentName: 'Commercial Oven', equipmentType: 'Cooking', brand: 'Vulcan', condition: 'good', powerRating: '240V/6000W', quantity: 1, location: 'Kitchen' },
  { id: 2, equipmentName: 'Industrial Refrigerator', equipmentType: 'Refrigeration', brand: 'True', condition: 'excellent', powerRating: '220V/1200W', quantity: 2, location: 'Kitchen' },
  { id: 3, equipmentName: 'Rice Cooker (Large)', equipmentType: 'Cooking', brand: 'Zojirushi', condition: 'good', powerRating: '220V/1500W', quantity: 3, location: 'Kitchen' },
  { id: 4, equipmentName: 'Food Processor', equipmentType: 'Preparation', brand: 'Cuisinart', condition: 'good', powerRating: '220V/750W', quantity: 2, location: 'Prep Station' },
  { id: 5, equipmentName: 'Stand Mixer', equipmentType: 'Preparation', brand: 'KitchenAid', condition: 'excellent', powerRating: '220V/500W', quantity: 1, location: 'Baking Station' },
  { id: 6, equipmentName: 'Deep Fryer', equipmentType: 'Cooking', brand: 'Pitco', condition: 'fair', powerRating: '220V/3500W', quantity: 1, location: 'Kitchen' },
])

// Filter options based on category
const filterOptions = computed(() => {
  if (activeCategory.value === 'worship') {
    return ['Instrument', 'Audio', 'Visual', 'Lighting', 'Other']
  } else if (pantrySubTab.value === 'food') {
    return ['Grains', 'Canned', 'Beverages', 'Snacks', 'Condiments', 'Baking', 'Dairy', 'Meat', 'Produce', 'Frozen', 'Other']
  } else {
    return ['Cooking', 'Refrigeration', 'Preparation', 'Serving', 'Utensils', 'Storage', 'Cleaning', 'Other']
  }
})

// Filtered and searched data
const filteredWorshipItems = computed(() => {
  let filtered = worshipItems.value
  
  if (searchQuery.value) {
    filtered = filtered.filter(item => 
      item.equipmentName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (activeFilters.value.length > 0) {
    filtered = filtered.filter(item => activeFilters.value.includes(item.equipmentType))
  }
  
  return filtered.slice(startIndex.value, endIndex.value)
})

const filteredPantryFoodItems = computed(() => {
  let filtered = pantryFoodItems.value
  
  if (searchQuery.value) {
    filtered = filtered.filter(item => 
      item.itemName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (activeFilters.value.length > 0) {
    filtered = filtered.filter(item => activeFilters.value.includes(item.category))
  }
  
  return filtered.slice(startIndex.value, endIndex.value)
})

const filteredPantryEquipmentItems = computed(() => {
  let filtered = pantryEquipmentItems.value
  
  if (searchQuery.value) {
    filtered = filtered.filter(item => 
      item.equipmentName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (activeFilters.value.length > 0) {
    filtered = filtered.filter(item => activeFilters.value.includes(item.equipmentType))
  }
  
  return filtered.slice(startIndex.value, endIndex.value)
})

const totalItems = computed(() => {
  if (activeCategory.value === 'worship') {
    return filteredWorshipItems.value.length
  } else if (pantrySubTab.value === 'food') {
    return filteredPantryFoodItems.value.length
  } else {
    return filteredPantryEquipmentItems.value.length
  }
})

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))
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

// Helper functions
const getConditionClass = (condition) => {
  switch (condition) {
    case 'excellent': return 'bg-green-50 text-green-600'
    case 'good': return 'bg-blue-50 text-blue-600'
    case 'fair': return 'bg-yellow-50 text-yellow-600'
    case 'needs_repair': return 'bg-red-50 text-red-600'
    default: return 'bg-slate-100 text-slate-600'
  }
}

const isExpiringSoon = (date) => {
  if (!date) return false
  const expDate = new Date(date)
  const today = new Date()
  const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24))
  return diffDays <= 30
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Click outside for filter menu
const handleClickOutside = (event) => {
  if (showFilterMenu.value && !event.target.closest('.relative')) {
    showFilterMenu.value = false
  }
}

// Add click outside listener
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>