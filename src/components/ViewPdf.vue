<template>
  <div class="container">
    <div class="view-pdf">
      <h1>{{ pdfList[id - 1]?.name || 'PDF Not Found' }}</h1>
      <VuePDF v-if="pdfDoc" :pdf="pdfDoc.pdf" :page="1" text-layer annotation-layer />
    </div>
    <div class="sidebar">
      <div class="list-form-view">
        <h3>Basic Info:</h3>
        <p>Drawing ID:</p>
        <p>Customer:</p>
        <p>Part name:</p>
        <p>Material Size:</p>
        <p>Material:</p>
        <p>Surface Treatment:</p>
        <p>Serial Number:</p>
        <p>Drawing Number:</p>
      </div>

      <div class="list-form-view">
        <h3>Purchase Order</h3>
        <p>Company name:</p>
        <p>Currency:</p>
        <p>Order date:</p>
        <p>Price:</p>
        <p>Quantity:</p>
        <p>Drawing Number:</p>
        <div v-if="!isShowAll">
          <div class="notice">
            <p>There are 3 purchase orders</p>
          </div>
          <button class="btn" @click="showAll">Show all purchase orders</button>
        </div>
      </div>

      <div v-if="isShowAll">
        <div class="list-form-view">
          <h3>Purchase Order</h3>
          <p>Company name:</p>
          <p>Currency:</p>
          <p>Order date:</p>
          <p>Price:</p>
          <p>Quantity:</p>
          <p>Drawing Number:</p>
        </div>
        <div class="list-form-view">
          <h3>Purchase Order</h3>
          <p>Company name:</p>
          <p>Currency:</p>
          <p>Order date:</p>
          <p>Price:</p>
          <p>Quantity:</p>
          <p>Drawing Number:</p>
        </div>
        <button class="btn" @click="closeAllPurchase">Hide</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { VuePDF, usePDF } from '@tato30/vue-pdf';
import '@tato30/vue-pdf/style.css';

const route = useRoute();
const pdfDoc = ref(null);
const pdfInfo = ref({ name: '', id: '' });
const isShowAll = ref(false);
const id = parseInt(route.params.id);

const pdfList = [
  { id: 1, name: 'Bản vẽ 1', url: '/pdfs/1.pdf' },
  { id: 2, name: 'Bản vẽ 2', url: '/pdfs/2.pdf' },
  { id: 3, name: 'Bản vẽ 3', url: '/pdfs/3.pdf' },
  { id: 4, name: 'Bản vẽ 4', url: '/pdfs/4.pdf' },
];

const showAll = () => {
  isShowAll.value = true;
};

const closeAllPurchase = () => {
  isShowAll.value = false;
};

onMounted(async () => {
  if (id) {
    const foundPdf = pdfList.find((p) => p.id === id) || null;
    if (foundPdf) {
      try {
        const { pdf } = await usePDF(foundPdf.url);
        pdfDoc.value = { pdf };
        pdfInfo.value = foundPdf;
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    } else {
      console.error('PDF not found');
    }
  }
});
</script>

<style>
.container {
  display: flex;
}

.view-pdf {
  flex: 1;
  padding: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sidebar {
  width: 300px;
  padding: 20px;
  height: 1000px;
  text-align: left;
  border-left: 1px solid #ccc;
  background-color: #f9f9f9;
}

.list-form-view > h3 {
}

.list-form-view {
  border-bottom: solid 1px #ccc;
}

.list-form-view > p {
  font-size: 14px;
}

.notice {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4CC9FE;
}

.notice > p {
  font-weight: 600;
  font-size: 14px;
}

.btn {
  width: 100%;
  height: 40px;
  border: solid 1px #ccc;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 30px;
  font-weight: 600;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
