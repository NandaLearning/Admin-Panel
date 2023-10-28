import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import firestore from "../utils/firebase-produk";
import Navigasi from "../components/Navigasi";

export default function TambahProduk() {
  const [produkData, setProdukData] = useState([]);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [produkUrl, setProdukUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "store"));
        const storeData = [];
        querySnapshot.forEach((doc) => {
          storeData.push({ id: doc.id, ...doc.data() });
        });
        setProdukData(storeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    // Validasi input di sini jika diperlukan

    // Buat objek data produk baru
    const newProduk = {
      nama: nama,
      harga: harga,
      produk: produkUrl,
    };

    try {
      // Tambahkan produk baru ke Firestore
      const docRef = await addDoc(collection(firestore, "store"), newProduk);
      console.log("Produk berhasil ditambahkan dengan ID: ", docRef.id);

      // Kosongkan input setelah menambahkan produk
      setNama("");
      setHarga("");
      setProdukUrl("");
    } catch (error) {
      console.error("Error menambahkan produk:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Hapus produk dari Firestore berdasarkan ID
      await deleteDoc(doc(firestore, "store", id));
      // Perbarui tampilan dengan menghapus produk yang dihapus
      setProdukData((prevData) => prevData.filter((produk) => produk.id !== id));
    } catch (error) {
      console.error("Error menghapus produk:", error);
    }
  };

  return (
    <div>
      <Navigasi />
      <div className="grid justify-center items-center">
        <h1 className="text-xl font-bold text-black text-center mt-16">Daftar Produk</h1>
        <input
          type="text"
          placeholder="Nama"
          className="mt-5 w-96"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <input
          type="text"
          placeholder="Harga"
          className="mt-3"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL Produk"
          className="mt-3"
          value={produkUrl}
          onChange={(e) => setProdukUrl(e.target.value)}
        />
        <button className="border border-gray-400 bg-green-500 text-white mt-5" onClick={handleSubmit}>
          Send
        </button>
      </div>
      <div className="flex flex-wrap justify-center mt-10">
        {produkData.map((produk, index) => (
          <div key={index} className="w-52 md:w-1/2 lg:w-1/3 xl:w-1/6 p-2">
            <div className="bg-white rounded shadow-md">
              <img src={produk.produk} alt={produk.nama} className="w-32" />
              <div className="p-4">
                <h2 className="text-lg font-bold">{produk.nama}</h2>
                <p>Harga: Rp.{produk.harga}</p>
                <div className="flex justify-center items-center">
                  <button
                    className="border border-gray-400 bg-red-500 rounded-lg w-28 h-7 text-white mt-5"
                    onClick={() => handleDelete(produk.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
