import React, { useEffect, useState } from 'react';
import { collection, doc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firestore from '../utils/firebase-produk';
import Navigasi from '../components/Navigasi';

export default function Home() {
    const [slides, setSlides] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        let unsubscribe;

        const fetchData = async () => {
            try {
                const slidesCollection = collection(firestore, "slide");
                unsubscribe = onSnapshot(slidesCollection, (snapshot) => {
                    const slideData = [];
                    snapshot.forEach((doc) => {
                        slideData.push({ id: doc.id, ...doc.data() });
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

    const handleImageChange = async (slideId, slideProperty, newImage, slideNumber) => {
        setUploading(true);

        try {
            const storageRef = ref(storage, `slides/${slideId}/${slideProperty}.jpg`);
            await uploadBytes(storageRef, newImage);
            const newImageUrl = await getDownloadURL(storageRef);

            const slideDocRef = doc(firestore, "slide", slideId);
            const updateData = { [slideProperty]: newImageUrl };
            await updateDoc(slideDocRef, updateData);
        } catch (error) {
            console.error("Error updating the image:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <div>
                <Navigasi />
            </div>

            <h1 className='text-center text-xl font-bold mt-10'>Add Slide</h1>
            <div className='flex justify-center items-center'>
                {slides.map((slide, index) => (
                    <div key={index} className='flex mt-10 flex-wrap justify-center items-center'>
                        <div>
                            <img src={slide.slide1} alt="" className='w-96 mr-2 mt-10' />
                            <div className='justify-center items-center flex'>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(slide.id, "slide1", e.target.files[0], 1)}
                                />
                                {uploading ? (
                                    <p>Uploading...</p>
                                ) : (
                                    <>
                                        <button className="border border-gray-400 bg-green-500 rounded-lg w-28 h-7 text-white mt-5 mr-2">Change</button>
                                        <button className="border border-gray-400 bg-red-500 rounded-lg w-28 h-7 text-white mt-5">Delete</button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div>
                            <img src={slide.slide2} alt="" className='w-96 mt-10' />
                            <div className='justify-center items-center flex'>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(slide.id, "slide2", e.target.files[0], 2)}
                                />
                                {uploading ? (
                                    <p>Uploading...</p>
                                ) : (
                                    <>
                                        <button className="border border-gray-400 bg-green-500 rounded-lg w-28 h-7 text-white mt-5 mr-2">Change</button>
                                        <button className="border border-gray-400 bg-red-500 rounded-lg w-28 h-7 text-white mt-5">Delete</button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div>
                            <img src={slide.slide3} alt="" className='w-96 ml-2 mt-10' />
                            <div className='justify-center items-center flex'>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(slide.id, "slide3", e.target.files[0], 3)}
                                />
                                {uploading ? (
                                    <p>Uploading...</p>
                                ) : (
                                    <>
                                        <button className="border border-gray-400 bg-green-500 rounded-lg w-28 h-7 text-white mt-5 mr-2">Change</button>
                                        <button className="border border-gray-400 bg-red-500 rounded-lg w-28 h-7 text-white mt-5">Delete</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
