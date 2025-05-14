import React, { useState } from "react";
import { storage, db } from "../firebase/firebase"; // Import Firebase config
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const UploadPage: React.FC = () => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setVideoFile(file);
        }
    };

    const handleUpload = () => {
        if (videoFile) {
            setUploading(true);
            const storageRef = ref(storage, `videos/${videoFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, videoFile);

            // Monitor upload progress
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error("Upload failed:", error);
                    setUploading(false);
                },
                () => {
                    // Get video download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // Save video metadata to Firestore
                        addDoc(collection(db, "videos"), {
                            url: downloadURL,
                            name: videoFile.name,
                            timestamp: new Date(),
                        })
                            .then(() => {
                                alert("Video uploaded successfully!");
                                setUploading(false);
                                setVideoFile(null); // Reset video file
                            })
                            .catch((error) => {
                                console.error("Error saving video metadata:", error);
                                setUploading(false);
                            });
                    });
                }
            );
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-[#1E1E1E] text-white">
            <h1 className="text-3xl font-bold mb-4">Upload Your Workout Video</h1>
            <p className="text-lg text-gray-400 mb-8">
                Share your workout videos with the GymTok community.
            </p>

            <div className="bg-[#40434E] p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className="text-center mb-6">
                    <label htmlFor="video-upload" className="text-lg font-semibold text-[#FF6B6B] cursor-pointer">
                        Choose a video file to upload
                    </label>
                    <input
                        type="file"
                        id="video-upload"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                {videoFile && (
                    <div className="text-center mb-6">
                        <p className="text-lg text-white">Selected File: {videoFile.name}</p>
                    </div>
                )}

                {uploading ? (
                    <div className="text-center mb-6">
                        <p className="text-lg text-white">Uploading: {Math.round(uploadProgress)}%</p>
                        <div className="w-full bg-gray-300 h-2 rounded-full">
                            <div
                                className="bg-[#FF6B6B] h-2 rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={handleUpload}
                        className="w-full bg-[#FF6B6B] py-2 rounded-full text-white font-bold hover:bg-[#FF4F4F] transition"
                    >
                        Upload Video
                    </button>
                )}
            </div>
        </div>
    );
};

export default UploadPage;
