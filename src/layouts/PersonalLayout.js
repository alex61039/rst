import React from 'react'
import TopMenu from './../components/topMenu';
import ImageGalleryItem from './../components/imageGalleryItem';

export default ({ children }) => (
    <div className="row">
        <div className="col-md-2">
            <TopMenu />
        </div>
        <div className="col-md-6 col-sm-10">
            <div className="main-content">
                {children}
            </div>
        </div>
        <div className="col-md-2">
            <div className="right-side">
                <div className="c-ad">
                    <div className="c-ad__items">
                        <ImageGalleryItem
                            image={require('./../assets/images/tmp_file/promo1.jpg')}
                        />
                        <ImageGalleryItem
                            image={require('./../assets/images/tmp_file/promo2.jpg')}
                        />
                        <ImageGalleryItem
                            image={require('./../assets/images/tmp_file/promo1.jpg')}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
)