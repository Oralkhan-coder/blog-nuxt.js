<template>
  <transition name="fade-slide">
    <div v-if="visible" :class="['alert', `alert--${type}`]">
      <span>{{ message }}</span>
      <button class="alert__close" @click="close">&times;</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ErrorAlert',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'error', // error | success | warning
    },
    duration: {
      type: Number,
      default: 4000, // auto-hide duration
    },
  },
  data() {
    return {
      visible: true
    }
  },
  watch: {
    visible(val) {
      if (val) {
        setTimeout(() => {
          this.visible = false
        }, this.duration)
      }
    }
  },
  mounted() {
    if (this.visible && this.duration) {
      setTimeout(() => {
        this.visible = false
      }, this.duration)
    }
  },
  methods: {
    close() {
      this.visible = false
    }
  }
}
</script>

<style scoped>
.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  color: white;
  font-weight: 600;
  margin: 1rem 0;
  font-family: inherit;
  transition: all var(--transition-speed);
}

.alert--error {
  background: linear-gradient(135deg, #ff6f61, #ff3b30);
}

.alert--success {
  background: linear-gradient(135deg, #50e3c2, #00b894);
}

.alert--warning {
  background: linear-gradient(135deg, #ffb347, #ffcc33);
}

.alert__close {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: 700;
  line-height: 1;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
