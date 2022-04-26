import React from 'react';
import photo from "../assets/images/logo.png";

const CreatePost = () => {
    return (
        <div className="new-user-post">
            <div className="post-profile-picture">
                <img src={photo} alt='photo de profil' />
            </div>
            <div className='user-post-right'>
                <textarea minLength='2' maxLength='280' placeholder="Ecrivez quelque chose...">
                </textarea>
                <div className="new-post-icons-container">
                    <label htmlFor="image">
                        <i className="fa-solid fa-file-image"></i>
                        <input accept='image/jpeg,image/png' type='file'></input>
                    </label>
                    <input type="submit" value="Envoyer" />
                </div>
            </div>
        </div>
    );
};

export default CreatePost;