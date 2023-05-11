import React from 'react'
import TopMenu from './../components/topMenu';
import ImageGalleryItem from './../components/imageGalleryItem';

export default ({ children }) => (
    <div className="row">
        <div className="col-md-2">
            <TopMenu />
        </div>
        {children}
    </div>
)