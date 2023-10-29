import React, { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, addDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firestore from '../utils/firebase-produk';
import Navigasi from '../components/Navigasi';

export default function Home() {
    const [slides, setSlides] = useState([]);
    const [newSlide, setNewSlide] = useState(null);

    useEffect(() => {
        let unsubscribe;

        const fetchData = async () => {
            try {
                const promoCollection = collection(firestore, "promo");
                unsubscribe = onSnapshot(promoCollection, (snapshot) => {
                    const slideData = [];
                    snapshot.forEach((doc) => {
                        const slide = doc.data().slide;
                        const id = doc.id;
                        slideData.push({ id, slide });
                    });
                    setSlides(slideData);
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        }
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewSlide(file);
    };

    const addNewSlide = async () => {
        if (newSlide) {
            try {
                const storage = getStorage();
                const storageRef = ref(storage, `slides/${newSlide.name}`);
                await uploadBytes(storageRef, newSlide);
                const newImageUrl = await getDownloadURL(storageRef);

                const promoCollection = collection(firestore, "promo");
                await addDoc(promoCollection, { slide: newImageUrl });

                setNewSlide(null);
            } catch (error) {
                console.error("Error adding new slide:", error);
            }
        }
    };

    const deleteSlide = async (slideId) => {
        try {
            const slideDocRef = doc(firestore, "promo", slideId);
            await deleteDoc(slideDocRef);
        } catch (error) {
            console.error("Error deleting slide:", error);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <div>
                <Navigasi />
            </div>
            <h1 className='text-center text-xl font-bold mt-10'>Slides</h1>
            <div className='justify-center items-center grid'>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className='mt-5'
                />
                <button
                    className="border border-gray-400 bg-green-500 text-white mt-5"
                    onClick={addNewSlide}
                >
                    Add Slide
                </button>
            </div>
            <div className='flex justify-center items-center flex-wrap'>
                {slides.map((slide, index) => (
                    <div key={index} className='flex mt-10 flex-wrap justify-center items-center'>
                        <div>
                            <img src={slide.slide} alt={`Slide ${index + 1}`} className='w-96 mr-2 mt-10' />
                            <div className='justify-center items-center flex mt-5'>
                                <button
                                    className="bg-red-500 border border-gray-400 rounded-lg w-24 h-8 mr-3 text-white"
                                    onClick={() => deleteSlide(slide.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
