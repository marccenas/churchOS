<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F0F9FF] p-6">
    <div class="w-full max-w-[450px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(14,165,233,0.1)] p-10 border border-white">
      
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-sky-50 rounded-2xl mb-6">
          <PhChurch :size="32" weight="fill" class="text-sky-500" />
        </div>
        <h1 class="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
        <p class="text-slate-500 mt-2 font-medium">Access your church resources</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2 ml-1">Email Address</label>
          <div class="relative group">
            <PhEnvelope :size="20" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500" />
            <input 
              type="email" 
              placeholder="name@church.com"
              class="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-50 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2 ml-1">Password</label>
          <div class="relative group">
            <PhLock :size="20" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500" />
            <input 
              type="password" 
              placeholder="••••••••"
              class="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-50 outline-none transition-all"
            />
          </div>
        </div>

        <div class="flex items-center justify-between text-sm px-1">
          <label class="flex items-center gap-2 text-slate-500 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500" />
            Remember me
          </label>
          <a href="#" class="text-sky-600 font-semibold hover:text-sky-700">Forgot Password?</a>
        </div>

        <button 
          type="submit"
          class="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-sky-200 transition-transform active:scale-95 mt-4"
        >
          Sign In
        </button>
      </form>

      <div class="mt-10 text-center">
        <p class="text-slate-400 text-xs font-medium uppercase tracking-widest">
          Secure Access • CMS v1.0
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { PhChurch, PhEnvelope, PhLock } from '@phosphor-icons/vue'

const router = useRouter()
const handleLogin = () => router.push('/dashboard')
</script>