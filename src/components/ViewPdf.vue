<template>
  <div class="view-pdf">
    <div v-if="pdf">
      <h2>{{ pdf.name }}</h2>
      <VuePDF v-if="pdfDoc" :pdf="pdfDoc" :scale="0.8" text-layer annotation-layer />
      <div v-else>
        <p>Không thể tải PDF. Vui lòng kiểm tra lại đường dẫn.</p>
      </div>
    </div>
    <div v-else>
      <p>Không tìm thấy PDF cho ID này.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { VuePDF, usePDF } from '@tato30/vue-pdf';
import '@tato30/vue-pdf/style.css';

const route = useRoute();
const pdf = ref(null);
const pdfDoc = ref(null);

// Danh sách PDF
const pdfList = [
  { id: 1, name: 'PDF 1', url: '/pdfs/1.pdf' },
  { id: 2, name: 'PDF 2', url: '/pdfs/2.pdf' },
];

// Theo dõi ID từ route
onMounted(async () => {
  const id = parseInt(route.params.id);
  console.log(id);
  
  if (id) {
    const foundPdf = pdfList.find(p => p.id === id) || null;
    pdf.value = foundPdf;

    if (pdf.value && pdf.value.url) {
      console.log('Loading PDF from URL:', pdf.value.url); 
      try {
        // Kiểm tra xem usePDF có trả về một Promise không
        const { pdf: loadedPdf } = await usePDF(pdf.value.url);
        pdfDoc.value = loadedPdf; // Gán giá trị loadedPdf cho pdfDoc
        console.log('Loaded PDF:', pdfDoc.value); // Kiểm tra giá trị của pdfDoc
      } catch (error) {
        console.error('Error loading PDF:', error); // In lỗi ra console nếu có
        pdfDoc.value = null; // Đặt lại pdfDoc nếu có lỗi
      }
    } else {
      console.error('Invalid PDF URL'); // Thông báo nếu URL không hợp lệ
      pdfDoc.value = null; // Nếu pdf.value không hợp lệ
    }
  } else {
    pdfDoc.value = null; 
  }
});
</script>

<style>
.view-pdf {
  display: flex;
}
.pdf-view {
  flex: 1;
  padding: 20px;
}
.sidebar {
  width: 300px;
  padding: 20px;
  border-left: 1px solid #ccc;
  flex-shrink: 0;
}
</style>
