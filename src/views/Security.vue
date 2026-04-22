<template>
  <div class="flex min-h-screen bg-[#F0F9FF]">
    <Sidebar />
    
    <main class="ml-72 flex-1 p-6">
      <header class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Security</h2>
          <p class="text-sm text-slate-500 mt-0.5">Manage your account security and authentication settings.</p>
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

      <div class="space-y-8">
        <!-- Two-Factor Authentication Section -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-sky-50 rounded-lg text-sky-500">
              <PhShieldCheck :size="20" weight="fill" />
            </div>
            <h3 class="text-lg font-bold text-slate-800">Two-Factor Authentication</h3>
          </div>
          
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-white">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <p class="font-medium text-slate-800">Add an extra layer of security</p>
                <p class="text-sm text-slate-400 mt-1">Protect your account by requiring both your password and an authentication code from your phone.</p>
                
                <div v-if="!twoFactor.enabled" class="mt-4">
                  <button 
                    @click="showTwoFactorModal = true"
                    class="bg-sky-500 hover:bg-sky-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-sky-100 transition-all text-sm"
                  >
                    Enable Two-Factor Authentication
                  </button>
                </div>
                
                <div v-else class="mt-4 p-4 bg-green-50 rounded-xl border border-green-100">
                  <div class="flex items-center gap-2">
                    <PhCheckCircle :size="20" class="text-green-500" weight="fill" />
                    <span class="font-medium text-green-700">Two-factor authentication is enabled</span>
                  </div>
                  <button 
                    @click="disableTwoFactor"
                    class="mt-3 text-sm text-red-500 hover:text-red-600 font-medium"
                  >
                    Disable Two-Factor Authentication
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Password Section -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-slate-100 rounded-lg text-slate-500">
              <PhLockKey :size="20" weight="fill" />
            </div>
            <h3 class="text-lg font-bold text-slate-800">Change Password</h3>
          </div>
          
          <form @submit.prevent="changePassword" class="bg-white rounded-2xl p-6 shadow-sm border border-white">
            <div class="space-y-4 max-w-2xl">
              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Current Password</label>
                <input 
                  v-model="passwords.current"
                  type="password" 
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 outline-none transition-all"
                />
              </div>
              
              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">New Password</label>
                <input 
                  v-model="passwords.new"
                  type="password" 
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 outline-none transition-all"
                />
              </div>
              
              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Confirm New Password</label>
                <input 
                  v-model="passwords.confirm"
                  type="password" 
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 outline-none transition-all"
                />
              </div>
            </div>
            
            <div class="flex justify-end mt-6 pt-4 border-t border-slate-50">
              <button 
                type="submit"
                class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-2.5 rounded-xl transition-all text-sm"
              >
                Update Password
              </button>
            </div>
          </form>
        </section>

        <!-- Session Management Section -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-slate-100 rounded-lg text-slate-500">
              <PhDevices :size="20" weight="fill" />
            </div>
            <h3 class="text-lg font-bold text-slate-800">Active Sessions</h3>
          </div>
          
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-white">
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-sky-100 rounded-lg text-sky-500">
                    <PhLaptop :size="18" weight="fill" />
                  </div>
                  <div>
                    <p class="font-medium text-slate-800">MacBook Pro - Chrome</p>
                    <p class="text-xs text-slate-400 mt-0.5">Manila, Philippines • Current Session</p>
                  </div>
                </div>
                <span class="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-full">Active Now</span>
              </div>
              
              <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-slate-100 rounded-lg text-slate-500">
                    <PhDeviceMobile :size="18" weight="fill" />
                  </div>
                  <div>
                    <p class="font-medium text-slate-800">iPhone 15 Pro - Safari</p>
                    <p class="text-xs text-slate-400 mt-0.5">Manila, Philippines • Last active 2 hours ago</p>
                  </div>
                </div>
                <button class="text-xs text-red-500 hover:text-red-600 font-medium">Revoke</button>
              </div>
              
              <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-slate-100 rounded-lg text-slate-500">
                    <PhLaptop :size="18" weight="fill" />
                  </div>
                  <div>
                    <p class="font-medium text-slate-800">Windows PC - Edge</p>
                    <p class="text-xs text-slate-400 mt-0.5">Cebu, Philippines • Last active yesterday</p>
                  </div>
                </div>
                <button class="text-xs text-red-500 hover:text-red-600 font-medium">Revoke</button>
              </div>
            </div>
            
            <div class="mt-4 pt-4 border-t border-slate-50">
              <button 
                @click="revokeAllSessions"
                class="text-sm text-red-500 hover:text-red-600 font-medium"
              >
                Sign out of all other sessions
              </button>
            </div>
          </div>
        </section>

        <!-- Login History Section -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-slate-100 rounded-lg text-slate-500">
              <PhClock :size="20" weight="fill" />
            </div>
            <h3 class="text-lg font-bold text-slate-800">Login History</h3>
          </div>
          
          <div class="bg-white rounded-2xl shadow-sm border border-white overflow-hidden">
            <table class="w-full text-left">
              <thead>
                <tr class="bg-slate-50/50 border-b border-slate-50">
                  <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Date & Time</th>
                  <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Device</th>
                  <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Location</th>
                  <th class="p-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr v-for="log in loginHistory" :key="log.id">
                  <td class="p-4 text-sm text-slate-700">{{ log.datetime }}</td>
                  <td class="p-4 text-sm text-slate-700">{{ log.device }}</td>
                  <td class="p-4 text-sm text-slate-700">{{ log.location }}</td>
                  <td class="p-4">
                    <span :class="log.status === 'Success' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'" class="text-[10px] font-black px-2 py-1 rounded-full">
                      {{ log.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Danger Zone Section -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-red-50 rounded-lg text-red-500">
              <PhWarning :size="20" weight="fill" />
            </div>
            <h3 class="text-lg font-bold text-slate-800">Danger Zone</h3>
          </div>
          
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-slate-800">Delete Account</p>
                  <p class="text-xs text-slate-400 mt-0.5">Permanently delete your account and all associated data</p>
                </div>
                <button 
                  @click="showDeleteModal = true"
                  class="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-all"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Two-Factor Setup Modal -->
      <Transition name="fade">
        <div v-if="showTwoFactorModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div class="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-bold text-slate-800">Set Up Two-Factor Authentication</h3>
              <button @click="showTwoFactorModal = false" class="p-1.5 hover:bg-slate-100 rounded-lg">
                <PhX :size="20" />
              </button>
            </div>
            
            <div class="space-y-4">
              <p class="text-sm text-slate-600">Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)</p>
              
              <div class="bg-slate-100 p-4 rounded-xl flex justify-center">
                <div class="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
                  <PhQrCode :size="120" class="text-slate-400" />
                </div>
              </div>
              
              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Enter Verification Code</label>
                <input 
                  v-model="twoFactor.code"
                  type="text" 
                  placeholder="000000"
                  maxlength="6"
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 rounded-xl p-3 text-sm text-slate-700 outline-none transition-all text-center text-2xl font-bold tracking-widest"
                />
              </div>
              
              <div class="flex gap-3 pt-3">
                <button @click="showTwoFactorModal = false" class="flex-1 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-600">Cancel</button>
                <button @click="verifyTwoFactor" class="flex-1 py-2.5 bg-sky-500 text-white text-sm font-bold rounded-xl hover:bg-sky-600">Verify & Enable</button>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Delete Account Modal -->
      <Transition name="fade">
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div class="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-bold text-red-600">Delete Account</h3>
              <button @click="showDeleteModal = false" class="p-1.5 hover:bg-slate-100 rounded-lg">
                <PhX :size="20" />
              </button>
            </div>
            
            <div class="space-y-4">
              <p class="text-sm text-slate-600">This action cannot be undone. All your data will be permanently deleted.</p>
              
              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Type "DELETE" to confirm</label>
                <input 
                  v-model="deleteConfirmation"
                  type="text" 
                  placeholder="DELETE"
                  class="w-full bg-slate-50 border border-transparent focus:border-red-200 rounded-xl p-3 text-sm text-slate-700 outline-none transition-all"
                />
              </div>
              
              <div class="flex gap-3 pt-3">
                <button @click="showDeleteModal = false" class="flex-1 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-600">Cancel</button>
                <button 
                  @click="deleteAccount"
                  :disabled="deleteConfirmation !== 'DELETE'"
                  :class="deleteConfirmation === 'DELETE' ? 'bg-red-500 hover:bg-red-600' : 'bg-red-200 cursor-not-allowed'"
                  class="flex-1 py-2.5 text-white text-sm font-bold rounded-xl transition-all"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  PhBell, PhCake, PhHeart, PhCaretDown, PhUser, PhGear, PhShield, PhSignOut,
  PhShieldCheck, PhLockKey, PhDevices, PhLaptop, PhDeviceMobile, PhClock,
  PhWarning, PhX, PhQrCode, PhCheckCircle
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

// Security state
const twoFactor = ref({
  enabled: false,
  code: ''
})

const passwords = ref({
  current: '',
  new: '',
  confirm: ''
})

const loginHistory = ref([
  { id: 1, datetime: '2026-04-22 09:30 AM', device: 'MacBook Pro - Chrome', location: 'Manila, Philippines', status: 'Success' },
  { id: 2, datetime: '2026-04-21 03:15 PM', device: 'iPhone 15 Pro - Safari', location: 'Manila, Philippines', status: 'Success' },
  { id: 3, datetime: '2026-04-20 11:45 AM', device: 'Windows PC - Chrome', location: 'Cebu, Philippines', status: 'Success' },
  { id: 4, datetime: '2026-04-19 08:20 PM', device: 'Unknown - Firefox', location: 'Davao, Philippines', status: 'Failed' },
])

// Modal state
const showTwoFactorModal = ref(false)
const showDeleteModal = ref(false)
const deleteConfirmation = ref('')

const changePassword = () => {
  if (passwords.value.new !== passwords.value.confirm) {
    alert('New passwords do not match!')
    return
  }
  if (passwords.value.new.length < 6) {
    alert('Password must be at least 6 characters!')
    return
  }
  alert('Password changed successfully!')
  passwords.value = { current: '', new: '', confirm: '' }
}

const verifyTwoFactor = () => {
  if (twoFactor.value.code.length === 6) {
    twoFactor.value.enabled = true
    showTwoFactorModal.value = false
    twoFactor.value.code = ''
    alert('Two-factor authentication enabled successfully!')
  } else {
    alert('Please enter a valid 6-digit code')
  }
}

const disableTwoFactor = () => {
  if (confirm('Are you sure you want to disable two-factor authentication?')) {
    twoFactor.value.enabled = false
    alert('Two-factor authentication disabled')
  }
}

const revokeAllSessions = () => {
  if (confirm('Sign out of all other sessions? You will remain signed in on this device.')) {
    alert('All other sessions have been revoked')
  }
}

const deleteAccount = () => {
  if (deleteConfirmation.value === 'DELETE') {
    alert('Account deleted successfully')
    showDeleteModal.value = false
    // In real app, redirect to login
  }
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
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>