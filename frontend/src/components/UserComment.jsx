import React from 'react';
import photo from "../assets/images/logo.png";


const UserComment = () => {
    return (
        <div className='user-post'>
            <div className="user-comment">
                <div className="post-profile-picture">
                    <img src={photo} alt='photo de profil' />
                </div>
                <div className='user-post-right'>
                    <div className='user-post-content'>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima exercitationem dolores ullam at dolore, eveniet possimus voluptatem illum hic neque impedit cupiditate sint veniam incidunt iure veritatis rerum in obcaecati recusandae eligendi enim? iure veritatis rerum in obcers.</p>
                        <span>Posté il y a 2h</span>
                    </div>
                    <div className="post-icons-container">
                        <div className="like-dislike-icons-container">
                            <i className="fa-solid fa-circle-arrow-up"></i>
                            <i className="fa-solid fa-circle-arrow-down"></i>
                        </div>
                        <i className="fa-solid fa-message"></i>
                        <i className="fa-solid fa-trash-can"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserComment;