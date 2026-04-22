<template>
  <aside class="w-72 bg-white border-r border-sky-100 flex flex-col p-6 fixed h-full z-20">
    <div class="flex items-center gap-3 px-2 mb-10">
      <div class="p-2 bg-sky-500 rounded-xl text-white shadow-lg shadow-sky-100">
        <PhChurch :size="24" weight="fill" />
      </div>
      <span class="font-bold text-xl text-slate-800 tracking-tight">ChurchOS</span>
    </div>

    <nav class="space-y-2 flex-1">
      <RouterLink to="/dashboard" custom v-slot="{ navigate, isActive }">
        <button @click="navigate" :class="navClass(isActive)">
          <PhHouse :size="22" :weight="isActive ? 'fill' : 'regular'" />
          Dashboard
        </button>
      </RouterLink>

      <RouterLink to="/inventory" custom v-slot="{ navigate, isActive }">
        <button @click="navigate" :class="navClass(isActive)">
          <PhPackage :size="22" :weight="isActive ? 'fill' : 'regular'" />
          Inventory
        </button>
      </RouterLink>

      <RouterLink to="/members" custom v-slot="{ navigate, isActive }">
        <button @click="navigate" :class="navClass(isActive)">
          <PhUsers :size="22" :weight="isActive ? 'fill' : 'regular'" />
          Members
        </button>
      </RouterLink>
    </nav>

    <div class="pt-6 border-t border-slate-50">
      <RouterLink to="/login" custom v-slot="{ navigate }">
        <button @click="navigate" class="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all text-slate-400 hover:bg-red-50 hover:text-red-500">
          <PhSignOut :size="22" />
          Logout
        </button>
      </RouterLink>
    </div>
  </aside>
</template>

<script setup>
import { PhChurch, PhHouse, PhPackage, PhUsers, PhSignOut } from '@phosphor-icons/vue'

const navClass = (isActive) => 
  `w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${
    isActive ? 'bg-sky-500 text-white shadow-lg shadow-sky-200' : 'text-slate-400 hover:bg-sky-50'
  }`
</script>