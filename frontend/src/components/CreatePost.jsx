import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema } from '../validations/PostValidation';
import photo from "../assets/images/logo.png";



const CreatePost = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const { register, handleSubmit, getValues } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(postSchema)
    });


    /*selects image with label and displays preview of image*/
    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);


    const sendPost = async () => {
        const values = getValues();
        const settings = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                ...values,
                selectedImage
            }),
        };
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts', settings)
            const data = await res.json();
            if (!res.ok) throw Error("La requête effectuée a échouée");
            console.log(values.post);
            console.log(selectedImage);
            return data;
        } catch (error) {
            return error
        }
    }


    const submitPost = async () => {
        await sendPost();
    }



    return (
        <div className="new-user-post">
            <div className="post-profile-picture">
                <img src={photo} alt='photo de profil' />
            </div>
            <div className='user-post-right'>
                <textarea minLength='2' maxLength='280' placeholder="Ecrivez quelque chose..." name="post" required {...register("post")}></textarea>
                {imageUrl && selectedImage && (
                    <div className='image-preview-container'>
                        <img src={imageUrl} alt={selectedImage.name} className="image-preview" />
                    </div>
                )}
                <div className="new-post-icons-container">
                    <input accept='image/jpeg,image/png' type='file' name="image" id="image" onChange={e => setSelectedImage(e.target.files[0])}></input>
                    <label htmlFor="image">
                        <i className="fa-solid fa-file-image"></i>
                    </label>
                    <button className='send-post-button' onClick={handleSubmit(submitPost)}>Envoyer</button>
                </div>

            </div>
        </div>
    );
};

export default CreatePost;

