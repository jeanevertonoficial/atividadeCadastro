<template>
  <div class="conatiner-loading">
    <div class="spinner"></div>
      <div class="base-loading">Aguarde....</div>
  </div>
</template>

<script>
export default {
  name: "LoadingDados"
}
</script>

<style scoped>
.conatiner-loading {
  height: 80vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.base-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  font-weight: bold;
  color: var(--bd-primary);
}

.spinner {
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #0c5460;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

</style>