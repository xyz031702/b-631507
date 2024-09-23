import { useEffect } from 'react';
import '../styles.css';

const Index = () => {
  useEffect(() => {
    // Load Alpine.js dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js';
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8" x-data="billGenerator()">
      <h1 className="text-3xl font-bold mb-8 text-center">Bill Generator</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section - Input Form */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Bill Information</h2>
          <form @submit.prevent="saveData">
            {/* Bill To */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Bill To</h3>
              <input type="text" x-model="billTo.name" placeholder="Name" className="w-full p-2 border rounded mb-2" />
              <input type="text" x-model="billTo.address" placeholder="Address" className="w-full p-2 border rounded mb-2" />
              <input type="text" x-model="billTo.phone" placeholder="Phone" className="w-full p-2 border rounded" />
            </div>

            {/* Ship To */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Ship To</h3>
              <input type="text" x-model="shipTo.name" placeholder="Name" className="w-full p-2 border rounded mb-2" />
              <input type="text" x-model="shipTo.address" placeholder="Address" className="w-full p-2 border rounded mb-2" />
              <input type="text" x-model="shipTo.phone" placeholder="Phone" className="w-full p-2 border rounded" />
            </div>

            {/* Invoice Information */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Invoice Information</h3>
              <input type="date" x-model="invoice.date" className="w-full p-2 border rounded mb-2" />
              <input type="date" x-model="invoice.paymentDate" className="w-full p-2 border rounded" />
            </div>

            {/* From */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">From</h3>
              <input type="text" x-model="from.name" placeholder="Name" className="w-full p-2 border rounded mb-2" />
              <input type="text" x-model="from.address" placeholder="Address" className="w-full p-2 border rounded mb-2" />
              <input type="text" x-model="from.phone" placeholder="Phone" className="w-full p-2 border rounded" />
            </div>

            {/* Item Details */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Item Details</h3>
              <template x-for="(item, index) in items" :key="index">
                <div className="flex flex-wrap -mx-2 mb-2">
                  <input type="text" x-model="item.sno" placeholder="S.No" className="w-full sm:w-1/6 p-2 border rounded mx-2 mb-2" />
                  <input type="text" x-model="item.name" placeholder="Name" className="w-full sm:w-1/4 p-2 border rounded mx-2 mb-2" />
                  <input type="text" x-model="item.description" placeholder="Description" className="w-full sm:w-1/4 p-2 border rounded mx-2 mb-2" />
                  <input type="number" x-model="item.quantity" placeholder="Quantity" className="w-full sm:w-1/6 p-2 border rounded mx-2 mb-2" />
                  <input type="number" x-model="item.amount" placeholder="Amount" className="w-full sm:w-1/6 p-2 border rounded mx-2 mb-2" />
                  <input type="number" x-model="item.total" placeholder="Total" className="w-full sm:w-1/6 p-2 border rounded mx-2 mb-2" disabled />
                </div>
              </template>
              <button type="button" @click="addItem" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Item</button>
            </div>

            {/* Sub Total Area */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Totals</h3>
              <div className="flex justify-between mb-2">
                <span>Sub Total:</span>
                <span x-text="calculateSubTotal()"></span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax:</span>
                <input type="number" x-model="tax" className="w-24 p-2 border rounded" />
              </div>
              <div className="flex justify-between font-bold">
                <span>Grand Total:</span>
                <span x-text="calculateGrandTotal()"></span>
              </div>
            </div>

            {/* Notes Section */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Notes</h3>
              <textarea x-model="notes" className="w-full p-2 border rounded" rows="4"></textarea>
            </div>

            <div className="flex justify-between">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save Data</button>
              <button type="button" @click="clearData" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Clear Data</button>
            </div>
          </form>
        </div>

        {/* Right Section - Template Gallery */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md overflow-y-auto" style={{ maxHeight: 'calc(100vh - 2rem)' }}>
          <h2 className="text-2xl font-semibold mb-4">Template Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <template x-for="(template, index) in templates" :key="index">
              <div className="template-card bg-gray-100 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300" @click="selectTemplate(template)">
                <img :src="template.imageUrl" alt="Template Preview" className="w-full h-40 object-cover rounded mb-2" />
                <p className="text-center font-medium" x-text="template.name"></p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
