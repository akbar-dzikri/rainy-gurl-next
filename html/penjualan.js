const cart = {};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".product-card.selectable").forEach((card) => {
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = parseInt(card.dataset.price);

    const plusBtn = card.querySelector(".plus");
    const minusBtn = card.querySelector(".minus");
    const qtySpan = card.querySelector(".qty-value");

    plusBtn.addEventListener("click", () => {
      cart[id] = cart[id] || { qty: 0, name, price };
      cart[id].qty += 1;
      qtySpan.textContent = cart[id].qty;
      updateCheckout();
    });

    minusBtn.addEventListener("click", () => {
      if (cart[id] && cart[id].qty > 0) {
        cart[id].qty -= 1;
        qtySpan.textContent = cart[id].qty;
        if (cart[id].qty === 0) delete cart[id];
        updateCheckout();
      }
    });
  });

  function updateCheckout() {
    const itemCount = Object.values(cart).reduce((sum, p) => sum + p.qty, 0);
    const totalPrice = Object.values(cart).reduce(
      (sum, p) => sum + p.qty * p.price,
      0
    );

    if (itemCount > 0) {
      document.getElementById("itemCount").textContent = itemCount;
      document.getElementById(
        "totalPrice"
      ).textContent = `Rp ${totalPrice.toLocaleString()}`;
      document.getElementById("itemNames").textContent = Object.values(cart)
        .map((p) => `${p.name} (${p.qty})`)
        .join(", ");

      // Simpan nilai ke elemen tersembunyi atau langsung dipakai form
      document.getElementById("orderItems").textContent = Object.values(cart)
        .map((p) => `${p.name} (${p.qty})`)
        .join(", ");
      document.getElementById("quantity").value = itemCount;
      document.getElementById(
        "totalBelanja"
      ).textContent = `Rp ${totalPrice.toLocaleString()}`;

      const ongkir = 10000; // kamu bisa ganti sesuai ekspedisi
      document.getElementById(
        "ongkir"
      ).textContent = `Rp ${ongkir.toLocaleString()}`;
      document.getElementById("totalPembayaran").textContent = `Rp ${(
        totalPrice + ongkir
      ).toLocaleString()}`;

      document.getElementById("checkoutBar").style.display = "block";
    } else {
      document.getElementById("checkoutBar").style.display = "none";
    }
  }
});

// Modal Checkout
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeModal = document.getElementById("closeModal");

checkoutBtn.addEventListener("click", () => {
  checkoutModal.classList.add("show");

  // Isi ulang data checkout ke form
  const itemCount = Object.values(cart).reduce((sum, p) => sum + p.qty, 0);
  const totalPrice = Object.values(cart).reduce(
    (sum, p) => sum + p.qty * p.price,
    0
  );
  const ongkir = 10000;

  document.getElementById("orderItems").textContent = Object.values(cart)
    .map((p) => `${p.name} (${p.qty})`)
    .join(", ");
  document.getElementById("quantity").value = itemCount;
  document.getElementById(
    "totalBelanja"
  ).textContent = `Rp ${totalPrice.toLocaleString()}`;
  document.getElementById(
    "ongkir"
  ).textContent = `Rp ${ongkir.toLocaleString()}`;
  document.getElementById("totalPembayaran").textContent = `Rp ${(
    totalPrice + ongkir
  ).toLocaleString()}`;
});

closeModal.addEventListener("click", () => {
  checkoutModal.classList.remove("show");
});

checkoutModal.addEventListener("click", (e) => {
  if (e.target === checkoutModal) {
    checkoutModal.classList.remove("show");
  }
});

// Kirim ke WhatsApp
document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const items = document.getElementById("orderItems").textContent;
  const quantity = document.getElementById("quantity").value;
  const payment = document.getElementById("paymentMethod").value;
  const shipping = document.getElementById("shippingMethod").value;
  const address = document.getElementById("address").value;
  const total = document.getElementById("totalPembayaran").textContent;

  const message =
    `* [Pesanan Baru]*%0A` +
    `Nama: ${fullName}%0A` +
    `Barang: ${items}%0A` +
    `Jumlah: ${quantity}%0A` +
    `Metode Pembayaran: ${payment}%0A` +
    `Ekspedisi: ${shipping}%0A` +
    `Alamat: ${address}%0A` +
    `Total: ${total}`;

  const phone = "6282219065934";
  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, "_blank");
});
