<template>
  <h1>Logistics recount</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink to="/shipments">Shipments</RouterLink>&nbsp;&nbsp;&nbsp;
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>