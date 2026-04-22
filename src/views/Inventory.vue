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

      <div class="space-y-6">
        <!-- Category Selection Section -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-sky-50 rounded-lg text-sky-500">
              <PhStack :size="20" weight="fill" />
            </div>
            <h3 class="text-lg font-bold text-slate-800">Select Category</h3>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <button 
              @click="selectCategory('worship')"
              :class="form.category === 'worship' ? 'border-sky-400 bg-sky-50/30' : 'border-slate-100 bg-white'"
              class="flex flex-col items-start p-5 rounded-xl border-2 text-left transition-all group"
            >
              <PhMusicNotes :size="20" :weight="form.category === 'worship' ? 'fill' : 'regular'" class="text-sky-500 mb-3" />
              <span class="block font-bold text-slate-800">Worship Team</span>
              <span class="text-[10px] font-medium text-slate-400 mt-0.5 uppercase tracking-wider">Instruments & Tech</span>
            </button>

            <button 
              @click="selectCategory('pantry')"
              :class="form.category === 'pantry' ? 'border-sky-400 bg-sky-50/30' : 'border-slate-100 bg-white'"
              class="flex flex-col items-start p-5 rounded-xl border-2 text-left transition-all group"
            >
              <PhCookingPot :size="20" :weight="form.category === 'pantry' ? 'fill' : 'regular'" class="text-slate-400 group-hover:text-sky-500 mb-3" />
              <span class="block font-bold text-slate-800">Church Pantry</span>
              <span class="text-[10px] font-medium text-slate-400 mt-0.5 uppercase tracking-wider">Food & Equipment</span>
            </button>
          </div>
        </section>

        <!-- Pantry Sub-Category Selection -->
        <section v-if="form.category === 'pantry'">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-slate-100 rounded-lg text-slate-500">
              <PhTag :size="20" weight="fill" />
            </div>
            <h3 class="text-lg font-bold text-slate-800">Pantry Item Type</h3>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <button 
              @click="pantrySubCategory = 'food'"
              :class="pantrySubCategory === 'food' ? 'border-sky-400 bg-sky-50/30' : 'border-slate-100 bg-white'"
              class="flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all"
            >
              <PhBowlFood :size="20" :weight="pantrySubCategory === 'food' ? 'fill' : 'regular'" class="text-orange-500 mb-2" />
              <span class="block font-bold text-slate-800">Food & Ingredients</span>
              <span class="text-[10px] font-medium text-slate-400 mt-0.5">Consumable items</span>
            </button>

            <button 
              @click="pantrySubCategory = 'equipment'"
              :class="pantrySubCategory === 'equipment' ? 'border-sky-400 bg-sky-50/30' : 'border-slate-100 bg-white'"
              class="flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all"
            >
              <PhOven :size="20" :weight="pantrySubCategory === 'equipment' ? 'fill' : 'regular'" class="text-slate-500 mb-2" />
              <span class="block font-bold text-slate-800">Kitchen Equipment</span>
              <span class="text-[10px] font-medium text-slate-400 mt-0.5">Appliances & Utensils</span>
            </button>
          </div>
        </section>

        <!-- Input Method Selection -->
        <section>
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-slate-100 rounded-lg text-slate-500">
                <PhKeyboard :size="20" weight="fill" />
              </div>
              <h3 class="text-lg font-bold text-slate-800">Input Method</h3>
            </div>
            
            <div class="flex gap-2">
              <button 
                @click="inputMethod = 'manual'"
                :class="inputMethod === 'manual' ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 border-slate-200'"
                class="px-4 py-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-2"
              >
                <PhPencilLine :size="14" />
                Manual Entry
              </button>
              <button 
                @click="inputMethod = 'upload'"
                :class="inputMethod === 'upload' ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 border-slate-200'"
                class="px-4 py-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-2"
              >
                <PhUpload :size="14" />
                File Upload
              </button>
            </div>
          </div>

          <!-- Manual Entry Form -->
          <div v-if="inputMethod === 'manual'" class="bg-white rounded-2xl p-6 shadow-sm border border-white">
            <!-- Worship Team Form -->
            <div v-if="form.category === 'worship'" class="grid grid-cols-2 gap-5">
              <div class="col-span-2">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Equipment Name</label>
                <input 
                  v-model="worshipForm.equipmentName"
                  type="text" 
                  placeholder="e.g. Roland Keyboard, Shure Microphone..."
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Equipment Type</label>
                <select 
                  v-model="worshipForm.equipmentType"
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                >
                  <option value="instrument">Musical Instrument</option>
                  <option value="audio">Audio Equipment</option>
                  <option value="visual">Visual Equipment</option>
                  <option value="lighting">Lighting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Brand/Model</label>
                <input 
                  v-model="worshipForm.brand"
                  type="text" 
                  placeholder="e.g. Yamaha, Shure..."
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Serial Number</label>
                <input 
                  v-model="worshipForm.serialNumber"
                  type="text" 
                  placeholder="SN-XXXXXX"
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Condition</label>
                <select 
                  v-model="worshipForm.condition"
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="needs_repair">Needs Repair</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Quantity</label>
                <input 
                  v-model="worshipForm.quantity"
                  type="number" 
                  min="1"
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Location</label>
                <input 
                  v-model="worshipForm.location"
                  type="text" 
                  placeholder="e.g. Sound Booth, Stage..."
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div class="col-span-2">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Notes</label>
                <textarea 
                  v-model="worshipForm.notes"
                  rows="3"
                  placeholder="Additional notes about the equipment..."
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all resize-none"
                ></textarea>
              </div>
            </div>

            <!-- Pantry Food Form -->
            <div v-else-if="form.category === 'pantry' && pantrySubCategory === 'food'" class="grid grid-cols-2 gap-5">
              <div class="col-span-2">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Food Item Name</label>
                <input 
                  v-model="pantryFoodForm.itemName"
                  type="text" 
                  placeholder="e.g. Jasmine Rice, Canned Goods..."
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Category</label>
                <select 
                  v-model="pantryFoodForm.category"
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                >
                  <option value="grains">Grains & Rice</option>
                  <option value="canned">Canned Goods</option>
                  <option value="beverages">Beverages</option>
                  <option value="snacks">Snacks</option>
                  <option value="condiments">Condiments</option>
                  <option value="baking">Baking Supplies</option>
                  <option value="dairy">Dairy & Eggs</option>
                  <option value="meat">Meat & Poultry</option>
                  <option value="produce">Fruits & Vegetables</option>
                  <option value="frozen">Frozen Foods</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Quantity</label>
                <input 
                  v-model="pantryFoodForm.quantity"
                  type="number" 
                  min="1"
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Unit</label>
                <select 
                  v-model="pantryFoodForm.unit"
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="g">Grams (g)</option>
                  <option value="pcs">Pieces (pcs)</option>
                  <option value="pack">Pack</option>
                  <option value="box">Box</option>
                  <option value="can">Can</option>
                  <option value="bottle">Bottle</option>
                  <option value="liter">Liter (L)</option>
                  <option value="ml">Milliliter (ml)</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Expiration Date</label>
                <input 
                  v-model="pantryFoodForm.expirationDate"
                  type="date"
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Storage Location</label>
                <input 
                  v-model="pantryFoodForm.storageLocation"
                  type="text" 
                  placeholder="e.g. Shelf A, Cold Storage..."
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Supplier/Donor</label>
                <input 
                  v-model="pantryFoodForm.supplier"
                  type="text" 
                  placeholder="e.g. Local Market, Donor..."
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div class="col-span-2">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Notes</label>
                <textarea 
                  v-model="pantryFoodForm.notes"
                  rows="3"
                  placeholder="Additional notes about the food item..."
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all resize-none"
                ></textarea>
              </div>
            </div>

            <!-- Pantry Equipment Form -->
            <div v-else-if="form.category === 'pantry' && pantrySubCategory === 'equipment'" class="grid grid-cols-2 gap-5">
              <div class="col-span-2">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Equipment Name</label>
                <input 
                  v-model="pantryEquipmentForm.equipmentName"
                  type="text" 
                  placeholder="e.g. Commercial Oven, Rice Cooker..."
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Equipment Type</label>
                <select 
                  v-model="pantryEquipmentForm.equipmentType"
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                >
                  <option value="cooking">Cooking Appliance</option>
                  <option value="refrigeration">Refrigeration</option>
                  <option value="preparation">Food Preparation</option>
                  <option value="serving">Serving Equipment</option>
                  <option value="utensils">Utensils & Tools</option>
                  <option value="storage">Storage Container</option>
                  <option value="cleaning">Cleaning Equipment</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Brand/Model</label>
                <input 
                  v-model="pantryEquipmentForm.brand"
                  type="text" 
                  placeholder="e.g. Philips, Cuisinart..."
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Serial Number</label>
                <input 
                  v-model="pantryEquipmentForm.serialNumber"
                  type="text" 
                  placeholder="SN-XXXXXX"
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Power Rating</label>
                <input 
                  v-model="pantryEquipmentForm.powerRating"
                  type="text" 
                  placeholder="e.g. 1500W, 220V..."
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Condition</label>
                <select 
                  v-model="pantryEquipmentForm.condition"
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="needs_repair">Needs Repair</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Quantity</label>
                <input 
                  v-model="pantryEquipmentForm.quantity"
                  type="number" 
                  min="1"
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Purchase Date</label>
                <input 
                  v-model="pantryEquipmentForm.purchaseDate"
                  type="date"
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Warranty Until</label>
                <input 
                  v-model="pantryEquipmentForm.warrantyDate"
                  type="date"
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Location</label>
                <input 
                  v-model="pantryEquipmentForm.location"
                  type="text" 
                  placeholder="e.g. Kitchen Counter, Storage Room..."
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Last Maintenance</label>
                <input 
                  v-model="pantryEquipmentForm.lastMaintenance"
                  type="date"
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all"
                />
              </div>

              <div class="col-span-2">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Notes</label>
                <textarea 
                  v-model="pantryEquipmentForm.notes"
                  rows="3"
                  placeholder="Additional notes about the equipment..."
                  class="w-full bg-slate-50 border border-transparent focus:border-sky-200 focus:bg-white rounded-xl p-3 text-sm text-slate-700 font-medium outline-none transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- File Upload Section -->
          <div v-else class="bg-white rounded-2xl p-6 shadow-sm border border-white">
            <div 
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleFileDrop"
              :class="isDragging ? 'border-sky-400 bg-sky-50/30' : 'border-slate-200'"
              class="border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer"
              @click="$refs.fileInput.click()"
            >
              <input 
                ref="fileInput"
                type="file" 
                accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
                @change="handleFileSelect"
                class="hidden"
              />
              
              <div v-if="!isProcessing && !extractedData">
                <PhCloudArrowUp :size="48" class="mx-auto text-slate-300 mb-4" />
                <p class="font-bold text-slate-700 mb-1">Drag & drop your spreadsheet file here</p>
                <p class="text-xs text-slate-400 mb-3">or click to browse</p>
                <p class="text-[10px] text-slate-400 bg-slate-50 inline-block px-3 py-1 rounded-full">
                  Supported formats: .xlsx, .xls, .csv
                </p>
                <p class="text-[10px] text-slate-400 mt-2">
                  Template: 
                  <span v-if="form.category === 'worship'">Equipment Name, Type, Brand, Serial, Condition, Quantity, Location</span>
                  <span v-else-if="pantrySubCategory === 'food'">Item Name, Category, Quantity, Unit, Expiration Date, Location, Supplier</span>
                  <span v-else>Equipment Name, Type, Brand, Serial, Power, Condition, Quantity, Purchase Date, Warranty, Location</span>
                </p>
              </div>

              <div v-else-if="isProcessing" class="py-8">
                <div class="inline-flex items-center gap-3 bg-sky-50 px-6 py-3 rounded-full">
                  <PhSpinner :size="24" class="text-sky-500 animate-spin" />
                  <span class="font-medium text-sky-700">Extracting data from file...</span>
                </div>
                <p class="text-xs text-slate-400 mt-4">This will only take a moment</p>
              </div>

              <div v-else-if="extractedData" class="text-left">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-2">
                    <PhCheckCircle :size="20" class="text-green-500" weight="fill" />
                    <span class="font-bold text-slate-700">Data Extracted Successfully!</span>
                  </div>
                  <button @click="clearExtractedData" class="text-xs text-slate-400 hover:text-slate-600">
                    <PhX :size="16" />
                  </button>
                </div>
                
                <div class="bg-slate-50 rounded-xl p-4 mb-4">
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Extracted Records ({{ extractedData.length }} items)</p>
                  <div class="max-h-48 overflow-y-auto space-y-2">
                    <div v-for="(item, index) in extractedData.slice(0, 5)" :key="index" class="text-xs bg-white p-2 rounded-lg">
                      <div class="flex items-center justify-between">
                        <span class="font-medium text-slate-700">{{ item.name }}</span>
                        <span class="text-slate-400">{{ item.quantity }} {{ item.unit || 'pcs' }}</span>
                      </div>
                    </div>
                    <p v-if="extractedData.length > 5" class="text-[10px] text-slate-400 text-center mt-2">
                      +{{ extractedData.length - 5 }} more items
                    </p>
                  </div>
                </div>

                <button 
                  @click="applyExtractedData"
                  class="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2.5 rounded-lg text-sm transition-all"
                >
                  Apply Data to Form
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Save Button -->
        <div class="flex justify-end">
          <button 
            @click="saveResource"
            class="bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-3 rounded-xl shadow-md shadow-sky-100 transition-all active:scale-[0.98] uppercase tracking-wider text-xs"
          >
            Save Resource Data
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
  PhStack, PhMusicNotes, PhCookingPot, PhBell, PhCake, PhHeart,
  PhCaretDown, PhUser, PhGear, PhShield, PhSignOut, PhKeyboard,
  PhPencilLine, PhUpload, PhCloudArrowUp, PhSpinner, PhCheckCircle, 
  PhX, PhTag, PhBowlFood, PhOven
} from '@phosphor-icons/vue'
import Sidebar from '../components/Sidebar.vue'
import * as XLSX from 'xlsx'

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

// UI State
const inputMethod = ref('manual')
const isDragging = ref(false)
const isProcessing = ref(false)
const extractedData = ref(null)
const pantrySubCategory = ref('food')

// Form state
const form = ref({
  category: 'worship'
})

const worshipForm = ref({
  equipmentName: '',
  equipmentType: 'instrument',
  brand: '',
  serialNumber: '',
  condition: 'excellent',
  quantity: 1,
  location: '',
  notes: ''
})

const pantryFoodForm = ref({
  itemName: '',
  category: 'grains',
  quantity: 1,
  unit: 'kg',
  expirationDate: '',
  storageLocation: '',
  supplier: '',
  notes: ''
})

const pantryEquipmentForm = ref({
  equipmentName: '',
  equipmentType: 'cooking',
  brand: '',
  serialNumber: '',
  powerRating: '',
  condition: 'good',
  quantity: 1,
  purchaseDate: '',
  warrantyDate: '',
  location: '',
  lastMaintenance: '',
  notes: ''
})

const selectCategory = (category) => {
  form.value.category = category
  inputMethod.value = 'manual'
  extractedData.value = null
  if (category === 'pantry') {
    pantrySubCategory.value = 'food'
  }
}

const handleFileDrop = (e) => {
  isDragging.value = false
  const file = e.dataTransfer.files[0]
  if (file) processFile(file)
}

const handleFileSelect = (e) => {
  const file = e.target.files[0]
  if (file) processFile(file)
}

const processFile = async (file) => {
  const allowedTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv'
  ]
  
  if (!allowedTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls|csv)$/i)) {
    alert('Please upload a valid Excel or CSV file')
    return
  }

  isProcessing.value = true
  
  try {
    const data = await readExcelFile(file)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (form.value.category === 'worship') {
      extractedData.value = parseWorshipData(data)
    } else if (form.value.category === 'pantry' && pantrySubCategory.value === 'food') {
      extractedData.value = parsePantryFoodData(data)
    } else {
      extractedData.value = parsePantryEquipmentData(data)
    }
  } catch (error) {
    console.error('Error processing file:', error)
    alert('Error processing file. Please check the format.')
  } finally {
    isProcessing.value = false
  }
}

const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(firstSheet)
        resolve(jsonData)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

const parseWorshipData = (data) => {
  return data.map(row => ({
    name: row['Equipment Name'] || row['Name'] || row['Item'] || 'Unknown',
    type: row['Type'] || row['Equipment Type'] || 'instrument',
    brand: row['Brand'] || row['Model'] || '',
    condition: row['Condition'] || 'good',
    quantity: parseInt(row['Quantity'] || row['Qty'] || 1),
    location: row['Location'] || '',
    notes: row['Notes'] || ''
  }))
}

const parsePantryFoodData = (data) => {
  return data.map(row => ({
    name: row['Item Name'] || row['Name'] || row['Product'] || 'Unknown',
    category: row['Category'] || 'other',
    quantity: parseInt(row['Quantity'] || row['Qty'] || 1),
    unit: row['Unit'] || 'pcs',
    expirationDate: row['Expiration Date'] || row['Expiry'] || '',
    storageLocation: row['Location'] || row['Storage'] || '',
    supplier: row['Supplier'] || '',
    notes: row['Notes'] || ''
  }))
}

const parsePantryEquipmentData = (data) => {
  return data.map(row => ({
    name: row['Equipment Name'] || row['Name'] || row['Item'] || 'Unknown',
    type: row['Equipment Type'] || row['Type'] || 'cooking',
    brand: row['Brand'] || row['Model'] || '',
    powerRating: row['Power Rating'] || row['Power'] || '',
    condition: row['Condition'] || 'good',
    quantity: parseInt(row['Quantity'] || row['Qty'] || 1),
    purchaseDate: row['Purchase Date'] || '',
    warrantyDate: row['Warranty'] || row['Warranty Date'] || '',
    location: row['Location'] || '',
    lastMaintenance: row['Last Maintenance'] || '',
    notes: row['Notes'] || ''
  }))
}

const applyExtractedData = () => {
  if (!extractedData.value || extractedData.value.length === 0) return
  
  const firstItem = extractedData.value[0]
  
  if (form.value.category === 'worship') {
    worshipForm.value = {
      equipmentName: firstItem.name || '',
      equipmentType: firstItem.type || 'instrument',
      brand: firstItem.brand || '',
      serialNumber: firstItem.serialNumber || '',
      condition: firstItem.condition || 'excellent',
      quantity: firstItem.quantity || 1,
      location: firstItem.location || '',
      notes: firstItem.notes || ''
    }
  } else if (form.value.category === 'pantry' && pantrySubCategory.value === 'food') {
    pantryFoodForm.value = {
      itemName: firstItem.name || '',
      category: firstItem.category || 'grains',
      quantity: firstItem.quantity || 1,
      unit: firstItem.unit || 'kg',
      expirationDate: firstItem.expirationDate || '',
      storageLocation: firstItem.storageLocation || '',
      supplier: firstItem.supplier || '',
      notes: firstItem.notes || ''
    }
  } else {
    pantryEquipmentForm.value = {
      equipmentName: firstItem.name || '',
      equipmentType: firstItem.type || 'cooking',
      brand: firstItem.brand || '',
      serialNumber: firstItem.serialNumber || '',
      powerRating: firstItem.powerRating || '',
      condition: firstItem.condition || 'good',
      quantity: firstItem.quantity || 1,
      purchaseDate: firstItem.purchaseDate || '',
      warrantyDate: firstItem.warrantyDate || '',
      location: firstItem.location || '',
      lastMaintenance: firstItem.lastMaintenance || '',
      notes: firstItem.notes || ''
    }
  }
  
  inputMethod.value = 'manual'
  extractedData.value = null
}

const clearExtractedData = () => {
  extractedData.value = null
}

const saveResource = () => {
  let isValid = false
  let formData = {}
  let itemType = ''
  
  if (form.value.category === 'worship') {
    isValid = !!worshipForm.value.equipmentName
    formData = { ...worshipForm.value }
    itemType = 'Worship Equipment'
  } else if (form.value.category === 'pantry' && pantrySubCategory.value === 'food') {
    isValid = !!pantryFoodForm.value.itemName
    formData = { ...pantryFoodForm.value }
    itemType = 'Pantry Food'
  } else {
    isValid = !!pantryEquipmentForm.value.equipmentName
    formData = { ...pantryEquipmentForm.value }
    itemType = 'Pantry Equipment'
  }
  
  if (!isValid) {
    alert('Please enter an item/equipment name.')
    return
  }
  
  console.log(`${itemType} Saved:`, { category: form.value.category, subCategory: pantrySubCategory.value, ...formData })
  
  // Reset forms
  worshipForm.value = {
    equipmentName: '',
    equipmentType: 'instrument',
    brand: '',
    serialNumber: '',
    condition: 'excellent',
    quantity: 1,
    location: '',
    notes: ''
  }
  
  pantryFoodForm.value = {
    itemName: '',
    category: 'grains',
    quantity: 1,
    unit: 'kg',
    expirationDate: '',
    storageLocation: '',
    supplier: '',
    notes: ''
  }
  
  pantryEquipmentForm.value = {
    equipmentName: '',
    equipmentType: 'cooking',
    brand: '',
    serialNumber: '',
    powerRating: '',
    condition: 'good',
    quantity: 1,
    purchaseDate: '',
    warrantyDate: '',
    location: '',
    lastMaintenance: '',
    notes: ''
  }
  
  alert(`${itemType} saved successfully!`)
}
</script>