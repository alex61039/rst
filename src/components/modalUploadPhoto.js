import React from 'react';
import SymbolDefs from './../assets/images/useful/svg/theme/symbol-defs.svg';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

class ModalUploadPhoto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploadDisplay: true,
            isErrorDisplay: false,
            isCropDisplay: false,
            fileBlob: new Blob(),
            src: null,
            crop: {
                unit: '%',
                aspect: 1 / 1,
                width: 50
            },
        };

        this.setState({ isUploadDisplay: this.props.modal })
    }

    UNSAFE_componentWillReceiveProps() {
        this.setState({ isUploadDisplay: this.props.modal })
    }

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const k = 1024;
            let maxSize = k * 5000;
            if (e.target.files[0].size <= maxSize) {
                const reader = new FileReader();
                reader.addEventListener('load', () =>
                    this.setState({ src: reader.result, isCropDisplay: true, isUploadDisplay: false })
                );

                reader.readAsDataURL(e.target.files[0]);
            } else {
                this.setState({ isUploadDisplay: false, isErrorDisplay: true })
            }
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }

    blobToFile() {
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        this.state.fileBlob.lastModifiedDate = new Date();
        this.state.fileBlob.name = "profile.jpeg";
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.setState({ fileBlob: blob })
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    handleFileChange() {
        const { onFileSelected, onClose } = this.props;
        this.state.fileBlob.lastModifiedDate = new Date();
        this.state.fileBlob.name = "profile.jpeg";
        onFileSelected(this.state.fileBlob);
        this.setState({ isCropDisplay: false }, () => onClose())
    }

    handleOnClose(field) {
        const { onClose } = this.props;
        this.setState({ src: null })
        this.setState({ [field]: false }, () => { onClose() });
    }

    renderModalChoosePhoto() {
        const { isUploadDisplay } = this.state;
        return (
            <div tabIndex="-1" role="dialog" aria-labelledby="modal-file-load" aria-hidden="true" id="modal-file-load" className={`modal fade c-modal-file-load ${isUploadDisplay ? 'show' : ''}`} style={{ display: isUploadDisplay ? 'block' : 'none' }}>
                <div role="document" className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <button type="button" data-dismiss="modal" aria-label="Close" className="modal__close" onClick={() => this.handleOnClose("isUploadDisplay")}>
                            <svg width="1em" height="1em" className="icon icon-close ">
                                <use xlinkHref={`${SymbolDefs}#icon-close`} ></use>
                            </svg>
                        </button>
                        <div className="modal-body">
                            <div className="c-modal-file-load__wrapper">
                                <h2 className="modal__title">Загрузка фотографии</h2>
                                <p className="modal__subtitle modal__subtitle--tac">Загрузите свою настоящую фотографию в формате JPG.</p>
                                <div className="c-modal-file-load__file e-input-file">
                                    <label className="e-btn e-btn--filled">Выбрать файл
                                    <input id="user-avatar" type="file" name="user-avatar" accept=".jpg, .jpeg, .png" onChange={(e) => this.onSelectFile(e)} />
                                    </label>
                                </div><span className="c-modal-file-load__info">Макс. 5 мб.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

    renderModalErrorUload() {
        const { isErrorDisplay } = this.state;
        return (
            <div id="modal-file-load-fail" tabIndex="-1" role="dialog" aria-labelledby="modal-file-load" aria-hidden="true" className={`modal fade c-modal-file-load-fail ${isErrorDisplay ? 'show' : ''}`} style={{ display: isErrorDisplay ? 'block' : 'none' }}>
                <div role="document" className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <button type="button" data-dismiss="modal" aria-label="Close" className="modal__close" onClick={() => this.handleOnClose("isErrorDisplay")}>
                            <svg width="1em" height="1em" className="icon icon-close ">
                                <use xlinkHref={`${SymbolDefs}#icon-close`} ></use>
                            </svg>
                        </button>
                        <div className="modal-body">
                            <div className="c-modal-file-load-fail__wrapper">
                                <h2 className="modal__title">Не получилось</h2>
                                <p className="modal__subtitle modal__subtitle--tac">Фотография не соответсвует заданным параметрам.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

    renderModalCropPhoto() {
        const { crop, croppedImageUrl, src, isCropDisplay } = this.state;
        const { modal } = this.props;
        return (
            <div tabIndex="-1" role="dialog" aria-labelledby="modal-file-load" aria-hidden="true" id="modal-photo-edit-user" className={`modal fade c-modal-photo-edit ${isCropDisplay ? 'show' : ''}`} style={{ display: isCropDisplay ? 'block' : 'none' }}>
                <div role="document" className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <button type="button" data-dismiss="modal" aria-label="Close" className="modal__close" onClick={() => this.handleOnClose("isCropDisplay")}>
                            <svg width="1em" height="1em" className="icon icon-close ">
                                <use xlinkHref={`${SymbolDefs}#icon-close`} ></use>
                            </svg>
                        </button>
                        <div className="modal-body">
                            <div className="c-modal-photo-edit__wrapper">
                                <svg width="1em" height="1em" className="icon icon-photo ">
                                    <use xlinkHref={`${SymbolDefs}#icon-photo`} ></use>
                                </svg>
                                <p className="modal__subtitle modal__subtitle--tac">Выберите область, которая будет отображаться в вашем профиле</p>
                                <div className="c-modal-photo-edit__action">
                                    <div className="c-modal-photo-edit__action-img">
                                        <ReactCrop
                                            src={src}
                                            crop={crop}
                                            ruleOfThirds
                                            onImageLoaded={this.onImageLoaded}
                                            onComplete={this.onCropComplete}
                                            onChange={this.onCropChange}
                                        />
                                    </div>
                                    <button type="button" className="e-btn e-btn--filled" onClick={() => this.handleFileChange()}>Сохранить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <>

                {this.state.isUploadDisplay && this.renderModalChoosePhoto()}
                {this.state.isErrorDisplay && this.renderModalErrorUload()}
                {this.state.isCropDisplay && this.renderModalCropPhoto()}

            </>
        );
    }
}

export default ModalUploadPhoto;