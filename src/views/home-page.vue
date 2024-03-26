<script setup>
import { reactive } from 'vue';
import { ref, onValue } from 'firebase/database';
import { db } from '@/firebase';
import { toDate } from '@/utils/helpers';

const stateTemplate = {
  data: {
    cas: null,
    energiaAktualna: null,
    energiaCelkovo: null,
    energiaVyrobena1: null,
    energiaVyrobena2: null,
    energiaVyrobenaCelkovo: null,
    teplotaVonkajsia: null,
    teplotaVstupna: null,
    teplotaVystupna: null,
    vykonCinny1: null,
    vykonCinny2: null,
  },
};

const state = reactive(stateTemplate);

const dbRef = ref(db, 'ESPData/ESP32-6413A8E350CC/ActualData');
onValue(dbRef, (snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    state.data = snapshot.val();
  } else {
    console.log('No data available');
  }
});
</script>

<template>
  <div>
    <h2 class="content-block">Aktuálne dáta</h2>
    <div class="content-block">
      <div class="row">
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Čas vyčítania</h5>
              <p class="card-text fw-bold fs-3">{{ toDate(state.data.cas) }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Energia aktuálna (GJ)</h5>
              <p class="card-text fw-bold fs-3">{{ state.data.energiaAktualna }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Energia celkovo (GJ)</h5>
              <p class="card-text fw-bold fs-3">{{ state.data.energiaCelkovo }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Energia vyrobená 1 (KW/h)</h5>
              <p class="card-text fw-bold fs-3">{{ state.data.energiaVyrobena1 }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Energia vyrobená 2 (KW/h)</h5>
              <p class="card-text fw-bold fs-3">{{ state.data.energiaVyrobena2 }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Energia vyrobená spolu (KW/h)</h5>
              <p class="card-text fw-bold fs-3">{{ state.data.energiaVyrobenaCelkovo }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Teplota vonkajšia (°C)</h5>
              <p class="card-text fw-bold fs-3">{{ state.data.teplotaVonkajsia }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Teplota vstupná (°C)</h5>
              <p class="card-text fw-bold fs-3">{{ state.data.teplotaVstupna }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Teplota výstupná (°C)</h5>
              <p class="card-text fw-bold fs-3">{{ state.data.teplotaVystupna }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Výkon činný 1 (KW)</h5>
              <p class="card-text fw-bold fs-3">{{ state.data.vykonCinny1 }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Výkon činný 2 (KW)</h5>
              <p class="card-text fw-bold fs-3">{{ state.data.vykonCinny2 }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
