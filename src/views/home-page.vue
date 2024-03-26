<script setup>
import { db } from '@/firebase';
import { ref, child, get } from 'firebase/database';

const dbRef = ref(db);
get(child(dbRef, 'ESPData/ESP32-E011A8E350CC/ActualData'))
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log('No data available');
    }
  })
  .catch((error) => {
    console.error(error);
  });
</script>

<template>
  <div>
    <h2 class="content-block">Aktuálne dáta</h2>
    <div class="content-block">
      <div class="dx-card responsive-paddings" />
    </div>
  </div>
</template>

<style lang="scss"></style>
